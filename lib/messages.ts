/**
 * UI strings, written once in Simplified Chinese. The zh-TW dictionary is derived from this
 * at build time with OpenCC (see lib/i18n-server.ts), so there is a single source of truth.
 * Placeholders look like {n}.
 */
export const messages = {
  site: {
    name: "ASC Skills 手册",
    title: "ASC Skills 手册｜ASC CLI Skills 全量中文示例（asc-cli）",
    description:
      "ASC Skills（也写作 AscSkill / AscSkills）是 App Store Connect CLI 的 Agent 技能集合。本站收录全部 ASC CLI Skill（AscCliSkill / AscCliSkills）的适用场景与可直接运行的命令示例，覆盖安装配置、构建发布、签名分发、TestFlight、元数据本地化与商业化配置。",
    ogAlt: "ASC CLI Skills — App Store Connect CLI Agent Skills 中文手册",
    skip: "跳到正文",
  },
  header: {
    brand: "asc-cli 技能手册",
    nav: "主导航",
    install: "安装",
    skills: "技能",
    language: "语言",
    theme: "主题",
    themeSystem: "跟随系统",
    themeLight: "浅色",
    themeDark: "深色",
    themeSwitch: "切换主题（当前：{mode}）",
  },
  hero: {
    h1a: "把 App Store 发布工作，",
    h1b: "交给 ",
    h1c: " 和它的 {n} 个 ASC Skills",
    intro:
      "rorkai/App-Store-Connect-CLI 为 AI 智能体提供了一整套 ASC CLI Skills（又称 AscSkill / AscCliSkill），覆盖构建打包、签名分发、TestFlight、元数据本地化、订阅定价和广告投放。本页收录全部 ASC Skills 的中文说明与可直接使用的命令示例。",
    installTitle: "安装技能包",
    installComment: "# 全局安装 {n} 个经审查的 asc 技能",
    categories: "{n} 个分类",
    skills: "{n} 个技能",
  },
  install: {
    title: "安装 asc-cli",
    intro: "四步完成从安装到首个 API 调用。发布的二进制文件自带运行环境，安装后即可在终端、IDE 或 CI/CD 流水线中使用。",
    tabsLabel: "安装方式",
    tabCurl: "安装脚本",
    brew: ["# 推荐方式（macOS / Linux）", "brew install asc"],
    curl: ["# macOS / Linux 一键安装脚本", "curl -fsSL https://asccli.sh/install | bash"],
    winget: [
      "# Windows（WinGet 包审核通过后可用；未上架前请从 GitHub Releases 下载已签名的二进制）",
      "winget install asc",
      "",
      "# 包名冲突时使用精确 ID",
      "winget install --id Rorkai.ASC --exact",
    ],
    steps: [
      {
        title: "安装 asc-cli",
        desc: "通过 Homebrew、安装脚本或 WinGet 获取二进制文件，发布版本自带运行环境，无需额外安装 Go。",
      },
      {
        title: "验证可执行",
        desc: "在配置鉴权前，先确认命令可以正常运行。",
        lines: ["asc version", "asc --help"],
      },
      {
        title: "登录鉴权",
        desc: "在 App Store Connect 生成 API 密钥后，使用密钥登录；CI 或无密钥串环境可加 --bypass-keychain。",
        lines: [
          "asc auth login \\",
          '  --name "MyApp" \\',
          '  --key-id "ABC123" \\',
          '  --issuer-id "DEF456" \\',
          "  --private-key /path/to/AuthKey.p8 \\",
          "  --network",
        ],
      },
      {
        title: "校验与首个命令",
        desc: "确认鉴权状态健康，然后拉取一次应用列表确认一切就绪。",
        lines: ["asc auth status --validate", "asc auth doctor", "asc apps list --output table"],
      },
    ],
    skillsTitle: "安装全部 Agent Skills",
    skillsDesc: "将 {n} 个官方技能一次性安装到全局 agent-skills 目录，跨项目可用，且锁定到已审核的提交版本。",
  },
  explorer: {
    placeholder: "搜索技能或命令，例如“截图”“签名”“notarization”…（按 / 聚焦）",
    searchLabel: "搜索技能",
    clear: "清除搜索",
    total: "共 {n} 个技能",
    found: "找到 {n} / {total} 个技能",
    all: "全部 {n}",
    empty: "没有找到匹配 “{q}” 的技能，换个关键词试试。",
    reset: "重置筛选",
  },
  card: {
    experimental: "实验性",
    useWhen: "适用场景",
    example: "使用示例",
    details: "查看详情",
    detailsAria: "查看{title}详情",
  },
  terminal: {
    copy: "复制",
    copied: "已复制",
    copyAria: "复制命令",
    copiedAria: "命令已复制",
    promptTag: "对智能体说",
  },
  detail: {
    home: "首页",
    breadcrumb: "面包屑",
    useWhen: "适用场景",
    example: "命令示例",
    exampleNote:
      "大写占位符（如 APP_ID、BUILD_ID）请替换为你自己的值；标有「对智能体说」的行是给 AI 智能体的提示词，不会被复制。",
    installTitle: "安装此技能",
    installNote: "安装 asc 后运行下面的命令即可一次性安装全部技能，其中包含 {id}。",
    related: "同类技能：{category}",
    pager: "上一个与下一个技能",
    titleTpl: "{title}（{id}）用法与命令示例",
    descTail: "含可直接复制的 asc 命令示例。",
    appliesTo: "适用于：{item}。",
  },
  footer: {
    a: "本页内容整理自 ",
    b: " 与 ",
    c: " 公开文档，非官方维护，仅作中文使用示例参考，与 Apple 无关联。",
  },
  jsonld: {
    appDescription:
      "ASC Skills 是 App Store Connect CLI（asc-cli）提供的 Agent Skills 技能集合，覆盖构建发布、签名分发、TestFlight、元数据本地化与商业化配置。",
    listName: "ASC CLI Skills 技能列表",
    listDescription: "全部 ASC Skills（ASC CLI Skills）及其适用场景",
    faq: [
      {
        q: "什么是 ASC Skills / AscSkill？",
        a: "ASC Skills（也称 AscSkill、AscSkills）是 App Store Connect CLI（asc-cli）为 AI Agent 提供的技能包，覆盖构建、发布、签名、TestFlight、元数据与商业化等全部工作流。",
      },
      {
        q: "如何安装全部 ASC CLI Skills？",
        a: "安装 asc-cli 后运行 `asc install-skills` 即可一次性安装全部经审查的 ASC CLI Skill（AscCliSkill）。",
      },
      {
        q: "ASC CLI Skills 一共有多少个？",
        a: "目前 ASC CLI Skills 共有 {n} 个，分布在 {c} 个分类中，包括核心用法、构建发布、签名分发、TestFlight、元数据本地化与商业化配置等。",
      },
    ],
  },
}

export type Messages = typeof messages
