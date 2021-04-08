import { UPLOAD_IMAGE } from "./constants/ImageConstants";

export function uploadImage(payload) {
  return { type: UPLOAD_IMAGE, payload };
}
