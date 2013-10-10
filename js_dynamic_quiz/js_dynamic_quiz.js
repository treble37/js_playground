var check_state = new Array(allQuestions.length);

var finish_index = allQuestions.length-1;
var question_index = 0;
var score = 0;
var is_div_tag = undefined;

var q_obj_arr = new Array();

window.onload = function() {
  load_quiz_questions();
  next_question();
}

//setup prototype
function InputElementProps() {
  this.attrs = new Object();
  this.attrs["type"] = "button";
  this.attrs["id"] = null;
  this.attrs["name"] = null;
  this.attrs["value"] = null;
  this.attrs["checked"] = null;
  this.handle_func = new Object();
  this.handle_func["handler"] = null;
  this.handle_func["handler_func"] = null;
}
InputElementProps.prototype = {
  constructor: InputElementProps
};

//setup question prototype

function QuestionObject() {
  this.attrs = new Object();
  this.attrs["question"] = "default question?";
  this.attrs["answer_choices"] = new Array("Los Angeles","Chicago","Seattle","Vancouver");
  this.attrs["answer_index"] = 0;
} 

InputElementProps.prototype = {
  constructor: QuestionObject
};

function load_quiz_questions() {
  for (var i = 0; i<allQuestions.length; i++) {
    q_obj_arr[i] = new QuestionObject();
    q_obj_arr[i].attrs["question"] = allQuestions[i]["question"];
    q_obj_arr[i].attrs["answer_choices"] = allQuestions[i]["choices"];
    q_obj_arr[i].attrs["answer_index"] = allQuestions[i]["correctAnswer"];
  }
}

function set_input_element_props(iep, type, id, name, value, checked, handler_val, handler_func_val) {
  iep.attrs["type"] = type||null;
  iep.attrs["id"] = id||null;
  iep.attrs["name"] = name||null;
  iep.attrs["value"] = value||null;
  iep.attrs["checked"] = checked||null;
  iep.handle_func["handler"] = handler_val||null;
  iep.handle_func["handler_func"] = handler_func_val||null;
}

function attach_input_to_dom_element(dom_parent, input_elem_props) {
  var dom_child = create_element(input_elem_props);
  dom_child.addEventListener(input_elem_props.handle_func["handler"], input_elem_props.handle_func["handler_func"],false);
  dom_parent.appendChild(dom_child);
  
}

var radio_props = new InputElementProps();
  radio_props.attrs["type"] = "radio";

var button_props = new InputElementProps();
  button_props.attrs["type"] = "button";

function create_element(elem_prop) {
  var input_elem = document.createElement("input");
  for (var prop in elem_prop.attrs) {
    if (elem_prop.attrs[prop]) {
      input_elem.setAttribute(prop,elem_prop.attrs[prop]);
    }
  }

  return input_elem;
}

function render_question(q_obj) {
  var display_q = document.createElement("p");
  display_q.className = "p"+question_index.toString();
  var radio_b;

  display_q.innerHTML += q_obj.attrs["question"]+"<br>";
  for (var i=0; i<q_obj.attrs["answer_choices"].length; i++) {
    radio_props.attrs["name"] = "group"+question_index.toString();
    radio_props.attrs["value"] = q_obj.attrs["answer_choices"][i];
    if (i==check_state[question_index]) {
      radio_props.attrs["checked"] = "checked";
    }
    else {
      radio_props.attrs["checked"] = null;
    }
    radio_b = create_element(radio_props);
    
    display_q.appendChild(radio_b);
    display_q.innerHTML += q_obj.attrs["answer_choices"][i]+"<br>";
  }
  set_input_element_props(button_props,"button","back_id",null,"Back",null,"click",back_up);
  attach_input_to_dom_element(display_q, button_props);

  set_input_element_props(button_props,"button","next_id",null,"Next",null,"click",check_answer);
  attach_input_to_dom_element(display_q, button_props);

  set_input_element_props(button_props,"button","login_id",null,"Login",null,"click",login_user);
  attach_input_to_dom_element(display_q, button_props);

  var login_text = document.createElement("input");
  login_text.setAttribute("id","login_id_text");
  login_text.setAttribute("type","text");
  display_q.appendChild(login_text);

  $(display_q).appendTo("body").hide().fadeIn(1000);

  return display_q;
}

function next_question() {
  
  var display_q = render_question(q_obj_arr[question_index]);

  if (!(is_div_tag===undefined)) {
    display_name(localStorage.getItem("name"));
  }
}

function display_name(text_val) {
  var display_q = document.getElementsByClassName("p"+question_index.toString())[0];
  var div_tag = document.createElement("div");
  div_tag.setAttribute("id","div_id");
  div_tag.innerHTML = "<h2>"+"Welcome, "+text_val+"</h2>";
  display_q.appendChild(div_tag);
}
function login_user() {
  is_div_tag = document.getElementById("div_id");
  if (is_div_tag) {
    $(is_div_tag).remove();
  }
  var text_val = document.getElementById("login_id_text").value;
  localStorage.setItem("name",text_val);
  display_name(text_val);
}

function back_up() {
  if (question_index==0) {
    alert("You're already on the first question");
    return; 
  }

  hidep();
  question_index = question_index-1;
  next_question(check_state[question_index]);

}

function compute_score() {
  for (var i = 0; i<check_state.length; i++) {
    if (check_state[i]==q_obj_arr[i].attrs["answer_index"]) {
      score +=1;
    }
  }
  return score;
}
function check_answer() {
  
  if (no_answer()) {
    alert("Please input an answer.");
    return;
  }
    
  var input_buttons = document.getElementsByTagName("input");
  for (var i=0; i<input_buttons.length; i++) {
    if (input_buttons[i].checked) {
      check_state[question_index] = i;
    }
  }
  if (question_index==finish_index) {
    alert("Your score is: "+compute_score()+" out of "+q_obj_arr.length);
    document.getElementById("back_id").disabled = true;
    document.getElementById("next_id").disabled = true;
  }
  else {
    hidep();
    question_index = question_index+1;
    next_question();
  }
}

function no_answer() {
  var input_buttons = document.getElementsByTagName("input");
  var no_answer_flag = true;
  for (var i=0; i<input_buttons.length; i++) {
    if (input_buttons[i].type=="radio"&&input_buttons[i].checked) {
      no_answer_flag = false; 
    }
  } 
  return no_answer_flag;
}

function hidep() {
  $(".p"+(question_index).toString()).fadeOut('slow', function() { $(this).remove(); });
}
