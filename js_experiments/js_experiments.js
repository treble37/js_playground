//setup prototype
function FunctionObjectProps() {
  this.function_call  = null;
}

function msg_alert(msg) {
  alert(msg+" love");
}

function init_msg_alert(fobj,func_name) {
  fobj.function_call = func_name;
}
$( document ).ready(function() {
  var fop = new FunctionObjectProps();
  init_msg_alert(fop,msg_alert);
  fop.function_call("hello");
});
