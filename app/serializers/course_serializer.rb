class CourseSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :id, :user_ids
end
