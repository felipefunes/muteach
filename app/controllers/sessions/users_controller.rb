class Sessions::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_session

  # /courses/:course_id/sessions/:id
  def update
    binding.pry
    render json: @course.users, status: :ok
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_session
    @session = Session.find(params[:id])
  end
end