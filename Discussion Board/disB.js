/* ========================================================================
 * Canvas replacement: Discussion Board
 * https://github.com/StevensDeptECE/LMS640/tree/master/Discussion%20Board
 * ========================================================================
 * author: Fangming Zhao
 * co-author: Songnian Yin, He Song, Yang Bai, Bhavitha	Dasaram, Yang Liu, Yu Yu
 * E-mail: fzhao6@stevens.edu
 * Project: team project
 * ======================================================================== */

function create_div_regular(div_id_tag, div_id, div_class_tag, div_class, div_event_tag, div_event_type, div_event, append_target){
	var cre_element = document.createElement("div");
	var target;
	target = document.getElementById(append_target);
	if(div_id_tag == true){
		cre_element.setAttribute("id", div_id);
	}
	if(div_class_tag == true){
		cre_element.setAttribute("class", div_class);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
	

}

function create_ul_regular(ul_id_tag, ul_id, ul_class_tag, ul_class, ul_event_tag, ul_event_type, ul_event, append_target){
	var cre_element = document.createElement("ul");
	var target;

	target = document.getElementById(append_target);

	if(ul_id_tag == true){
		cre_element.setAttribute("id", ul_id);
	}
	if(ul_class_tag == true){
		cre_element.setAttribute("class", ul_class);
	}

	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
	
	
}

function create_li_regular(li_id_tag, li_id, li_class_tag, li_class, li_event_tag, li_event_type, li_event, append_target){
	var cre_element = document.createElement("li");
	var target;

	target = document.getElementById(append_target);

	if(li_id_tag == true){
		cre_element.setAttribute("id", li_id);
	}
	if(li_class_tag == true){
		cre_element.setAttribute("class", li_class);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
	
	
}

function create_a_regular(a_id_tag, a_id, a_data_toggle_tag, a_data_toggle, a_role_tag, a_role, a_aria_haspopup_tag, a_aria_haspopup, a_aria_expanded_tag, 
						  a_aria_expanded, a_href_tag, a_href, a_node_tag, a_node, append_target){
	var cre_element = document.createElement("a");
	var target, node;

	target = document.getElementById(append_target);

	if(a_id_tag == true){
		cre_element.setAttribute("id", a_id);
	}
	if(a_data_toggle_tag == true){
		cre_element.setAttribute("data-toggle", a_data_toggle);
	}
	if(a_role_tag == true){
		cre_element.setAttribute("role", a_role);
	}
	if(a_aria_haspopup_tag == true){
		cre_element.setAttribute("aria-haspopup", a_aria_haspopup);
	}
	if(a_aria_expanded_tag == true){
		cre_element.setAttribute("aria-expanded", a_aria_expanded);
	}
	if(a_href_tag == true){
		cre_element.setAttribute("href", a_href);
	}
	if(a_node_tag == true){
		node = document.createTextNode(a_node);
		cre_element.appendChild(node);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
}
	function create_nav_regular(nav_id_tag, nav_id, nav_class_tag, nav_class, append_target){
		var cre_element = document.createElement("nav");
		var target;

		target = document.getElementById(append_target);

		if(nav_id_tag == true){
			cre_element.setAttribute("id", nav_id);
		}
		if(nav_class_tag == true){
			cre_element.setAttribute("class", nav_class);
		}
		if(append_target == "body"){
			document.body.appendChild(cre_element);
		}else{
			target.appendChild(cre_element);
		}
		
	}

	
