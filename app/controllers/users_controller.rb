class UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    if current_user.update(user_params)
      redirect_to home_index_path, notice: 'Profile was successfully updated.'
    else
      render action: :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :name, 
      :description,
      :studies_and_experience,
      :birth_date,
      :phone,
      :languages,
      :website,
      :nickname,
      :avatar
    )
  end
end
