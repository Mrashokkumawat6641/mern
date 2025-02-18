import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const reconnectTimeout = 5000; 

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const db = mongoose.connection;

        db.on('connecting', () => {
            console.info('Connecting to MongoDB...');
        });

        db.on('error', error => {
            console.error(`MongoDB connection error: ${error}`);
            mongoose.disconnect();
        });

        db.on('connected', () => {
            console.info('Connected to MongoDB!');
        });

        db.on('reconnected', () => {
            console.info('MongoDB reconnected!');
        });

        db.on('disconnected', () => {
            console.error(
                `MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`
            );
            setTimeout(() => db(), reconnectTimeout);
        });
    } catch (err) {
        console.error('DB Connection Error:', err.message);
        process.exit(1);
    }
};

export default db;
