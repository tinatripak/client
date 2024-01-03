import { useEffect } from "react";

let cloudinary;
let widget;

export function UploadWidget({ children, onUpload }) {
  useEffect(() => {
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }
    function onIdle() {
      if (!widget) {
        widget = createWidget();
      }
    }
    "requestIdleCallback" in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);
  }, []);
  function createWidget() {
    const options = {
      cloudName:process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      // multiple: true,
    };

    return cloudinary?.createUploadWidget(options, function (error, result) {
      if (error || result.event === "success") {
        onUpload(error, result, widget);
      }
    });
  }

  function open() {
    widget = createWidget();
    widget && widget.open();
  }

  return <>{children({ cloudinary, widget, open })}</>;
}

export default UploadWidget;
