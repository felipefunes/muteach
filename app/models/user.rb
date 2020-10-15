class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
         
  has_and_belongs_to_many :courses
  has_many :categories
  
  enum status: { draft: 0, active: 1, expired: 2 }
  enum account_type: { person: 0, organization: 1 }
end
