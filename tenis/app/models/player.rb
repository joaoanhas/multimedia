class Player < ActiveRecord::Base
  attr_accessible :age, :description, :height, :name, :nationality, :weight, :yearpro, :points

  attr_accessible :avatar
  has_attached_file :avatar, :styles => { :large => "500x500>",:medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.jpg"


  belongs_to :edition
end
