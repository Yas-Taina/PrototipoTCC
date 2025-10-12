class CreateDataPoints < ActiveRecord::Migration[8.0]
  def change
    create_table :data_points do |t|
      t.datetime :date
      t.integer :valueX
      t.integer :valueY

      t.timestamps
    end
  end
end
