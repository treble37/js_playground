require 'sinatra'
require 'sqlite3'
require 'json'

# Everything in JSON, it's what Backbone craves.
# Oh, and hook up the DB.
before do
  @db = SQLite3::Database.new "./db/races_test.db"
  @db.results_as_hash = true
  content_type 'application/json'
end

get '/races' do
  # list all races available
  content_type 'text/html' # this is not JSON.
  @races = @db.execute2( "select * from races" ).drop(1).to_json
  erb :index
end
# get '/race/:id' do
#   # get a single race
# end
post '/race' do
  # create a new race
  unless (@db.execute2("insert into races (race_name, race_date, race_time, race_distance) values (?, ?, ?, ?, ?)", params.values)) 
    halt 500, {:response => 'fail - could not save'}.to_json
  end
  {:response => 'success'}.to_json
end
put '/race/:id' do
  # update an existing race
end
# delete '/race/:id' do
#   # delete an item
# end