Tenis::Application.routes.draw do


  resources :notices
  resources :players

  get "home/index"

  resources :grandslams do
    resources :editions do

    end
  end



  root :to => 'static_pages#home'

  match '/', :to => 'static_pages#home'
  match '/help', :to => 'static_pages#help'
  match '/about', :to => 'static_pages#about'
end
