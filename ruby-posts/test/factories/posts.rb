FactoryBot.define do
  factory :post do
    name { Faker::Book.title }
    title { Faker::Book.title }
    content { Faker::Book.publisher }
    association :user
  end
end
