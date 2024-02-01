class MessagesController < ApplicationController

  
  def create
    @message = Chat.find(params[:chat_id]).messages.build(message_params)
    if @message.save
      @chat = Chat.find(params[:chat_id])
      chat_data = @chat.as_json(include: {
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
      user = User.find(@chat.friendship.user_id)
      friend = User.find(@chat.friendship.friend_id)

      data = {action: "edit", chat: chat_data}
      ChatsChannel.broadcast_to(user, data)
      ChatsChannel.broadcast_to(friend, data)
      head :ok
    else
      render json: {error: @message.errors.full_messages}, status: :unprocessable_entity
    end
  end

  

  private
    
    def message_params
      params.require(:message).permit(:sender_id, :receiver_id, :content)
    end
end
