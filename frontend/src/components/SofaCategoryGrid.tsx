import { Link } from 'react-router-dom';

interface Props {
  categories: { key: 'fabric' | 'leather'; title: string; description: string; cover: string }[];
}

const SofaCategoryGrid = ({ categories }: Props) => (
  <div className="card-grid">
    {categories.map((item) => (
      <div className="card" key={item.key}>
        <img src={item.cover} alt={item.title} style={{ width: '100%', borderRadius: 12 }} />
        <h3>{item.title}</h3>
        <p className="muted">{item.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <span className="badge">{item.key === 'fabric' ? '布艺' : '皮艺'}</span>
          <Link className="button secondary" to={`/?category=${item.key}`}>查看系列</Link>
        </div>
      </div>
    ))}
  </div>
);

export default SofaCategoryGrid;
