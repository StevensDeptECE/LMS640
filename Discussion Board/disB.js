/* ========================================================================
 * Canvas replacement: Discussion Board
 * https://github.com/StevensDeptECE/LMS640/tree/master/Discussion%20Board
 * ========================================================================
 * author: Fangming Zhao
 * co-author: Songnian Yin, He Song, Yang Bai, Bhavitha	Dasaram, Yang Liu, Yu Yu
 * E-mail: fzhao6@stevens.edu
 * Project: team project
 * ======================================================================== */


//--------- format of function: (id, class, style, event(future), target(to be appended))-----------
function create_div_regular(div_id_tag, div_id, div_class_tag, div_class, div_style_tag, div_style, div_event, append_target){
	var cre_element = document.createElement("div");
	var target;
	target = document.getElementById(append_target);
	if(div_id_tag == true){
		cre_element.setAttribute("id", div_id);
	}
	if(div_class_tag == true){
		cre_element.setAttribute("class", div_class);
	}
	if(div_style_tag == true){
		cre_element.style.cssText = div_style;
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

//--------- format of function: (id, class, style, node, target(to be appended))-----------
function create_span_N(span_id_tag, span_id, span_class_tag, span_class, span_style_tag, span_style, span_node_tag, span_node, append_target){
	var cre_element = document.createElement("span");
	var target;

	target = document.getElementById(append_target);

	if(span_id_tag == true){
		cre_element.setAttribute("id", span_id);
	}
	if(span_class_tag == true){
		cre_element.setAttribute("class", span_class);
	}
	if(span_style_tag == true){
		cre_element.style.cssText = span_style;
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
						  btn_aria_expanded, btn_aria_controls_tag, btn_aria_controls, btn_event_tag, btn_event, btn_node_tag, btn_node, append_target){
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
	if(btn_node_tag == true){
		node = document.createTextNode(btn_node);
		cre_element.appendChild(node);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
}

//--------- format of function: (id, class, target(to be appended))-----------
function create_p_N(p_id_tag, p_id, p_class_tag, p_class, append_target){
	var cre_element = document.createElement("p");
	var target, node;

	target = document.getElementById(append_target);

	if(p_id_tag == true){
		cre_element.setAttribute("id", p_id);
	}
	if(p_class_tag == true){
		cre_element.setAttribute("class", p_class);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}
}
//--------- format of function: (id, type, class, align, value, event, target(to be appended))-----------
function create_inp_N(inp_id_tag, inp_id, inp_type_tag, inp_type, inp_class_tag, inp_class, inp_align_tag, inp_align, inp_value_tag, inp_value, 
					  inp_event_tag, inp_event, append_target){
	var cre_element = document.createElement("inp");
	var target, node;

	target = document.getElementById(append_target);

	if(inp_id_tag == true){
		cre_element.setAttribute("id", inp_id);
	}
	if(inp_type_tag == true){
		cre_element.setAttribute("type", inp_type);
	}
	if(inp_class_tag == true){
		cre_element.setAttribute("class", inp_class);
	}
	if(inp_align_tag == true){
		cre_element.setAttribute("align", inp_align);
	}
	if(inp_value_tag == true){
		cre_element.setAttribute("value", inp_value);
	}
	switch(inp_event_tag){
	case 0:
		break;
	case 1: 
		cre_element.setAttribute("onclick", inp_event);
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
//--------- format of function: (id, class, target(to be appended))-----------
function create_h_N(h_id_tag, h_id, h_tag, h_node_tag, h_node, append_target){
	var cre_element = "";
	var target;
	if(h_id_tag == true){
		cre_element.setAttribute("id", h_id);
	}
	switch(h_tag){
		case 1:
			cre_element = document.createElement("h1");
			break;
		case 2:
			cre_element = document.createElement("h2");
			break;
		case 3:
			cre_element = document.createElement("h3");
			break;
		case 4:
			cre_element = document.createElement("h4");
			break;
		case 5:
			cre_element = document.createElement("h5");
			break;
		case 6:
			cre_element = document.createElement("h6");
			break;
		default:
			break;			
	}
	if(h_node_tag == true){
		node = document.createTextNode(h_node);
		cre_element.appendChild(node);
	}
	if(append_target == "body"){
		document.body.appendChild(cre_element);
	}else{
		target.appendChild(cre_element);
	}	
	
}