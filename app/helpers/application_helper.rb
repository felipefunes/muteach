module ApplicationHelper
  def error_message_for(field_error)
    field_error[0].present? ? content_tag(:div, field_error[0], class: "error_message") : ""
  end
end
