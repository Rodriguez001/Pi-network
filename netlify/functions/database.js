// Simple in-memory database for Netlify functions
// Note: In production, you should use a real database like MongoDB, PostgreSQL, etc.

// In-memory storage (will reset on each cold start)
let usersData = [];
let messagesData = [];
let reviewsData = [];

// Initialize with some demo data
function initDB() {
    console.log('Initializing in-memory database...');
    
    // Add some concrete reviews if none exist
    if (reviewsData.length === 0) {
        const demoReviews = [
            {
                id: "review_001",
                name: "Marie L.",
                rating: 5,
                comment: "J'ai rejoint PI Network avec le code Rodriguez003 il y a 6 mois. L'application est très simple à utiliser, je mine juste en appuyant sur un bouton une fois par jour. J'ai déjà accumulé plus de 1000 PI coins !",
                date: "2024-08-15",
                createdAt: "2024-08-15T10:30:00.000Z"
            },
            {
                id: "review_002", 
                name: "Thomas M.",
                rating: 4,
                comment: "Excellent concept ! Le fait de pouvoir miner sans consommer de batterie est révolutionnaire. Rodriguez003 m'a bien expliqué le processus. J'ai invité 15 amis et mon taux de minage a considérablement augmenté.",
                date: "2024-08-10",
                createdAt: "2024-08-10T14:20:00.000Z"
            },
            {
                id: "review_003",
                name: "Sophie D.",
                rating: 5,
                comment: "PI Network change la donne ! Développé par Stanford, c'est sérieux. J'ai commencé avec 0.25 PI/h et maintenant je mine à 1.5 PI/h grâce à mon réseau de sécurité. Merci Rodriguez003 pour le code !",
                date: "2024-08-05",
                createdAt: "2024-08-05T16:45:00.000Z"
            },
            {
                id: "review_004",
                name: "Alexandre B.",
                rating: 4,
                comment: "47 millions d'utilisateurs, ça se sent ! La communauté est très active. L'app fonctionne parfaitement sur Android. Hâte de voir PI sur les exchanges. Rodriguez003 répond rapidement aux questions.",
                date: "2024-07-28",
                createdAt: "2024-07-28T09:15:00.000Z"
            },
            {
                id: "review_005",
                name: "Camille R.",
                rating: 5,
                comment: "Incroyable ! J'ai téléchargé l'app, utilisé le code Rodriguez003 et en 3 mois j'ai miné plus de 800 PI. L'équipe de Stanford a créé quelque chose d'unique. L'avenir de la crypto !",
                date: "2024-07-20",
                createdAt: "2024-07-20T11:30:00.000Z"
            },
            {
                id: "review_006",
                name: "Julien P.",
                rating: 4,
                comment: "PI Network respecte vraiment ses promesses. Pas de pub invasive, pas de consommation excessive. Rodriguez003 est un excellent ambassadeur. Mon portefeuille grandit chaque jour !",
                date: "2024-07-15",
                createdAt: "2024-07-15T13:45:00.000Z"
            },
            {
                id: "review_007",
                name: "Émilie T.",
                rating: 5,
                comment: "Fantastique ! En tant que développeuse, j'apprécie l'approche technique de PI. Le consensus protocol est innovant. Rodriguez003 m'a convaincue et je ne regrette pas. Déjà 1200 PI minés !",
                date: "2024-07-08",
                createdAt: "2024-07-08T15:20:00.000Z"
            },
            {
                id: "review_008",
                name: "Lucas G.",
                rating: 4,
                comment: "Super expérience ! L'inscription avec Rodriguez003 s'est faite en 2 minutes. L'interface est intuitive. J'ai invité ma famille et on mine tous ensemble. Vivement le mainnet !",
                date: "2024-06-30",
                createdAt: "2024-06-30T08:10:00.000Z"
            }
        ];
        
        reviewsData.push(...demoReviews);
        console.log(`Added ${demoReviews.length} demo reviews`);
    }
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
