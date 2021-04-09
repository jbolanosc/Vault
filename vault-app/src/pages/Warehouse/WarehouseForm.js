import React, { useReducer, useState } from "react";
import rootReducer, { initialState } from "../../redux/reducers";
import { uploadImage } from "../../redux/actions/ImageActions";
import ImagePreview from "../../Components/Image/ImagePreview";
import AmenitiesPreview from "../../Components/Amenities/amenitiesPreview";

const WarehouseForm = () => {
  const [image, dispatch] = useReducer(rootReducer, initialState);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    space: 0,
    monthPrice: 0,
    dayPrice: 0,
    bathrooms: 0,
    floors: 0,
  });
  const [amenitie, setAmenitie] = useState({
    amenitieName: "",
    quantity: null,
  });
  const [preview, setPreview] = useState({
    image: "",
    images: [],
    amenities: [],
  });

  const handleUpload = (e) => {
    e.preventDefault();
    setPreview({ ...preview, image: URL.createObjectURL(e.target.files[0]) });
    dispatch(uploadImage(e.target.files[0]));
  };

  const handleNewAmenitie = (e) => {
    e.preventDefault();
    setPreview({
      ...preview,
      amenities: [...preview.amenities, amenitie],
    });
    console.log(preview.amenities);
  };

  const handleMultipleUpload = (e) => {
    e.preventDefault();
    let urls = [...e.target.files].map((file) => URL.createObjectURL(file));
    setPreview({ ...preview, images: [...preview.images, urls] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const cancelPreview = (e) => {
    setPreview({ ...preview, image: "" });
  };

  const cancelAmenitiePreview = (amenitie) => {
    let items = preview.amenities.filter(
      (item) => amenitie.amenitieName !== item.amenitieName
    );
    setPreview({ ...preview, amenities: items });
  };

  const handleAmenitieChange = (e) => {
    setAmenitie({ ...amenitie, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="xl:text-4xl text-2xl font-bold">Warehouse Form</h2>
      <form className="grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 gap-3">
        {/*COL 1 */}
        <div className="shadow-2xl p-2 flex flex-col items-center">
          <div>
            <label className="block mb-2 text-primary">Name</label>
            <input
              id="name"
              name="name"
              className="w-full p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              minLength="4"
              maxLength="50"
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div>
            <label className="block mb-2 text-primary">space m2</label>
            <input
              id="space"
              name="space"
              type="number"
              className="w-full p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              min="0"
              onChange={handleChange}
              value={formData.space}
            />
          </div>
          <div>
            <label className="block mb-2 text-primary">Description</label>
            <input
              id="description"
              name="description"
              className="w-full p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              minLength="4"
              maxLength="50"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div>
            <label className="block mb-2 text-primary">Monthly Price $</label>
            <input
              id="monthPrice"
              name="monthPrice"
              type="number"
              className="w-2/4 p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              min="0"
              onChange={handleChange}
              value={formData.monthPrice}
            />
          </div>
          <div>
            <label className="block mb-2 text-primary">Daily Price $</label>
            <input
              id="dayPrice"
              name="dayPrice"
              type="number"
              className="w-2/4 p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              min="0"
              onChange={handleChange}
              value={formData.dayPrice}
            />
          </div>
          <div className="my-2 flex items-center justify-center bg-grey-lighter">
            <label className="w-64 flex flex-col items-center px-4 py-6 bg-green-200 text-indigo-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-teal-900 hover:text-white">
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
              <ImagePreview
                key={preview.image}
                image={preview.image}
                cancelPreview={cancelPreview}
              />
            ) : null}
          </div>
        </div>
        {/*COL 2 */}
        <div className="shadow-2xl p-2 flex flex-col items-center justify-center">
          <div>
            <label className="block mb-2 text-primary">Bathrooms</label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              className="w-2/4 p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              min="0"
              onChange={handleChange}
              value={formData.bathrooms}
            />
          </div>
          <div>
            <label className="block mb-2 text-primary">Floors</label>
            <input
              id="floors"
              name="floors"
              type="number"
              className="w-2/4 p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              min="0"
              onChange={handleChange}
              value={formData.floors}
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="block mb-2 text-primary">New Amenitie</label>
            <input
              id="amenitie"
              name="amenitieName"
              type="text"
              className="w-2/4 p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              minLength="2"
              placeholder="Description"
              onChange={handleAmenitieChange}
            />
            <label className="block mb-2 text-primary">Quantity</label>
            <input
              id="Quantity"
              name="quantity"
              type="text"
              className="w-2/4 p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              minLength="2"
              placeholder="Quantity"
              onChange={handleAmenitieChange}
            />
            <button
              className="m-4 btn bg-teal-700 hover:bg-teal-900"
              onClick={handleNewAmenitie}
            >
              Add Amenitie
            </button>
          </div>
        </div>
        {/*COL 3 */}
        <div className="shadow-2xl p-2 flex flex-col items-center 2xl:col-span-1 lg:col-span-1 xl:col-span-1 md:col-span-2">
          <h4 className="text-2xl p-2 font-bold">Amenities</h4>
          {preview.amenities.length > 0
            ? preview.amenities.map((amenitie) => (
                <AmenitiesPreview
                  key={amenitie.amenitieName}
                  amenitie={amenitie}
                  cancelAmenitiePreview={cancelAmenitiePreview}
                />
              ))
            : null}
        </div>
      </form>
      <button
        className="m-4 btn bg-teal-700 hover:bg-teal-900"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default WarehouseForm;
