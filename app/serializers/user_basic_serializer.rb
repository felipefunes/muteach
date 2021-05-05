class UserBasicSerializer
  include JSONAPI::Serializer
  attributes :name, :account_type, :id, :nickname, :email

  attribute :notes_count do |object|
    object.notes.all.group_by(&:session_id).map{|s| {count: s[1].size, session_id: s[0]}}
  end
end
