from subprocess import call
import urllib, json
from pprint import pprint
import os.path

with open('/Users/sihanwang/Desktop/JavaScript/work.json') as data_file:    
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
			call(["mkdir",Student])
	else:
		call(["mkdir","-p",Assignment+'/'+Student])
else:
	call(["mkdir","-p",CourseId+'/'+Assignment+'/'+Student])
os.chdir(CourseId+'/'+Assignment+'/'+Student)
if os.path.isfile(subName) == False:
	call(["wget", url])
call("ls")

def compilefile(fileName):
	if os.path.splitext(fileName)[1] == '.java':
		call(["javac",fileName])
		r = os.popen(call(["java",fileName]))
	elif os.path.splitext(fileName)[1] == '.cpp':
		r = os.popen(call(["g++",fileName]))
	else:
		print "error: neither java file nor cpp file"
compilefile(subName)
r = os.popen(command)
info = r.readlines()  
for line in info:  
    line = line.strip('\r\n')
    print line
'''
 f_list = os.listdir(path)
    # print f_list
    for i in f_list:
        # os.path.splitext():
        if os.path.splitext(i)[1] == '.log':
'''