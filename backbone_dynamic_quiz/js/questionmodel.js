var app = app || {};

app.QuestionModel = Backbone.Model.extend({
  initialize: function(attributes) {
    this.question = attributes.question;
    this.answer_choices = attributes.answer_choices;
    this.answer_index = attributes.answer_index;
    this.user_answer_index = attributes.user_answer||-1;
  },
  // Default todo attribute values
  defaults: {
    question: 'default?',
    answer_choices: new Array("Los Angeles","Chicago","Seattle","Vancouver"),
    answer_index: 1,
    user_answer_index: -1
  }
});

