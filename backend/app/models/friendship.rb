class FsRevUniqValidator < ActiveModel::Validator
    def validate(record)
        dupl = Friendship.where(user_id: record.friend_id, friend_id: record.user_id)
        unless dupl.empty? 
            record.errors.add :user_id, "Record already exist"
        end
    end
end
class Friendship < ApplicationRecord
    validates :user_id, presence: true 
    validates :friend_id, presence: true
    validates :user_id, uniqueness: {scope: :friend_id}

    validates_with FsRevUniqValidator
    
    belongs_to :user 
    belongs_to :friend, class_name: 'User'
    has_one :chat, dependent: :destroy
    

end


