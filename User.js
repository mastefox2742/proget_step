/**
 * ============================================================
 *  models/User.js — Schéma Mongoose pour les clients
 * ============================================================
 */

'use strict';

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

// Nombre de tours de hachage bcrypt (plus élevé = plus sûr, mais plus lent)
// 12 est un bon compromis sécurité / performance en 2024
const SALT_ROUNDS = 12;

// ── Schéma utilisateur ────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Le prénom est obligatoire.'],
      trim: true,
      maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères.'],
    },
    lastName: {
      type: String,
      required: [true, 'Le nom est obligatoire.'],
      trim: true,
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères.'],
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire."],
      unique: true,
      lowercase: true,   // Stocké en minuscules pour éviter les doublons
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer un email valide.'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
      maxlength: [20, 'Le numéro de téléphone est trop long.'],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire.'],
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères.'],
      // select: false → le mot de passe n'est JAMAIS renvoyé dans les requêtes
      select: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    },
    // Adresses de livraison sauvegardées
    addresses: [
      {
        label:    { type: String, default: 'Domicile' },
        address:  String,
        zip:      String,
        city:     String,
        country:  { type: String, default: 'Congo' },
      },
    ],
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// ── Hook pre-save : hachage du mot de passe avant sauvegarde ──
userSchema.pre('save', async function (next) {
  // Ne rehache que si le mot de passe a été modifié
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err);
  }
});

// ── Méthode d'instance : vérification du mot de passe ─────────
userSchema.methods.verifyPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// ── Méthode : retourne l'objet sans données sensibles ─────────
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
