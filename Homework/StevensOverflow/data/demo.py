#!/usr/bin/env python

import os
import signal
import time
import subprocess
import sys

import re

# p = re.compile('.*amazonaws\.com')
# m = p.match('ec2-174-129-149-195.compute-1.amazonas.com')
# print m


def log(line):
    print line

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

out, err = execute("scp -r u1:/data/.* .")
if out:
    print out
if err:
    print err.strip()

# print 'hello'
# The os.setsid() is passed in the argument preexec_fn so
# it's run after the fork() and before  exec() to run the shell.
# print len("i-0433ad75f5c4a6ded")
# start = time.time()
# a = 1
# for i in range(10000000):
#     a += 1
#     pass
# end = time.time()
# print end - start

def log(line):
    print line
# def execute(cmd, timeout=None):

#     try:
#         pro = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
#                                shell=True, preexec_fn=os.setsid) 
#         # os.killpg(os.getpgid(pro.pid), signal.SIGTERM)
#         output, error = pro.communicate()

#         if timeout is not None:
#             time.sleep(timeout)
#             log("kill command: \n\t{0}".format(cmd))
#             os.killpg(pro.pid, signal.SIGTERM)
#             return (output, error)

#         if output:
#             log("successfully excuted command: \n\t{0}".format(cmd))
#             return (output, None)
#         if error:
#             log("error occurred when excute command: \n\t{0}".format(cmd)) 
#             return (None, error)
#         return ("", None)

#     except OSError, oserror:
#         return (None, oserror)

# out, err = execute("ssh -i ~/.ssh/cs615-key2.pem root@174.129.149.195 'ls'")

# if out:
#     # print "out: ", out
#     msg = out.split(' ')
#     if len(msg) == 11 and msg[0] == 'Please' and msg[1] == 'login' and msg[2] == 'as' and msg[3] == 'the' and msg[4] == 'user':
#         loginUser = msg[5].strip('"')
#         out, err = execute("ssh -i ~/.ssh/cs615-key2.pem {0}@174.129.149.195 'ls'".format(loginUser))
#         log(out)
#     else:
#         pass
#         # TODO:
#         #   execute scp command

# if err:
#     print "err:", err

# import subprocess
# from subprocess import PIPE
# pro = subprocess.Popen("ls -*", stdout=PIPE, stderr=PIPE, shell=True)

# # Here you can get the PID
# # global child_pid
# # child_pid = proc.pid

# # Now we can wait for the child to complete
# (output, error) = pro.communicate()
# # os.killpg(os.getpgid(pro.pid), signal.SIGTERM)

# if error:
#     print "error:", error

# print "output:", output