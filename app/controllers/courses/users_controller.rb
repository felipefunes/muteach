class Courses::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course

  def index
    render json: @course.users, status: :ok
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end
end