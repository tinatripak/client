import { useEffect, useRef } from 'react';

export const  UploadWidget = ({ children, onUpload }) =>  {
  const cloudinary = useRef(null);
  const widget = useRef(null); 
  const { CLOUD_NAME, UPLOAD_PRESET } = process.env;


  useEffect(() => {
    if ( !cloudinary ) {
      cloudinary = window.cloudinary;
    }
    function onIdle() {
      if ( !widget ) {
        widget = createWidget();
      }
    }
    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
  }, []);

  const createWidget = () => {
    const options = {
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET,
    }

    return cloudinary?.createUploadWidget(options,
      function (error, result) {
        if ( error || result.event === 'success' ) {
          onUpload(error, result, widget);
        }
      }
    );
  }

  const open = () => {
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