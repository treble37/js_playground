// Race Model
// ----------
// Our basic **Race** model with default attributes
var app = app || {};
app.RaceModel = Backbone.Model.extend({

  // Default attributes ensure that each todo created has `title` and `completed` keys.
  defaults: {
    race_name: 'default race name',
    race_date: new Date("October 25, 2013"),
    race_time: '1:06:25'
  }
});