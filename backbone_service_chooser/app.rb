require 'sinatra'

#reference: http://tutorialzine.com/2013/04/services-chooser-backbone-js/

get '/' do
  erb :index
end

post '/bjs' do
  params.keys.join(", ")
end
