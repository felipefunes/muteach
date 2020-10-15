class AddFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :categories, :user, index: true
    add_column :users, :description, :text
    add_column :users, :studies_and_experience, :text
    add_column :users, :birth_date, :timestamp
    add_column :users, :languages, :integer, default: 0
    add_column :users, :account_type, :integer, default: 0
    add_column :users, :website, :string
    add_column :users, :phone, :string
    add_column :users, :nickname, :string
    add_column :users, :name, :string
  end
end
