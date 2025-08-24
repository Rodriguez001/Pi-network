// Simple in-memory database for Netlify functions
// Note: In production, you should use a real database like MongoDB, PostgreSQL, etc.

// In-memory storage (will reset on each cold start)
let usersData = [];
let messagesData = [];
let reviewsData = [];

// Initialize with some demo data
function initDB() {
    console.log('Initializing in-memory database...');
    // Database is already initialized with empty arrays
}

// Generic database operations
class Database {
    constructor(dataArray) {
        this.data = dataArray;
    }
    
    async read() {
        return [...this.data];
    }
    
    async write(data) {
        this.data.length = 0;
        this.data.push(...data);
        return true;
    }
    
    async create(item) {
        item.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        item.createdAt = new Date().toISOString();
        this.data.push(item);
        return item;
    }
    
    async findById(id) {
        return this.data.find(item => item.id === id);
    }
    
    async findByEmail(email) {
        return this.data.find(item => item.email === email);
    }
    
    async findAll() {
        return [...this.data];
    }
    
    async update(id, updates) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updates, updatedAt: new Date().toISOString() };
            return this.data[index];
        }
        return null;
    }
    
    async delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return true;
        }
        return false;
    }
}

// Database instances
const usersDB = new Database(usersData);
const messagesDB = new Database(messagesData);
const reviewsDB = new Database(reviewsData);

// Initialize database on module load
initDB();

module.exports = {
    usersDB,
    messagesDB,
    reviewsDB,
    initDB
};
