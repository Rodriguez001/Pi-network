// Internationalization System
let currentLanguage = 'fr';

// Translations embedded directly
const translations = {
    "fr": {
        "nav": {
            "home": "Accueil",
            "about": "À propos",
            "stats": "Statistiques",
            "join": "Rejoindre"
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
        }
    },
    "en": {
        "nav": {
            "home": "Home",
            "about": "About",
            "stats": "Statistics",
            "join": "Join"
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
            "qr": {
                "title": "Or scan this QR Code:",
                "description": "Scan with your phone to directly access the registration link"
            }
        },
        "footer": {
            "copyright": "© 2024 PI crypto - Join the crypto revolution with Rodriguez003",
            "disclaimer": "⚠️ PI crypto is still in development phase. PI coins do not yet have monetary value."
        }
    },
    "es": {
        "nav": {
            "home": "Inicio",
            "about": "Acerca de",
            "stats": "Estadísticas",
            "join": "Unirse"
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
            "qr": {
                "title": "O escanea este Código QR:",
                "description": "Escanea con tu teléfono para acceder directamente al enlace de registro"
            }
        },
        "footer": {
            "copyright": "© 2024 PI crypto - Únete a la revolución crypto con Rodriguez003",
            "disclaimer": "⚠️ PI crypto aún está en fase de desarrollo. Las monedas PI aún no tienen valor monetario."
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

// Apply translations to the page
function applyTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        if (translation) {
            element.textContent = translation;
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
}

// Get nested translation value
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Language selector event
document.addEventListener('DOMContentLoaded', () => {
    // Initialize translations first
    initTranslations();
    
    // Initialize QR Code
    setTimeout(initQRCode, 100);
    
    // Setup language selector
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('picrypto-language', currentLanguage);
            applyTranslations();
            updateCopyMessage();
        });
    }
    
    // Force initial translation after a small delay
    setTimeout(() => {
        applyTranslations();
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

// Initialize QR Code after DOM is loaded
function initQRCode() {
    const qrElement = document.getElementById('qrcode');
    if (qrElement) {
        const qr = new QRious({
            element: qrElement,
            value: 'https://minepi.com/Rodriguez003',
            size: 200,
            background: 'white',
            foreground: '#e94560'
        });
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

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
