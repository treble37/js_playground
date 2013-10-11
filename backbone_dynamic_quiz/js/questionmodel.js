var app = app || {};

app.QuestionModel = Backbone.Model.extend({
  // Default todo attribute values
  defaults: {
    question: 'default?',
    answer_choices: new Array("Los Angeles","Chicago","Seattle","Vancouver"),
    answer_index: 0
  }
});
