module ApplicationHelper

  def get_player(player_id)
    @player = Player.find(player_id)
  end

end
