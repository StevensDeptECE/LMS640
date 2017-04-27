#!/usr/bin/env python

import subprocess
import sys
import json

import os
import signal
import time

from collections import deque

# print processing message
def log(line):
    if DEBUG:
        print "DEBUG: " + str(round(float(time.time() - START_TIME), 3)) + "s - " + str(line)

# print error message and exit program with errorcode 1
def elog(line):
    sys.stderr.write(line + "\n")
    sys.exit(1)

# function execute:
# description: execute a single command 
# params: 
#       cmd: command as string to be executed
# return: will return (stdout, None) if successfully executed, return (None, stderr) if not
# issue: timeout is not available to use
def execute(cmd, timeout=None):

    try:
        pro = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                               shell=True, preexec_fn=os.setsid) 
        output, error = pro.communicate()

        if timeout is not None:
            time.sleep(timeout)
            log("kill command: \n\t{0}".format(cmd))
            os.killpg(pro.pid, signal.SIGTERM)
            return (output, error)

        if output or error.strip() == "error: unexpected filename: ..":
            # log("successfully executed command: \n\t{0}".format(cmd))
            return (output, None)
        if error :
            log("error occurred when excuting command: \n\t{0}".format(cmd)) 
            return (None, error)
        return ("", None)

    except OSError, oserror:
        return (None, oserror)

# function analyse_original_instance:
# description: check if source instance is accessible; check if source directory is valid; check if login user name is valid
# params: 
#       instance_id: source instances' id
#       copy_dir: source directory
# return: source instance object
def analyse_original_instance(instance_id, copy_dir):

    log("analysing original instance: {0}".format(instance_id))

    origin = Instance(instance_id)
    while not origin.isReady():
        origin.isReady()

    # log("parsing host from: {0}".format(SSH_CONFIG_DIR))
    # for host in host_parser(SSH_CONFIG_DIR):
        # if host.pubIp == origin.pubIp or host.pubIp == origin.pubDns:
            # log("host found: {0}".format(host))
        # origin.setLoginUser(host.user)
        # origin.setIdFile(host.idFile)

    log('checking login username...')
    out, err = execute("ssh {0}@{1} 'echo cs615'".format(origin.uname, origin.pubDns))

    if err:
        log(err)
        elog("afewmore ERROR: cannot access instance: {0}".format(origin.insId))

    else:
        msg = out.split(' ')
        if msg[0].strip() != "cs615":
            log("login user is not {0}".format(origin.uname))
            loginUser = msg[5].strip('"')
            log("changing login user to {0}".format(loginUser))
            origin.setLoginUser(loginUser)

        else:
            log("login user is {0}".format(origin.uname))            

        # super user command: assume it is sudo
        SUPER_USER_COMMAND = 'sudo'
        # check if the instance have sudo command
        out, err = execute("ssh {0}@{1} 'which sudo'".format(origin.uname, origin.pubDns))
        if not out:
            SUPER_USER_COMMAND = ''   
        if origin.uname != 'root':
            # use chown to change the ownership of the entire copy_dir to loginUser
            log('changing dir ownership...')
            execute("ssh {0}@{1} '{2} chown -R {0} {3}'".format(origin.uname, origin.pubDns, SUPER_USER_COMMAND, copy_dir))
            # user chmod to change the mod of the entire copy_dir to -(d)rwx------
            log('changing dir mode...')
            execute("ssh {0}@{1} '{2} chmod -R 700 {3}'".format(origin.uname, origin.pubDns, SUPER_USER_COMMAND, copy_dir))
        # check copy_dir
        log("checking soruce directory...")
        out, err = execute("ssh {0}@{1} 'ls -l {2}'".format(origin.uname, origin.pubDns, copy_dir))
        if err:
            elog("afewmore ERROR: cannot access directory or no such file")
            print err

    return origin

def analyse_created_instance(created, target_dir):

    log('checking login username...')
    out, err = execute("ssh {0}@{1} 'echo cs615'".format(created.uname, created.pubDns))

    if err:
        log(err)
        elog("afewmore ERROR: cannot access instance: {0}".format(created.insId))

    else:
        msg = out.split(' ')
        if msg[0].strip() != "cs615":
            log("login user is not {0}".format(created.uname))
            loginUser = msg[5].strip('"')
            log("changing login user to {0}".format(loginUser))
            created.setLoginUser(loginUser)

        else:
            log("login user is {0}".format(created.uname))            

        # super user command: assume it is sudo
        SUPER_USER_COMMAND = 'sudo'
        # check if the instance have sudo command
        out, err = execute("ssh {0}@{1} 'which sudo'".format(created.uname, created.pubDns))
        if not out:
            SUPER_USER_COMMAND = '' 
        # in case newly created instance doesn't have the target directory
        log('creating target dir...')
        execute("ssh {0}@{1} '{2} mkdir -p {3}'".format(created.uname, created.pubDns, SUPER_USER_COMMAND, target_dir))

        # if user cannot log in as root user
        if created.uname != 'root':
            # use chown to change the ownership of the entire target_dir to loginUser
            log('changing target dir ownership...')
            execute("ssh {0}@{1} '{2} chown -R {0} {3}'".format(created.uname, created.pubDns, SUPER_USER_COMMAND, target_dir))
            # user chmod to change the mod of the entire target_dir to -(d)rwx------
            log('changing target dir mode...')
            execute("ssh {0}@{1} '{2} chmod -R 700 {3}'".format(created.uname, created.pubDns, SUPER_USER_COMMAND, target_dir))

        # check target_dir
        log("checking target directory...")
        out, err = execute("ssh {0}@{1} 'ls -l {2}'".format(created.uname, created.pubDns, target_dir))

        if err:
            elog("afewmore ERROR: cannot access directory or no such file")            

    return created

