/* ============================================================
   MAIN.JS — MH PICTURE
   Partagé entre toutes les pages HTML
   ============================================================
   ★ Auth connecté au backend Node.js via fetch + JWT
   ★ Mettez à jour API_BASE_URL selon votre déploiement
   ============================================================ */

// ── URL de votre API backend ──────────────────────────────────
// Local      : http://localhost:3000
// Railway    : https://mhpicture-backend.up.railway.app  ← remplacez
const API_BASE_URL = 'http://localhost:3000';

// ══════════════════════════════════════════════════════════════
// TARIFICATION PAR FORMAT (FCFA)
// ══════════════════════════════════════════════════════════════
const SIZE_PRICES = {
  A5: 3500,
  A4: 7000,
  A3: 15000,
  A2: 25000,
};
const DEFAULT_SIZE = 'A3';
const FCFA_TO_EUR = 1 / 655.957;

function fcfaToEur(fcfa) { return Math.round(fcfa * FCFA_TO_EUR * 100) / 100; }
function fmtFcfa(fcfa)   { return fcfa.toLocaleString('fr-FR') + ' FCFA'; }
function getPriceFcfa(size) { return SIZE_PRICES[size] ?? SIZE_PRICES[DEFAULT_SIZE]; }

// ══════════════════════════════════════════════════════════════
// PRODUITS — 20 affiches bibliques MH PICTURE
//
// Prix par format (FCFA) :
//   A5 = 3 500 FCFA
//   A4 = 7 000 FCFA
//   A3 = 15 000 FCFA  ← affiché par défaut sur les cartes
//   A2 = 25 000 FCFA
//
// Pour ajouter une image : remplacez img:"images0X.jpg"
// par le nom de votre fichier image (placé à la racine du site).
// ══════════════════════════════════════════════════════════════
const PRODUCTS = [

  // ── ÉVANGILES ────────────────────────────────────────────────
  {
    id: 1,
    name:        "Luc 18:1 – Toujours Prier",
    collection:  "Évangiles",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Nouveau",
    img:         "image01.jpg",
    colors:      ["#D4C4A8", "#8B7355", "#2C2C2A"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Il faut toujours prier et ne point se relâcher. » Luc 18:1 — Affiche élégante, impression premium 250g."
  },
  {
    id: 2,
    name:        "Jean 3:16 – Dieu a tant aimé",
    collection:  "Évangiles",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Bestseller",
    img:         "images02.jpg",
    colors:      ["#C4A882", "#7A5C38", "#F0E8D8"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Car Dieu a tant aimé le monde qu'il a donné son Fils unique. » Jean 3:16 — Le verset le plus célèbre au monde."
  },
  {
    id: 3,
    name:        "Matthieu 11:28 – Venez à Moi",
    collection:  "Évangiles",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images03.jpg",
    colors:      ["#B8C4A8", "#5A6A4A", "#E8EDD8"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. » Matthieu 11:28."
  },
  {
    id: 4,
    name:        "Jean 14:6 – Je suis le Chemin",
    collection:  "Évangiles",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Nouveau",
    img:         "images04.jpg",
    colors:      ["#A8B4C4", "#384858", "#D8E0E8"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Je suis le chemin, la vérité et la vie. » Jean 14:6 — Design sobre et contemporain."
  },

  // ── PSAUMES ──────────────────────────────────────────────────
  {
    id: 5,
    name:        "Psaumes 23:1 – Mon Berger",
    collection:  "Psaumes",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Bestseller",
    img:         "images05.jpg",
    colors:      ["#4A6A8A", "#2C3E50", "#7FA8C4"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« L'Éternel est mon berger : je ne manquerai de rien. » Psaumes 23:1 — Notre affiche la plus vendue."
  },
  {
    id: 6,
    name:        "Psaumes 23:2 – Verts Pâturages",
    collection:  "Psaumes",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images06.jpg",
    colors:      ["#5A8A5A", "#2C5C2C", "#8AB48A"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles. » Psaumes 23:2."
  },
  {
    id: 7,
    name:        "Psaumes 1:1-3 – Arbre Planté",
    collection:  "Psaumes",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images07.jpg",
    colors:      ["#4A8A4A", "#1C5C1C", "#7AB47A"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Il est comme un arbre planté près d'un courant d'eau. » Psaumes 1:3 — Symbole de prospérité spirituelle."
  },
  {
    id: 8,
    name:        "Psaumes 93:4 – L'Éternel est Puissant",
    collection:  "Psaumes",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images08.jpg",
    colors:      ["#2A4A8A", "#1A2C5C", "#4A6AB4"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Plus que la voix des grandes eaux, l'Éternel est puissant dans les lieux célestes. » Psaumes 93:4."
  },
  {
    id: 9,
    name:        "Psaumes 46:1 – Dieu est notre Refuge",
    collection:  "Psaumes",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Nouveau",
    img:         "images09.jpg",
    colors:      ["#8A6A4A", "#5C3C1C", "#B4946A"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse. » Psaumes 46:1."
  },
  {
    id: 10,
    name:        "Psaumes 91:1 – À l'Ombre du Tout-Puissant",
    collection:  "Psaumes",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images10.jpg",
    colors:      ["#6A4A8A", "#3C1C5C", "#9470B4"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant. » Psaumes 91:1."
  },
  {
    id: 11,
    name:        "Psaumes 118:24 – Ce Jour que l'Éternel a Fait",
    collection:  "Psaumes",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images11.jpg",
    colors:      ["#C4A840", "#8A7010", "#F0D870"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« C'est ici la journée que l'Éternel a faite : qu'elle soit pour nous un sujet d'allégresse et de joie ! » Psaumes 118:24."
  },

  // ── ANCIEN TESTAMENT ─────────────────────────────────────────
  {
    id: 12,
    name:        "Exode 14:14 – L'Éternel combattra pour vous",
    collection:  "Ancien Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Nouveau",
    img:         "images12.jpg",
    colors:      ["#4A7FA5", "#1A3A5C", "#A8C4D4"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« L'Éternel combattra pour vous ; et vous, gardez le silence. » Exode 14:14 — Force et confiance."
  },
  {
    id: 13,
    name:        "Josué 1:9 – Fortifie-toi et Prends Courage",
    collection:  "Ancien Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Bestseller",
    img:         "images13.jpg",
    colors:      ["#8A4A2A", "#5C2A0A", "#B4744A"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Fortifie-toi et prends courage ! Ne t'effraie point et ne t'épouvante point. » Josué 1:9."
  },
  {
    id: 14,
    name:        "Ésaïe 40:31 – Ils Prendront leur Essor",
    collection:  "Ancien Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images14.jpg",
    colors:      ["#4A6A9A", "#1A3A6C", "#7AA0C4"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent leur essor comme les aigles. » Ésaïe 40:31."
  },
  {
    id: 15,
    name:        "Jérémie 29:11 – Des Projets de Paix",
    collection:  "Ancien Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images15.jpg",
    colors:      ["#6A8A5A", "#3A5A2A", "#9AB47A"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Car je connais les projets que j'ai formés sur vous, projets de paix et non de malheur. » Jérémie 29:11."
  },

  // ── NOUVEAU TESTAMENT ────────────────────────────────────────
  {
    id: 16,
    name:        "3 Jean 1:2 – Prospère en Toutes Choses",
    collection:  "Nouveau Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Nouveau",
    img:         "images16.jpg",
    colors:      ["#6B8F71", "#2D5A3D", "#A8C4A2"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Bien-aimé, je souhaite que tu prospères à tous égards et que tu sois en bonne santé. » 3 Jean 1:2."
  },
  {
    id: 17,
    name:        "Philippiens 4:13 – Je Peux Tout",
    collection:  "Nouveau Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       "Bestseller",
    img:         "images17.jpg",
    colors:      ["#C4882A", "#8A5A00", "#F0B450"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Je puis tout par celui qui me fortifie. » Philippiens 4:13 — L'affiche de la persévérance et de la foi."
  },
  {
    id: 18,
    name:        "Romains 8:28 – Toutes Choses Concourent au Bien",
    collection:  "Nouveau Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images18.jpg",
    colors:      ["#8A7AAA", "#4A3A6A", "#B4A8CC"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Toutes choses concourent au bien de ceux qui aiment Dieu. » Romains 8:28 — Une promesse de confiance absolue."
  },
  {
    id: 19,
    name:        "Galates 5:22 – Les Fruits de l'Esprit",
    collection:  "Nouveau Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images19.jpg",
    colors:      ["#7AA870", "#3A6830", "#A8CC9A"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Amour, joie, paix, patience, bonté, bienveillance, foi, douceur, tempérance. » Galates 5:22-23."
  },
  {
    id: 20,
    name:        "Apocalypse 21:4 – Il Essuiera Toute Larme",
    collection:  "Nouveau Testament",
    price:       fcfaToEur(SIZE_PRICES[DEFAULT_SIZE]),
    priceFcfa:   SIZE_PRICES[DEFAULT_SIZE],
    originalPrice: null,
    badge:       null,
    img:         "images20.jpg",
    colors:      ["#7A8AAA", "#3A4A6A", "#A8B4CC"],
    sizes:       ["A5", "A4", "A3", "A2"],
    description: "« Il essuiera toute larme de leurs yeux, et la mort ne sera plus. » Apocalypse 21:4 — Espérance éternelle."
  },
];

// ══════════════════════════════════════════════════════════════
// AUTH — Connecté au backend Node.js via fetch + JWT
// ══════════════════════════════════════════════════════════════
const Auth = {

  TOKEN_KEY:   'hosarah_token',
  SESSION_KEY: 'hosarah_session',

  /* ── Headers avec JWT ── */
  _headers() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  },

  /* ── Sauvegarde token + session en local ── */
  _saveSession(token, user) {
    localStorage.setItem(this.TOKEN_KEY,   token);
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  },

  /* ── Retourne l'utilisateur depuis le cache local ── */
  getUser() {
    const raw = localStorage.getItem(this.SESSION_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },

  /* ── Vérifie si connecté ── */
  isLoggedIn() {
    return !!localStorage.getItem(this.TOKEN_KEY) && this.getUser() !== null;
  },

  /* ────────────────────────────────────────────────────────
     INSCRIPTION via POST /api/auth/register
  ──────────────────────────────────────────────────────── */
  async register({ firstName, lastName, email, phone, password, newsletter }) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, password, newsletter }),
      });
      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message || 'Erreur lors de l\'inscription.' };
      this._saveSession(data.token, data.user);
      console.log('✅ Compte créé :', data.user.email);
      return { success: true, user: data.user };
    } catch (err) {
      console.error('🔴 Erreur réseau register :', err.message);
      return { success: false, message: 'Impossible de contacter le serveur. Vérifiez votre connexion.' };
    }
  },

  /* ────────────────────────────────────────────────────────
     CONNEXION via POST /api/auth/login
  ──────────────────────────────────────────────────────── */
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message || 'Identifiants incorrects.' };
      this._saveSession(data.token, data.user);
      console.log('✅ Connecté :', data.user.email);
      return { success: true, user: data.user };
    } catch (err) {
      console.error('🔴 Erreur réseau login :', err.message);
      return { success: false, message: 'Impossible de contacter le serveur. Vérifiez votre connexion.' };
    }
  },

  /* ── DÉCONNEXION ── */
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.SESSION_KEY);
    console.log('👋 Déconnecté');
  },

  /* ────────────────────────────────────────────────────────
     ENREGISTRER UNE COMMANDE via POST /api/orders
     Appelé après paiement réussi (Stripe, MoMo, Airtel…)
  ──────────────────────────────────────────────────────── */
  async saveOrder(orderData) {
    if (!this.isLoggedIn()) {
      console.warn('⚠️ Commande non sauvegardée : utilisateur non connecté.');
      return { success: false, message: 'Non connecté.' };
    }
    try {
      const items = orderData.items || [];
      const payload = {
        items,
        shippingAddress: {
          firstName: orderData.customer?.firstName || '',
          lastName:  orderData.customer?.lastName  || '',
          email:     orderData.customer?.email     || '',
          phone:     orderData.customer?.phone     || '',
          address:   orderData.customer?.address   || '',
          zip:       orderData.customer?.zip       || '',
          city:      orderData.customer?.city      || '',
        },
        totalFcfa: items.reduce((s, i) => s + (i.priceFcfa || Math.round((i.price || 0) * 655.957)) * i.qty, 0),
        totalEur:  items.reduce((s, i) => s + (i.price || 0) * i.qty, 0),
        paymentMethod: orderData.paymentMethod || 'pending',
        paymentRef:    orderData.paymentRef    || '',
      };
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method:  'POST',
        headers: this._headers(),
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) { console.error('🔴 Erreur commande :', data.message); return { success: false, message: data.message }; }
      console.log('📦 Commande enregistrée :', data.order?.orderRef);
      return { success: true, orderRef: data.order?.orderRef };
    } catch (err) {
      console.error('🔴 Erreur réseau saveOrder :', err.message);
      return { success: false, message: 'Erreur réseau lors de l\'enregistrement.' };
    }
  },

  /* ────────────────────────────────────────────────────────
     RÉCUPÉRER LES COMMANDES via GET /api/orders/my-orders
  ──────────────────────────────────────────────────────── */
  async getOrders() {
    if (!this.isLoggedIn()) return [];
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
        method:  'GET',
        headers: this._headers(),
      });
      if (response.status === 401) { this.logout(); return []; }
      const data = await response.json();
      return data.success ? (data.orders || []) : [];
    } catch (err) {
      console.error('🔴 Erreur réseau getOrders :', err.message);
      return [];
    }
  },

  /* ── MISE À JOUR DU PROFIL (cache local) ── */
  updateUser(updatedData) {
    const current = this.getUser();
    if (!current) return;
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({ ...current, ...updatedData }));
  },

  /* ── Méthodes conservées pour compatibilité compte.html ── */
  checkPassword()  { return true; }, // délégué au backend en production
  updatePassword() { console.warn('updatePassword : à connecter au backend /api/auth/me'); },
  deleteAccount()  { this.logout(); },
};

// ══════════════════════════════════════════════════════════════
// CART
// ══════════════════════════════════════════════════════════════
const Cart = {
  getItems()        { return JSON.parse(localStorage.getItem('hosarah_cart') || '[]'); },
  saveItems(items)  { localStorage.setItem('hosarah_cart', JSON.stringify(items)); this.updateBadge(); },
  addItem(productId, qty = 1, variant = DEFAULT_SIZE) {
    const items   = this.getItems();
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const sizeKey   = variant.split(' ')[0];
    const priceFcfa = getPriceFcfa(sizeKey);
    const priceEur  = fcfaToEur(priceFcfa);
    const key       = `${productId}-${variant}`;
    const existing  = items.find(i => i.key === key);
    if (existing) { existing.qty += qty; }
    else { items.push({ key, id:productId, qty, variant, name:product.name, collection:product.collection, price:priceEur, priceFcfa, img:product.img }); }
    this.saveItems(items);
    showToast(`"${product.name}" (${variant}) — ${fmtFcfa(priceFcfa)} ajouté au panier ✓`);
    renderCartSidebar();
  },
  removeItem(key)   { this.saveItems(this.getItems().filter(i => i.key !== key)); renderCartSidebar(); },
  updateQty(key, delta) {
    const items = this.getItems();
    const item  = items.find(i => i.key === key);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    this.saveItems(items);
    renderCartSidebar();
  },
  getTotal()  { return this.getItems().reduce((s, i) => s + i.price * i.qty, 0); },
  getCount()  { return this.getItems().reduce((s, i) => s + i.qty, 0); },
  clear()     { this.saveItems([]); renderCartSidebar(); },
  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent   = count;
      b.style.display = count === 0 ? 'none' : 'flex';
    });
  },
};

