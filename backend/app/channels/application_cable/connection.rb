module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user 
    def connect 
      self.current_user = find_user
    end
    private 
    def find_user 
      warden.authenticate(:jwt_token)
      if user = warden.user 
        user 
      else 
        reject_unauthorized_connection 
      end
    end
    
    def warden 
      request.env['warden']
    end
  end
end
