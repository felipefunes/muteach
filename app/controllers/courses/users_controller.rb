class Courses::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_user, only: [:show]

  def index
    @users = @course.users.only_students
    render json: UserBasicSerializer.new(@users).serializable_hash.to_json, status: :ok
  end

  def show
    @notes = @user.notes.where(course_id: @course.id).where.not(text: [nil, ""]).order(:session_id)
    @evaluations = @course.evaluations
    @scores = @user.scores.where(course_id: @course.id)
    @sessions = @course.sessions
  end

  def new
    @new_user = User.new
  end

  def create
    @new_user = User.new(name: params[:name], email: processed_email)
    if @new_user.save
      CoursesUser.create(course: @course, user: @new_user)
      redirect_to course_path(@course)
    else
      render :new
    end
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.fetch(:user, {}).permit(
      :name, 
      :email
    )
  end

  def processed_email
    token = SecureRandom.hex(4)
    fake_email = "#{@course.id}_user_#{token}@muteach.com"
    email = params[:email]
    email.present? ? email : fake_email
  end
end
