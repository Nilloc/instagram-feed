require "#{File.dirname(__FILE__)}/spec_helper"

describe 'page' do
  before(:each) do
    @page = Profile.new(:address => 'http://paperclipped.com')
  end

  specify 'should be valid' do
    @page.should be_valid
  end

  specify 'should require a name' do
    @page = Profile.new
    @page.should_not be_valid
    @page.errors[:name].should include("Name must not be blank")
  end
end