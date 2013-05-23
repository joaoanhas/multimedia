class AddPointsToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :points, :int
  end
end
