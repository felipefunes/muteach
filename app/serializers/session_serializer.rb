class SessionSerializer
  include JSONAPI::Serializer
  attributes :id, :description, :objectives, :date, :user_ids
end
