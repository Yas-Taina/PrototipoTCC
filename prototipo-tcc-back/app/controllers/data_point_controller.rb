class DataPointController < ApplicationController
  before_action :set_point, only: [:show, :update, :destroy]

  def index
    points = DataPoint.all
    render json: points
  end

  def show
    render json: @point
  end

  def create
    point = DataPoint.new(point_params)

    if point.save
      render json: point, status: :created
    else
      render json: point.errors, status: :unprocessable_entity
    end
  end

  def update
    if @point.update(point_params)
      render json: @point, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @point.destroy
    head :no_content
  end

  private

  def set_point
    @point = DataPoint.find(params[:id])
  end

  def point_params
    params.permit(:date, :valueX, :valueY)
  end
end
