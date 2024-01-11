import { ObjectId } from "mongodb";

export default class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public createdAt: number,
        public id?: ObjectId,
    ) {}
}

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['user', 'admin'], default: 'user' },
//     createdAt: { type: Date, default: Date.now },
//   });
  