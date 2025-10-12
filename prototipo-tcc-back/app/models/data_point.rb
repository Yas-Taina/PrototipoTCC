class DataPoint < ApplicationRecord
  validates :date, presence: true
  validates :valueX, :valueY, presence: true, numericality: { greater_than_or_equal_to: 0 }
end