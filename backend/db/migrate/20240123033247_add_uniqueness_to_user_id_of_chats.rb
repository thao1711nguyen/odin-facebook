class AddUniquenessToUserIdOfChats < ActiveRecord::Migration[7.0]
  def change
    add_index :chats, [:user_id, :friend_id], unique: true
  end
end
