/**
 * 
 */
/**
 * @author Yang
 *
 */
package com.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.dao.PersonDAO;
import com.spring.entity.Person;

@Service 
public class PersonService{
	
	@Autowired private PersonDAO personDAO;
	
	public List<Person> getPersons(){
		return personDAO.getPersons();
	}
	
	public Person getPersonById(String id){
		return personDAO.getPersonById(id);
	}
	
	public void addPerson(Person person){
		personDAO.addPerson(person);
	}
	
	public void upadatePerson(Person person){
		personDAO.upadatePerson(person);
	}
	
	public void deletePersonById(String id){
		personDAO.deletePersonById(id);
	}
	
}