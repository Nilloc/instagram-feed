require 'rubygems'
require 'haml'
require 'yaml'
require 'ostruct'
require 'instagram'

require 'sinatra' unless defined?(Sinatra)

configure do
  SiteConfig = OpenStruct.new(
                   :title => 'I Call BS',
                   :author => 'Collin Reisdorf',
                   :url_base => 'http://icallbs.heroku.com/'
                 )
  
  $INSTAGRAM_CLIENT_ID = '4e7ca18610164d009cd5f3cd95608859'
  $INSTAGRAM_CLIENT_SECRET = 'a52b8ed27e4e4d21b001f8a525f69620'
  
  
  $CALLBACK_URL = "http://localhost:9393/oauth/callback"
  
  Instagram.configure do |config|
    config.client_id = $INSTAGRAM_CLIENT_ID
    config.client_secret = $INSTAGRAM_CLIENT_SECRET
  end
  
  
  # use OmniAuth::Builder do
  #   provider :twitter, $TWITTER_CONSUMER_KEY, $TWITTER_CONSUMER_SECRET
  #   provider :google,  $GOOGLE_CLIENT_ID,     $GOOGLE_CLIENT_SECRET
  # end

  # load models & helpers
  $LOAD_PATH.unshift("#{File.dirname(__FILE__)}/lib")
  Dir.glob("#{File.dirname(__FILE__)}/lib/*.rb") { |lib| require File.basename(lib, '.*') }
  
end
