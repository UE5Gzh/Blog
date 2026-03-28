---
title: 搭建个人技术博客：从选择到部署
date: 2026-03-27
description: 详细介绍如何使用Astro和GitHub Pages搭建个人技术博客，包含主题定制和自动化部署
draft: false
tags:
  - Annoucement
category: General
---

# 搭建个人技术博客：从选择到部署

## 前言

记录自己搭建这个技术博客的过程，希望能给有同样想法的朋友一些参考。

## 为什么写博客

| 驱动因素 | 说明 |
|----------|------|
| 知识沉淀 | 写下来才能真正理解 |
| 分享交流 | 让知识流动起来 |
| 简历加分 | 技术博客是能力的证明 |
| 持续学习 | 输出倒逼输入 |

## 技术选型

### 静态博客 vs 动态博客

| 特性 | 静态博客 | 动态博客 |
|------|----------|----------|
| 性能 | 极高 | 中等 |
| 安全 | 高 | 需要防护 |
| 部署 | 简单 | 复杂 |
| 成本 | 低/免费 | 需要服务器 |
| 适合场景 | 内容为主 | 交互为主 |

最终选择 **Astro** + **GitHub Pages**，纯静态页面，加载极快。

## Astro简介

Astro 是一个现代静态站点构建框架：

```bash
# 创建项目
npm create astro@latest

# 安装依赖
npm install

# 启动开发
npm run dev
```

### 核心特性

- **Island Architecture**：按需 hydration
- **多框架支持**：React/Vue/Svelte 混用
- **Markdown 支持**：开箱即用
- **TypeScript**：完整类型支持

## 目录结构

```
blog/
├── public/
│   └── images/           # 静态图片
├── src/
│   ├── components/       # Astro 组件
│   ├── content/
│   │   └── posts/       # 文章 Markdown
│   ├── layouts/          # 页面模板
│   └── pages/            # 路由页面
├── astro.config.mjs
└── package.json
```

## 部署流程

### GitHub Actions 自动部署

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 主题定制

### 自定义样式

在 `src/styles/global.css` 中覆盖主题变量：

```css
:root {
    --accent-color: #7c3aed;
    --bg-primary: #ffffff;
    --text-normal: #1a1a1a;
}

.theme-dark {
    --accent-color: #a78bfa;
    --bg-primary: #1a1a1a;
    --text-normal: #e5e5e5;
}
```

## 写作工作流

### 1. 创建文章

```markdown
---
title: "文章标题"
date: 2026-03-28
description: "简短描述"
draft: false
tags: ["tag1"]
category: "分类"
---

# 正文开始
```

### 2. 插入代码

````markdown
```cpp
// C++ 代码示例
void hello() {
    std::cout << "Hello!" << std::endl;
}
```
````

### 3. 提交部署

```bash
git add .
git commit -m "docs: add new post"
git push
# GitHub Actions 自动部署
```

## 遇到的问题

### 问题1：图片路径

**解决**：统一使用 `/images/` 路径，对应 `public/images/` 目录。

### 问题2：部署失败

**解决**：检查 GitHub Actions 日志，确保 `publish_dir` 与实际输出目录一致。

## 总结

搭建博客不难，难的是坚持写。希望这个博客能成为我技术成长的见证。

也欢迎同路人交流学习！
