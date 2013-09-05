var check_state = new Array(allQuestions.length);

var finish_index = allQuestions.length-1;
var question_index = 0;
var score = 0;

window.onload = function() {
  next_question();
}
function next_question(checked_index) {
  var display_q = document.createElement("p");
  display_q.className = "p"+question_index.toString();
  var radio_b;
  display_q.innerHTML += allQuestions[question_index]["question"]+"<br>";
  for (var i=0; i<allQuestions[question_index]["choices"].length; i++) {
    radio_b = document.createElement("input");
    radio_b.setAttribute("type","radio");
    radio_b.setAttribute("name","group"+question_index.toString());
    radio_b.setAttribute("value",allQuestions[question_index]["choices"][i]);
    if (i==checked_index) {
      radio_b.setAttribute("checked","checked");
    }
    display_q.appendChild(radio_b);
    display_q.innerHTML += allQuestions[question_index]["choices"][i]+"<br>";
  }

  var back_b = document.createElement("input");
  back_b.setAttribute("id","back_id");
  back_b.setAttribute("type","button");
  back_b.setAttribute("value","Back");
  back_b.setAttribute("onclick","back_up()");
  display_q.appendChild(back_b);

  var input_b = document.createElement("input");
  input_b.setAttribute("id","next_id");
  input_b.setAttribute("type","button");
  input_b.setAttribute("value","Next");
  input_b.setAttribute("onclick","check_answer()");
  display_q.appendChild(input_b);

  //document.getElementsByTagName('body')[0].appendChild(display_q);
  $(display_q).appendTo("body").hide().fadeIn(1000);
 // $(".p"+(question_index).toString()).fadeIn('slow');
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
