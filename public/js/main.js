async function fetchProducts() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('获取产品失败');
  return res.json();
}

function buildCard(product) {
  return `<a class="card" href="/product.html?id=${product.id}">
    <img src="${product.heroImage}" alt="${product.name}" />
    <div class="badge">${product.category === 'fabric' ? '布艺' : '皮艺'}</div>
    <h3>${product.name}</h3>
    <div class="price">¥${product.price.toLocaleString()}</div>
    <div class="tag-list">${(product.tags || [])
      .map((tag) => `<span class='badge'>${tag}</span>`)
      .join('')}</div>
  </a>`;
}

function renderSections(products, layout) {
  const featured = document.getElementById('featured-grid');
  const fabric = document.getElementById('fabric-grid');
  const leather = document.getElementById('leather-grid');

  const productMap = new Map(products.map((p) => [p.id, p]));
  const orderedFeatured = (layout.featuredIds || [])
    .map((id) => productMap.get(id))
    .filter(Boolean);

  featured.innerHTML = orderedFeatured.map(buildCard).join('');
  fabric.innerHTML = products
    .filter((p) => p.category === 'fabric')
    .map(buildCard)
    .join('');
  leather.innerHTML = products
    .filter((p) => p.category === 'leather')
    .map(buildCard)
    .join('');

  if (orderedFeatured.length) {
    const hero = orderedFeatured[0];
    document.getElementById('hero-image').src = hero.heroImage;
  }

  document.getElementById('hero-title').textContent = layout.heroTitle || '沙发美术馆';
  document.getElementById('hero-subtitle').textContent = layout.heroSubtitle || '';
}

async function init() {
  try {
    const { products, layout } = await fetchProducts();
    renderSections(products, layout);
  } catch (err) {
    console.error(err);
  }
}

init();
