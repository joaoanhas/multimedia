class Grandslam < ActiveRecord::Base
  attr_accessible :city, :country, :courttype, :name
  has_many :editions, :dependent => :destroy
end
