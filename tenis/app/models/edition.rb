class Edition < ActiveRecord::Base
  attr_accessible :year,:winner_id,:finalist_id

  belongs_to :grandslam

  has_many :players, :dependent => :destroy

end
