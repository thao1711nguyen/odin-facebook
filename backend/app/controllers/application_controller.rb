class ApplicationController < ActionController::API
    before_action :token_authenticate
    
    private 
    
    def token_authenticate
        warden.authenticate(:jwt_token) 
    end

    
    def current_user
        warden.user
    end

    def user_signed_in?
        !current_user.nil?
    end
    def warden 
        request.env['warden']
    end
end
