import { useEffect } from 'react';

let cloudinary;
let widget;

export function UploadWidget ({ children, onUpload }) {
  // const { CLOUD_NAME, UPLOAD_PRESET } = process.env;

  useEffect(() => {
  // console.log(CLOUD_NAME)
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }
    function onIdle() {
      if (!widget) {
        widget = createWidget();
      }
    }
    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
  }, []);
  function createWidget() {
    const options = {
      cloudName: 'dcxuxc5uw',
      uploadPreset: 'wd6fnebc',
      multiple: true,
    };

    return cloudinary?.createUploadWidget(options,
      function (error, result) {
        if (error || result.event === 'success') {
          onUpload(error, result, widget);
        }
      }
    );
  }

  function open() {
    widget = createWidget();
    widget && widget.open();
  }

  return (
    <>
      {children({ cloudinary, widget, open })}
    </>
  )
}

export default UploadWidget;
