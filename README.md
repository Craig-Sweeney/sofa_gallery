# Sofa Gallery

一个简洁的沙发展示站点，包含布艺、皮艺产品主页、详情页与管理员后台。

## 功能
- 公共展示：主页展示精选、布艺、皮艺分类列表；详情页支持大图切换和材质色块选择。
- 管理后台：无需登录的浏览入口，管理员可通过 `X-Admin-Token` 口令上新、下架/上架产品，并调整首页布局与精选顺序。
- 安全措施：Helmet 安全头、速率限制、输入验证与清洗，限制 JSON 请求大小。

## 快速开始
1. 安装依赖：
   ```bash
   npm install
   ```
2. 运行开发服务器（默认端口 3000）：
   ```bash
   npm start
   ```
3. 访问：
   - 主页：`http://localhost:3000/`
   - 详情页：`http://localhost:3000/product.html?id=<productId>`
   - 管理后台：`http://localhost:3000/admin.html`

### 管理员口令
- 默认口令：`dev-secret`，通过请求头 `X-Admin-Token` 传递。
- 可在启动时设置环境变量覆盖：
  ```bash
  ADMIN_TOKEN="your-strong-secret" npm start
  ```

### API 概览
- `GET /api/products` 列出在架产品。
- `GET /api/products?includeInactive=1` 列出全部产品（后台使用）。
- `GET /api/products/:id` 获取产品详情。
- `POST /api/products` 创建产品（需 `X-Admin-Token`）。
- `PATCH /api/products/:id/status` 上架/下架产品（需 `X-Admin-Token`）。
- `PUT /api/layout` 更新首页标题、副标题、精选顺序（需 `X-Admin-Token`）。

## 测试
- 基础语法校验：
  ```bash
  npm test
  ```
