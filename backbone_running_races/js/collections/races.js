 var app = app || {};

  // Race Collection
  // ---------------

  // The collection of Races is backed by *localStorage* instead of a remote
  // server.
  var RaceList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: app.RaceModel,

    // Save all of the race items under the `"races-backbone"` namespace.
    localStorage: new Backbone.LocalStorage('races-backbone'),

  });

  // Create our global collection of **Races**.
  app.Races = new RaceList();