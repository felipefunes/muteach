class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.belongs_to :course
      t.text :objectives
      t.text :description
      t.timestamp :date
      t.time :from_hour
      t.time :to_hour

      t.timestamps
    end
  end
end
