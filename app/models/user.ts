import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    middlename: String,
    age: Number,
    DOB: Date,

    email: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
        select: false,
    },

    profileImage: {
        type: String,
        default: "",
    },

    role: {
        type: String,
        enum: ["admin", "student"],
        default: "student",
    },
});

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;