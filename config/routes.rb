Rails.application.routes.draw do
  devise_for :users
  root to: "welcome#index"

  resources :users, only: [:show, :edit, :update]
  scope module: 'users' do
    resources :home, path: '/home', only: [:index]
  end

  resources :categories
  resources :courses
end
