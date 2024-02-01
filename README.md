This project is part of the course "React" by "The Odin Project". 
You can check it out at the link: "https://www.theodinproject.com/lessons/react-new-messaging-app" 

This is a very simple social network app. Users begin by creating an account using a chosen username and password. Once registered, they can create posts and send friend requests to others. Upon becoming friends, users can view each other's posts and communicate via messages.

Authentication is handled using Warden and JWT. Two Warden strategies are defined: password and JWT. The password strategy manages user logins, while the JWT strategy authenticates sessions, eliminating the need for repeated logins with each server request. Upon successful login, a new JWT is generated and sent back to the user. Users then include the JWT in the Authorization header of subsequent requests.

On the server side, each user is associated with one JWT by a unique identifier (jti). The jti value is also embedded within the JWT payload. When a user logs out, the corresponding jti value in the user table is set to null, thereby invalidate the token.

Additionally, the app utilizes WebSockets for real-time features, leveraging Rails' built-in ActionCable. By integrating the ActionCable package on the client side, users can send messages that are instantly received by their friends without the need to refresh the page.

Below is the list of core technology I use in this app. For more detail, you can check out the config directory, Gemfile and package.json files

+ For my backend:
    - Framework: Ruby on rails
    - Authentication: json web token (JWT) with JWT gem and warden gem
    - Database: PostgreSQL
    - Handling cross-origin resource sharing: gem rack-cors
    - Websocket: actioncable (Rails built in)
+ For my frontend: 
    - Library: React
    - Tool: Vite 
    - Routing: react-router-dom package
    - Websocket: actioncable-websocket package
    - Styling: css module

