package com.controller;

import java.sql.ResultSet;
import java.sql.SQLException;

public class databaseController {
	//what's the class of assignmentInfo
	public void insertIntoStudentAssignmentsInfoTable(String databaseName, String UUID, String studentID, String StudentName, String assignmentID, String assignmentInfo, int grade) {
		String query = "insert into StudentAssignmentsInfoTable (UUID, studentID, StudentName, assignmentID, assignmentInfo, grade) "
	                  + "values('" + UUID + "','" + studentID + "','" + StudentName + "','" + assignmentID + "','" + assignmentInfo + "','" + grade + " ')";
	}
	public int getGrade(String UUID, ResultSet rs) {
		int grade = 0;
		try {
			while (rs.next()) {
				if (rs.getString("UUID").equals(UUID)) {
					String temp = rs.getString("grade");
				    grade = Integer.parseInt(temp);
				}
			}
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return grade;
	}
}

