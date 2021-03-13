class Score < ApplicationRecord
  belongs_to :course
  belongs_to :evaluation
  belongs_to :user
end
