class SessionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_session, only: [:update]

  def index
    render json: @course.sessions, status: :ok
  end

  def create
    @session = @course.sessions.new
    if @session.save
      render json: @session, status: :ok
    else
      render json: @session.errors, status: :unprocessable_entity
    end
  end

  def update
    if @session.update(session_params)
      render json: @session, status: :ok
    else
      ender json: @session.errors, status: :unprocessable_entity
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

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_session
    @session = Session.find(params[:id])
  end
end
