/**
 * ============================================================
 *  routes/auth.js — Endpoints d'authentification
 *
 *  POST   /api/auth/register   → Inscription
 *  POST   /api/auth/login      → Connexion
 *  GET    /api/auth/me         → Profil (protégé)
 * ============================================================
 */

'use strict';

const express    = require('express');
const router     = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect }                = require('../middleware/authMiddleware');

// ── Routes publiques ──────────────────────────────────────────
router.post('/register', register);
router.post('/login',    login);

// ── Routes protégées (JWT requis) ────────────────────────────
router.get('/me', protect, getMe);

module.exports = router;
