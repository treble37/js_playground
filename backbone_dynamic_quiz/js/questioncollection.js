var app = app || {};

var QuestionList = Backbone.Collection.extend({
  initialize: function() {
    this.question_index=0;
    this.user_score = 0;
  },
  // Reference to this collection's model.
  model: app.QuestionModel,


  // Save all of the questions under the `"questions-backbone"` namespace.
  localStorage: new Backbone.LocalStorage('questions-backbone'),

  //iterate to next question or go back
  nextQuestion: function(n) {
    this.question_index += n;
    switch(n) {
      case -1:
        this.question_index = (this.question_index<0) ? 0 : this.question_index;
        break;
      default:
        break;
    } 
    return this.question_index;
  },
  
});


