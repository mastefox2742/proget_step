/**
 * ============================================================
 *  models/Order.js — Schéma Mongoose pour les commandes
 * ============================================================
 */

'use strict';

const mongoose = require('mongoose');

// ── Sous-schéma : un article dans la commande ─────────────────
const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    name:      { type: String, required: true },
    variant:   { type: String, required: true }, // ex: "A3", "A4 + Cadre"
    collection:{ type: String, default: '' },
    qty:       { type: Number, required: true, min: 1 },
    priceFcfa: { type: Number, required: true }, // Prix unitaire FCFA
    priceEur:  { type: Number, required: true }, // Prix unitaire EUR
    img:       { type: String, default: '' },
  },
  { _id: false } // Pas d'_id pour les sous-documents articles
);

// ── Sous-schéma : adresse de livraison ───────────────────────
const shippingAddressSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName:  String,
    email:     String,
    phone:     { type: String, default: '' },
    address:   String,
    zip:       String,
    city:      String,
    country:   { type: String, default: 'Congo' },
  },
  { _id: false }
);

// ── Schéma principal de la commande ───────────────────────────
const orderSchema = new mongoose.Schema(
  {
    // Référence au client (null si invité)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // Identifiant lisible (ex: CMD-1748293847652)
    orderRef: {
      type: String,
      unique: true,
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: v => Array.isArray(v) && v.length > 0,
        message: 'La commande doit contenir au moins un article.',
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    // Totaux
    totalFcfa: { type: Number, required: true },
    totalEur:  { type: Number, required: true },

    // Mode de paiement choisi par le client
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'momo', 'airtel', 'pending'],
      default: 'pending',
    },

    // Statut de la commande
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending',
    },

    // Référence de paiement externe (ID Stripe, PayPal, etc.)
    paymentRef: { type: String, default: '' },

    // Notes internes (admin)
    notes: { type: String, default: '' },
  },
  {
    timestamps: true, // createdAt = date de commande, updatedAt = dernière modif
  }
);

// ── Index pour accélérer les recherches ───────────────────────
orderSchema.index({ userId: 1, createdAt: -1 }); // Commandes d'un client, plus récentes d'abord
orderSchema.index({ orderRef: 1 });

module.exports = mongoose.model('Order', orderSchema);
