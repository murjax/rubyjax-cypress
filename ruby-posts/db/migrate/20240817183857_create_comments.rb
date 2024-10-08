class CreateComments < ActiveRecord::Migration[7.2]
  def change
    create_table :comments do |t|
      t.references :post, null: false
      t.references :user, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end
