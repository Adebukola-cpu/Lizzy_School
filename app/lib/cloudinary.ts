import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

export default cloudinary;


export const optimizeCloudinary = (url: string) => {
    if (!url) return "/avatar.png";

    if (!url.includes("res.cloudinary.com")) return url;

    return url.replace(
        "/upload/",
        "/upload/w_300,h_300,c_fill,q_auto,f_auto/"
    );
};

