class RemoveEtiColumnFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :eti
  end
end
