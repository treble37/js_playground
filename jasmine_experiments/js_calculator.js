function arithmetic(clicked_button_id) {
  var n1=document.getElementById('calc1').value;
  var n2=document.getElementById('calc2').value;
  var res = document.getElementById('arithmetic_result');
  if (clicked_button_id=="add") {
    res.value = parseInt(n1)+parseInt(n2);
  }
  else if(clicked_button_id=="subtract") {
    res.value = parseInt(n1)-parseInt(n2);
  }
}

function display_timer() {
  var ctime = new Date();
  var chours = ctime.getHours();
  var cmins = ctime.getMinutes();
  var csecs = ctime.getSeconds();

  cmins = (cmins<10 ? "0" : "")+cmins;
  csecs = (csecs<10 ? "0" : "")+csecs;

  var am_pm = chours<12 ? "am" : "pm"
  chours = (chours > 12) ? chours - 12 : chours;
  chours = (chours==0) ? 12 : chours;

  var clock_time = chours + ":" + cmins + ":" + csecs + " " + am_pm;

  document.getElementById("clock").innerHTML = clock_time;
}