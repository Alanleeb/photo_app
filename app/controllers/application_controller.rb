class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken


  before_action :authenticate_user!, if: proc {
    begin
      request.controller_class.parent == Api
    rescue => NameError
      Rails.logger.error(NameError.message) 
    end
  }
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :password])
  end

  private
    def render_error(model, type = 'array', status = 422)
      case type
        when 'string'
          errors = model.errors.full_messages.join(', ')
        when 'array'
          errors = model.errors.full_messages
        else
          errors = { errors: model.errors }
      end

      render json: errors, status: status
    end


end
