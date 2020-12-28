class Users::JoinCoursesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course

  def create
    current_user.courses << @course
    render json: { course: { id: @course.id, user_ids: @course.user_ids } }, status: :ok 
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end
end
