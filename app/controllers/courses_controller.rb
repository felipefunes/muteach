class CoursesController < ApplicationController
  before_action :set_course, only: [:show, :edit, :update]

  def index
    @courses = Course.all 
    respond_to do |format|
      format.html 
      format.json { render json: @courses, status: :ok }
    end
  end

  def show
  end

  def new
    @course = Course.new
  end

  def create

    @course = Course.new(course_params.merge(user_ids: [current_user.id]))
    if @course.save
      redirect_to courses_path, notice: 'Course was successfully created.'
    else
      render action: :new
    end
  end

  def edit
  end

  def update
    if @course.update(course_params)
      redirect_to courses_path, notice: 'Course was successfully updated.'
    else
      render action: :edit
    end
  end

  def destroy
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(:name, :description, :students_quota, :price, :category_id)
  end
end