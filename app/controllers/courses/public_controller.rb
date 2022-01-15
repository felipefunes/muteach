class Courses::PublicController < ApplicationController
  before_action :authenticate_user!

  def index
     @courses = Course.includes(:courses_users, :users, :category)
                      .where
                      .not(courses_users: { user_id: [current_user.id] })
                      .where(public: true)
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
end