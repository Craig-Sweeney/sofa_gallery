const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { createDefaultSnapshot } = require('./defaultData');

const DATA_PATH = path.join(__dirname, '../../data/store.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_PATH)) {
    const snapshot = createDefaultSnapshot();
    fs.writeFileSync(DATA_PATH, JSON.stringify(snapshot, null, 2), 'utf8');
  }
}

function readData() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

function persist(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function listProducts({ includeInactive = false } = {}) {
  const data = readData();
  const products = includeInactive
    ? data.products
    : data.products.filter((p) => p.status === 'active');
  return { products, layout: data.layout };
}

function getProduct(id, { includeInactive = false } = {}) {
  const data = readData();
  const product = data.products.find((p) => p.id === id);
  if (!product) return null;
  if (!includeInactive && product.status !== 'active') {
    return null;
  }
  return product;
}

function addProduct(input) {
  const data = readData();
  const product = {
    id: uuidv4(),
    name: input.name,
    category: input.category,
    status: 'active',
    price: input.price,
    description: input.description,
    heroImage: input.heroImage,
    gallery: input.gallery || [],
    materials: input.materials || [],
    tags: input.tags || [],
    size: input.size || ''
  };
  data.products.push(product);
  persist(data);
  return product;
}

function updateProduct(id, updates) {
  const data = readData();
  const idx = data.products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  data.products[idx] = {
    ...data.products[idx],
    ...updates,
    id
  };
  persist(data);
  return data.products[idx];
}

function setStatus(id, status) {
  return updateProduct(id, { status });
}

function readLayout() {
  const data = readData();
  return data.layout;
}

function updateLayout(layoutInput = {}) {
  const data = readData();
  data.layout = {
    ...data.layout,
    ...layoutInput
  };
  persist(data);
  return data.layout;
}

module.exports = {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
  setStatus,
  readLayout,
  updateLayout
};
