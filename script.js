// Internationalization System
let currentLanguage = 'fr';

// Global variables for authentication and app state
let currentUser = null;
let authToken = null;

// Authentication functions
function initAuth() {
    // Check for saved auth token
    authToken = localStorage.getItem('pi-auth-token');
    if (authToken) {
        // Verify token and get user info
        verifyToken();
    }
    updateAuthUI();
}

function verifyToken() {
    // In a real app, you'd verify the token with the server
    // For now, we'll decode the JWT payload (not secure, just for demo)
    try {
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        if (payload.exp > Date.now() / 1000) {
            currentUser = { name: payload.name, email: payload.email };
        } else {
            // Token expired
            logout();
        }
    } catch (error) {
        logout();
    }
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userWelcome = document.getElementById('userWelcome');
    
    if (currentUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        if (userWelcome) {
            userWelcome.classList.remove('hidden');
            userWelcome.textContent = `${translations[currentLanguage]?.auth?.welcome || 'Bienvenue'} ${currentUser.name}`;
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
        if (userWelcome) userWelcome.classList.add('hidden');
    }
}

function showAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (modal) {
        if (type === 'login') {
            if (loginForm) loginForm.classList.remove('hidden');
            if (registerForm) registerForm.classList.add('hidden');
        } else {
            if (loginForm) loginForm.classList.add('hidden');
            if (registerForm) registerForm.classList.remove('hidden');
        }
        modal.classList.remove('hidden');
    }
}

function hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('hidden');
}

function switchAuthForm(type) {
    showAuthModal(type);
}

async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Check if we're running locally
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Simulate local login
        const email = formData.get('loginEmail') || formData.get('email');
        const password = formData.get('loginPassword') || formData.get('password');
        
        if (email && password) {
            // Create mock user
            currentUser = { 
                name: email.split('@')[0], 
                email: email,
                id: 'local_user_' + Date.now()
            };
            
            // Create mock token
            authToken = 'local_token_' + Date.now();
            localStorage.setItem('pi-auth-token', authToken);
            
            updateAuthUI();
            hideAuthModal();
            showNotification('Connexion réussie !', 'success');
        } else {
            showNotification('Veuillez remplir tous les champs', 'error');
        }
        return;
    }
    
    try {
        const response = await fetch('/.netlify/functions/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'login',
                email: formData.get('loginEmail') || formData.get('email'),
                password: formData.get('loginPassword') || formData.get('password')
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            authToken = result.token;
            localStorage.setItem('pi-auth-token', authToken);
            currentUser = result.user;
            updateAuthUI();
            hideAuthModal();
            showNotification('Connexion réussie !', 'success');
        } else {
            showNotification(result.error || 'Erreur de connexion', 'error');
        }
    } catch (error) {
        showNotification('Erreur de connexion', 'error');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Check if we're running locally
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Simulate local registration
        const name = formData.get('registerName') || formData.get('name');
        const email = formData.get('registerEmail') || formData.get('email');
        const password = formData.get('registerPassword') || formData.get('password');
        
        if (name && email && password) {
            // Create mock user
            currentUser = { 
                name: name, 
                email: email,
                id: 'local_user_' + Date.now()
            };
            
            // Create mock token
            authToken = 'local_token_' + Date.now();
            localStorage.setItem('pi-auth-token', authToken);
            
            updateAuthUI();
            hideAuthModal();
            showNotification('Inscription réussie !', 'success');
        } else {
            showNotification('Veuillez remplir tous les champs', 'error');
        }
        return;
    }
    
    try {
        const response = await fetch('/.netlify/functions/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'register',
                name: formData.get('registerName') || formData.get('name'),
                email: formData.get('registerEmail') || formData.get('email'),
                password: formData.get('registerPassword') || formData.get('password')
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            authToken = result.token;
            localStorage.setItem('pi-auth-token', authToken);
            currentUser = result.user;
            updateAuthUI();
            hideAuthModal();
            showNotification('Inscription réussie !', 'success');
        } else {
            showNotification(result.error || 'Erreur d\'inscription', 'error');
        }
    } catch (error) {
        showNotification('Erreur d\'inscription', 'error');
    }
}

