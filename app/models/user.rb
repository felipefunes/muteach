class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
         
  has_and_belongs_to_many :sessions
  has_many :courses_users
  has_many :courses, through: :courses_users
  has_many :categories
  has_many :notes

  has_one_attached :avatar
  
  enum status: { draft: 0, active: 1, expired: 2 }
  enum account_type: { person: 0, organization: 1 }

  def email_local_part
    email.split('@').first
  end

  def name_first_letter
    (name || email_local_part).first.upcase
  end

  # def avatar_url(size: [100, 100] )
  #   if avatar.attached?
  #     variant = avatar.variant(resize_to_limit: size)
  #     Rails.application.routes.url_helpers.rails_representation_url(variant)
  #   end
  # end
end
