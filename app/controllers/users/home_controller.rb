class Users::HomeController < ApplicationController
  before_action :authenticate_user!
end