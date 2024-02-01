class AddUniqueIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :friend_requests, [:sender_id, :receiver_id], unique: true
    add_index :friendships, [:user_id, :friend_id], unique: true
  end
end
