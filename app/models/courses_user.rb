class CoursesUser < ApplicationRecord
  belongs_to :course 
  belongs_to :user

  enum role: { student: 0, teacher: 1 }

end
