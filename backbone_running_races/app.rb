require 'sinatra'
require 'sqlite3'
require 'json'

# Everything in JSON, it's what Backbone craves.
# Oh, and hook up the DB.
before do
  @db = SQLite3::Database.new "./db/test.db"
  @db.results_as_hash = true
  content_type 'application/json'
end

get '/races' do
  # list all races available
  content_type 'text/html' # this is not JSON.
  @races = @db.execute2( "select * from races" ).drop(1).to_json
  erb :index
end
get '/race/:id' do
  # get a single race
end
post '/race' do
  # create a new race
end
put '/race/:id' do
  # update an existing race
end
delete '/race/:id' do
  # delete an item
end