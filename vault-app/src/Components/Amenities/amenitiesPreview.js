import React from "react";

const AmenitiesPreview = (props) => {
  return (
    <div className="relative bg-blue-200 m-2">
      <i
        className="fas fa-window-close absolute cursor-pointer"
        onClick={() => props.cancelAmenitiePreview(props.amenitie)}
      ></i>
      <div className="flex flex-col items-center justify-center p-2">
        <div className="flex">
          <label className="font-bold mx-2">Name: </label>
          <p>{props.amenitie.amenitieName}</p>
        </div>
        <div className="flex">
          <label className="font-bold mx-2">Quantity: </label>
          <p>{props.amenitie.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesPreview;