function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('pi-auth-token');
    updateAuthUI();
    showNotification('Déconnexion réussie', 'success');
}

// Contact form functions
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

async function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Check if we're running locally
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Simulate local contact form submission
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (name && email && subject && message) {
            console.log('Local contact form submission:', { name, email, subject, message });
            showNotification('Message envoyé avec succès !', 'success');
            event.target.reset();
        } else {
            showNotification('Veuillez remplir tous les champs', 'error');
        }
        return;
    }
    
    try {
        const response = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showNotification('Message envoyé avec succès !', 'success');
            event.target.reset();
        } else {
            showNotification(result.error || 'Erreur lors de l\'envoi', 'error');
        }
    } catch (error) {
        showNotification('Erreur lors de l\'envoi', 'error');
    }
}

// Reviews functions
function initReviews() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
        initStarRating();
        
        // Force load reviews after a delay to ensure DOM is ready
        setTimeout(() => {
            console.log('Force loading reviews after DOM ready...');
            loadReviews();
        }, 1000);
    } else {
        console.error('Review form not found!');
    }
}

function initStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => setRating(index + 1));
        star.addEventListener('mouseover', () => highlightStars(index + 1));
    });
    
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        starRating.addEventListener('mouseleave', () => {
            const rating = document.querySelector('input[name="rating"]')?.value || 0;
            highlightStars(rating);
        });
    }
}

function setRating(rating) {
    const ratingInput = document.querySelector('input[name="rating"]');
    if (ratingInput) ratingInput.value = rating;
    highlightStars(rating);
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

async function handleReviewSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Check if we're running locally
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Simulate local review submission
        const newReview = {
            id: "review_" + Date.now(),
            name: formData.get('reviewName') || 'Utilisateur anonyme',
            rating: parseInt(formData.get('rating')) || 5,
            comment: formData.get('reviewText'),
            date: new Date().toLocaleDateString('fr-FR')
        };
        
        // Add to existing reviews display
        const reviewsList = document.getElementById('reviewsList');
        if (reviewsList) {
            const reviewHTML = `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">${newReview.name}</span>
                        <span class="review-rating">${'⭐'.repeat(newReview.rating)}</span>
                    </div>
                    <p class="review-text">${newReview.comment}</p>
                    <span class="review-date">${newReview.date}</span>
                </div>
            `;
            reviewsList.insertAdjacentHTML('afterbegin', reviewHTML);
        }
        
        showNotification('Avis publié avec succès !', 'success');
        event.target.reset();
        setRating(0);
        return;
    }
    
    try {
        const response = await fetch('/.netlify/functions/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('reviewName'),
                rating: parseInt(formData.get('rating')),
                comment: formData.get('reviewText')
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showNotification('Avis publié avec succès !', 'success');
            event.target.reset();
            setRating(0);
            loadReviews();
        } else {
            showNotification(result.error || 'Erreur lors de la publication', 'error');
        }
    } catch (error) {
        showNotification('Erreur lors de la publication', 'error');
    }
}

