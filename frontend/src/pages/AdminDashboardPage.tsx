import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchLayout, fetchProducts, updateLayout, upsertProduct } from '../api/catalog';
import { LayoutConfig, SofaProduct } from '../types';
import LayoutConfigPanel from '../components/LayoutConfigPanel';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: layout, refetch: refetchLayout } = useQuery({ queryKey: ['layout'], queryFn: fetchLayout });

  const [form, setForm] = useState<Partial<SofaProduct>>({
    id: '',
    name: '',
    category: 'fabric',
    description: '',
    basePrice: 0,
    variants: []
  });

  const productMutation = useMutation({
    mutationFn: upsertProduct,
    onSuccess: () => navigate(0)
  });

  const layoutMutation = useMutation({
    mutationFn: updateLayout,
    onSuccess: () => refetchLayout()
  });

  const sections = useMemo(() => layout?.sections || [], [layout]);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>管理员后台</h1>
        <a className="button secondary" href="/admin/login">切换账户</a>
      </div>

      <div className="section-title">
        <h2>产品列表</h2>
        <span>上/下架、排序在后端受保护接口完成</span>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>名称</th>
              <th>类别</th>
              <th>基准价</th>
              <th>精选</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category === 'fabric' ? '布艺' : '皮艺'}</td>
                <td>￥{item.basePrice.toLocaleString()}</td>
                <td>{item.featured ? '是' : '否'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-title">
        <h2>新增/编辑产品</h2>
        <span>支持颜色材质与图片上传</span>
      </div>
      <div className="card">
        <div className="form-grid">
          <label>
            产品 ID/编码
            <input
              className="input"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              placeholder="例如：cloud-fabric-01"
            />
          </label>
          <label>
            名称
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            描述
            <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <label>
            类别
            <select
              className="select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as SofaProduct['category'] })}
            >
              <option value="fabric">布艺</option>
              <option value="leather">皮艺</option>
            </select>
          </label>
          <label>
            基准价
            <input
              className="input"
              type="number"
              value={form.basePrice}
              onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
            />
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={form.featured ?? false}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            设为精选
          </label>
          <button
            className="button"
            onClick={() => {
              const normalizedId = (form.id || form.name || '').trim().toLowerCase().replace(/\s+/g, '-');
              productMutation.mutate({ ...form, id: normalizedId });
            }}
            disabled={!form.name}
          >
            提交产品
          </button>
        </div>
      </div>

      {layout && <LayoutConfigPanel initialLayout={layout} onSave={(config: LayoutConfig) => layoutMutation.mutate(config)} />}
    </div>
  );
};

export default AdminDashboardPage;
