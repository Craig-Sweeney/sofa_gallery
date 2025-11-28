# Sofa Gallery

面向生产的前后端分离架构，提供沙发展示站点与管理员后台。前端基于 React + TypeScript + Vite，后端采用 Spring Boot + PostgreSQL，并通过 MinIO/S3 处理大图与材质资源。

## 架构概览
- `frontend/`：Vite + React + TypeScript，包含首页、产品详情与管理员后台界面，统一浅灰极简主题与响应式布局。
- `backend/`：Spring Boot 应用，模块化划分 auth/catalog/layout/media，预留 OTP 登录、产品与布局管理、对象存储签名接口。
- 数据层：PostgreSQL 存储管理员、产品、变体与布局配置；MinIO（S3 兼容）保存封面、详情与材质贴图。
- 部署：独立 Dockerfile，`docker-compose` 联动数据库、对象存储、后端与前端静态资源；Nginx 反代 API，添加基础安全头。

## 快速开始（本地）
1. 准备环境变量
   - 前端：复制 `frontend/.env.example` 为 `.env`，设置 `VITE_API_BASE_URL`。
   - 后端：在 `backend/src/main/resources/application.yml` 覆盖数据库、S3、JWT、OTP 等配置，或通过环境变量注入。
2. 本地开发
   ```bash
   cd frontend && npm install && npm run dev # Vite 开发模式
   cd backend && ./mvnw spring-boot:run       # 或 mvn spring-boot:run
   ```
3. 访问入口
   - 前台：`http://localhost:5173/`
   - 产品详情：`http://localhost:5173/products/:id`
   - 管理后台：`http://localhost:5173/admin`

## 容器化运行
```bash
docker compose up --build
```
服务端口：
- 前端：`http://localhost:3000`
- 后端 API：`http://localhost:8080/api`
- PostgreSQL：`localhost:5432`
- MinIO 控制台：`http://localhost:9001`

## 目录说明
- `frontend/src/pages`：HomePage、ProductDetailPage、Login/Admin 控制台，覆盖分类栅格、轮播/变体切换、布局配置等界面。
- `frontend/src/components`：复用组件（SofaCategoryGrid、ProductCard、ColorSwatchSelector、MaterialInfoPanel、LayoutConfigPanel）。
- `backend/src/main/java/com/sofa/gallery`：Spring Boot 启动、Security 配置、基础 Controller（OTP、产品、布局、媒体签名）。
- `docker-compose.yml`：PostgreSQL + MinIO + 后端 + 前端一体化启动。

## 安全与运维要点
- 默认开启内容安全策略、基础安全响应头与 API 鉴权占位；JWT 秘钥与数据库口令需通过环境变量注入。
- OTP 登录应接入短信/邮箱网关并实现频率限制、验证码重试策略；当前代码仅为接口骨架。
- 对象存储上传需校验文件类型/尺寸，生成短时直传凭证并记录回调。
- 建议在 CI 中加入构建与依赖扫描，镜像推送后结合 Ingress/Nginx 完成 HTTPS、限流与 WAF 代理。

## 已完成
- `backend-api`：补全了实体建模、内存仓储、服务层与基于管理 Token 的鉴权过滤器，实现产品、布局与媒体上传预签名的基础接口。
- `testing-docs`：通过 Spring Boot 集成测试覆盖 OTP 验证、产品上架、布局更新与媒体上传校验，为后续契约校验提供示例。

## 后续待办
- `setup-env`：完善环境变量注入、Secrets 管理与配置中心集成。
- `frontend-ui`：接入真实产品/布局 API，丰富组件状态与无障碍支持。
- `admin-panel`：完成上/下架、排序、图片上传与拖拽布局配置。
- `security-deploy`：Nginx/Ingress 生产化配置、速率限制、DDOS 缓解方案。
