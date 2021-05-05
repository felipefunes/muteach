
import { DirectUpload } from '@rails/activestorage/direct_upload'

export function imageUpload (
  file,
  props = false,
  field = false,
  previewField = false
) {
  return new Promise((resolve, _) => {
    if (props) {
      props.onLoading()
    }

    const upload = new DirectUpload(
      file,
      `${props.domain}/direct_uploads`
    )
    upload.create((error, blob) => {
      if (error) {
        alert('error uploading!')
        props.onError(error)
      } else {
        if (props) {
          props.onSuccess(
            {
              link: blob.service_url,
              filename: blob.filename,
              content_type: blob.content_type
            }
          )
        }
        resolve({ data: { ...blob, link: blob.service_url } })
      }
    })
  })
}
