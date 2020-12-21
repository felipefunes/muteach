# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_17_024317) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "starts_at"
    t.datetime "finishes_at"
    t.time "from_hour"
    t.time "to_hour"
    t.integer "students_quota"
    t.integer "price"
    t.string "website"
    t.text "primary_objectives"
    t.text "secondary_objectives"
    t.integer "modality", default: 0
    t.string "lang", default: "0"
    t.integer "sessions_amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "category_id"
    t.index ["category_id"], name: "index_courses_on_category_id"
  end

  create_table "courses_users", force: :cascade do |t|
    t.integer "course_id"
    t.integer "user_id"
    t.integer "role", default: 0
    t.index ["course_id", "user_id"], name: "index_courses_users_on_course_id_and_user_id", unique: true
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "course_id"
    t.text "objectives"
    t.text "description"
    t.datetime "date"
    t.time "from_hour"
    t.time "to_hour"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_sessions_on_course_id"
  end

  create_table "sessions_users", id: false, force: :cascade do |t|
    t.bigint "session_id", null: false
    t.bigint "user_id", null: false
    t.index ["session_id", "user_id"], name: "index_sessions_users_on_session_id_and_user_id"
    t.index ["user_id", "session_id"], name: "index_sessions_users_on_user_id_and_session_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "description"
    t.text "studies_and_experience"
    t.datetime "birth_date"
    t.integer "languages", default: 0
    t.integer "account_type", default: 0
    t.string "website"
    t.string "phone"
    t.string "nickname"
    t.string "name"
    t.bigint "session_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["session_id"], name: "index_users_on_session_id"
  end

end
