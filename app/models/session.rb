class Session < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :course
  has_many :notes
  has_many :evaluations
  
  has_many_attached :files
end
