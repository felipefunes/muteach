class Courses::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_user, only: [:show]

  def index
    render json: @course.users, status: :ok
  end

  def show
    @notes = @user.notes.where(course_id: @course.id).where.not(text: [nil, ""])
    @evaluations = @course.evaluations
    @scores = @user.scores.where(course_id: @course.id)
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_user
    @user = User.find(params[:id])
  end
end
