import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    discord_uid: string;
    minecraft_username: string;

    email: string;

    verified: boolean;
    verification_code: string;
}

const StudentSchema: Schema = new Schema({
    discord_uid: {
        type: String,
        required: true,
        unique: true,
    },
    minecraft_username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verification_code: {
        type: String,
        required: true,
    }
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);

export default Student;

export {
    IStudent,
    StudentSchema,
};