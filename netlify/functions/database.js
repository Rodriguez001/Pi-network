// Simple file-based database for Netlify functions
const fs = require('fs').promises;
const path = require('path');

// Database file paths
const DB_DIR = '/tmp';
const USERS_DB = path.join(DB_DIR, 'users.json');
const MESSAGES_DB = path.join(DB_DIR, 'messages.json');
const REVIEWS_DB = path.join(DB_DIR, 'reviews.json');

// Initialize database files
async function initDB() {
    try {
        await fs.mkdir(DB_DIR, { recursive: true });
        
        // Initialize users.json if it doesn't exist
        try {
            await fs.access(USERS_DB);
        } catch {
            await fs.writeFile(USERS_DB, JSON.stringify([]));
        }
        
        // Initialize messages.json if it doesn't exist
        try {
            await fs.access(MESSAGES_DB);
        } catch {
            await fs.writeFile(MESSAGES_DB, JSON.stringify([]));
        }
        
        // Initialize reviews.json if it doesn't exist
        try {
            await fs.access(REVIEWS_DB);
        } catch {
            await fs.writeFile(REVIEWS_DB, JSON.stringify([]));
        }
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

// Generic database operations
class Database {
    constructor(filePath) {
        this.filePath = filePath;
    }
    
    async read() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading ${this.filePath}:`, error);
            return [];
        }
    }
    
    async write(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error(`Error writing ${this.filePath}:`, error);
            return false;
        }
    }
    
    async create(item) {
        const data = await this.read();
        item.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        item.createdAt = new Date().toISOString();
        data.push(item);
        await this.write(data);
        return item;
    }
    
    async findById(id) {
        const data = await this.read();
        return data.find(item => item.id === id);
    }
    
    async findByEmail(email) {
        const data = await this.read();
        return data.find(item => item.email === email);
    }
    
    async findAll() {
        return await this.read();
    }
    
    async update(id, updates) {
        const data = await this.read();
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
            await this.write(data);
            return data[index];
        }
        return null;
    }
    
    async delete(id) {
        const data = await this.read();
        const filtered = data.filter(item => item.id !== id);
        if (filtered.length !== data.length) {
            await this.write(filtered);
            return true;
        }
        return false;
    }
}

// Database instances
const usersDB = new Database(USERS_DB);
const messagesDB = new Database(MESSAGES_DB);
const reviewsDB = new Database(REVIEWS_DB);

// Initialize database on module load
initDB();

module.exports = {
    usersDB,
    messagesDB,
    reviewsDB,
    initDB
};
