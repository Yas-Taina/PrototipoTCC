class AllowNullInDataPointsValues < ActiveRecord::Migration[8.0]
  def change
    change_column :data_points, :value_x, :integer, null: true
    change_column :data_points, :value_y, :integer, null: true
  end
end
