import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number,
}

const connection : ConnectionObject = {

}

async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to Database");
        return
    }
    try {
<<<<<<< HEAD
        const db = await mongoose.connect('mongodb://localhost:27017/mystrymessage' || '' , {})
=======
        const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mystrymessage' , {})
>>>>>>> 818e4c2d62150cbc495019b0d2ce3b1bf68db3ce
        connection.isConnected = db.connections[0].readyState
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("DB Connection Failed", error);
        process.exit(1)
    }
}

export default dbConnect;