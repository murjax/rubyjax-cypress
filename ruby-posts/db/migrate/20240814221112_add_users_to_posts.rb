class AddUsersToPosts < ActiveRecord::Migration[7.2]
  def change
    add_reference :posts, :user, foreign_key: true
  end
end
