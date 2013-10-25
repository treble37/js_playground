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
      'click #back_id': 'displayNextQuestion',
      'click #next_id': function(e) {
        this.trackScore();  //must track score before displaying next question
        this.displayNextQuestion(e);
        this.computeScore(); 
      }
    },
    // The QuestionView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Question** and a **QuestionView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      //http://blog.bigbinary.com/2011/08/18/understanding-bind-and-bindall-in-backbone.html
      this.render();
    },

    render: function(){
        //_.extend is an underscore.js method to combine multiple JSON objects into one
        this.$el.append(this.questionTemplate(_.extend({},this.model.toJSON(),{collection_obj: this.collection})));
    },
    displayNextQuestion: function(evt) {
        $(".p"+(this.collection.question_index).toString()).fadeOut('slow', function() { $(this).remove(); });
        if (evt.target.id=="back_id") {
            this.collection.nextQuestion(-1);
        }
        else {
            this.collection.nextQuestion(1);
        }
        if (this.collection.question_index<this.collection.length) {
            this.model = this.collection.at(this.collection.question_index);
        }
        this.render();
    },
    trackScore: function() {
        var selected_btn = $("input[type='radio']:checked");
        this.model.user_answer_index = -1;

        if (selected_btn) {
            if (this.model.answer_choices[this.model.answer_index]==selected_btn.val()) {
                this.model.user_answer_index = this.model.answer_index;
            }
        }
    },
    computeScore: function() { 
    
        var collection_obj = this.collection;
        if (this.collection.question_index==this.collection.length) {
            _.each(this.collection.models, function(mdl) {
                if (mdl.user_answer_index == mdl.answer_index) {
                    collection_obj.user_score += 1;
                }
            }); //end _.each
            alert("Your final score is: "+this.collection.user_score);
        }
    }
});

