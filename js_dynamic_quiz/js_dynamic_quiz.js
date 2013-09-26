var check_state = new Array(allQuestions.length);

var finish_index = allQuestions.length-1;
var question_index = 0;
var score = 0;
var is_div_tag = undefined;

window.onload = function() {
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
  if (elem_prop.handle_func["handler"]) {
    input_elem.setAttribute(elem_prop.handle_func["handler"],elem_prop.handle_func["handler_func"]);
  }
  return input_elem;
}
function next_question(checked_index) {
  var display_q = document.createElement("p");
  display_q.className = "p"+question_index.toString();
  var radio_b;

  display_q.innerHTML += allQuestions[question_index]["question"]+"<br>";
  for (var i=0; i<allQuestions[question_index]["choices"].length; i++) {
    radio_props.attrs["name"] = "group"+question_index.toString();
    radio_props.attrs["value"] = allQuestions[question_index]["choices"][i];
    if (i==checked_index) {
      radio_props.attrs["checked"] = "checked";
    }
    radio_b = create_element(radio_props);
    
    display_q.appendChild(radio_b);
    display_q.innerHTML += allQuestions[question_index]["choices"][i]+"<br>";
  }
  
  button_props.attrs["id"] = "back_id";
  button_props.attrs["value"] = "Back";
  button_props.handle_func["handler"] = "onclick";
  button_props.handle_func["handler_func"] = "backup()";
  var back_b = create_element(button_props);
  display_q.appendChild(back_b);

  button_props.attrs["id"] = "next_id";
  button_props.attrs["value"] = "Next";
  button_props.handle_func["handler_func"] = "check_answer()";
  var input_b = create_element(button_props);
  display_q.appendChild(input_b);

  button_props.attrs["id"] = "login_id";
  button_props.attrs["value"] = "Login";
  button_props.handle_func["handler_func"] = "login_user()";
  var login_b = create_element(button_props);
  display_q.appendChild(login_b);

  var login_text = document.createElement("input");
  login_text.setAttribute("id","login_id_text");
  login_text.setAttribute("type","text");
  display_q.appendChild(login_text);

  $(display_q).appendTo("body").hide().fadeIn(1000);

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
    if (check_state[i]==allQuestions[i]["correctAnswer"]) {
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
    alert("Your score is: "+compute_score()+" out of "+allQuestions.length);
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
