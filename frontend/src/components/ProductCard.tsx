import { Link } from 'react-router-dom';
import { SofaProduct } from '../types';

interface Props {
  product: SofaProduct;
}

const ProductCard = ({ product }: Props) => {
  const cover = product.variants[0]?.assets.find((a) => a.type === 'cover');

  return (
    <div className="card">
      {cover ? (
        <img src={cover.url} alt={cover.alt} style={{ width: '100%', borderRadius: 14, aspectRatio: '4/3', objectFit: 'cover' }} />
      ) : (
        <div className="skeleton" style={{ height: 200 }} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>{product.name}</h3>
          <p style={{ margin: '4px 0', color: 'var(--muted)' }}>{product.description}</p>
          <strong>￥{product.basePrice.toLocaleString()}</strong>
        </div>
        {product.featured && <span className="badge">精选</span>}
      </div>
      <Link className="button" style={{ marginTop: 12 }} to={`/products/${product.id}`}>
        查看详情
      </Link>
    </div>
  );
};

export default ProductCard;
