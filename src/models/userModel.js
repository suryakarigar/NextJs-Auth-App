import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    // MongoDB is a document Database so keeping the tokens here can be a good choice
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;