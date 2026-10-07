# ASC Skills · asc-cli 技能手册

> 一个用 Next.js 构建的中文技能展示站,收录 [App Store Connect CLI (asc-cli)](https://github.com/rorkai/App-Store-Connect-CLI) 的全部 Skill,附带可直接复制的使用示例与安装指南。

**在线预览:** 通过 Vercel 部署后访问你的生产域名即可。
**技术栈:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript

---

## 项目简介

[asc-cli](https://github.com/rorkai/App-Store-Connect-CLI) 是一个用于操作 App Store Connect 的命令行工具,覆盖证书管理、应用构建、TestFlight 分发、应用信息维护、截图素材、评论回复等场景。本项目以终端风格的交互界面,将 asc-cli 的每一项 Skill 整理为:

- 中文说明与适用场景
- 可直接复制粘贴的命令示例
- 按分类 / 关键词实时搜索的技能浏览器
- 一份完整的安装与鉴权配置指南(Homebrew / 安装脚本 / winget)

适合希望快速查阅 asc-cli 用法、或向团队介绍该工具的开发者。

## 功能预览

- **首页 Hero** — 项目定位与核心关键词(ASC Skills、asc-cli、App Store Connect CLI)
- **安装指南** — macOS / Linux / Windows 三端安装命令 + 鉴权密钥配置步骤
- **技能浏览器** — 支持搜索与分类筛选的终端风格卡片列表,每张卡片内含真实命令示例
- **SEO 优化** — 完整的 metadata、OpenGraph、JSON-LD 结构化数据、`robots.ts` / `sitemap.ts`

## 快速开始

### 环境要求

- Node.js 20+
- [pnpm](https://pnpm.io/) 9+(项目通过 `packageManager` 字段锁定版本)

### 本地运行

\`\`\`bash
# 克隆仓库
git clone https://github.com/extrastu/ascskill.git
cd ascskill

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 即可查看效果,修改 `app/page.tsx` 或 `lib/skills-data.ts` 会自动热更新。

### 构建生产版本

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## 项目结构

\`\`\`
.
├── app/
│   ├── page.tsx           # 首页组装(Hero + 安装指南 + 技能浏览器)
│   ├── layout.tsx          # 全局字体、metadata、主题
│   ├── robots.ts           # 搜索引擎爬取规则
│   └── sitemap.ts          # 站点地图
├── components/
│   ├── hero.tsx            # 首页 Hero 区块
│   ├── install-section.tsx# 安装与鉴权指南
│   ├── skills-explorer.tsx# 技能搜索 / 分类筛选容器
│   ├── skill-card.tsx      # 单个技能卡片
│   ├── terminal-block.tsx # 终端命令展示组件
│   ├── site-header.tsx    # 顶部导航
│   └── site-footer.tsx    # 页脚
└── lib/
    └── skills-data.ts      # asc-cli 全部 Skill 的结构化数据与示例命令
\`\`\`

## 新增 / 修改一个 Skill 示例

所有技能数据集中维护在 [`lib/skills-data.ts`](./lib/skills-data.ts),每一项包含分类、标题、说明与命令示例。新增技能只需在该文件中追加一条记录,页面会自动渲染到对应分类下,无需改动组件代码。

## 关于 asc-cli

- 上游项目: [rorkai/App-Store-Connect-CLI](https://github.com/rorkai/App-Store-Connect-CLI)
- 安装方式、命令参数等以上游仓库 README 为准,本站内容会尽量与上游保持同步,如有出入请以官方仓库为准。

## 贡献指南

这是一个开源项目,欢迎贡献:

1. Fork 本仓库并新建分支:`git checkout -b feature/xxx`
2. 在 `lib/skills-data.ts` 中补充或修正技能示例,或在 `components/` 下改进界面
3. 本地运行 `pnpm build` 确认无报错
4. 提交 PR,并在描述中说明改动动机

发现文档错误、命令示例过时、或希望补充新的 asc-cli 用法,欢迎直接提 Issue 或 PR。

## Built with v0

本仓库与 [v0](https://v0.app) 项目关联,可以继续在 v0 中开发:每次合并到 `main` 分支都会自动触发部署。

[在 v0 中继续开发 →](https://v0.app/chat/projects/prj_tAZWQZqEyl3RBS3Nt7aJ6mufcq3a)

## License

本项目采用 [MIT License](./LICENSE) 开源,欢迎自由使用、修改和分发。asc-cli 本体的许可证请参考其[上游仓库](https://github.com/rorkai/App-Store-Connect-CLI)。
