class User < ApplicationRecord
  include Rails.application.routes.url_helpers

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
         
  has_and_belongs_to_many :sessions
  has_many :courses_users
  has_many :courses, through: :courses_users
  has_many :categories
  has_many :notes
  has_many :scores

  has_one_attached :avatar
  
  enum status: { draft: 0, active: 1, expired: 2 }
  enum account_type: { person: 0, organization: 1 }

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
end
