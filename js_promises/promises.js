function message(msg="hello") {
  console.log(msg);
}

var deferred = new $.Deferred();
var promise = deferred.promise();

//deferred.state();  // "pending"
//deferred.resolve();
//deferred.state();  // "resolved"
//deferred.reject(); // no effect, because the Promise was already resolved

deferred.resolve();
promise.done(message("done"));
$.when().then(function( x ) {
  console.log( "I fired immediately" );
});
q = [message("help1"), msg];
$.when.apply($, q).then(function() {
  console.log('oh well');
});
