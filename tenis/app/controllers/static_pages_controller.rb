class StaticPagesController < ApplicationController
  def home

    @notices = Notice.all
    @players = Player.order("points DESC")


  end

  def help
  end

  def about
  end
end
