class CreateJoinTableSessionUser < ActiveRecord::Migration[6.0]
  def change
    create_join_table :sessions, :users do |t|
      t.index [:session_id, :user_id]
      t.index [:user_id, :session_id]
    end
  end
end
