class SessionsController < ApplicationController
    skip_before_action :token_authenticate, only: [:create]
    def create 
        warden.authenticate(:password)
        user = warden.user
        token = generate_token(user)
        render json: { token: token}
    end

    def destroy
        current_user.jti = nil
        current_user.save 
        head :no_content
    end        

    private 
    
    def generate_token(user)
        # generate unique jwt id(jti)
        loop do 
            user.jti = SecureRandom.uuid
            break if user.save 
        end
        payload = {
            "sub": user.id,
            "jti": user.jti,
            "exp": Time.now.to_i + 30*60
        }
        JWT.encode payload, Rails.application.credentials.jwt_secret_key!, 'HS256'
    end

end
