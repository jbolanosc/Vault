import React, { useReducer, useState } from "react";
import rootReducer, { initialState } from "../redux/reducers";
import { uploadImage } from "../redux/actions/ImageActions";

const ImageUploader = () => {
  const [image, dispatch] = useReducer(rootReducer, initialState);
  const [preview, setPreview] = useState({
    image: "",
    images: [],
  });

  const handleUpload = (e) => {
    e.preventDefault();
    setPreview({ ...preview, image: URL.createObjectURL(e.target.files[0]) });
    dispatch(uploadImage(e.target.files[0]));
  };

  const handleMultipleUpload = (e) => {
    e.preventDefault();
    let urls = [...e.target.files].map((file) => URL.createObjectURL(file));
    setPreview({ ...preview, images: [...preview.images, urls] });
  };

  return (
    <form className="min-h-screen max-w-screen flex flex-col items-center justify-center">
      <h1 className="xl:text-4xl text-2xl font-bold">Create Warehouse</h1>
      <div className="flex xs:flex-col sm:flex-col md:flex-col flex-wrap max-w-full items-center justify-center">
        <div className="shadow-2xl p-2 flex flex-col items-center">
          <h3 className="m-3 text-xl  font-bold">Description</h3>
          <div>
            <label class="block mb-2 text-primary">Name</label>
            <input
              id="name"
              name="name"
              class="w-full p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              minLength="4"
              maxLength="50"
            />
          </div>
          <div>
            <label class="block mb-2 text-primary">space m2</label>
            <input
              id="space"
              name="space"
              type="number"
              class="w-full p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              minlength="4"
              maxlength="50"
            />
          </div>
          <div>
            <label class="block mb-2 text-primary">Description</label>
            <input
              id="description"
              name="description"
              class="w-full p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              minlength="4"
              maxlength="50"
            />
          </div>
          <div className="flex items-center justify-center bg-grey-lighter">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-green-200 text-indigo-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-600 hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input type="file" onChange={handleUpload} className="hidden" />
            </label>
          </div>
          <div className="flex flex-wrap">
            {preview.image ? (
              <img src={preview.image} alt="hola1" height="100" width="50" />
            ) : null}
          </div>
        </div>

        <div className="shadow-2xl p-2 flex flex-col items-center">
          <div className="flex items-center justify-center bg-grey-lighter">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-green-200 text-indigo-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-600 hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                type="file"
                onChange={handleMultipleUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex flex-wrap">
            {preview.images.length > 0
              ? preview.images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="warehouse preview"
                    height="100"
                    width="100"
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
      <button class="m-4 btn bg-teal-700 hover:bg-teal-900"> Submit </button>
    </form>
  );
};

export default ImageUploader;