async function loadReviews() {
    try {
        console.log('Loading reviews...');
        
        // Check if we're running locally - if so, show demo reviews
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Running locally - showing demo reviews');
            const demoReviews = [
                {
                    id: "review_001",
                    name: "Marie L.",
                    rating: 5,
                    comment: "J'ai rejoint PI Network avec le code Rodriguez003 il y a 6 mois. L'application est très simple à utiliser, je mine juste en appuyant sur un bouton une fois par jour. J'ai déjà accumulé plus de 1000 PI coins !",
                    date: "15/08/2024"
                },
                {
                    id: "review_002", 
                    name: "Thomas M.",
                    rating: 4,
                    comment: "Excellent concept ! Le fait de pouvoir miner sans consommer de batterie est révolutionnaire. Rodriguez003 m'a bien expliqué le processus. J'ai invité 15 amis et mon taux de minage a considérablement augmenté.",
                    date: "10/08/2024"
                },
                {
                    id: "review_003",
                    name: "Sophie D.",
                    rating: 5,
                    comment: "PI Network change la donne ! Développé par Stanford, c'est sérieux. J'ai commencé avec 0.25 PI/h et maintenant je mine à 1.5 PI/h grâce à mon réseau de sécurité. Merci Rodriguez003 pour le code !",
                    date: "05/08/2024"
                },
                {
                    id: "review_004",
                    name: "Alexandre B.",
                    rating: 4,
                    comment: "47 millions d'utilisateurs, ça se sent ! La communauté est très active. L'app fonctionne parfaitement sur Android. Hâte de voir PI sur les exchanges. Rodriguez003 répond rapidement aux questions.",
                    date: "28/07/2024"
                },
                {
                    id: "review_005",
                    name: "Camille R.",
                    rating: 5,
                    comment: "Incroyable ! J'ai téléchargé l'app, utilisé le code Rodriguez003 et en 3 mois j'ai miné plus de 800 PI. L'équipe de Stanford a créé quelque chose d'unique. L'avenir de la crypto !",
                    date: "20/07/2024"
                },
                {
                    id: "review_006",
                    name: "Julien P.",
                    rating: 4,
                    comment: "PI Network respecte vraiment ses promesses. Pas de pub invasive, pas de consommation excessive. Rodriguez003 est un excellent ambassadeur. Mon portefeuille grandit chaque jour !",
                    date: "15/07/2024"
                },
                {
                    id: "review_007",
                    name: "Émilie T.",
                    rating: 5,
                    comment: "Fantastique ! En tant que développeuse, j'apprécie l'approche technique de PI. Le consensus protocol est innovant. Rodriguez003 m'a convaincue et je ne regrette pas. Déjà 1200 PI minés !",
                    date: "08/07/2024"
                },
                {
                    id: "review_008",
                    name: "Lucas G.",
                    rating: 4,
                    comment: "Super expérience ! L'inscription avec Rodriguez003 s'est faite en 2 minutes. L'interface est intuitive. J'ai invité ma famille et on mine tous ensemble. Vivement le mainnet !",
                    date: "30/06/2024"
                }
            ];
            displayReviews(demoReviews);
            return;
        }
        
        const response = await fetch('/.netlify/functions/reviews');
        console.log('Reviews response status:', response.status);
        
        const result = await response.json();
        console.log('Reviews result:', result);
        
        if (response.ok && result.reviews) {
            console.log('Displaying', result.reviews.length, 'reviews');
            displayReviews(result.reviews);
        } else {
            console.error('Failed to load reviews:', result);
            displayReviews([]);
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        displayReviews([]);
    }
}

