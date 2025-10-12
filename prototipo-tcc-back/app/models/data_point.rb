class DataPoint < ApplicationRecord
  validates :date, presence: true
  validates :valueX, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :valueY, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end