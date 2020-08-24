Rails.application.routes.draw do
  devise_for :users
  root to: "welcome#index"

  scope module: 'users' do
    resources :home, path: '/home', only: [:index]
  end
end
