class RemoveColumnsFromChats < ActiveRecord::Migration[7.0]
  def change
    remove_column :chats, :user_id 
    remove_column :chats, :friend_id
  end
end
