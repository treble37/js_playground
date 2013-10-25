var app = app || {};
app.RaceView = Backbone.View.extend({
  // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#race-display',

    model: app.RaceModel,

    collection: app.Races,

    // Our template for the line of statistics at the bottom of the app.
    raceTemplate: _.template( $('#racetemplate').html() ),
    addRaceTemplate: _.template( $('#addracetemplate').html() ),
    // Delegated events for displaying new questions, and clearing existing ones
    events: {
      'click #add_id': 'addRace',
      'click #save_id': 'saveChanges'
    },
    // The RaceView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Question** and a **RaceView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.render();
    },

    render: function(){
        //_.extend is an underscore.js method to combine multiple JSON objects into one
        this.$el.append(this.raceTemplate(_.extend({},this.model.toJSON(),{collection_obj: this.collection})));
    },

    addRace: function() {
        this.$el.append(this.addRaceTemplate());
    },

    saveChanges: function() {
        
    }
});