// ══════════════════════════════════════════════════════════════
// RENDER CART SIDEBAR
// ══════════════════════════════════════════════════════════════
function renderCartSidebar() {
  const body  = document.getElementById('cart-body');
  const foot  = document.getElementById('cart-foot');
  const items = Cart.getItems();
  if (!body) return;

  if (items.length === 0) {
    body.innerHTML = `<div class="cart-empty-msg"><div class="empty-icon">🛒</div><p>Votre panier est vide.<br>Découvrez nos affiches bibliques.</p></div>`;
    if (foot) foot.style.display = 'none';
    return;
  }

  body.innerHTML = items.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='#EDE9DC';this.removeAttribute('src')">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">${item.variant} · ${item.collection}</div>
        <div class="cart-item-price">${fmtFcfa((item.priceFcfa || Math.round(item.price / FCFA_TO_EUR)) * item.qty)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="Cart.updateQty('${item.key}', -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="Cart.updateQty('${item.key}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="Cart.removeItem('${item.key}')" title="Supprimer">✕</button>
    </div>`).join('');

  if (foot) {
    foot.style.display = 'block';
    const totalFcfa = items.reduce((s, i) => s + (i.priceFcfa || Math.round(i.price / FCFA_TO_EUR)) * i.qty, 0);
    document.getElementById('cart-subtotal').textContent  = fmtFcfa(totalFcfa);
    document.getElementById('cart-total-amt').textContent = fmtFcfa(totalFcfa);
  }
}

// ══════════════════════════════════════════════════════════════
// RENDER PRODUCT CARD
// ══════════════════════════════════════════════════════════════
function renderProductCard(product) {
  const defaultPriceFcfa = getPriceFcfa(DEFAULT_SIZE);
  const swatches = product.colors.map((c, i) =>
    `<div class="swatch${i===0?' active':''}" style="background:${c}" title="Couleur ${i+1}"></div>`
  ).join('');

  const sizeBtns = product.sizes.map(s => {
    const pFcfa = getPriceFcfa(s);
    return `<button class="card-size-btn${s===DEFAULT_SIZE?' active':''}" data-size="${s}" data-price="${pFcfa}" data-product="${product.id}" onclick="event.stopPropagation();cardSelectSize(this,${product.id})" title="${fmtFcfa(pFcfa)}">${s}</button>`;
  }).join('');

  return `
    <div class="product-card" onclick="window.location='produit.html?id=${product.id}'">
      <div class="card-img-wrap">
        <img class="card-img" src="${product.img}" alt="${product.name}" onerror="this.parentElement.style.background='#EDE9DC';this.style.display='none'">
        ${product.badge ? `<span class="card-badge ${product.badge==='Nouveau'?'new':''}">${product.badge}</span>` : ''}
        <div class="card-actions">
          <button class="btn-add-card" onclick="event.stopPropagation();cardAddToCart(${product.id},this.closest('.product-card'))">Ajouter au panier</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-collection">${product.collection}</div>
        <div class="card-name">${product.name}</div>
        <div class="card-sizes">${sizeBtns}</div>
        <div class="card-price" id="card-price-${product.id}">
          <span class="card-price-fcfa">${fmtFcfa(defaultPriceFcfa)}</span>
          <span class="card-price-size-label"> · ${DEFAULT_SIZE}</span>
        </div>
        <div class="color-swatches">${swatches}</div>
      </div>
    </div>`;
}

function cardSelectSize(btn, productId) {
  const card = btn.closest('.product-card');
  card.querySelectorAll('.card-size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const priceEl = document.getElementById('card-price-' + productId);
  if (priceEl) {
    priceEl.innerHTML = `<span class="card-price-fcfa">${fmtFcfa(parseInt(btn.dataset.price,10))}</span><span class="card-price-size-label"> · ${btn.dataset.size}</span>`;
  }
}

function cardAddToCart(productId, card) {
  const activeBtn = card?.querySelector('.card-size-btn.active');
  Cart.addItem(productId, 1, activeBtn ? activeBtn.dataset.size : DEFAULT_SIZE);
}

// ══════════════════════════════════════════════════════════════
// SUBMIT ORDER — Enregistre en BDD + notifie le vendeur
// Remplace l'ancienne fonction submitOrder() de checkout/modal
// ══════════════════════════════════════════════════════════════
async function submitOrder() {
  const fname   = document.getElementById('co-fname')?.value.trim();
  const lname   = document.getElementById('co-lname')?.value.trim();
  const email   = document.getElementById('co-email')?.value.trim();
  const address = document.getElementById('co-address')?.value.trim();
  const zip     = document.getElementById('co-zip')?.value.trim();
  const city    = document.getElementById('co-city')?.value.trim();

  if (!fname || !lname || !email || !address || !zip || !city) {
    showToast('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  const order = {
    id:       'CMD-' + Date.now(),
    customer: { firstName:fname, lastName:lname, email, address, zip, city },
    items:    Cart.getItems(),
    total:    Cart.getTotal().toFixed(2) + ' €',
    paymentMethod: 'pending',
  };

  // ── Sauvegarde en base de données ────────────────────────
  const saved = await Auth.saveOrder(order);
  if (saved.success) order.id = saved.orderRef || order.id;

  // ── Notification vendeur ──────────────────────────────────
  sendOrderNotification(order);

  // ── Confirmation visuelle ─────────────────────────────────
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.innerHTML = `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:48px;margin-bottom:20px">✓</div>
        <p class="label-caps" style="margin-bottom:8px;color:var(--olive-dark)">Commande confirmée</p>
        <h2 style="font-family:var(--font-display);font-size:26px;margin-bottom:16px">Merci, ${fname} !</h2>
        <p style="font-size:14px;color:var(--gray);line-height:1.7">
          Votre commande <strong>${order.id}</strong> a bien été reçue.<br>
          Confirmation envoyée à <strong>${email}</strong>.
        </p>
        <button onclick="document.getElementById('checkout-modal').classList.remove('open');Cart.clear();"
          class="btn btn-olive" style="margin-top:32px">Fermer</button>
      </div>`;
  }
  console.log('📦 Commande finalisée :', order.id);
}

// ══════════════════════════════════════════════════════════════
// SEND ORDER NOTIFICATION
// ══════════════════════════════════════════════════════════════
function sendOrderNotification(order) {
  console.log('📧 Nouvelle commande :', order.id);

  // EmailJS — décommentez et configurez si vous utilisez EmailJS
  /*
  if (typeof emailjs !== 'undefined') {
    emailjs.send('service_l81hj3q', 'template_f1ufy3l', {
      order_id:       order.id,
      customer_name:  order.customer.firstName + ' ' + order.customer.lastName,
      customer_email: order.customer.email,
      order_details:  JSON.stringify(order.items),
      total:          order.total,
    });
  }
  */
}

// ══════════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════════
function showToast(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ══════════════════════════════════════════════════════════════
// DRAWER / CART TOGGLE
// ══════════════════════════════════════════════════════════════
function toggleDrawer(open) {
  const overlay = document.getElementById('drawer-overlay');
  const drawer  = document.getElementById('nav-drawer');
  if (!overlay || !drawer) return;
  const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');
  overlay.classList.toggle('open', shouldOpen);
  drawer.classList.toggle('open', shouldOpen);
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

function toggleCart(open) {
  const overlay = document.getElementById('drawer-overlay');
  const cart    = document.getElementById('cart-sidebar');
  if (!cart) return;
  const shouldOpen = open !== undefined ? open : !cart.classList.contains('open');
  if (overlay) overlay.classList.toggle('open', shouldOpen);
  cart.classList.toggle('open', shouldOpen);
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
  if (shouldOpen) renderCartSidebar();
}

function closeAll() {
  toggleDrawer(false);
  toggleCart(false);
  document.body.style.overflow = '';
}

function goToAccount() { window.location.href = 'compte.html'; }

// ══════════════════════════════════════════════════════════════
// NEWSLETTER
// ══════════════════════════════════════════════════════════════
function subscribeNewsletter(email, formEl) {
  if (!email || !email.includes('@')) { showToast('Veuillez entrer un email valide.'); return; }
  const subscribers = JSON.parse(localStorage.getItem('MH_subscribers') || '[]');
  if (subscribers.includes(email)) { showToast('Vous êtes déjà inscrit(e) !'); return; }
  subscribers.push(email);
  localStorage.setItem('MH_subscribers', JSON.stringify(subscribers));
  console.log('📧 Nouvel inscrit newsletter :', email);
  if (formEl) {
    formEl.innerHTML = `<p style="font-size:14px;color:var(--olive-dark);font-weight:600">✓ Merci ! Bienvenue dans la famille MH PICTURE.</p>`;
  }
}

// ══════════════════════════════════════════════════════════════
// NAV & FOOTER PARTAGÉS
// ══════════════════════════════════════════════════════════════
function buildSharedNav(activePage) {
  return `
  <div class="announcement-bar">
    ✦ Livraison gratuite à partir de 50€ · Impression haute qualité · Encadrée ou sans cadre ✦
  </div>
  <header class="site-header">
    <div class="nav-inner">
      <div class="nav-left">
        <button class="burger-btn" onclick="toggleDrawer()" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
      <a href="index.html" class="site-logo">MH<em>PI</em>CTURE</a>
      <div class="nav-right">
        <button class="icon-btn" title="Rechercher" onclick="showToast('Recherche bientôt disponible…')">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <button class="icon-btn" title="Mon compte" onclick="goToAccount()">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
        </button>
        <button class="icon-btn" title="Panier" onclick="toggleCart()">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span class="cart-badge" style="display:none">0</span>
        </button>
      </div>
    </div>
  </header>
  <div class="drawer-overlay" id="drawer-overlay" onclick="closeAll()"></div>
  <nav class="nav-drawer" id="nav-drawer">
    <div class="drawer-head">
      <a href="index.html" class="site-logo">MH<em>PI</em>CTURE</a>
      <button class="drawer-close" onclick="toggleDrawer()">✕</button>
    </div>
    <div class="drawer-links">
      <a href="index.html" class="${activePage==='home'?'active':''}">Accueil</a>
      <a href="catalogue.html" class="${activePage==='catalogue'?'active':''}">Boutique</a>
      <a href="catalogue.html?cat=psaumes">Psaumes</a>
      <a href="catalogue.html?cat=evangiles">Évangiles</a>
      <a href="catalogue.html?cat=ancien">Ancien Testament</a>
      <a href="contact.html" class="${activePage==='contact'?'active':''}">Contact</a>
    </div>
    <div style="padding:0 28px 28px;margin-top:auto;border-top:1px solid var(--border);padding-top:24px">
      <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--olive-dark);font-weight:600;margin-bottom:16px">Suivez-nous</p>
      <div class="social-row">
        <a href="#" class="social-btn">📷</a>
        <a href="#" class="social-btn">📘</a>
        <a href="#" class="social-btn">🎵</a>
      </div>
    </div>
  </nav>
  <aside class="cart-sidebar" id="cart-sidebar">
    <div class="cart-head">
      <div>
        <p class="label-caps">Mon panier</p>
        <h3>Votre sélection</h3>
      </div>
      <button class="cart-close" onclick="toggleCart()">✕</button>
    </div>
    <div class="cart-body" id="cart-body"></div>
    <div class="cart-foot" id="cart-foot" style="display:none">
      <div class="cart-subtotal"><span>Sous-total</span><span id="cart-subtotal">0,00 €</span></div>
      <div class="cart-subtotal"><span>Livraison</span><span>Calculée à la commande</span></div>
      <div class="cart-subtotal total"><span>Total</span><strong id="cart-total-amt">0,00 €</strong></div>
      <p class="shipping-note">✓ Livraison gratuite dès 50€ d'achat</p>
      <button class="btn-checkout" onclick="window.location.href='checkout.html'">Commander maintenant</button>
      <button class="btn-continue" onclick="toggleCart(false)">Continuer les achats</button>
    </div>
  </aside>`;
}

function buildSharedFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="site-logo">MH<em>PI</em>CTURE</a>
          <p>Des affiches bibliques d'art imprimées avec soin, pour orner votre intérieur de la Parole de Dieu.</p>
          <div class="social-row">
            <a href="#" class="social-btn" title="Instagram">📷</a>
            <a href="#" class="social-btn" title="Facebook">📘</a>
            <a href="#" class="social-btn" title="TikTok">🎵</a>
            <a href="#" class="social-btn" title="Pinterest">📌</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Boutique</h5>
          <a href="catalogue.html">Toutes les affiches</a>
          <a href="catalogue.html?cat=psaumes">Psaumes</a>
          <a href="catalogue.html?cat=evangiles">Évangiles</a>
          <a href="catalogue.html?cat=ancien">Ancien Testament</a>
          <a href="catalogue.html?cat=nouveau">Nouveau Testament</a>
        </div>
        <div class="footer-col">
          <h5>Aide</h5>
          <a href="#">Livraison & retours</a>
          <a href="#">Suivi de commande</a>
          <a href="#">FAQ</a>
          <a href="contact.html">Nous contacter</a>
          <a href="#">Guide des tailles</a>
        </div>
        <div class="footer-col">
          <h5>Légal</h5>
          <a href="#">Mentions légales</a>
          <a href="#">CGV</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">Politique de cookies</a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-bottom">
        <span>©PUER DEI — Tous droits réservés</span>
        <div>
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
          <a href="#">CGV</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// ══════════════════════════════════════════════════════════════
// INIT ON LOAD
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();

  const user = Auth.getUser();
  if (user) {
    document.querySelectorAll('[title="Mon compte"]').forEach(btn => {
      btn.title = user.firstName + ' — Mon compte';
    });
  }
});
