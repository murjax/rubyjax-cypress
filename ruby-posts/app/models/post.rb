class Post < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates :name, presence: true
  validates :title, presence: true
  validates :content, presence: true
end
