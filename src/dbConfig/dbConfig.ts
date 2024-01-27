// import mongoose to talk to database
import mongoose from "mongoose";

// export data
export default async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!) //connect to database
        const connection = mongoose.connection; //receive database connection

        // handle connection
        connection.on('connected', () => {
            console.log('MongoDB Connected Successfully');
        })

        // handle error
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}