// Script to seed initial data for the PI Network site
const { usersDB, reviewsDB, messagesDB } = require('./database');

async function seedData() {
    console.log('🌱 Seeding initial data...');
    
    try {
        // Check if data already exists
        const existingReviews = await reviewsDB.findAll();
        
        if (existingReviews.length === 0) {
            // Add sample reviews
            const sampleReviews = [
                {
                    name: 'Marie L.',
                    rating: 5,
                    text: 'Excellent ! Rodriguez003 m\'a aidé à rejoindre PI Network. L\'équipe est très réactive.',
                    verified: true
                },
                {
                    name: 'Thomas K.',
                    rating: 5,
                    text: 'Merci Rodriguez pour le support ! Le code Rodriguez003 fonctionne parfaitement.',
                    verified: true
                },
                {
                    name: 'Sophie M.',
                    rating: 4,
                    text: 'Très bon service, j\'ai pu commencer à miner facilement avec le code de parrainage.',
                    verified: true
                },
                {
                    name: 'Pierre D.',
                    rating: 5,
                    text: 'Rodriguez003 est un excellent parrain ! Toujours disponible pour aider.',
                    verified: true
                }
            ];
            
            for (const review of sampleReviews) {
                await reviewsDB.create(review);
                console.log(`✅ Added review from ${review.name}`);
            }
        }
        
        console.log('🎉 Data seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    }
}

// Export for use in other functions
module.exports = { seedData };

// Run if called directly
if (require.main === module) {
    seedData();
}
