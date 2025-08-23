# Configuration des Variables d'Environnement

## 📋 Fichiers créés

- **`.env`** - Variables d'environnement locales (ignoré par Git)
- **`.env.example`** - Modèle de configuration pour référence

## 🔐 Variables configurées

### JWT_SECRET
- **Valeur actuelle** : `pi-network-rodriguez003-super-secure-jwt-secret-key-2024`
- **Usage** : Signature des tokens JWT pour l'authentification
- **Sécurité** : Clé de 52 caractères pour une sécurité optimale

### GMAIL_USER
- **Valeur** : `s16programmeomega@gmail.com`
- **Usage** : Adresse email pour l'envoi des messages de contact

### GMAIL_PASS
- **Valeur** : `your-gmail-app-password-here`
- **Action requise** : ⚠️ Remplacez par votre mot de passe d'application Gmail

## 🚀 Configuration Netlify

Pour que les variables d'environnement fonctionnent sur Netlify :

1. Allez dans votre dashboard Netlify
2. Sélectionnez votre site PI Network
3. **Site settings** → **Environment variables**
4. Ajoutez ces variables :
   - `JWT_SECRET` : `pi-network-rodriguez003-super-secure-jwt-secret-key-2024`
   - `GMAIL_USER` : `s16programmeomega@gmail.com`
   - `GMAIL_PASS` : Votre mot de passe d'application Gmail

## 📧 Configuration Gmail

Pour obtenir un mot de passe d'application Gmail :

1. Activez la **vérification en 2 étapes** sur votre compte Google
2. Allez dans **Paramètres du compte Google** → **Sécurité**
3. Cliquez sur **Mots de passe des applications**
4. Générez un mot de passe pour "PI Network Site"
5. Remplacez `your-gmail-app-password-here` par ce mot de passe

## ✅ Vérification

Une fois configuré, votre site aura :
- **Authentification sécurisée** avec JWT
- **Formulaire de contact** fonctionnel
- **Toutes les fonctionnalités** opérationnelles
