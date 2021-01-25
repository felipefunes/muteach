class SessionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_session, only: [:update]

  def index
    render(
      json: SessionSerializer.new(@course.sessions).serializable_hash.to_json, 
      status: :ok
    )
  end

  def create
    @session = @course.sessions.new
    if @session.save
      render(
        json: SessionSerializer.new(@session).serializable_hash.to_json,
        status: :ok
      )
    else
      render json: @session.errors, status: :unprocessable_entity
    end
  end

  def update
    if @session.update(session_params)
      if params[:session][:user_ids].present?
        @session.update_attribute(:user_ids, params[:session][:user_ids])
      end
      render(
        json: SessionSerializer.new(@session).serializable_hash.to_json,
        status: :ok
      )
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
      :user_ids
    )
  end

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_session
    @session = Session.find(params[:id])
  end
end