import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLayout, fetchProducts } from '../api/catalog';
import SofaCategoryGrid from '../components/SofaCategoryGrid';
import ProductCard from '../components/ProductCard';
import { SofaProduct } from '../types';

const fallbackHeroImage = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80';

const HomePage = () => {
  const { data: layout } = useQuery({ queryKey: ['layout'], queryFn: fetchLayout });
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  const featuredProducts = useMemo(() => {
    if (!products) return [] as SofaProduct[];
    return products.filter((item) => item.featured).slice(0, 6);
  }, [products]);

  return (
    <div className="container">
      <nav>
        <span className="logo">SOFA GALLERY</span>
        <ul>
          <li>布艺</li>
          <li>皮艺</li>
          <li>案例</li>
        </ul>
      </nav>

      <section className="hero">
        <div>
          <h1>{layout?.heroTitle || '沉浸式舒适体验'}</h1>
          <p>{layout?.heroSubtitle || '精选布艺与皮艺系列，满足客厅每一寸的格调与舒适'}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a className="button" href="#featured">立即选购</a>
            <a className="button secondary" href="#categories">查看分类</a>
          </div>
        </div>
        <img src={fallbackHeroImage} alt="hero" />
      </section>

      <section id="categories">
        <div className="section-title">
          <h2>类别</h2>
          <span>布艺 / 皮艺</span>
        </div>
        <SofaCategoryGrid
          categories={[
            {
              key: 'fabric',
              title: '布艺沙发',
              description: '细腻织物、亲肤透气，适合家庭与轻奢空间。',
              cover: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80'
            },
            {
              key: 'leather',
              title: '皮艺沙发',
              description: '甄选头层真皮与易打理面料，兼顾质感与耐用。',
              cover: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80'
            }
          ]}
        />
      </section>

      <section id="featured">
        <div className="section-title">
          <h2>精选系列</h2>
          <span>后台可配置推荐顺序</span>
        </div>
        <div className="card-grid">
          {featuredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
