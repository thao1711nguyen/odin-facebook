class AddIndexToEtiOfUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :eti, unique: true
  end
end
