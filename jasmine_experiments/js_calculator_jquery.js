
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
    
});