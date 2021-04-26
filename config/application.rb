require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Muteach
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    

    # Enable the asset pipeline
     config.assets.enabled = true
 
     # Version of your assets, change this if you want to expire all your assets
     config.assets.version = '1.0'
 
     config.encoding = "utf-8"
  end
end
