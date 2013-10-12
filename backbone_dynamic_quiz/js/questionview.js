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
      'click #back_id': 'displayPreviousQuestion',
      'click #next_id': 'displayNextQuestion'
    },
    // The QuestionView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Question** and a **QuestionView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      //app.Questions.fetch();
      //http://blog.bigbinary.com/2011/08/18/understanding-bind-and-bindall-in-backbone.html
      this.render();
    },

    render: function(){
        // render the function using substituting the varible 'who' for 'world!'. 
        
        this.$el.append(this.questionTemplate(_.extend({},this.model.toJSON(),{collection_obj: this.collection})));
        //***Try putting your name instead of world.
    },

    displayPreviousQuestion: function() {
        

    },
    displayNextQuestion: function() {

    }
});

