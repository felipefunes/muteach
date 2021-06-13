class AddHiddenToCoursesUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :courses_users, :hidden, :boolean, default: false
  end
end
