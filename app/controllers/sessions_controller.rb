class SessionsController < ApplicationController
  before_action :authenticate_user!

  def create
    @session = Course.new(session_params)
    if @session.save
      render json: @session, status: :ok
    else
      render json: @session.errors, status: :unprocessable_entity
    end
  end

  private

  def session_params
    params.require(:session).permit(
      :objectives, 
      :description, 
      :date, 
      :from_hour,
      :to_hour, 
    )
  end
end