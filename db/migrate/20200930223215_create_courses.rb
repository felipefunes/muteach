class CreateCourses < ActiveRecord::Migration[6.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.text :description
      t.timestamp :starts_at
      t.timestamp :finishes_at
      t.time :from_hour
      t.time :to_hour
      t.integer :students_quota
      t.integer :price
      t.string :website
      t.text :primary_objectives
      t.text :secondary_objectives
      t.integer :modality, default: 0
      t.string :lang, default: 0
      t.integer :sessions_amount
 
      t.timestamps
    end
  end
end
