var check_state = new Array(allQuestions.length);

var finish_index = allQuestions.length-1;
var question_index = 0;
var score = 0;
var is_div_tag = undefined;

window.onload = function() {
  next_question();
}

function create_element(type,group_num_str,id,value,handler,handler_func) {
  var input_elem = document.createElement("input");
  input_elem.setAttribute("type",type);
  if (type=="radio") {
    input_elem.setAttribute("name","group"+group_num_str);
  }
  input_elem.setAttribute("value",value);
  if (type=="button") {
    input_elem.setAttribute("id",id);
    input_elem.setAttribute("value",value);
    input_elem.setAttribute(handler,handler_func);
  }
  return input_elem;
}
function next_question(checked_index) {
  var display_q = document.createElement("p");
  display_q.className = "p"+question_index.toString();
  var radio_b;
  display_q.innerHTML += allQuestions[question_index]["question"]+"<br>";
  for (var i=0; i<allQuestions[question_index]["choices"].length; i++) {
    radio_b = create_element("radio",question_index.toString(),"",allQuestions[question_index]["choices"][i],"","");
    if (i==checked_index) {
      radio_b.setAttribute("checked","checked");
    }
    display_q.appendChild(radio_b);
    display_q.innerHTML += allQuestions[question_index]["choices"][i]+"<br>";
  }

  var back_b = create_element("button","","back_id","Back","onclick","backup()")
  display_q.appendChild(back_b);

  var input_b = create_element("button","","next_id","Next","onclick","check_answer()")
  display_q.appendChild(input_b);

  var login_b = create_element("button","","login_id","Login","onclick","login_user()")
  display_q.appendChild(login_b);

  var login_text = document.createElement("input");
  login_text.setAttribute("id","login_id_text");
  login_text.setAttribute("type","text");
  display_q.appendChild(login_text);

  //document.getElementsByTagName('body')[0].appendChild(display_q);
  $(display_q).appendTo("body").hide().fadeIn(1000);
 // $(".p"+(question_index).toString()).fadeIn('slow');

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

  //rollback score - DRY this up?
  var input_buttons = document.getElementsByTagName("input");
  for (var i=0; i<input_buttons.length; i++) {
    if (input_buttons[i].type=="radio"&&input_buttons[i].checked && i==allQuestions[question_index]["correctAnswer"]) {
      score = score-1;
    }
  }
}

function check_answer() {
  
  if (no_answer()) {
    alert("Please input an answer.");
    return;
  }
    
  var input_buttons = document.getElementsByTagName("input");
  for (var i=0; i<input_buttons.length; i++) {
    if (input_buttons[i].type=="radio"&&input_buttons[i].checked && i==allQuestions[question_index]["correctAnswer"]) {
      score += 1;
    }
    if (input_buttons[i].checked) {
      check_state[question_index] = i;
    }
  }
  if (question_index==finish_index) {
    alert("Your score is: "+score+" out of "+allQuestions.length);
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
//var body_node = document.getElementsByTagName("body")[0];
  $(".p"+(question_index).toString()).fadeOut('slow', function() { $(this).remove(); });
  // var p_list = document.getElementsByTagName("p");
  // for(var i=p_list.length-1; i>=0; i--){
  //      var p = p_list[i];
  //      if(p.className === "p"+(question_index).toString()){
  //          p.parentNode.removeChild(p);
  //      }
  //  }
}
