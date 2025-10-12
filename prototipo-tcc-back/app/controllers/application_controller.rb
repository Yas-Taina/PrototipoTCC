class ApplicationController < ActionController::API
  def test
    render json: { message: "Teste" }
  end
end
