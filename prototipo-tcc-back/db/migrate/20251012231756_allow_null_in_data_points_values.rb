class AllowNullInDataPointsValues < ActiveRecord::Migration[8.0]
  def change
    change_column :data_points, :valueX, :integer, null: true
    change_column :data_points, :valueY, :integer, null: true
  end
end
