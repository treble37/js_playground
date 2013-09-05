var allQuestions = [{question: "New Orleans is considered the birthplace of jazz. However, most of the great recordings of the 1920s were made in a northern city which gives its name to the two dominant jazz genres of that decade. What city was the 1920s home base of Louisiana-born King Oliver, Louis Armstrong and Jelly Roll Morton, as well as Iowa-born Bix Beiderbecke and the young Benny Goodman?", choices: ["Los Angeles", "Chicago", "Seattle", "Vancouver"], correctAnswer:1},
  {question: "The blues has always been a major component of all jazz styles. What style of blues from the 1920s featured great divas like Bessie Smith and Ma Rainy, as well as contributions by great jazz figures like Louis Armstrong and Fletcher Henderson??", choices: ["Country Blues", "Classic Blues", "Delta Blues", "Texas Blues"], correctAnswer:1},
  {question: "The commercial heyday of jazz music came in the 1930s and '40s, when jazz forms were the dominant music for dances and social events. Which of these terms is commonly applied to the mainstream jazz of this era??", choices: ["Bebop", "Cool Jazz", "Dixieland", "Swing"], correctAnswer:3}
];
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
  back_b.setAttribute("type","button");
  back_b.setAttribute("value","Back");
  back_b.setAttribute("onclick","back_up()");
  display_q.appendChild(back_b);

  var input_b = document.createElement("input");
  input_b.setAttribute("type","button");
  input_b.setAttribute("value","Next");
  input_b.setAttribute("onclick","check_answer()");
  display_q.appendChild(input_b);

  document.getElementsByTagName('body')[0].appendChild(display_q);
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
  var p_list = document.getElementsByTagName("p");
  for(var i=p_list.length-1; i>=0; i--){
       var p = p_list[i];
       if(p.className === "p"+(question_index).toString()){
           p.parentNode.removeChild(p);
       }
   }
}
