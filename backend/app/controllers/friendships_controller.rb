class FriendshipsController < ApplicationController
  before_action :set_friendship, only: %i[ update destroy ]

  # GET /friendships
  def index
    @friendships = Friendship.find_by_sql(
      "SELECT u.name AS username,  f.name AS friend_name, friendships.*
        FROM users u
        INNER JOIN friendships 
        ON u.id = friendships.user_id
        INNER JOIN users f 
        ON friendships.friend_id = f.id
        WHERE friendships.user_id = #{current_user.id} 
        OR friendships.friend_id = #{current_user.id}"
    )

    render json: @friendships
  end

 
  def create
    @friendship = current_user.friendships.build(friendship_params)

    if @friendship.save
      fs_data = {
        username: @friendship.user.name, 
        friend_name: @friendship.friend.name, 
        id: @friendship.id, 
        user_id: @friendship.user_id, 
        friend_id: @friendship.friend_id, 
        created_at: @friendship.created_at
      }
      user = User.find(@friendship.user_id)
      friend = User.find(@friendship.friend_id)
      FriendshipsChannel.broadcast_to(user, {action: "new", fs: fs_data})
      FriendshipsChannel.broadcast_to(friend, {action: "new", fs: fs_data})
      render json: fs_data, status: :created
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  
  def destroy
    chat = Chat.find_by(friendship_id: @friendship.id)
    if @friendship.destroy 
      user = User.find(@friendship.user_id)
      friend = User.find(@friendship.friend_id)
      FriendshipsChannel.broadcast_to(user, {action: "delete", fs: @friendship})
      FriendshipsChannel.broadcast_to(friend, {action: "delete", fs: @friendship})
      ChatsChannel.broadcast_to(user, {action: "delete", chat: chat})
      ChatsChannel.broadcast_to(friend, {action: "delete", chat: chat})
      head :ok
    else 
      render json: {error: 'resource not found'}, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friendship_params
      params.require(:friendship).permit(:friend_id)
    end
end
