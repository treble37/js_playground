var app = app || {};
app.RaceView = Backbone.View.extend({
  // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#race-display',

    model: app.RaceModel,

    collection: app.Races,

    // Our template for the line of statistics at the bottom of the app.
    raceTemplate: _.template( $('#racetemplate').html() ),
    // Delegated events for displaying new questions, and clearing existing ones
    events: {
      'click #add_id': 'addRace'
    },
    // The RaceView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Question** and a **RaceView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        // http://stackoverflow.com/questions/6079055/why-do-bindall-in-backbone-js-views
        _.bindAll(this, 'render','addRace');
        this.collection.bind('add', this.render);
        this.collection.bind('reset', this.render);
        this.render();
    },

    render: function(){
        //_.extend is an underscore.js method to combine multiple JSON objects into one
        this.$el.html(this.raceTemplate(_.extend({},this.model.toJSON(),{collection_obj: this.collection})));
        return this;
    },

    addRace: function() {
        var racename = this.$('#race-name-'+this.collection.length).val();
        var racedate = new Date(this.$('#race-date-'+this.collection.length).val());
        var racetime = this.$('#race-time-'+this.collection.length).val();
        var racemodel = new app.RaceModel({race_name: racename, race_date: racedate, race_time: racetime});
        this.collection.add(racemodel);
        racemodel.save(); 
        this.collection.fetch();  //refresh from localStorage
        alert("Running data added to collection...");
    }
});

