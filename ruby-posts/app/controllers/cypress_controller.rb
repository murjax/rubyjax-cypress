class CypressController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!

  def force_login
    user = User.find_by(email: params[:email])
    sign_in(user)
    redirect_to root_path
  end
end
