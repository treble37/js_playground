$(function(){

    // Create a model for the tech skills
    var Skill = Backbone.Model.extend({

        // Will contain three attributes.
        // These are their default values

        defaults:{
            skill: 'Ruby',
            proficiency: 100
        },    
    });

    // Create a collection of Skills
    var SkillList = Backbone.Collection.extend({

        // Will hold objects of the Skill model
        model: Skill,

    });

    // Prefill the collection with a number of skills.
    var skills = new SkillList([
        new Skill({ skill: 'Ruby', proficiency: 80}),
        new Skill({ skill: 'Javascript', proficiency: 80}),
        new Skill({ skill: 'C++', proficiency: 80}),
        // Add more here
    ]);

    // This view turns a Service model into HTML. Will create LI elements.
    var SkillView = Backbone.View.extend({
        tagName: 'li',

        initialize: function(){

            // Set up event listeners. The change backbone event
            // is raised when a property changes (like the checked field)

            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){

            // Create the HTML

            //this.$el.html('<input type="text" value=' + this.model.get('proficiency') + ' ' + name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
            $(this.el).addClass('list-group-item').html('li');
            this.$el.html('<input class="input-sm" type="text" value="' + this.model.get('proficiency') +'" ' + 'name="' + this.model.get('skill') + '" /> ' + '<span>' + this.model.get('skill') + '</span>' + '<span> Proficiency: ' + this.model.get('proficiency') + '%</span>');
            //this.$('input').prop('checked', this.model.get('checked'));

            // Returning the object is a good practice
            // that makes chaining possible
            return this;
        },

    });

    // The main view of the application
    var App = Backbone.View.extend({

        // Base the view on an existing element
        el: $('#skill_view'),

        initialize: function(){

            // Cache these selectors
            this.list = $('#skill_list');

            // Listen for the change event on the collection.
            // This is equivalent to listening on every one of the 
            // service objects in the collection.
            this.listenTo(skills, 'change', this.render);

            // Create views for every one of the services in the
            // collection and add them to the page

            skills.each(function(skill){

                var view = new SkillView({ model: skill });
                this.list.append(view.render().el);

            }, this); // "this" is the context in the callback
        },

        render: function(){

            // Calculate the total order amount by agregating
            // the prices of only the checked elements

            // var total = 0;

            // _.each(services.getChecked(), function(elem){
            //     total += elem.get('price');
            // });

            // // Update the total price
            // this.total.text('$'+total);

            return this;
        }
    });

    new App();

});