class CourseSerializer
  include JSONAPI::Serializer
  attributes :name, :description, :id, :user_ids, :session_ids, :evaluation_ids
end
