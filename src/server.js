const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const path = require('path');
const store = require('./data/store');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'dev-secret';

app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '200kb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', apiLimiter);

function requireAdmin(req, res, next) {
  const token = req.header('x-admin-token');
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: '未授权的管理员访问' });
  }
  return next();
}

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

function sanitizeString(value = '') {
  return value.toString().trim();
}

function sanitizeMaterials(materials = []) {
  return materials
    .filter((item) => item && item.name)
    .map((item) => ({
      name: sanitizeString(item.name),
      swatch: sanitizeString(item.swatch || '#cccccc'),
      materialType: ['fabric', 'leather'].includes(item.materialType) ? item.materialType : 'fabric',
      image: sanitizeString(item.image || '')
    }));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/products', (req, res) => {
  const includeInactive = req.query.includeInactive === '1';
  const { products, layout } = store.listProducts({ includeInactive });
  res.json({ products, layout });
});

app.get('/api/products/:id', (req, res) => {
  const includeInactive = req.query.includeInactive === '1';
  const product = store.getProduct(req.params.id, { includeInactive });
  if (!product) {
    return res.status(404).json({ error: '未找到产品' });
  }
  return res.json(product);
});

app.post(
  '/api/products',
  requireAdmin,
  [
    body('name').isString().isLength({ min: 2 }).escape(),
    body('category').isIn(['fabric', 'leather']),
    body('price').isFloat({ gt: 0 }),
    body('description').optional().isString().trim(),
    body('heroImage').isString().isLength({ min: 10 }),
    body('gallery').optional().isArray(),
    body('materials').optional().isArray(),
    body('tags').optional().isArray(),
    body('size').optional().isString()
  ],
  handleValidation,
  (req, res) => {
    const product = store.addProduct({
      name: sanitizeString(req.body.name),
      category: req.body.category,
      price: Number(req.body.price),
      description: sanitizeString(req.body.description || ''),
      heroImage: sanitizeString(req.body.heroImage),
      gallery: Array.isArray(req.body.gallery) ? req.body.gallery.map(sanitizeString) : [],
      materials: sanitizeMaterials(req.body.materials),
      tags: Array.isArray(req.body.tags) ? req.body.tags.map(sanitizeString) : [],
      size: sanitizeString(req.body.size || '')
    });
    res.status(201).json(product);
  }
);

app.put(
  '/api/products/:id',
  requireAdmin,
  [
    body('name').optional().isString().isLength({ min: 2 }).escape(),
    body('category').optional().isIn(['fabric', 'leather']),
    body('price').optional().isFloat({ gt: 0 }),
    body('description').optional().isString().trim(),
    body('heroImage').optional().isString().isLength({ min: 10 }),
    body('gallery').optional().isArray(),
    body('materials').optional().isArray(),
    body('tags').optional().isArray(),
    body('size').optional().isString(),
    body('status').optional().isIn(['active', 'inactive'])
  ],
  handleValidation,
  (req, res) => {
    const product = store.updateProduct(req.params.id, {
      name: req.body.name ? sanitizeString(req.body.name) : undefined,
      category: req.body.category,
      price: req.body.price ? Number(req.body.price) : undefined,
      description: req.body.description ? sanitizeString(req.body.description) : undefined,
      heroImage: req.body.heroImage ? sanitizeString(req.body.heroImage) : undefined,
      gallery: Array.isArray(req.body.gallery) ? req.body.gallery.map(sanitizeString) : undefined,
      materials: req.body.materials ? sanitizeMaterials(req.body.materials) : undefined,
      tags: Array.isArray(req.body.tags) ? req.body.tags.map(sanitizeString) : undefined,
      size: req.body.size ? sanitizeString(req.body.size) : undefined,
      status: req.body.status
    });
    if (!product) {
      return res.status(404).json({ error: '未找到产品' });
    }
    return res.json(product);
  }
);

app.patch(
  '/api/products/:id/status',
  requireAdmin,
  [body('status').isIn(['active', 'inactive'])],
  handleValidation,
  (req, res) => {
    const product = store.setStatus(req.params.id, req.body.status);
    if (!product) {
      return res.status(404).json({ error: '未找到产品' });
    }
    return res.json(product);
  }
);

app.get('/api/layout', (req, res) => {
  const layout = store.readLayout();
  res.json(layout);
});

app.put(
  '/api/layout',
  requireAdmin,
  [
    body('heroTitle').optional().isString().isLength({ min: 4 }).trim(),
    body('heroSubtitle').optional().isString().trim(),
    body('featuredIds').optional().isArray()
  ],
  handleValidation,
  (req, res) => {
    const { featuredIds } = req.body;
    let cleanedFeaturedIds;
    if (Array.isArray(featuredIds)) {
      const { products } = store.listProducts({ includeInactive: true });
      const validIds = new Set(products.map((p) => p.id));
      cleanedFeaturedIds = featuredIds.filter((id) => validIds.has(id));
    }

    const layout = store.updateLayout({
      heroTitle: req.body.heroTitle ? sanitizeString(req.body.heroTitle) : undefined,
      heroSubtitle: req.body.heroSubtitle ? sanitizeString(req.body.heroSubtitle) : undefined,
      featuredIds: cleanedFeaturedIds || undefined
    });
    res.json(layout);
  }
);

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res) => {
  res.status(404).json({ error: '资源不存在' });
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Sofa gallery server running on port ${PORT}`);
  /* eslint-enable no-console */
});
