const adminTokenInput = document.getElementById('admin-token');
const heroTitleInput = document.getElementById('hero-title');
const heroSubtitleInput = document.getElementById('hero-subtitle');
const featuredSelect = document.getElementById('featured-select');
const productRows = document.getElementById('product-rows');

function getToken() {
  return adminTokenInput.value || 'dev-secret';
}

async function loadProducts() {
  const res = await fetch('/api/products?includeInactive=1');
  const data = await res.json();
  return data;
}

function renderLayoutForm(layout, products) {
  heroTitleInput.value = layout.heroTitle || '';
  heroSubtitleInput.value = layout.heroSubtitle || '';

  featuredSelect.innerHTML = '';
  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} (${product.category === 'fabric' ? '布艺' : '皮艺'})`;
    option.selected = (layout.featuredIds || []).includes(product.id);
    featuredSelect.appendChild(option);
  });
}

function renderProductsTable(products) {
  productRows.innerHTML = '';
  products.forEach((product) => {
    const row = document.createElement('tr');
    const statusClass = product.status === 'active' ? 'status-active' : 'status-inactive';
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category === 'fabric' ? '布艺' : '皮艺'}</td>
      <td>¥${product.price.toLocaleString()}</td>
      <td><span class="status-pill ${statusClass}">${product.status === 'active' ? '在架' : '下架'}</span></td>
      <td>
        <button class="button" data-action="toggle" data-id="${product.id}">${
          product.status === 'active' ? '下架' : '上架'
        }</button>
      </td>
    `;
    productRows.appendChild(row);
  });
}

async function toggleStatus(productId, status) {
  await fetch(`/api/products/${productId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getToken()
    },
    body: JSON.stringify({ status })
  });
  await bootstrap();
}

function parseMaterials(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, swatch, image] = line.split('|');
      return {
        name: name?.trim() || '自定义布艺',
        swatch: (swatch || '#cccccc').trim(),
        image: (image || '').trim(),
        materialType: 'fabric'
      };
    });
}

async function saveLayout() {
  const selected = Array.from(featuredSelect.selectedOptions).map((o) => o.value);
  await fetch('/api/layout', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getToken()
    },
    body: JSON.stringify({
      heroTitle: heroTitleInput.value,
      heroSubtitle: heroSubtitleInput.value,
      featuredIds: selected
    })
  });
  alert('布局已保存');
}

async function createProduct() {
  const payload = {
    name: document.getElementById('new-name').value,
    category: document.getElementById('new-category').value,
    price: Number(document.getElementById('new-price').value),
    size: document.getElementById('new-size').value,
    description: document.getElementById('new-desc').value,
    heroImage: document.getElementById('new-hero').value,
    gallery: document
      .getElementById('new-gallery')
      .value.split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    tags: document
      .getElementById('new-tags')
      .value.split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    materials: parseMaterials(document.getElementById('new-materials').value)
  };

  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getToken()
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    alert('创建失败，请检查字段。');
    return;
  }

  alert('产品上新成功');
  await bootstrap();
}

async function bootstrap() {
  const data = await loadProducts();
  renderLayoutForm(data.layout, data.products);
  renderProductsTable(data.products);
}

function attachListeners() {
  document.getElementById('save-layout').addEventListener('click', saveLayout);
  document.getElementById('create-product').addEventListener('click', createProduct);
  productRows.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.dataset.action === 'toggle') {
      const productId = target.dataset.id;
      const status = target.textContent === '下架' ? 'inactive' : 'active';
      await toggleStatus(productId, status);
    }
  });
}

attachListeners();
bootstrap();
