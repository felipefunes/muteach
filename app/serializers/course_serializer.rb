class CourseSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :id, :user_ids, :session_ids, :evaluation_ids

  attribute :category_name do |object|
    object.category.name
  end

  attribute :image_url do |object|
    url_for(object.cover_img) if object.cover_img.attached?
  end
end
