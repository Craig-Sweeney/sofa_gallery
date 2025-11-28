interface Props {
  material: string;
  description: string;
  tips?: string[];
}

const MaterialInfoPanel = ({ material, description, tips = [] }: Props) => (
  <div className="card" style={{ marginTop: 20 }}>
    <div className="section-title">
      <h3>材质信息</h3>
      <span>{material}</span>
    </div>
    <p style={{ color: 'var(--muted)' }}>{description}</p>
    {tips.length > 0 && (
      <ul style={{ color: 'var(--muted)' }}>
        {tips.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default MaterialInfoPanel;
