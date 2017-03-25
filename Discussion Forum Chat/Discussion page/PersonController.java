/**
 * 
 */
/**
 * @author Yang
 *
 */
package com.spring.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.entity.Person;
import com.spring.service.PersonService;

@Controller
@RequestMapping(value="/person")

public class PersonController{
	
	@Autowired private PersonService personService;
	
	@RequestMapping("/login")
	public String login(){
		return "login";
	}
	
	@RequestMapping("/doLogin")
	public String doLogin(String userName,String password){
		if(Objects.equals(userName,"admin")&&Objects.equals(password, "admin")){
			return "redirect:main";
		}
		return "rediret:login";
	}	
	
	@RequestMapping("/main")
	public String main(Model model){
		model.addAttribute("persons",this.personService.getPersons());
		return "main";
	}
	
	@RequestMapping("/addPrompt")
	public String addPrompt(){
		return "addPeson";
	}
	
	@RequestMapping("/updatePrompt")
	public String updatePrompt(Model model,String id){
		model.addAttribute("person",this.personService.getPersonById(id));
		return "updatePerson";
	}
	
	
	@RequestMapping(value="/getPersons")
	@ResponseBody
	public List<Person> getPersons(){
		return personService.getPersons();
	}
	
	@RequestMapping(value="/getPersonById")
	public Person getPersonById(String id){
		return personService.getPersonById(id);
	}
	
	@RequestMapping(value="/addPerson")
	public String addPreson(Person person){
		personService.addPerson(person);
		return "redirect:main";
	}
	
	@RequestMapping(value="/upadatePerson")
	public String upadatePerson(Person person){
		personService.upadatePerson(person);
		return "redirect:main";
	}
	
	@RequestMapping(value="/deletePersonById")
	public String deletePersonById(String id){
		personService.deletePersonById(id);
		return "redirect:main";
	}
	
}