/**
 * 
 */
/**
 * @author Yang
 *
 */
package com.spring.dao;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.spring.entity.Person;

@Repository
public class PersonDAO{
	
	@Resource private SessionFactory sessionFactory;
	
	@SuppressWarnings("unused")
	private Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	@SuppressWarnings("unchecked")
	public List<Person> getPersons(){
		return(List<Person>)this.getSession().createCriteria(Person.class).list();
	}
	
	public Person getPersonById(String id){
		return (Person)this.getSession().createQuery("from Person where id=?")
		.setParameter(0, id).uniqueResult();
	}
	
	public void addPerson(Person person){
		this.getSession().save(person);
	}
	
	public void upadatePerson(Person person){
		this.getSession().update(person);
	}
	
	public void deletePersonById(String id){
		this.getSession().createQuery("delete Person where id=?")
		.setParameter(0, id).executeUpdate();
	}
	
}