class CreateCategory < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      add_reference :courses, :category, index: true
      t.string :name
      t.text :description
      t.string :slug

      t.timestamps
    end
  end
end
