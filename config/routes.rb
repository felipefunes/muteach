Rails.application.routes.draw do
  devise_for :users
  root to: "welcome#index"

  resources :users, only: [:show, :edit, :update]
  scope module: 'users' do
    resources :home, path: '/home', only: [:index]
    resources :join_courses, only: [:create]
  end

  # scope module: 'courses' do
  #   resources :users, path: '/courses_users/:course_id'
  # end

  resources :categories
  resources :scores, only: [:create, :update]
  scope module: 'courses' do
    resources :public, only: [:index]
  end

  resources :courses do
    scope module: 'courses' do
      resources :users
    end
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

  scope :reveniu do
    get 'success', to: "reveniu#create"
    get 'cancel', to: "reveniu#destroy"
  end
end
