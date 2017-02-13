/* ========================================================================
 * Canvas replacement: Discussion Board
 * https://github.com/StevensDeptECE/LMS640/tree/master/Discussion%20Board
 * ========================================================================
 * author: Fangming Zhao
 * co-author: Songnian Yin, He Song, Yang Bai, Bhavitha	Dasaram, Yang Liu, Yu Yu
 * E-mail: fzhao6@stevens.edu
 * Project: team project
 * ======================================================================== */


//--------- format of function: (id, class, event(future), target(to be appended))-----------
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

//--------- format of function: (id, class, event(future), target(to be appended))-----------
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

//--------- format of function: (id, class, event(future), target(to be appended))-----------
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

//--------- format of function: (id, class, data-toggle, role, aria-haspopup, aria-expanded, href, node, event, target(to be appended))-----------
function create_a_regular(a_id_tag, a_id, a_class_tag, a_class, a_data_toggle_tag, a_data_toggle, a_role_tag, a_role, a_aria_haspopup_tag, a_aria_haspopup, a_aria_expanded_tag, 
						  a_aria_expanded, a_href_tag, a_href, a_node_tag, a_node, a_event_tag, a_event, append_target){
	var cre_element = document.createElement("a");
	var target, node;

	target = document.getElementById(append_target);

	if(a_id_tag == true){
		cre_element.setAttribute("id", a_id);
	}
	if(a_class_tag == true){
		cre_element.setAttribute("class", a_class);
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
	switch(a_event_tag){
		case 0:
			break;
		case 1: 
			cre_element.setAttribute("onclick", a_event);
			break;
		default:
			break;
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
}

//--------- format of function: (id, class, event(future), target(to be appended))-----------
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

//--------- format of function: (id, class, event(future), target(to be appended))-----------
function create_span_N(span_id_tag, span_id, span_class_tag, span_class, span_node_tag, span_node, append_target){
	var cre_element = document.createElement("span");
	var target;

	target = document.getElementById(append_target);

	if(span_id_tag == true){
		cre_element.setAttribute("id", span_id);
	}
	if(span_class_tag == true){
		cre_element.setAttribute("class", span_class);
	}
	if(span_node_tag == true){
		node = document.createTextNode(span_node);
		cre_element.appendChild(node);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
}

//--------- format of function: (id, class, type, data-toggle, data-target, aria-expanded, aria-controls, event, target(to be appended))-----------
function create_btn_N(btn_id_tag, btn_id, btn_class_tag, btn_class, btn_type_tag, btn_type, btn_data_toggle_tag, btn_data_toggle, btn_data_target_tag, btn_data_target, btn_aria_expanded_tag, 
						  btn_aria_expanded, btn_aria_controls_tag, btn_aria_controls, btn_event_tag, btn_event, append_target){
	var cre_element = document.createElement("button");
	var target, node;

	target = document.getElementById(append_target);

	if(btn_id_tag == true){
		cre_element.setAttribute("id", btn_id);
	}
	if(btn_class_tag == true){
		cre_element.setAttribute("class", btn_class);
	}
	if(btn_type_tag == true){
		cre_element.setAttribute("type", btn_type);
	}
	if(btn_data_toggle_tag == true){
		cre_element.setAttribute("data-toggle", btn_data_toggle);
	}
	if(btn_data_target_tag == true){
		cre_element.setAttribute("data-target", btn_data_target);
	}
	if(btn_aria_expanded_tag == true){
		cre_element.setAttribute("aria-expanded", btn_aria_expanded);
	}
	if(btn_aria_controls_tag == true){
		cre_element.setAttribute("aria-controls", btn_aria_controls);
	}
	if(btn_event_tag == true){
		cre_element.setAttribute("#", btn_event);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
}
