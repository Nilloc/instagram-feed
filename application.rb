require 'rubygems'
require 'sinatra'
require './environment'

configure do
  set :views, "#{File.dirname(__FILE__)}/views"
end

error do
  e = request.env['sinatra.error']
  Kernel.puts e.backtrace.join("\n")
  'Application error'
end

enable :sessions

helpers Sinatra::Partials

helpers do
  # helper functions go in here
end

# get '/' do
#   haml :home
# end

get '/' do
  '<a href="/oauth/connect">Connect with Instagram</a>'
end


get '/oauth/connect' do
  redirect Instagram.authorize_url(:redirect_uri => $CALLBACK_URL)
end

get '/oauth/callback' do
  response = Instagram.get_access_token(params[:code], :redirect_uri => $CALLBACK_URL)
  session[:access_token] = response.access_token
  redirect "/feed"
end

get '/feed' do
  client = Instagram.client(:access_token => session[:access_token])
  user = client.user

  cats = Instagram.tag_recent_media('cat')

  html = "<h1>recent cat photos</h1>"
  for media_item in cats
    html << "<img src='#{media_item.images.thumbnail.url}'>"
  end
  html
end