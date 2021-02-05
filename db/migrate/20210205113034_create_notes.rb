class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.belongs_to :session
      t.belongs_to :user
      t.belongs_to :course
      t.text :text

      t.timestamps
    end
  end
end
