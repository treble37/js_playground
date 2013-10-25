  // js/app.js
  var app = app || {};
  var r_obj_arr=[new app.RaceModel({race_name:'Race1', race_date: new Date('November 25, 2013'), race_time: '1:00:01', race_distance: '10K'}), new app.RaceModel({race_name:'Race2', race_date: new Date('November 28, 2013'), race_time: '2:00:01', race_distance: '15K'})];

  // Create our global collection of **Races**.
  app.Races = new RaceList(r_obj_arr);
  $(function() {

    // Kick things off by creating the **App**.
    new app.RaceView({model: r_obj_arr[0], collection: app.Races});

  });
