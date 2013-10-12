var app = app || {};

var QuestionList = Backbone.Collection.extend({
  initialize: function() {
    this.question_index=0;
  },
  // Reference to this collection's model.
  model: app.QuestionModel,


  // Save all of the questions under the `"questions-backbone"` namespace.
  localStorage: new Backbone.LocalStorage('questions-backbone'),

  //iterate to next question
  nextQuestion: function() {
    this.question_index += 1;
    if (this.question_index>=this.length) {
      return this.length;
    }
    return this.question_index;
  },

  //go back to previous question

  previousQuestion: function() {
    this.question_index -= 1;
    if (this.question_index<0) {
      return 0;
    }
    return this.question_index;
  } 
  
});


