export interface Asset {
  id: string;
  url: string;
  alt: string;
  type: 'cover' | 'detail' | 'material';
}

export interface Variant {
  id: string;
  color: string;
  material: string;
  price: number;
  assets: Asset[];
}

export interface SofaProduct {
  id: string;
  name: string;
  category: 'fabric' | 'leather';
  description: string;
  basePrice: number;
  variants: Variant[];
  featured: boolean;
  tags?: string[];
}

export interface LayoutSection {
  id: string;
  title: string;
  subtitle?: string;
  productIds: string[];
}

export interface LayoutConfig {
  heroTitle: string;
  heroSubtitle: string;
  sections: LayoutSection[];
}

export interface AdminSession {
  token: string;
  expiredAt: string;
}
