var app = app || {};

app.QuestionModel = Backbone.Model.extend({
  initialize: function(attributes) {
    this.question = attributes.question;
    this.answer_choices = attributes.answer_choices;
    this.answer_index = attributes.answer_index;
  },
  // Default todo attribute values
  defaults: {
    question: 'default?',
    answer_choices: new Array("Los Angeles","Chicago","Seattle","Vancouver"),
    answer_index: 1
  }
});

