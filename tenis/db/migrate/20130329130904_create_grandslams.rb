class CreateGrandslams < ActiveRecord::Migration
  def change
    create_table :grandslams do |t|
      t.string :name
      t.string :country
      t.string :city
      t.string :courttype
    end
  end
end
