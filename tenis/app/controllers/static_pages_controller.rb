class StaticPagesController < ApplicationController
  def home

    @notices = Notice.all

  end

  def help
  end

  def about
  end
end
