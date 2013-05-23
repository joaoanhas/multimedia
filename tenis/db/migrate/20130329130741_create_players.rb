class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :description
      t.string :age
      t.string :nationality
      t.integer :yearpro
      t.integer :height
      t.integer :weight
    end
  end
end
