# Archive 页面优化方案

## 问题分析

当前 Archive 页面一次性加载并渲染所有文章，当文章数量增多时会导致：
- 页面冗长，用户体验差
- 需要大量滚动才能找到目标文章

## 解决方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **年份折叠/展开** | 保持URL结构、SEO友好、实现简单 | 首次加载所有数据 | ⭐⭐⭐⭐⭐ |
| 按年份分页 | 每页数据量小 | 改变URL结构、实现复杂 | ⭐⭐⭐ |
| 无限滚动 | 用户体验流畅 | 静态站点实现复杂、SEO差 | ⭐⭐ |

## 推荐方案：年份折叠/展开

### 功能设计

```
┌─────────────────────────────────────────────┐
│  Archive                                    │
│  89 posts total                             │
├─────────────────────────────────────────────┤
│  ▼ 2026 (45 posts)                    [展开] │  ← 点击可折叠/展开
│     March                                   │
│       - UE5 Mass集群框架                     │
│       - GAS系统详解                          │
│     February                                │
│       - PBR着色原理                          │
├─────────────────────────────────────────────┤
│  ▶ 2025 (30 posts)                    [折叠] │  ← 默认折叠旧年份
├─────────────────────────────────────────────┤
│  ▶ 2024 (14 posts)                    [折叠] │
└─────────────────────────────────────────────┘
```

### 交互规则

1. **默认状态**：最近年份展开，其他年份折叠
2. **点击年份标题**：切换展开/折叠状态
3. **视觉反馈**：展开时显示 ▼，折叠时显示 ▶
4. **动画效果**：平滑展开/折叠动画

### 实现步骤

#### 步骤1：修改 archive.astro 结构

- 为每个年份区块添加 `data-year` 属性
- 添加折叠/展开的 CSS 类
- 添加展开/折叠图标

#### 步骤2：添加客户端 JavaScript

- 监听年份标题点击事件
- 切换展开/折叠状态
- 保存用户偏好到 localStorage（可选）

#### 步骤3：添加 CSS 样式

- 折叠状态：隐藏月份内容
- 展开状态：显示月份内容
- 过渡动画效果

#### 步骤4：设置默认展开逻辑

- 最近年份默认展开
- 其他年份默认折叠

### 文件修改清单

| 文件 | 修改内容 |
|------|---------|
| `src/pages/archive.astro` | 添加折叠结构、JavaScript、CSS |

### 代码实现要点

```astro
<!-- 年份区块结构 -->
<div class="year-section" data-year={year}>
  <button class="year-toggle" aria-expanded="true">
    <span class="toggle-icon">▼</span>
    <span class="year-title">{year}</span>
    <span class="post-count">({yearPostCount} posts)</span>
  </button>
  <div class="year-content">
    <!-- 月份和文章列表 -->
  </div>
</div>
```

```javascript
// 折叠/展开逻辑
document.querySelectorAll('.year-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const section = toggle.closest('.year-section');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    section.classList.toggle('collapsed');
  });
});
```

```css
/* 折叠状态样式 */
.year-section.collapsed .year-content {
  display: none;
}

.year-section.collapsed .toggle-icon::before {
  content: '▶';
}
```

## 预期效果

- 页面初始加载时只显示最近年份的文章
- 用户可以点击年份标题展开/折叠
- 减少页面视觉长度，提升用户体验
- 保持 SEO 友好（所有内容仍在 HTML 中）
