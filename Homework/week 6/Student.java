
class Student{
	private String UserId;
	private String StuName;
	private String SisUserId;
	private String Mail;
	
	public Student(String UserId,String StuName,String SisUserId,String Mail){
		this.UserId = UserId;
		this.StuName = StuName;
		this.SisUserId = SisUserId;
		this.Mail = Mail;		
	}
	
	public Student(String UserId,String StuName){
		this.UserId = UserId;
		this.StuName = StuName;
		this.SisUserId = null;
		this.Mail = null;		
	}
	
	public Student(String UserId,String StuName,String Mail){
		this.UserId = UserId;
		this.StuName = StuName;
		this.SisUserId = null;
		this.Mail = Mail;		
	}
	
	public String getUserId(){
		return UserId;
	}

	public String getStuName(){
		return StuName;
	}
	public String getSisUserId(){
		return SisUserId;
	}
	public String getMail(){
		return Mail;
	}
	
	public String toString(){
		return UserId+"      "+StuName+"      "+SisUserId+"      "+Mail;
	}
		
}
