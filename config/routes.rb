Rails.application.routes.draw do
  devise_for :users
  root to: "welcome#index"

  resources :users, only: [:show, :edit, :update]
  scope module: 'users' do
    resources :home, path: '/home', only: [:index]
    resources :join_courses, only: [:create]
  end

  scope module: 'courses' do
    resources :users, path: '/courses_users', only: [:index]
  end

  resources :categories
  resources :courses do
    resources :sessions
  end
end
