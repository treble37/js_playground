  // js/app.js

  var app = app || {};
  var q_obj_arr=[new app.QuestionModel({question: "New Orleans is considered the birthplace of jazz. However, most of the great recordings of the 1920s were made in a northern city which gives its name to the two dominant jazz genres of that decade. What city was the 1920s home base of Louisiana-born King Oliver, Louis Armstrong and Jelly Roll Morton, as well as Iowa-born Bix Beiderbecke and the young Benny Goodman?", answer_choices: ["Los Angeles","Chicago","Seattle","Vancouver"], answer_index: 1}), new app.QuestionModel({question:"The blues has always been a major component of all jazz styles. What style of blues from the 1920s featured great divas like Bessie Smith and Ma Rainy, as well as contributions by great jazz figures like Louis Armstrong and Fletcher Henderson??",answer_choices:["Country Blues","Classic Blues","Delta Blues","Texas Blues"],answer_index:1})];
  // Create our global collection of **Questions**.
  app.Questions = new QuestionList(q_obj_arr);
  $(function() {

    // Kick things off by creating the **App**.
    new app.QuestionView({model: q_obj_arr[0], collection: app.Questions});

  });

 