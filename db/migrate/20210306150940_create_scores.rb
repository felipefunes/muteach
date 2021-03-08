class CreateScores < ActiveRecord::Migration[6.1]
  def change
    create_table :scores do |t|
      t.belongs_to :course
      t.belongs_to :evaluation
      t.belongs_to :user
      t.integer :points
      t.timestamps
    end
  end
end
