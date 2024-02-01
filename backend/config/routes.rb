Rails.application.routes.draw do
  
  resources :friendships, only: [:index, :create, :destroy]
  resources :friend_requests, only: [:index, :create, :destroy]
  resources :posts
  resource :user, only: [:show]
  resources :users
  resources :chats do 
    resources :messages, only: [:create]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/ephemeral_token', to: 'tokens#show'
  delete '/ephemeral_token', to: 'tokens#destroy'
end
