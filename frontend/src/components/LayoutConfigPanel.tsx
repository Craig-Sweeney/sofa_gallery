import { useState } from 'react';
import { LayoutConfig } from '../types';

interface Props {
  initialLayout: LayoutConfig;
  onSave: (config: LayoutConfig) => void;
}

const LayoutConfigPanel = ({ initialLayout, onSave }: Props) => {
  const [layout, setLayout] = useState<LayoutConfig>(initialLayout);

  const updateSectionTitle = (id: string, title: string) => {
    setLayout((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id ? { ...section, title } : section
      )
    }));
  };

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <div className="section-title">
        <h3>首页布局配置</h3>
        <button className="button" onClick={() => onSave(layout)}>
          保存布局
        </button>
      </div>
      <div className="form-grid">
        <label>
          主标题
          <input
            className="input"
            value={layout.heroTitle}
            onChange={(e) => setLayout({ ...layout, heroTitle: e.target.value })}
          />
        </label>
        <label>
          副标题
          <input
            className="input"
            value={layout.heroSubtitle}
            onChange={(e) => setLayout({ ...layout, heroSubtitle: e.target.value })}
          />
        </label>
      </div>
      <div style={{ marginTop: 16 }}>
        {layout.sections.map((section) => (
          <div
            key={section.id}
            style={{ display: 'grid', gap: 8, marginBottom: 12, padding: 12, border: '1px solid var(--border)', borderRadius: 12 }}
          >
            <div className="section-title" style={{ margin: 0 }}>
              <strong>{section.id}</strong>
              <span>{section.productIds.length} 个产品</span>
            </div>
            <input
              className="input"
              value={section.title}
              onChange={(e) => updateSectionTitle(section.id, e.target.value)}
            />
            <input
              className="input"
              placeholder="产品ID以逗号分隔"
              value={section.productIds.join(',')}
              onChange={(e) =>
                setLayout((prev) => ({
                  ...prev,
                  sections: prev.sections.map((item) =>
                    item.id === section.id
                      ? { ...item, productIds: e.target.value.split(',').map((v) => v.trim()).filter(Boolean) }
                      : item
                  )
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutConfigPanel;