# function dup_instance:
# description: run n more instances
# params: 
#       origin_instance: source instance object
#       num: number of instances to be started
# return: a queue of newly stated instances object
def dup_instance(origin_instance, num):

    instances_queue = [] # cache the instances references
    origin = origin_instance
    out, err = execute('aws ec2 run-instances --placement AvailabilityZone={0} --image-id {1} --security-group-ids {2} --count {3} --instance-type {4} --key-name \'{5}\' --query \'Instances[*].InstanceId\' --output json'
        .format(
        origin.azone,
        origin.imgId,
        " ".join([group.gid for group in origin.sgroups]),
        num,
        origin.itype,
        origin.kname
    ))
    if out:
        for instance_id in json.loads(out):
            log("pushing instance: {0} to queue".format(instance_id))
            instances_queue.append(Instance(instance_id))
        return deque(instances_queue)
    else:
        elog(err)

# function scp:
# description: copy files from source to newly started instances
# params: 
#       origin: source instance object
#       targets: number of instances to be started
# return: a queue of newly stated instances object
def scp(origin, targets, dir="/data"):

    # format target directory
    if dir[len(dir) - 1] != "/":
        dir += "/"

    while len(targets) is not 0:
        target = targets.popleft()
        target.uname = origin.uname

        start_time = time.time()

        if target.isReady():
            target = analyse_created_instance(target, dir)
            log("copying to target: {0}".format(target.insId))
            out, err = execute("scp -3C -r {0}@{1}:{2} {3}@{4}:{5}"
                .format(origin.uname, origin.pubDns, dir + ".*", target.uname, target.pubDns, dir))
            if err:
                elog(err)
            if out:
                log(out)
            else:
                log("successfully copied!")
                if not DEBUG:
                    print "\t" + target.insId
                # origin = target
                log(target)
        else:
            targets.append(target)
        
        end_time = time.time()

        if end_time - start_time < 5:
            log("wating...")
            time.sleep(5)

# entrance for the program
def start(instance_id, copy_dir, num_new_ins):
    log("starting with {0} {1} {2}".format(instance_id, copy_dir, num_new_ins))
    log("verbose: " + str(DEBUG))

    origin_instance = analyse_original_instance(instance_id, copy_dir)
    log("done checking source instance: " + origin_instance.insId)

    log("duplicating instances...")
    targets_queue = dup_instance(origin_instance, num_new_ins)
    log("done duplicating instnaces...")

    log("copying " + copy_dir + "...")
    scp(origin_instance, targets_queue, copy_dir)

    log("**********DONE**********\n")

