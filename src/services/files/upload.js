const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../../utils/secret");

const cloudinary = require("cloudinary").v2;
const { uploader } = cloudinary;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

class FileService {
  /** this function uploads a file to cloudinary
   * file type is assumed to be of any type e-g image, video etc */

  async uploadFile(file) {
    const upload = await uploader.upload(file.path, {
      public_id: `${file.path}`,
      resource_type: "auto",
    });
    return upload;
  }
}

const fileService = new FileService();
module.exports = fileService;
