/**
 * ============================================================
 *  middleware/authMiddleware.js
 *  Vérifie la validité du JWT avant d'accéder aux routes protégées
 * ============================================================
 */

'use strict';

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

/**
 * protect — Middleware de protection des routes
 *
 * Utilisation : router.get('/mes-commandes', protect, controller)
 *
 * Attendu dans les headers :
 *   Authorization: Bearer <token>
 */
const protect = async (req, res, next) => {
  try {
    // ── 1. Récupération du token depuis le header Authorization ──
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Accès refusé. Aucun token fourni. Veuillez vous connecter.',
      });
    }

    const token = authHeader.split(' ')[1];

    // ── 2. Vérification et décodage du token ─────────────────────
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Session expirée. Veuillez vous reconnecter.',
          code: 'TOKEN_EXPIRED',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Token invalide. Veuillez vous reconnecter.',
        code: 'TOKEN_INVALID',
      });
    }

    // ── 3. Vérification que l'utilisateur existe toujours en BDD ──
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur introuvable. Le compte a peut-être été supprimé.',
      });
    }

    // ── 4. Injection de l'utilisateur dans la requête ─────────────
    // req.user est maintenant disponible dans tous les controllers suivants
    req.user = user;
    next();

  } catch (err) {
    console.error('🔴 Erreur middleware auth :', err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur interne lors de la vérification de l\'authentification.',
    });
  }
};

/**
 * restrictTo — Middleware de restriction par rôle
 *
 * Utilisation : router.delete('/user/:id', protect, restrictTo('admin'), controller)
 */
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Vous n\'avez pas les permissions nécessaires pour cette action.',
    });
  }
  next();
};

module.exports = { protect, restrictTo };
