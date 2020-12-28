class Session < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :course
end