# class ChatRevUniqValidator <ActiveModel::Validator
#     def validate(record)
#         dupl = Chat.where(user_id: record.friend_id, friend_id: record.user_id)
#         unless dupl.empty?
#             record.errors.add :user_id, "record already exist"
#         end
#     end
# end
class Chat < ApplicationRecord

    # validates_with ChatRevUniqValidator
    
    validates :friendship_id, presence: true
    has_many :messages, dependent: :destroy
    belongs_to :friendship
end


