class Sessions::NotesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_session
  before_action :set_user
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    @notes = Note.where(
      course_id: @course.id, 
      session_id: @session.id, 
      user_id: @user.id
    )
    render json: @notes, status: :ok
  end

  def create
    @note = Note.new(
      course_id: @course.id, 
      session_id: @session.id, 
      user_id: @user.id
    )
    if @note.save
      render(
        json: @note,
        status: :ok
      )
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def update
    @note.update(notes_params)
    if @note.save
      render(
        json: @note,
        status: :ok
      )
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def destroy
    note_id = @note.id
    @note.destroy
    if @note.destroy
      render(
        json: { id: note_id },
        status: :ok
      )
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  private

  def notes_params
    params.require(:notes).permit(:text)
  end

  def set_course
    @course ||= Course.find params[:course_id]
  end

  def set_session
    @session ||= Session.find params[:session_id]
  end

  def set_user
    @user ||= User.find params[:user_id]
  end

  def set_note
    @note = Note.find params[:id]
  end
end
