class CoursesController < ApplicationController
  before_action :set_course, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :check_access, only: [:show]
  before_action :set_write_permission, only: [:edit, :update, :destroy]

  def index
    @courses = current_user.courses.includes(:users, :category)
    respond_to do |format|
      format.html 
      format.json { 
        render(
          json: CourseSerializer.new(@courses).serializable_hash.to_json, 
          status: :ok
        )
      }
    end
  end

  def show
  end

  def new   
    @course = Course.new
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      CoursesUser.create(course: @course, user: current_user, role: :teacher)
      respond_to do |format|
        format.html {
          redirect_to course_path(@course), notice: "The course has been created successfully"
        }
        format.json { 
          render json: CourseSerializer.new(@course).serializable_hash.to_json, status: :ok
        }
      end
      
    else
      format.html {
          render action: :new
        }
        format.json { 
          render json: @course.errors, status: :unprocessable_entity
        }
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
    course_name = @course.name
    @course.destroy
    redirect_to root_path, notice: "The course #{course_name} was deleted"
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(
      :name, 
      :description, 
      :students_quota, 
      :price, :category_id,
      :primary_objectives, 
      :sessions_amount,
    )
  end

  def check_access
    unless @course.user_ids.include?(current_user.id)
      render plain: "404 Not Found", status: 404
    end
  end

  def set_write_permission
    unless current_user.course_role(@course) == "teacher"
      render plain: "404 Not Found", status: 404
    end
  end
end
