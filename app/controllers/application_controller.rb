class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def authenticate_sysadmin!
    unless current_user&.email == "info@muteach.com"
      render plain: "404 Not Found", status: 404
    end
  end
end
