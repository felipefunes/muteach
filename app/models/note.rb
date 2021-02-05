class Note < ApplicationRecord
  belongs_to :course
  belongs_to :user
  belongs_to :session
end