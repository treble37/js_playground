// Race Model
// ----------
// Our basic **Race** model with default attributes
var app = app || {};
app.RaceModel = Backbone.Model.extend({
  initialize: function(attributes) {
    this.race_name = attributes.race_name;
    this.race_date = attributes.race_date;
    this.race_time = attributes.race_time;
    this.race_distance = attributes.race_distance;
  },
  // Default attributes ensure that each todo created has `title` and `completed` keys.
  defaults: {
    race_name: 'default race name',
    race_date: new Date("October 25, 2013"),
    race_time: '1:06:25',
    race_distance: '5K'
  }
});