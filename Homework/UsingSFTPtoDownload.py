# yum install python-dev
# yum install python-devel
# pip install pycrypto
# pip install paramiko
#pip install ssh
# vim remote_run.py
# using stfp 
import ssh
from subprocess import call
import urllib, json
from pprint import pprint
import os.path

myclient = ssh.SSHClient()
myclient.set_missing_host_key_policy(ssh.AutoAddPolicy())

myclient.connect("xxx.server.com", port=22, username="xxxx", password="xxxx")# connect the server
stdin, stdout, stderr = client.exec_command("ls -l")
print stdout.read()
stdin, stdout, stderr = client.exec_command("python/home/test.py")# run test.py on the client computer
sftp = client.open_sftp()
sftp.get('work.json', '/home/work.json')

with open('/home/work.json') as data_file:    
    data = json.load(data_file)
CourseId = data["Course"][0]["courseId"]
Student = data["Student"][0]["CWID"]
Assignment = data["Assignment"][0]["assignmentId"]
subName = data["Submittion"][0]["Name"]
url =data["Submittion"][0]["url"]

if os.path.exists(CourseId):
	if os.path.exists(CourseId+'/'+Assignment):
		if os.path.exists(CourseId+'/'+Assignment+'/'+Student):
			pass
		else:
			sftp.mkdir(Student)
	else:
		sftp.mkdir(Assignment+'/'+Student)
else:
	sftp.mkdir(CourseId+'/'+Assignment+'/'+Student)
sftp.cd(CourseId+'/'+Assignment+'/'+Student)
if os.path.isfile(subName) == False:
	call(["wget", url])
call("ls")

def compilefile(fileName):
	if os.path.splitext(fileName)[1] == '.java':
		call(["javac",fileName])
		call(["java",fileName])
	elif os.path.splitext(fileName)[1] == '.cpp':
		call(["g++",fileName])
	else:
		print "error: neither java file nor cpp file"


 


'''
sftp.put('/home/test.sh', 'test.sh')
'''