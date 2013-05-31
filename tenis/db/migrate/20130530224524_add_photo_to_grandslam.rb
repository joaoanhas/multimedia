class AddPhotoToGrandslam < ActiveRecord::Migration
  def change
    add_column :grandslams, :photo, :string
  end
end
