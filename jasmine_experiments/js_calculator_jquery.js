
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

$(document).ready(function() {
    $("#add").click(function( event ) {
       
      n1 = $('input[id=calc1]').val();
      n2 = $('input[id=calc2]').val();
      res = parseInt(n1)+parseInt(n2);
      $('input[id=arithmetic_result]').val(res);
    });
    $("#subtract").click(function( event ) { 
      n1 = $('input[id=calc1]').val();
      n2 = $('input[id=calc2]').val();
      res = parseInt(n1)-parseInt(n2);
      //set
      $('input[id=arithmetic_result]').val(res);
    });
    
    setInterval('display_timer()', 1000 );
});