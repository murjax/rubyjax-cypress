namespace :cypress do
  task insert: :environment do |t|
    attrs = JSON.parse(ENV["ATTRS"])
    record = ENV["MODEL"].constantize.create(attrs)
    puts record.attributes.to_json
  end
end
