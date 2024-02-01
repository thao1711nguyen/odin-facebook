Rails.application.config.middleware.use Warden::Manager do |manager|
    # Set the default strategy
    manager.default_strategies :password, :jwt_token, :e_token
  
    # Configure the failure app (where users are redirected to after a failed authentication)
    manager.failure_app = FailureApp
  
    # Configure other Warden options as needed
    # manager.scope_defaults :user, strategies: [:your_strategy_name], store: false
  end
  Warden::Strategies.add(:password) do
    def valid?
      params["user"]["name"] && params["user"]["password"]
    end
  
    def authenticate!
      user = User.find_by(name: params["user"]["name"])
      if user && user.authenticate(params["user"]["password"])
        success!(user)
      else 
        fail!("incorrect username or password")
        throw(:warden)
      end
    end
  end
  Warden::Strategies.add(:jwt_token) do
    def valid?
      if request.env["HTTP_CONNECTION"] == "Upgrade" && request.env["HTTP_UPGRADE"] == "websocket"
        p "hello, it's valid? in websocket connection"
        !params["token"].nil?
      else 
        p "hello, it's valid? in http connection"
        !request.env["HTTP_AUTHORIZATION"].nil? 
      end
    end
  
    def authenticate!
      token = nil
      if request.env["HTTP_CONNECTION"] == "Upgrade" && request.env["HTTP_UPGRADE"] == "websocket"
        token = params["token"]
      else 
        token = request.env["HTTP_AUTHORIZATION"].split(" ").last 
      end
      begin
        token_decoded = JWT.decode token, Rails.application.credentials.jwt_secret_key, true, {algorithm: "HS256"}
        payload = token_decoded[0]
        user = User.find_by(jti: payload["jti"])
        if user && user.id == payload["sub"] 
            success!(user)
        else 
            p "invalid token because can't find user"
            fail!("invalid token")
            if !(request.env["HTTP_CONNECTION"] == "Upgrade" && request.env["HTTP_UPGRADE"] == "websocket")
              throw(:warden)
            end
        end
      rescue JWT::ExpiredSignature 
        p "invalid token because of expired token"
        fail!("token has expired")
        if !(request.env["HTTP_CONNECTION"] == "Upgrade" && request.env["HTTP_UPGRADE"] == "websocket")
          throw(:warden)
        end
      rescue JWT::DecodeError
        p "invalid token because of decoded error "
        fail!("invalid token")
        if !(request.env["HTTP_CONNECTION"] == "Upgrade" && request.env["HTTP_UPGRADE"] == "websocket")
          throw(:warden)
        end
      end
    end
  end
  
  
  class  FailureApp 
    def self.call(env)
        [401, {"Content-Type" => "text/plain"}, ["error: unauthorized request"]]
    end
  end
  