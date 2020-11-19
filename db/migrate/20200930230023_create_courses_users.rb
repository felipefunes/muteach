class CreateCoursesUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :courses_users do |t|
      t.integer :course_id
      t.integer :user_id
      t.integer :role, default: 0
    end
    add_index :courses_users, [:course_id, :user_id], unique: true
  end
end
