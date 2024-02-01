class ChatsController < ApplicationController
  before_action :set_chat, only: %i[ destroy ]


  def index
    all_fs = Friendship.where(user: current_user).or(Friendship.where(friend: current_user))
    @chats = Chat.includes(messages: [:sender, :receiver], friendship: [:user, :friend])
                  .where(friendship: all_fs)
                  .order(created_at: :desc)
    @chats = @chats.map do |chat| 
      chat.as_json(include: {
        messages: {
          include: {
            sender: {only: [:name]}, 
            receiver: {only: [:name]}
          }
        }, 
        friendship: {
          include: {
            user: {only: [:name]}, 
            friend: {only: [:name]}
          }
        }
      })
    end
    render json: @chats
  end

  
  def create
    fs = Friendship.where(user_id: current_user.id, friend_id: params[:chat][:friend_id])
        .or(Friendship.where(user_id: params[:chat][:friend_id], friend_id: current_user.id))
        .take
    @chat = fs.build_chat
    if @chat.save
      chat_data = @chat.as_json(include: {friendship: {include: {user: {only: [:name]}, 
                                                                friend: {only: [:name]}
                                                                }
                                                      }
                                          }
                                )
      data = {
        action: "new", 
        chat: chat_data
      }

      user = User.find(fs.user_id)
      friend = User.find(fs.friend_id)

      ChatsChannel.broadcast_to(user, data) 
      ChatsChannel.broadcast_to(friend, data) 
      render json: @chat
    else
      render json: {error: @chat.errors.full_messages }, status: :unprocessable_entity
    end
  end

  
  def destroy
    if @chat.destroy
      data = {action: "delete", chat: @chat}

      user = User.find(@chat.friendship.user_id)
      friend = User.find(@chat.friendship.friend_id)

      ChatsChannel.broadcast_to(user, data) 
      ChatsChannel.broadcast_to(friend, data) 
      head :ok
    else 
      render json: {error: "Resource not found"}, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat
      @chat = Chat.find(params[:id])
    end

    
end
