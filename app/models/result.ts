
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    subject: { type: String, required: true },
    score: { type: Number, required: true },

    term: String,
    session: String,
    className: {
        type: String,
        required: true, // or false if optional
    }

}, { timestamps: true });

resultSchema.index(
    { student: 1, subject: 1, term: 1, session: 1 },
    { unique: true }
);

export default mongoose.models.Result || mongoose.model("Result", resultSchema);


