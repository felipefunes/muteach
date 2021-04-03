class ReveniuController < ApplicationController
  before_action :authenticate_user!

  def create
    if params[:subscription_id] && params[:plan]
      # TODO set subscription info to user
    end
  end

  def destroy
  end
end
