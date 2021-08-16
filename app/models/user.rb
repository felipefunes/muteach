class User < ApplicationRecord
  include Rails.application.routes.url_helpers

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable
        #  :validatable # Removed temporally to create fake users for prototipe validation
         
  has_and_belongs_to_many :sessions
  has_many :courses_users
  has_many :courses, through: :courses_users
  has_many :categories
  has_many :notes
  has_many :scores

  has_one_attached :avatar
  
  enum status: { draft: 0, active: 1, expired: 2 }
  enum account_type: { person: 0, organization: 1 }

  scope :only_students, -> { includes(:courses_users).where(courses_users: {role: "student", hidden: false}) }

  def email_local_part
    email.split('@').first
  end

  def name_first_letter
    (name || email_local_part).first.upcase
  end

  def avatar_url 
    if avatar.attached?
      rails_blob_path(avatar, disposition: "attachment", only_path: true)
    end
  end

  def attendance_days_by_course(course)
    @attendance_days_by_course ||= 
      course.sessions.joins(:sessions_users).where(sessions_users: {user_id: id}).size
  end
  
  def attendance_percentage_by_course(course)
    (attendance_days_by_course(course) * 100) / course.sessions.size
  end

  def course_role(course)
    courses_users.find_by(course_id: course.id).role
  end

  def has_muteach_email?
    email.include?("_user_") && email.include?("muteach.com")
  end

  def visible_email
    has_muteach_email? ? '' : email
  end
end
