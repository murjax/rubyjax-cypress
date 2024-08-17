FactoryBot.define do
  factory :comment do
    content { Faker::Book.publisher }
    association :user
    association :post
  end
end
