def count_seq(request):

	seq_a = request.POST.get(‘seq_a’, ”).upper()
	if (seq_a == download):
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
		seq_a = "dowload completed"
	return render_to_response("count_sequence.html",{‘seq_a’:seq_a}) 