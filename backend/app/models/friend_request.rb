class FrReqRevUniqValidator < ActiveModel::Validator 
    def validate(record)
        dupl = FriendRequest.where(sender_id: record.receiver_id, receiver_id: record.sender_id)
        unless dupl.empty?
            record.errors.add :sender_id, "record already exist"
        end
    end
end
class FriendRequest < ApplicationRecord
    include ActiveModel::Validations
    validates :sender_id, uniqueness: {scope: :receiver_id}
    validates :sender_id, presence: true 
    validates :receiver_id, presence: true

    validates_with FrReqRevUniqValidator

    belongs_to :sender, class_name: 'User'
    belongs_to :receiver, class_name: 'User'
    
end

