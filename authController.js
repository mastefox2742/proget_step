/**
 * ============================================================
 *  controllers/authController.js
 *  Logique métier pour l'inscription et la connexion
 * ============================================================
 */

'use strict';

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── Utilitaire : génère un JWT signé ─────────────────────────
function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// ── Utilitaire : formate la réponse utilisateur ───────────────
function userResponse(user, token) {
  return {
    success: true,
    token,
    user: {
      id:        user._id,
      firstName: user.firstName,
      lastName:  user.lastName,
      email:     user.email,
      phone:     user.phone,
      role:      user.role,
      newsletter:user.newsletter,
      createdAt: user.createdAt,
    },
  };
}

/**
 * POST /api/auth/register
 * Crée un nouveau compte client
 *
 * Body attendu :
 *   { firstName, lastName, email, phone, password, newsletter }
 */
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, newsletter } = req.body;

    // ── Validation des champs obligatoires ───────────────────
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Prénom, nom, email et mot de passe sont obligatoires.',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
      });
    }

    // ── Vérification de l'unicité de l'email ─────────────────
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Un compte avec cet email existe déjà. Connectez-vous.',
        code: 'EMAIL_TAKEN',
      });
    }

    // ── Création du compte (le mot de passe sera haché par le hook pre-save) ──
    const newUser = await User.create({
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.toLowerCase().trim(),
      phone:     phone?.trim() || '',
      password,
      newsletter: newsletter || false,
    });

    // ── Génération du token JWT ────────────────────────────────
    const token = generateToken(newUser._id);

    console.log(`✅ Nouveau compte créé : ${newUser.email}`);

    res.status(201).json(userResponse(newUser, token));

  } catch (err) {
    // Gestion des erreurs de validation Mongoose
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(' ') });
    }
    // Erreur de clé dupliquée MongoDB (race condition)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Un compte avec cet email existe déjà.',
      });
    }

    console.error('🔴 Erreur register :', err.message);
    res.status(500).json({ success: false, message: 'Erreur lors de la création du compte.' });
  }
};

/**
 * POST /api/auth/login
 * Connecte un utilisateur existant
 *
 * Body attendu : { email, password }
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Validation ────────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis.',
      });
    }

    // ── Recherche de l'utilisateur (avec le mot de passe) ─────
    // On réactive le select du mot de passe (désactivé par défaut dans le schéma)
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      // Message volontairement vague pour éviter l'énumération d'emails
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.',
      });
    }

    // ── Vérification du mot de passe avec bcrypt ───────────────
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.',
      });
    }

    // ── Génération du token JWT ────────────────────────────────
    const token = generateToken(user._id);

    console.log(`✅ Connexion réussie : ${user.email}`);

    res.status(200).json(userResponse(user, token));

  } catch (err) {
    console.error('🔴 Erreur login :', err.message);
    res.status(500).json({ success: false, message: 'Erreur lors de la connexion.' });
  }
};

/**
 * GET /api/auth/me
 * Retourne le profil de l'utilisateur connecté (route protégée)
 */
exports.getMe = async (req, res) => {
  // req.user est injecté par le middleware protect
  res.status(200).json({
    success: true,
    user: req.user.toSafeObject ? req.user.toSafeObject() : req.user,
  });
};
