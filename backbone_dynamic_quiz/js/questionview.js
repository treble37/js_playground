var app = app || {};
app.QuestionView = Backbone.View.extend({
  // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#quiz_question',

    model: app.QuestionModel,

    collection: app.Questions,

    // Our template for the line of statistics at the bottom of the app.
    questionTemplate: _.template( $('#qtemplate').html() ),
    //questionTemplate: _.template( '<div>Hello <%= msg %></div>'),
    // Delegated events for displaying new questions, and clearing existing ones
    events: {
      'click #back_id': 'displayNextQuestion',
      'click #next_id': function(e) {
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
    computeScore: function() {
        _.each(this.collection.models, function(mdl) {
            
        });
    }
});

