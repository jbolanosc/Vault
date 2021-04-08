import React from "react";

const ImagePreview = (props) => {
  console.log(props.image);
  return (
    <div className="relative h-full w-full">
      <i
        className="fas fa-window-close absolute cursor-pointer"
        onClick={props.cancelPreview}
      ></i>
      <img
        key={props.image}
        src={props.image}
        alt="hola2"
        height="200"
        width="200"
      />
    </div>
  );
};

export default ImagePreview;
