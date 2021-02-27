class EvaluationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_evaluation, only: [:update]

  def index
    render(
      json: @course.evaluations, 
      status: :ok
    )
  end

  def create
    @evaluation = @course.evaluations.new(evaluation_params)
    if @evaluation.save
      render(
        json: @evaluation,
        status: :ok
      )
    else
      render json: @evaluation.errors, status: :unprocessable_entity
    end
  end

  def update
    if @evaluation.update(evaluation_params)
      render(
        json: @evaluation,
        status: :ok
      )
    else
      ender json: @evaluation.errors, status: :unprocessable_entity
    end
  end

  private

  def evaluation_params
    params.require(:evaluation).permit(
      :title,
      :description,
      :objectives,
      :total_points,
      :approval_percentage,
      :delivery_date,
      :attachment_url
    )
  end

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_evaluation
    @evaluation = Evaluation.find(params[:id])
  end
end
