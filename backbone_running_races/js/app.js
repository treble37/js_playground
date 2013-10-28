  // js/app.js
  var app = app || {};
  var r_obj_arr=[new app.RaceModel({race_name:'Race1', race_date: new Date('November 25, 2013'), race_time: '1:00:01', race_distance: '10K'}), new app.RaceModel({race_name:'Race2', race_date: new Date('November 28, 2013'), race_time: '2:00:01', race_distance: '15K'})];

  // Create our global collection of **Races**.
  //app.Races = new RaceList(r_obj_arr);
    // Create our global collection of **Races**.
  app.Races = new RaceList();
  for (var i=0; i<r_obj_arr.length; i++) {
    app.Races.add(r_obj_arr[i]);
    r_obj_arr[i].save();
  }

  

  $(function() {

    // Kick things off by creating the **App**.
    new app.RaceView({collection: app.Races});

  });
