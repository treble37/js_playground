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