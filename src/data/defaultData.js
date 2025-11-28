const { v4: uuidv4 } = require('uuid');

const starterProducts = [
  {
    id: uuidv4(),
    name: '云感布艺转角沙发',
    category: 'fabric',
    status: 'active',
    price: 6299,
    description: '柔软的羽绒与高回弹海绵组合，适合家庭起居室的云朵感受。',
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1582719478248-54e9f2f66c2a?auto=format&fit=crop&w=1600&q=80'
    ],
    materials: [
      {
        name: '晨雾浅灰布艺',
        swatch: '#d9d9d9',
        materialType: 'fabric',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
      },
      {
        name: '青空蓝布艺',
        swatch: '#5c7ea5',
        materialType: 'fabric',
        image: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?auto=format&fit=crop&w=1600&q=80'
      },
      {
        name: '燕麦米布艺',
        swatch: '#e9dfd1',
        materialType: 'fabric',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
      }
    ],
    tags: ['三人位', '可拆洗', '深坐包'],
    size: '3200 x 1800 x 720mm'
  },
  {
    id: uuidv4(),
    name: '纳帕皮艺单椅',
    category: 'leather',
    status: 'active',
    price: 4899,
    description: '一体弧形靠背与高级纳帕皮革，搭配黑胡桃木扶手，适合阅读放松角落。',
    heroImage: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1600&q=80'
    ],
    materials: [
      {
        name: '砂岩棕皮艺',
        swatch: '#b48a6b',
        materialType: 'leather',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80'
      },
      {
        name: '煤岩灰皮艺',
        swatch: '#555555',
        materialType: 'leather',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80'
      }
    ],
    tags: ['单椅', '真皮', '扶手'],
    size: '780 x 840 x 900mm'
  }
];

const starterLayout = {
  heroTitle: '沙发美术馆：布艺与皮艺的多维选择',
  heroSubtitle: '可视化大图、材质切换与价格细节，为家挑选舒适与质感。',
  featuredIds: () => starterProducts.map((p) => p.id)
};

function createDefaultSnapshot() {
  const products = starterProducts.map((p) => ({ ...p }));
  return {
    products,
    layout: {
      heroTitle: starterLayout.heroTitle,
      heroSubtitle: starterLayout.heroSubtitle,
      featuredIds: starterLayout.featuredIds()
    }
  };
}

module.exports = {
  createDefaultSnapshot
};
