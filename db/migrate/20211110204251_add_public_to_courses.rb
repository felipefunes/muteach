class AddPublicToCourses < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :public, :boolean, default: false
  end
end
