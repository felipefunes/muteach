class Session < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :course
  has_many :notes
  has_many :evaluations

  def index_in_course(course)
    @index_in_collection ||= course.sessions.all.pluck(:id).index(id)
  end
end
