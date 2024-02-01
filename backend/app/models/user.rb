class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true, uniqueness: true

    has_many :posts, dependent: :destroy
    has_many :sent_requests, foreign_key: 'sender_id', class_name: 'FriendRequest', dependent: :destroy
    has_many :received_requests, foreign_key: 'receiver_id', class_name: 'FriendRequest', dependent: :destroy

    has_many :friendships, dependent: :destroy
    has_many :friends, through: :friendships
    has_many :inverse_friendships, class_name: 'Friendship', foreign_key: :friend_id, dependent: :destroy
    has_many :inverse_friends, through: :inverse_friendships, source: :user
    
    has_many :sent_messages, foreign_key: 'sender_id', class_name: 'Message', dependent: :destroy
    has_many :received_messages, foreign_key: 'receiver_id', class_name: 'Message', dependent: :destroy

    

    def all_friends(eager_load=nil)

        if eager_load.nil?
            friends.nil? && inverse_friends.nil? ? [] : (friends + inverse_friends)
        else 
            friends.nil? && inverse_friends.nil? ? [] : (friends.includes(eager_load) + inverse_friends.includes(eager_load))
        end
    end
    
    def all_chats 
        chats.nil? && inverse_chats.nil? ? [] : (chats + inverse_chats)
    end

    def displayed_posts
        all_posts = posts || []
        all_friends(:posts).each do |friend|
            all_posts = all_posts + (friend.posts || [])
        end
        all_posts.sort {|p1, p2| p2.created_at <=> p1.created_at }
    end
end
