# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130502094938) do

  create_table "editions", :force => true do |t|
    t.string  "year"
    t.integer "grandslam_id"
    t.integer "winner_id"
    t.integer "finalist_id"
  end

  create_table "grandslams", :force => true do |t|
    t.string "name"
    t.string "country"
    t.string "city"
    t.string "courttype"
  end

  create_table "notices", :force => true do |t|
    t.string   "title"
    t.string   "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "players", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.string   "age"
    t.string   "nationality"
    t.integer  "yearpro"
    t.integer  "height"
    t.integer  "weight"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.integer  "points"
  end

end
