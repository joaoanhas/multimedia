class Grandslam < ActiveRecord::Base
  attr_accessible :city, :country, :courttype, :name,:photo
  has_many :editions, :dependent => :destroy,:order => 'year DESC'
end
