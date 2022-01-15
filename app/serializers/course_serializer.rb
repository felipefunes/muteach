class CourseSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :id, :user_ids, :session_ids, :evaluation_ids, :created_at, :updated_at, :public

  attribute :category_name do |object|
    object.category.name
  end

  attribute :image_url do |object|
    Rails.application.routes.url_helpers.url_for(object.cover_img) if object.cover_img.attached?
  end

  attribute :sessions_count do |object|
    object.session_ids.length
  end

  attribute :evaluations_count do |object|
    object.evaluation_ids.length
  end

  attribute :users_count do |object|
    object.users.only_students.size
  end
end
