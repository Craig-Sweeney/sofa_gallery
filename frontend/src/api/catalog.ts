import api from './client';
import { LayoutConfig, SofaProduct } from '../types';

export const fetchProducts = async () => {
  const { data } = await api.get<SofaProduct[]>('/products');
  return data;
};

export const fetchProduct = async (id: string) => {
  const { data } = await api.get<SofaProduct>(`/products/${id}`);
  return data;
};

export const fetchLayout = async () => {
  const { data } = await api.get<LayoutConfig>('/layout');
  return data;
};

export const upsertProduct = async (payload: Partial<SofaProduct>) => {
  const { data } = await api.post<SofaProduct>('/admin/products', payload);
  return data;
};

export const updateLayout = async (payload: LayoutConfig) => {
  const { data } = await api.put<LayoutConfig>('/admin/layout', payload);
  return data;
};
