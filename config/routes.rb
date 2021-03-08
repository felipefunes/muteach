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
  resources :scores, only: [:create, :update]

  resources :courses do
    resources :sessions do
      scope module: 'sessions' do
        resources :users do
          resources :notes
        end
      end
    end

    resources :evaluations
    resources :scores, only: [:index], path: 'user/:user_id/scores'
  end
end
