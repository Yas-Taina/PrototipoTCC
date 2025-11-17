class DataPoint < ApplicationRecord
  validates :date, presence: true
  validates :value_x, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :value_y, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end