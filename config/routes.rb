Rails.application.routes.draw do
  resources :tcos
  root "tcos#index"
  get '/calculate', to: 'tcos#calculate', as: 'calculate_tcos'
  get '/reset', to: 'tcos#reset', as: 'reset_tcos'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
