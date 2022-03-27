class Courses::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_user, only: [:show, :destroy, :edit, :update]

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
   
    if User.exists?(email: processed_email)
      user = User.find_by(email: processed_email)
      if user.name.blank?
        user.update_column(:name, user_params[:name])
      end
      if user.courses_users.exists?(course_id: @course.id)
        course_user = user.courses_users.find_by(course_id: @course.id)
        course_user.update_column(:hidden, false)
      else
        user.courses_users.create(course: @course, user: user)
      end
      redirect_to course_path(@course)
    else
      @new_user = User.new(name: params[:name], email: processed_email)
      if @new_user.save
        CoursesUser.create(course: @course, user: @new_user)
        redirect_to course_path(@course)
      else
        render :new
      end
    end
  end

  def edit   
  end

  def update
    if @user.update(name: user_params[:name], email: email_to_update)
      redirect_to course_user_path(@course, @user)
    else
      render :new
    end
  end

  def destroy
    @course.courses_users.find_by(user_id: @user.id).hide!
    redirect_to course_path(@course)
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

  def email_to_update
    return @user.email if user_params[:email].blank?
    return processed_email if user_params[:email].blank? && !@user.has_muteach_email?
    user_params[:email]
  end
end
