function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

async function fetchProduct(id) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error('未找到产品');
  return res.json();
}

function renderMaterials(materials, onChange) {
  const container = document.getElementById('material-options');
  container.innerHTML = '';
  materials.forEach((material, index) => {
    const swatch = document.createElement('button');
    swatch.className = 'swatch';
    swatch.style.background = material.swatch;
    swatch.title = `${material.name} (${material.materialType === 'fabric' ? '布艺' : '皮艺'})`;
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach((el) => el.classList.remove('selected'));
      swatch.classList.add('selected');
      onChange(material);
    });
    if (index === 0) {
      swatch.classList.add('selected');
    }
    container.appendChild(swatch);
  });
}

function renderProduct(product) {
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-desc').textContent = product.description;
  document.getElementById('product-price').textContent = `¥${product.price.toLocaleString()}`;
  document.getElementById('product-size').textContent = product.size || '';
  document.getElementById('product-tags').innerHTML = (product.tags || [])
    .map((tag) => `<span class='badge'>${tag}</span>`)
    .join('');

  const hero = product.heroImage || (product.gallery || [])[0];
  const imageEl = document.getElementById('product-image');
  imageEl.src = hero;

  renderMaterials(product.materials || [], (material) => {
    imageEl.src = material.image || hero;
  });
}

async function init() {
  const id = getParam('id');
  if (!id) return;
  try {
    const product = await fetchProduct(id);
    renderProduct(product);
  } catch (err) {
    document.getElementById('product-name').textContent = '产品未找到';
    console.error(err);
  }
}

init();
