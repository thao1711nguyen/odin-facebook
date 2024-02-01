class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    all_fs = Friendship.where(user_id: current_user.id).or(Friendship.where(friend_id: current_user.id))
    authors = all_fs.map do |fs| 
      author_id = current_user.id == fs.user_id ? fs.friend_id : fs.user_id
      User.find(author_id)
    end
    authors = authors << current_user
    @posts = Post.includes(:user).where(user: authors).order(created_at: :desc)
    @posts = @posts.map do |post|
      post.as_json(include: {user: {only: [:name]}})
    end
    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post.as_json(include: {user: {only: [:name]}})
  end

  # POST /posts
  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      render json: @post.as_json(include: {user: {only: [:name]}}), status: :created
    else
      render json: {error: @post.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post.as_json(include: {user: {only: [:name]}})
    else
      render json: {error: @post.errors}, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    if @post.destroy
      head :ok
    else 
      render json: {error: 'resource not found'}, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      # @post = Post.find(params[:id])
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:content)
    end

    
end
