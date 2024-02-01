class FriendRequestsController < ApplicationController
  before_action :set_friend_request, only: %i[ destroy ]

  # GET /friend_requests
  def index
    sent_requests = FriendRequest.includes(:sender, :receiver).where(sender_id: current_user.id).order(created_at: :desc)
    sent_requests = sent_requests.map do |req| 
      req.as_json(include: {
                    sender: {only: [:name]}, 
                    receiver: {only: [:name]}
      })
      end
    received_requests = FriendRequest.includes(:sender, :receiver).where(receiver_id: current_user.id).order(created_at: :desc)
    received_requests = received_requests.map do |req|
      req.as_json(include: {
        sender: {only: [:name]}, 
        receiver: {only: [:name]}
      })
    end
    
    @friend_requests = {
      sent_requests: sent_requests, 
      received_requests: received_requests
    }
    render json: @friend_requests
  end

  
  def create
    @friend_request = FriendRequest.new(friend_request_params)

    if @friend_request.save
      req_data = @friend_request.as_json(include: {
        sender: {only: [:name]}, 
        receiver: {only: [:name]}
      })
      @sender = User.find(@friend_request.sender_id)
      @receiver = User.find(@friend_request.receiver_id)
      RequestsChannel.broadcast_to(@sender, {action: "new", req: req_data, name: "sent"})
      RequestsChannel.broadcast_to(@receiver, {action: "new", req: req_data, name: "received"})
      render json: req_data, status: :created
    else
      render json: @friend_request.errors, status: :unprocessable_entity
    end
  end

  
  def destroy
    if @friend_request.destroy
      @sender = User.find(@friend_request.sender_id)
      @receiver = User.find(@friend_request.receiver_id)
      RequestsChannel.broadcast_to(@sender, {action: "delete", req: @friend_request, name: "sent"})
      RequestsChannel.broadcast_to(@receiver, {action: "delete", req: @friend_request, name: "received"})
      head :ok
    else 
      render json: {error: 'resource not found'}, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend_request
      @friend_request = FriendRequest.find_by(id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def friend_request_params
      params.require(:friend_request).permit(:sender_id, :receiver_id)
    end
end
