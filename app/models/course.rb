class Course < ApplicationRecord
  belongs_to :category 
  # has_and_belongs_to_many :users
  has_many :courses_users
  has_many :users, through: :courses_users
  has_many :sessions
  has_many :notes
  has_many :evaluations

  has_one_attached :cover_img
  has_many_attached :files

  
  enum lang: { english: 0, active: 1, expired: 2 }
  enum modality: { on_site: 0, remote_sync: 1, remote_async: 2 }

end
