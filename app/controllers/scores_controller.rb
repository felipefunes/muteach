class ScoresController < ApplicationController
  before_action :authenticate_user!
  before_action :set_score, only: [:update]
  before_action :set_evaluation, only: [:create]

  def index
    render(
      json: Score.where(course_id: params[:course_id], user_id: params[:user_id]), 
      status: :ok
    )
  end

  def create
    @score = Score.new(score_params.merge(course_id: @evaluation.course.id))
    if @score.save
      render(
        json: @score,
        status: :ok
      )
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  def update
    if @score.update(score_params)
      render(
        json: @score,
        status: :ok
      )
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.require(:scores).permit(
      :points,
      :user_id,
      :evaluation_id
    )
  end

  def set_score
    @score = Score.find(params[:id])
  end

  def set_evaluation
    @evaluation = Evaluation.find(
      params.dig(:scores, :evaluation_id)
    )
  end
end
