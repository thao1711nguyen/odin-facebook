class AddReferenceToChats < ActiveRecord::Migration[7.0]
  def change
    add_reference :chats, :friendship, foreign_key: true
  end
end
