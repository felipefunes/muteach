class CreateEvaluations < ActiveRecord::Migration[6.1]
  def change
    create_table :evaluations do |t|
      t.belongs_to :session
      t.belongs_to :user
      t.belongs_to :course
      t.string :title
      t.text :description
      t.text :objectives
      t.integer :total_points
      t.integer :approval_percentage
      t.timestamp :delivery_date
      t.timestamp :delivered_at

      t.timestamps
    end
  end
end