if __name__ == "__main__":

    DEBUG = False  # program will print debug infomation to stdout when DEBUG is True
    SSH_CONFIG_DIR = os.path.expanduser('~') + "/.ssh/config"  # default ssh config file location
    INSTANCE_ID = "" # source instance id, should be provided from user
    NUM_NEW_INS = 10 # default new number of instances to start
    COPY_DIR = "/data" # default source directory to copy from
    START_TIME = time.time()

    options = sys.argv 
    FLAGS = {
        "-h":False,
        "-d":False,
        "-n":False,
        "-v":False,
    }
    i = 1

    while i < len(options):
        op = options[i]

    if op == "-h" and i is len(options) - 1:
        print "Printing usage from manual\n\n\n"
    else:
            if op not in FLAGS or i is len(options) - 1:
                    if (len(op) is not 19):
                        elog("afewmore ERROR: Invalid argument {0}".format(op))
                    if i is not len(options) - 1:
                        elog("afewmore ERROR: Invalid argument after {0}".format(op))
                    INSTANCE_ID = op
                    start(INSTANCE_ID, COPY_DIR, NUM_NEW_INS)
                    break;
        if FLAGS[op]:
            elog("afewmore ERROR: Multiple argument {0}".format(op))

        if op == "-n":
            FLAGS["-n"] = True
            i += 1
            try:
                NUM_NEW_INS = int(options[i])
            except (IndexError, ValueError) as err:
                elog("afewmore ERROR: Invalid argument after {0}".format(op))
        if op == "-d":
            FLAGS["-d"] = True
            i += 1
            try:
                COPY_DIR = options[i]
            except ValueError, err:
                elog("afewmore ERROR: Invalid argument after {0}".format(op))
        if op == "-v":
            FLAGS["-v"] = True
            DEBUG = True
        if op == "-h":
            print "AFEWMORE(1)       BSD General Commands Manual          AFEWMORE(1)\n\
    \n\
    NAME\n\
         afewmore -- duplicate EC2 instances with their data directory\
    \n\
    SYNOPSIS\n\
         afewmore [-hv] [-d dir] [-n num] instance\n\
    \n\
    DESCRIPTION\n\
         The afewmore tool can be used to duplicate a given EC2 instance.  When\n\
         doing so, it creates multiple new instances and populates their data\n\
         directory by copying the data from the original.\n\
    \n\
    OPTIONS\n\
         The source instance is specified via the mandatory argument to afewmore.\n\
         In addition, the following command-line options are supported:\n\
    \n\
         -d dir   Copy the contents of this data directory from the orignal source\n\
              instance to all the new instances.  If not specified, defaults\n\
              to /data.\n\
    \n\
         -h       Print a usage statement and exit.\n\
    \n\
         -n num   Create this many new instances.  If not specified, defaults to\n\
              10.\n\
    \n\
         -v       Be verbose.\n\
    \n\
    DETAILS\n\
         Frequently, it is necessary to duplicate a given server's configuration\n\
         or setup.  While configuration management and service orchestration sys-\n\
         tems may be able to perform this task, the afewmore tool allows for a\n\
         trivial initial bootstrapping that only concerns itself with data dupli-\n\
         cation, not host configuration.\n\
    \n\
         Upon invocation, afewmore will identify the type of EC2 instance in ques-\n\
         tion and launch the requested number of duplicates.  It will then copy\n\
         the contents of the given directory from the source instance to all of\n\
         the newly created instances.\n\
    \n\
    OUTPUT\n\
         By default, afewmore prints the instance IDs of the newly created EC2\n\
         instances as the only output.  Unless an error occurs, no other output is\n\
         generated.\n\
    \n\
         If the -v flag is given, afewmore may print meaningful diagnostic mes-\n\
         sages as it progresses to stdout.\n\
    \n\
         Any errors encountered cause a meaningful error message to be printed to\n\
         STDERR.\n\
    \n\
    ENVIRONMENT\n\
         The afewmore tool is suitable to be used by any user and does not have\n\
         any user-specific settings or credentials hard coded.\n\
    \n\
         afewmore assumes that the user has set up their environment for general\n\
         use with the EC2 tools.  That is, it will not set or modify any environ-\n\
         ment variables.\n\
    \n\
         afewmore also assumes that the user has set up their ~/.ssh/config file\n\
         to access instances in EC2 via ssh(1) without any additional settings.\n\
    \n\
    EXIT STATUS\n\
         The afewmore will exit with a return status of 0 under normal circum-\n\
         stances.  If an error occurred, afewmore will exit with a value >0.\n\
    \n\
    EXAMPLES\n\
         The following examples illustrate common usage of this tool.\n\
    \n\
         To create ten more instances of the EC2 instance i-0a1b2c3d4f and copy\n\
         the contents of the '/data' directory from that instance:\n\
    \n\
           $ afewmore i-0a1b2c3d4f\n\
           i-0a1b2c3d4f\n\
           i-1a1b2c3d4f\n\
           i-2a1b2c3d4f\n\
           i-3a1b2c3d4f\n\
           i-4a1b2c3d4f\n\
           i-5a1b2c3d4f\n\
           i-6a1b2c3d4f\n\
           i-7a1b2c3d4f\n\
           i-8a1b2c3d4f\n\
           i-9a1b2c3d4f\n\
           $ echo $?\n\
           0\n\
           $\n\
    \n\
         To create just one more instance and copy the contents of the directory\n\
         '/usr/local/share':\n\
    \n\
           $ afewmore -n 1 i-0a1b2c3d4f\n\
           i-1a1b2c3d4f\n\
           $\n\
    \n\
    SEE ALSO\n\
         aws help, ssh(1), tar(1), rsync(1)\n\
    \n\
    HISTORY\n\
         afewmore was originally assigned by Jan Schaumann\n\
         <jschauma@cs.stevens.edu> as a homework assignment for the class 'Aspects\n\
         of System Administration' at Stevens Institute of Technology in the\n\
         Spring of 2017.\n\
    \n\
    BSD             March 27, 2017                 BSD"
            break
        i += 1













