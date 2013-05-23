class CreateEditions < ActiveRecord::Migration
  def change
    create_table :editions do |t|
      t.string :year
      t.references :grandslam
      t.integer :winner_id, :references => :players
      t.integer :finalist_id, :references => :players

    end
  end
end
