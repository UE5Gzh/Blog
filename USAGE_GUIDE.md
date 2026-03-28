# 个人技术博客使用指南

本博客系统基于 Astro 构建，采用 Markdown 进行内容编写，支持代码高亮、标签分类、全文搜索等功能。

---

## 目录

1. [快速开始](#快速开始)
2. [项目结构](#项目结构)
3. [创建新文章](#创建新文章)
4. [文章格式说明](#文章格式说明)
5. [Markdown 写作指南](#markdown-写作指南)
6. [代码高亮](#代码高亮)
7. [标签与分类](#标签与分类)
8. [草稿功能](#草稿功能)
9. [常用命令](#常用命令)
10. [部署说明](#部署说明)

---

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:4321 查看博客。

### 构建生产版本

```bash
npm run build
```

---

## 项目结构

```
Blog/
├── src/
│   ├── content/
│   │   └── posts/          # 所有博客文章放在这里
│   │       ├── first-post.md
│   │       ├── hello-world.md
│   │       └── code-example.md
│   ├── components/         # Astro 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   ├── Search.astro
│   │   ├── CopyButton.astro
│   │   └── ...
│   ├── layouts/           # 页面布局
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/             # 页面路由
│   │   ├── index.astro    # 首页
│   │   ├── archive.astro  # 归档页
│   │   ├── posts/[slug].astro    # 文章详情页
│   │   ├── categories/[category].astro  # 分类页
│   │   └── tags/[tag].astro      # 标签页
│   └── remark/            # 自定义 remark 插件
├── public/                # 静态资源
├── dist/                  # 构建输出目录
├── astro.config.mjs       # Astro 配置
└── package.json
```

---

## 创建新文章

在 `src/content/posts/` 目录下创建一个新的 `.md` 文件即可。

### 文件命名规范

- 使用英文或拼音命名
- 单词之间用连字符 `-` 分隔
- 示例：`my-first-post.md`、`react-hooks-tutorial.md`

---

## 文章格式说明

每篇文章开头需要包含 YAML frontmatter，用于定义文章元数据：

```markdown
---
title: "文章标题"
date: 2026-03-28
description: "文章的简短描述，用于SEO和文章卡片显示"
draft: false
tags: ["标签1", "标签2"]
category: "分类名称"
heroImage: "/images/post-cover.jpg"  # 可选
---
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 文章标题 |
| `date` | date | 是 | 发布日期，格式：`YYYY-MM-DD` |
| `description` | string | 是 | 文章描述，用于 SEO 和卡片显示 |
| `draft` | boolean | 否 | 是否为草稿，默认为 `false` |
| `tags` | string[] | 否 | 标签数组，用于文章分类 |
| `category` | string | 否 | 分类名称 |
| `heroImage` | string | 否 | 封面图片路径 |

---

## Markdown 写作指南

### 基本语法

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*
~~删除线~~

[链接文字](https://example.com)
![图片描述](图片路径)
```

### 列表

```markdown
无序列表：
- 项目一
- 项目二
  - 子项目
  - 子项目

有序列表：
1. 第一步
2. 第二步
3. 第三步
```

### 引用

```markdown
> 这是一段引用文本。
> 可以有多行。
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
```

---

## 代码高亮

本博客使用 Shiki 进行代码高亮，支持 100+ 编程语言。

### 行内代码

使用单反引号 `` `code` ``

### 代码块

````markdown
```语言名称
代码内容
```
````

### 支持的语言

本博客默认配置支持以下语言：

- `javascript` / `js`
- `typescript` / `ts`
- `python`
- `go`
- `rust`
- `bash` / `shell`
- `json`
- `yaml`
- `html`
- `css`
- `markdown`
- 以及更多...

### 代码高亮示例

**JavaScript:**

```javascript
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

**Python:**

```python
def hello_world():
    print("Hello, World!")
```

**Go:**

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

**Rust:**

```rust
fn main() {
    println!("Hello, World!");
}
```

### 代码块标题

可以为代码块添加文件名或描述：

````markdown
```javascript title="utils.js"
function helper() {
  return "helper function";
}
```
````

### 高亮特定行

````markdown
```javascript {2,4-6}
const a = 1;
const b = 2;    // 高亮
const c = 3;
const d = 4;    // 高亮
const e = 5;    // 高亮
const f = 6;
```
````

---

## 标签与分类

### 使用标签

在 frontmatter 的 `tags` 字段中添加标签：

```markdown
---
title: "React Hooks 教程"
tags: ["react", "javascript", "hooks"]
---
```

### 使用分类

在 frontmatter 的 `category` 字段中添加分类：

```markdown
---
title: "Python 入门教程"
category: "programming"
---
```

### 访问标签和分类页面

- 标签页面：`/tags/标签名`
- 分类页面：`/categories/分类名`

### 标签云和分类导航

博客首页右侧/底部包含标签云和分类导航，方便读者浏览相关内容。

---

## 草稿功能

将文章设置为草稿可以防止其在正式环境中显示：

```markdown
---
title: "未完成的文章"
draft: true
---
```

草稿文章：
- 在开发服务器 (`npm run dev`) 中可见
- 在生产构建中隐藏
- 方便在正式发布前进行编辑和预览

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run astro` | 运行 Astro CLI |

### 开发工作流

1. 修改或添加 `src/content/posts/` 下的 Markdown 文件
2. 运行 `npm run dev` 启动开发服务器
3. 在浏览器中预览 http://localhost:4321
4. 修改保存后，页面会自动热更新

---

## 部署说明

### 构建

```bash
npm run build
```

构建完成后，静态文件会输出到 `dist/` 目录。

### 搜索功能

`npm run build` 命令会自动运行 Pagefind 来建立搜索索引。

### 部署平台

本博客是纯静态网站，可部署到：

- **Vercel** - `vercel deploy`
- **Netlify** - 直接推送 Git 仓库
- **GitHub Pages** - 使用 GitHub Actions
- **任意静态文件托管服务**

### 部署配置

在部署前，确保 `astro.config.mjs` 中的 `site` 字段设置为你的实际域名：

```javascript
export default defineConfig({
  site: 'https://your-domain.com',  // 修改为你的域名
  // ...
});
```

---

## 常见问题

### Q: 如何添加图片？

1. 将图片放入 `public/images/` 目录
2. 在 Markdown 中引用：`![描述](/images/图片名.jpg)`

### Q: 如何调整代码高亮主题？

修改 `astro.config.mjs` 中的 `shikiConfig.theme`：

```javascript
shikiConfig: {
  theme: 'vitesse-dark',  // 可选：dark-plus, github-dark, vitesse-dark 等
}
```

### Q: 如何禁用某篇文章的阅读时间显示？

阅读时间由 `reading-time` 插件自动计算，暂不支持单独禁用。

---

## 更多资源

- [Astro 文档](https://docs.astro.build/)
- [Shiki 主题列表](https://shiki.matsu.io/themes)
- [Markdown 语法指南](https://www.markdownguide.org/)
