# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_10_204251) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

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
    t.boolean "public", default: false
    t.index ["category_id"], name: "index_courses_on_category_id"
  end

  create_table "courses_users", force: :cascade do |t|
    t.integer "course_id"
    t.integer "user_id"
    t.integer "role", default: 0
    t.boolean "hidden", default: false
    t.index ["course_id", "user_id"], name: "index_courses_users_on_course_id_and_user_id", unique: true
  end

  create_table "evaluations", force: :cascade do |t|
    t.bigint "course_id"
    t.string "title"
    t.text "description"
    t.text "objectives"
    t.integer "total_points"
    t.integer "approval_percentage"
    t.datetime "delivery_date"
    t.string "attachment_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_evaluations_on_course_id"
  end

  create_table "notes", force: :cascade do |t|
    t.bigint "session_id"
    t.bigint "user_id"
    t.bigint "course_id"
    t.text "text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_notes_on_course_id"
    t.index ["session_id"], name: "index_notes_on_session_id"
    t.index ["user_id"], name: "index_notes_on_user_id"
  end

  create_table "scores", force: :cascade do |t|
    t.bigint "course_id"
    t.bigint "evaluation_id"
    t.bigint "user_id"
    t.integer "points"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_scores_on_course_id"
    t.index ["evaluation_id"], name: "index_scores_on_evaluation_id"
    t.index ["user_id"], name: "index_scores_on_user_id"
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
