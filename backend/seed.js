const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./models/userModel");
const Book = require("./models/bookModel");
const { MONGODB_URL } = require('./configs/envConfigs');

const BOOKS_JSON = path.join(__dirname, "data", "books.json");

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

async function ensureAdmin() {
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
        admin = await User.create({
            name: "Admin",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
        });
        console.log("🛡️ Admin user created");
    } else {
        console.log("🛡️ Admin user already exists");
    }
    return admin._id;
}

async function seedBooks() {
    try {
        const adminId = await ensureAdmin();
        const books = JSON.parse(fs.readFileSync(BOOKS_JSON, "utf8"));
        await Book.deleteMany({});
        console.log("🗑️ Old books removed");
        const booksWithAdmin = books.map((book) => ({
            ...book,
            createdBy: adminId,
        }));

        await Book.insertMany(booksWithAdmin);
        console.log(`📚 Inserted ${booksWithAdmin.length} books successfully`);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error while seeding:", err);
        process.exit(1);
    }
}

(async () => {
    await connectDB();
    await seedBooks();
})();