function displayReviews(reviews) {
    const reviewsList = document.getElementById('reviewsList');
    console.log('displayReviews called with:', reviews);
    console.log('reviewsList element:', reviewsList);
    
    if (!reviewsList) {
        console.error('reviewsList element not found!');
        return;
    }
    
    if (!reviews || reviews.length === 0) {
        console.log('No reviews to display');
        reviewsList.innerHTML = `<p class="no-reviews">${translations[currentLanguage]?.reviews?.noReviews || 'Aucun avis pour le moment.'}</p>`;
        return;
    }
    
    console.log('Rendering', reviews.length, 'reviews');
    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-author">${review.name || 'Anonyme'}</span>
                <span class="review-rating">${'⭐'.repeat(review.rating || 5)}</span>
            </div>
            <p class="review-text">${review.comment || review.text || 'Pas de commentaire'}</p>
            <span class="review-date">${review.date || new Date().toLocaleDateString('fr-FR')}</span>
        </div>
    `).join('');
    
    console.log('Reviews HTML updated');
}

// Messages functions
function initMessages() {
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', handleMessageSubmit);
        loadMessages();
        
        // Auto-refresh messages every 30 seconds
        setInterval(loadMessages, 30000);
    }
}

async function handleMessageSubmit(event) {
    event.preventDefault();
    
    if (!currentUser) {
        showNotification(translations[currentLanguage]?.messages?.loginRequired || 'Connectez-vous pour envoyer des messages', 'error');
        return;
    }
    
    const formData = new FormData(event.target);
    const message = formData.get('message');
    
    if (!message?.trim()) return;
    
    // Check if we're running locally
    if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Simulate local message submission
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            const messageHTML = `
                <div class="message user-message">
                    <div class="message-content">
                        ${message.trim()}
                        <span class="message-time">${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                </div>
            `;
            messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate admin response after 2 seconds
            setTimeout(() => {
                const adminResponse = `
                    <div class="message admin-message">
                        <div class="message-content">
                            Merci pour votre message ! Je vous répondrai bientôt concernant PI Network.
                            <span class="message-time">${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                    </div>
                `;
                messagesContainer.insertAdjacentHTML('beforeend', adminResponse);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 2000);
        }
        
        event.target.reset();
        return;
    }
    
    try {
        const response = await fetch('/.netlify/functions/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ message: message.trim() })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            event.target.reset();
            loadMessages();
        } else {
            showNotification(result.error || 'Erreur lors de l\'envoi', 'error');
        }
    } catch (error) {
        showNotification('Erreur lors de l\'envoi', 'error');
    }
}

async function loadMessages() {
    if (!currentUser) return;
    
    try {
        const response = await fetch('/.netlify/functions/messages', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const result = await response.json();
        
        if (response.ok) {
            displayMessages(result.messages);
        }
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;
    
    messagesContainer.innerHTML = messages.map(msg => `
        <div class="message ${msg.sender === 'user' ? 'user-message' : 'admin-message'}">
            <div class="message-content">
                ${msg.message}
                <span class="message-time">${msg.timestamp}</span>
            </div>
        </div>
    `).join('');
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Modal functions
function initModals() {
    // Close modals when clicking outside
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.add('hidden');
        }
    });
    
    // Close buttons
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const modal = event.target.closest('.modal');
            if (modal) modal.classList.add('hidden');
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Translations embedded directly
const translations = {
    "fr": {
        "nav": {
            "home": "Accueil",
            "about": "À propos",
            "stats": "Statistiques",
            "join": "Rejoindre",
            "contact": "Contact",
            "reviews": "Avis"
        },
        "hero": {
            "title": "💎 Rejoignez PI Network - avec Rodriguez",
            "subtitle": "Minez la première crypto-monnaie gratuite sur votre téléphone mobile - 47M+ pionniers dans le monde",
            "cta": "Commencer maintenant"
        },
        "about": {
            "title": "Qu'est-ce que PI crypto ?",
            "features": {
                "mobile": {
                    "title": "Minage Mobile",
                    "description": "Minez des PI coins directement depuis votre smartphone sans drainer votre batterie ni consommer vos données."
                },
                "community": {
                    "title": "Communauté Mondiale",
                    "description": "Rejoignez plus de 47 millions de pionniers dans le monde entier qui construisent l'écosystème PI."
                },
                "secure": {
                    "title": "Sécurisé",
                    "description": "Développé par des docteurs de Stanford avec un protocole de consensus innovant et sécurisé."
                },
                "free": {
                    "title": "Gratuit",
                    "description": "Commencez à miner gratuitement dès aujourd'hui. Aucun investissement initial requis."
                },
                "growth": {
                    "title": "Potentiel de Croissance",
                    "description": "Entrez tôt dans l'écosystème avant le lancement officiel sur les exchanges."
                },
                "referral": {
                    "title": "Parrainage",
                    "description": "Gagnez plus de PI en invitant vos amis et en construisant votre réseau de sécurité."
                }
            }
        },
        "stats": {
            "title": "PI crypto en Chiffres",
            "pioneers": "Pionniers Actifs",
            "countries": "Pays Représentés",
            "apps": "Applications Développées",
            "launch": "Année de Lancement"
        },
        "steps": {
            "title": "Comment Rejoindre PI crypto",
            "step1": {
                "title": "Téléchargez l'App",
                "description": "Téléchargez l'application PI crypto depuis l'App Store ou Google Play Store."
            },
            "step2": {
                "title": "Utilisez mon Code",
                "description": "Lors de l'inscription, utilisez mon code de parrainage : Rodriguez003"
            },
            "step3": {
                "title": "Commencez à Miner",
                "description": "Appuyez sur le bouton de minage une fois par jour pour commencer à gagner des PI coins."
            },
            "step4": {
                "title": "Invitez vos Amis",
                "description": "Partagez votre propre code de parrainage pour augmenter votre taux de minage."
            },
            "qr": {
                "title": "Ou scannez ce QR Code :",
                "description": "Scannez avec votre téléphone pour accéder directement au lien d'inscription"
            }
        },
        "footer": {
            "copyright": "© 2024 PI crypto - Rejoignez la révolution crypto avec Rodriguez003",
            "disclaimer": "⚠️ PI crypto est encore en phase de développement. Les PI coins n'ont pas encore de valeur monétaire."
        },
        "contact": {
            "title": "Contactez-nous",
            "subtitle": "Une question ? Nous sommes là pour vous aider !",
            "form": {
                "name": "Nom complet",
                "email": "Email",
                "subject": "Sujet",
                "message": "Message",
                "submit": "Envoyer"
            },
            "info": {
                "title": "Informations de contact",
                "email": "Email: s16programmeomega@gmail.com",
                "response": "Nous répondons sous 24h",
                "support": "Support disponible 7j/7"
            }
        },
        "reviews": {
            "title": "Avis des utilisateurs",
            "subtitle": "Découvrez ce que pensent nos utilisateurs de PI Network",
            "addReview": "Ajouter un avis",
            "form": {
                "name": "Votre nom",
                "rating": "Note",
                "comment": "Votre commentaire",
                "submit": "Publier l'avis"
            },
            "noReviews": "Aucun avis pour le moment. Soyez le premier à laisser un avis !"
        },
        "messages": {
            "title": "Messages",
            "subtitle": "Conversez directement avec Rodriguez",
            "loginRequired": "Connectez-vous pour envoyer des messages",
            "placeholder": "Tapez votre message...",
            "send": "Envoyer",
            "admin": "Rodriguez (Admin)"
        },
        "auth": {
            "login": "Connexion",
            "register": "Inscription",
            "logout": "Déconnexion",
            "welcome": "Bienvenue",
            "have": {
                "account": "Déjà un compte ?"
            },
            "no": {
                "account": "Pas de compte ?"
            },
            "loginForm": {
                "title": "Connexion",
                "email": "Email",
                "password": "Mot de passe",
                "submit": "Se connecter",
                "switchToRegister": "Pas de compte ? Inscrivez-vous"
            },
            "registerForm": {
                "title": "Inscription",
                "name": "Nom complet",
                "email": "Email",
                "password": "Mot de passe",
                "submit": "S'inscrire",
                "switchToLogin": "Déjà un compte ? Connectez-vous"
            }
        }
    },
    "en": {
        "nav": {
            "home": "Home",
            "about": "About",
            "stats": "Statistics",
            "join": "Join",
            "contact": "Contact",
            "reviews": "Reviews"
        },
        "hero": {
            "title": "💎 Join PI Network - with Rodriguez",
            "subtitle": "Mine the first free cryptocurrency on your mobile phone - 47M+ pioneers worldwide",
            "cta": "Start Now"
        },
        "about": {
            "title": "What is PI crypto?",
            "features": {
                "mobile": {
                    "title": "Mobile Mining",
                    "description": "Mine PI coins directly from your smartphone without draining your battery or consuming your data."
                },
                "community": {
                    "title": "Global Community",
                    "description": "Join over 47 million pioneers worldwide who are building the PI ecosystem."
                },
                "secure": {
                    "title": "Secure",
                    "description": "Developed by Stanford PhDs with an innovative and secure consensus protocol."
                },
                "free": {
                    "title": "Free",
                    "description": "Start mining for free today. No initial investment required."
                },
                "growth": {
                    "title": "Growth Potential",
                    "description": "Get in early in the ecosystem before the official launch on exchanges."
                },
                "referral": {
                    "title": "Referral",
                    "description": "Earn more PI by inviting your friends and building your security crypto."
                }
            }
        },
        "stats": {
            "title": "PI crypto in Numbers",
            "pioneers": "Active Pioneers",
            "countries": "Countries Represented",
            "apps": "Apps Developed",
            "launch": "Launch Year"
        },
        "steps": {
            "title": "How to Join PI crypto",
            "step1": {
                "title": "Download the App",
                "description": "Download the PI crypto app from the App Store or Google Play Store."
            },
            "step2": {
                "title": "Use my Code",
                "description": "When signing up, use my referral code: Rodriguez003"
            },
            "step3": {
                "title": "Start Mining",
                "description": "Tap the mining button once a day to start earning PI coins."
            },
            "step4": {
                "title": "Invite your Friends",
                "description": "Share your own referral code to increase your mining rate."
            },
        },
        "footer": {
            "copyright": "© 2024 PI crypto - Join the crypto revolution with Rodriguez003",
            "disclaimer": "⚠️ PI crypto is still in development phase. PI coins do not yet have monetary value."
        },
        "contact": {
            "title": "Contact Us",
            "subtitle": "Have a question? We're here to help!",
            "form": {
                "name": "Full Name",
                "email": "Email",
                "subject": "Subject",
                "message": "Message",
                "submit": "Send"
            },
            "info": {
                "title": "Contact Information",
                "email": "Email: s16programmeomega@gmail.com",
                "response": "We respond within 24h",
                "support": "Support available 24/7"
            }
        },
        "reviews": {
            "title": "User Reviews",
            "subtitle": "Discover what our users think about PI Network",
            "addReview": "Add Review",
            "form": {
                "name": "Your name",
                "rating": "Rating",
                "comment": "Your comment",
                "submit": "Post Review"
            },
            "noReviews": "No reviews yet. Be the first to leave a review!"
        },
        "messages": {
            "title": "Messages",
            "subtitle": "Chat directly with Rodriguez",
            "loginRequired": "Login to send messages",
            "placeholder": "Type your message...",
            "send": "Send",
            "admin": "Rodriguez (Admin)"
        },
        "auth": {
            "login": "Login",
            "register": "Register",
            "logout": "Logout",
            "welcome": "Welcome",
            "have": {
                "account": "Already have an account?"
            },
            "no": {
                "account": "No account?"
            },
            "loginForm": {
                "title": "Login",
                "email": "Email",
                "password": "Password",
                "submit": "Sign In",
                "switchToRegister": "No account? Sign up"
            },
            "registerForm": {
                "title": "Register",
                "name": "Full Name",
                "email": "Email",
                "password": "Password",
                "submit": "Sign Up",
                "switchToLogin": "Already have an account? Sign in"
            }
        }
    },
    "es": {
        "nav": {
            "home": "Inicio",
            "about": "Acerca de",
            "stats": "Estadísticas",
            "join": "Unirse",
            "contact": "Contacto",
            "reviews": "Reseñas"
        },
        "hero": {
            "title": "💎 Únete a PI Network - con Rodriguez",
            "subtitle": "Mina la primera criptomoneda gratuita en tu teléfono móvil - 47M+ pioneros en el mundo",
            "cta": "Comenzar Ahora"
        },
        "about": {
            "title": "¿Qué es PI crypto?",
            "features": {
                "mobile": {
                    "title": "Minería Móvil",
                    "description": "Mina monedas PI directamente desde tu smartphone sin agotar tu batería ni consumir tus datos."
                },
                "community": {
                    "title": "Comunidad Global",
                    "description": "Únete a más de 47 millones de pioneros en todo el mundo que están construyendo el ecosistema PI."
                },
                "secure": {
                    "title": "Seguro",
                    "description": "Desarrollado por doctores de Stanford con un protocolo de consenso innovador y seguro."
                },
                "free": {
                    "title": "Gratis",
                    "description": "Comienza a minar gratis hoy. No se requiere inversión inicial."
                },
                "growth": {
                    "title": "Potencial de Crecimiento",
                    "description": "Entra temprano en el ecosistema antes del lanzamiento oficial en los exchanges."
                },
                "referral": {
                    "title": "Referidos",
                    "description": "Gana más PI invitando a tus amigos y construyendo tu red de seguridad."
                }
            }
        },
        "stats": {
            "title": "PI crypto en Números",
            "pioneers": "Pioneros Activos",
            "countries": "Países Representados",
            "apps": "Aplicaciones Desarrolladas",
            "launch": "Año de Lanzamiento"
        },
        "steps": {
            "title": "Cómo Unirse a PI crypto",
            "step1": {
                "title": "Descarga la App",
                "description": "Descarga la aplicación PI crypto desde la App Store o Google Play Store."
            },
            "step2": {
                "title": "Usa mi Código",
                "description": "Al registrarte, usa mi código de referido: Rodriguez003"
            },
            "step3": {
                "title": "Comienza a Minar",
                "description": "Toca el botón de minería una vez al día para comenzar a ganar monedas PI."
            },
            "step4": {
                "title": "Invita a tus Amigos",
                "description": "Comparte tu propio código de referido para aumentar tu tasa de minería."
            },
        },
        "footer": {
            "copyright": "© 2024 PI crypto - Únete a la revolución crypto con Rodriguez003",
            "disclaimer": "⚠️ PI crypto aún está en fase de desarrollo. Las monedas PI aún no tienen valor monetario."
        },
        "contact": {
            "title": "Contáctanos",
            "subtitle": "¿Tienes una pregunta? ¡Estamos aquí para ayudarte!",
            "form": {
                "name": "Nombre Completo",
                "email": "Email",
                "subject": "Asunto",
                "message": "Mensaje",
                "submit": "Enviar"
            },
            "info": {
                "title": "Información de Contacto",
                "email": "Email: s16programmeomega@gmail.com",
                "response": "Respondemos en 24h",
                "support": "Soporte disponible 24/7"
            }
        },
        "reviews": {
            "title": "Reseñas de Usuarios",
            "subtitle": "Descubre lo que piensan nuestros usuarios sobre PI Network",
            "addReview": "Agregar Reseña",
            "form": {
                "name": "Tu nombre",
                "rating": "Calificación",
                "comment": "Tu comentario",
                "submit": "Publicar Reseña"
            },
            "noReviews": "No hay reseñas aún. ¡Sé el primero en dejar una reseña!"
        },
        "messages": {
            "title": "Mensajes",
            "subtitle": "Chatea directamente con Rodriguez",
            "loginRequired": "Inicia sesión para enviar mensajes",
            "placeholder": "Escribe tu mensaje...",
            "send": "Enviar",
            "admin": "Rodriguez (Admin)"
        },
        "auth": {
            "login": "Iniciar Sesión",
            "register": "Registrarse",
            "logout": "Cerrar Sesión",
            "welcome": "Bienvenido",
            "have": {
                "account": "¿Ya tienes cuenta?"
            },
            "no": {
                "account": "¿No tienes cuenta?"
            },
            "loginForm": {
                "title": "Iniciar Sesión",
                "email": "Email",
                "password": "Contraseña",
                "submit": "Entrar",
                "switchToRegister": "¿No tienes cuenta? Regístrate"
            },
            "registerForm": {
                "title": "Registrarse",
                "name": "Nombre Completo",
                "email": "Email",
                "password": "Contraseña",
                "submit": "Registrarse",
                "switchToLogin": "¿Ya tienes cuenta? Inicia sesión"
            }
        }
    }
};

// Initialize translations
function initTranslations() {
    // Get saved language or use browser language
    const savedLang = localStorage.getItem('picrypto-language');
    const browserLang = navigator.language.substring(0, 2);
    currentLanguage = savedLang || (translations[browserLang] ? browserLang : 'fr');
    
    // Set language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    // Apply translations
    applyTranslations();
}

// Helper function to get nested translation
function getNestedTranslation(obj, key) {
    const keys = key.split('.');
    let result = obj;
    
    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return null;
        }
    }
    
    return result;
}

// Apply translations to the page
function applyTranslations() {
    console.log('applyTranslations called with language:', currentLanguage);
    const elements = document.querySelectorAll('[data-translate]');
    console.log('Found elements with data-translate:', elements.length);
    
    elements.forEach((element, index) => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        console.log(`Element ${index}: key="${key}", translation="${translation}"`);
        if (translation) {
            element.textContent = translation;
        } else {
            console.warn(`No translation found for key: ${key}`);
        }
    });
    
    // Update document language
    document.documentElement.lang = currentLanguage;
    
    // Update page title
    const titles = {
        'fr': 'PI crypto - Rejoignez la Révolution Crypto 🚀',
        'en': 'PI crypto - Join the Crypto Revolution 🚀',
        'es': 'PI crypto - Únete a la Revolución Crypto 🚀'
    };
    document.title = titles[currentLanguage];
    console.log('Page title updated to:', document.title);
}

// Initialize auth buttons
function initAuthButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showAuthModal('login'));
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Setup auth form event listeners (use correct form IDs)
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');
    
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', handleLogin);
    }
    
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', handleRegister);
    }
    
    // Setup modal switch buttons
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('register');
        });
    }
    
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
}

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...');
    
    // Initialize translations first
    initTranslations();
    console.log('Current language:', currentLanguage);
    console.log('Translations object:', translations[currentLanguage]);
    
    // Test translation function
    const testTranslation = getNestedTranslation(translations[currentLanguage], 'nav.home');
    console.log('Test translation nav.home:', testTranslation);
    
    // Initialize other components
    initScrollAnimations();
    initAuth();
    initContactForm();
    initReviews();
    initMessages();
    initModals();
    initAuthButtons();
    
    // Setup language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        console.log('Language selector found');
        languageSelect.addEventListener('change', (e) => {
            console.log('Language changed to:', e.target.value);
            currentLanguage = e.target.value;
            localStorage.setItem('picrypto-language', currentLanguage);
            applyTranslations();
            updateCopyMessage();
        });
    } else {
        console.error('Language selector not found!');
    }
    
    // Force initial translation after a small delay
    setTimeout(() => {
        console.log('Applying translations...');
        applyTranslations();
        
        // Check if translations were applied
        const firstElement = document.querySelector('[data-translate]');
        if (firstElement) {
            console.log('First translatable element:', firstElement.getAttribute('data-translate'), '=', firstElement.textContent);
        }
    }, 200);
});

// Update copy message based on language
function updateCopyMessage() {
    const copyMessages = {
        'fr': 'Code copié ! ✅',
        'en': 'Code copied! ✅',
        'es': '¡Código copiado! ✅'
    };
    window.copyMessage = copyMessages[currentLanguage];
}

// Smooth Scrolling - Initialize after DOM is loaded
function initScrollAnimations() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // Check if href is valid (not just '#')
            if (href && href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Fade in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Copy referral code functionality
document.querySelector('.referral-code').addEventListener('click', function() {
    navigator.clipboard.writeText('Rodriguez003').then(() => {
        const originalText = this.textContent;
        const copyMessage = window.copyMessage || 'Code copié ! ✅';
        this.textContent = copyMessage;
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
});
