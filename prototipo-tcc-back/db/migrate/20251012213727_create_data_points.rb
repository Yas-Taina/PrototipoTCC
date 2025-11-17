class CreateDataPoints < ActiveRecord::Migration[8.0]
  def change
    create_table :data_points do |t|
      t.datetime :date
      t.integer :value_x
      t.integer :value_y

      t.timestamps
    end
  end
end
