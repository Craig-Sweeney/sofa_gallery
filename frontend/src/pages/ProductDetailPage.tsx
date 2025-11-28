import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../api/catalog';
import ColorSwatchSelector from '../components/ColorSwatchSelector';
import MaterialInfoPanel from '../components/MaterialInfoPanel';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id || ''),
    enabled: Boolean(id)
  });

  const [activeVariantId, setActiveVariantId] = useState<string | undefined>(undefined);
  const activeVariant = useMemo(() => {
    if (!product) return undefined;
    return product.variants.find((variant) => variant.id === activeVariantId) || product.variants[0];
  }, [product, activeVariantId]);

  if (!product || !activeVariant) {
    return (
      <div className="container">
        <p>正在载入产品...</p>
      </div>
    );
  }

  const gallery = activeVariant.assets.filter((asset) => asset.type !== 'material');

  return (
    <div className="container">
      <button className="button secondary" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
        返回
      </button>
      <div style={{ display: 'grid', gap: 32, gridTemplateColumns: '1.2fr 1fr' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {gallery.map((asset) => (
            <img
              key={asset.id}
              src={asset.url}
              alt={asset.alt}
              style={{ width: '100%', borderRadius: 16 }}
            />
          ))}
        </div>
        <div>
          <h1>{product.name}</h1>
          <p style={{ color: 'var(--muted)' }}>{product.description}</p>
          <strong style={{ fontSize: 24 }}>￥{activeVariant.price.toLocaleString()}</strong>

          <div style={{ marginTop: 18 }}>
            <p style={{ marginBottom: 8 }}>颜色/材质</p>
            <ColorSwatchSelector
              options={product.variants.map((variant) => ({ label: `${variant.color} · ${variant.material}`, value: variant.id }))}
              value={activeVariant.id}
              onChange={setActiveVariantId}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 4 }}>推荐搭配</p>
            <div className="card" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div className="skeleton" style={{ width: 80, height: 80 }} />
              <div>
                <strong>同色单人位</strong>
                <p style={{ margin: '4px 0', color: 'var(--muted)' }}>与当前配色保持一致</p>
              </div>
            </div>
          </div>

          <MaterialInfoPanel
            material={activeVariant.material}
            description="采用耐磨易打理织物，并通过防泼水工艺处理，兼顾质感与实用。"
            tips={["建议使用软毛刷定期清理", "如有液体泼洒及时吸附后轻柔擦拭"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
