class AddReferenceToFriendRequest < ActiveRecord::Migration[7.0]
  def change
    add_reference :friend_requests, :sender, foreign_key: { to_table: :users}
    add_reference :friend_requests, :receiver, foreign_key: {to_table: :users}
  end
end
