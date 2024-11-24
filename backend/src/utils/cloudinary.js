import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
//================== Configuration ================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ============== Upload an image ==================
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //--------------- upload the file on cloudinary -------------
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    return null;
  }
};

// ============== Delete an image ==================
const deleteOnCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(
      publicId,
      (error, result) => {
        return result;
      }
    );
  } catch (error) {
    return null;
  }
};

const deleteAllPostImages = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) console.error("Error deleting image:", error);
      else console.log("Deleted from Cloudinary:", result);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  cloudinary,
  uploadOnCloudinary,
  deleteOnCloudinary,
  deleteAllPostImages,
};
