export const initialState = {
  image: "",
  images: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "UPLOAD_IMAGE":
      console.log(action);
      return { ...state, image: action.payload };
    case "UPLOAD_IMAGES":
      return { ...state, images: action.payload };
    default:
      return state;
  }
}

export default rootReducer;
