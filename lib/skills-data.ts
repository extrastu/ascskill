export interface Skill {
  /** Canonical skill id as published in the skills repo */
  id: string
  /** Short Chinese title */
  title: string
  /** Category key, see CATEGORIES below */
  category: CategoryKey
  /** One-line Chinese summary */
  summary: string
  /** Longer Chinese description */
  description: string
  /** “适用场景” bullet points, in Chinese */
  useWhen: string[]
  /** Example terminal lines. "#" lines render as comments; "> " lines are natural-language prompts for an agent (shown, but not copied). */
  example: string[]
  /** Optional stability tag */
  tag?: "stable" | "experimental"
}

export type CategoryKey =
  | "core"
  | "build"
  | "release"
  | "signing"
  | "testflight"
  | "media"
  | "metadata"
  | "commerce"
  | "automation"
  | "community"

export const CATEGORIES: { key: CategoryKey; label: string; description: string }[] = [
  { key: "core", label: "核心用法", description: "命令速查与基础能力" },
  { key: "build", label: "应用创建与构建", description: "创建应用、编译归档、解析资源 ID" },
  { key: "release", label: "发布与审核", description: "暂存版本、提交审核、健康诊断" },
  { key: "signing", label: "签名与分发", description: "证书、描述文件、临时分发与公证" },
  { key: "testflight", label: "TestFlight 与质量", description: "测试组、构建生命周期、崩溃分析" },
  { key: "media", label: "截图与素材", description: "截图尺寸校验与自动化取图流水线" },
  { key: "metadata", label: "元数据与本地化", description: "文案同步、翻译、ASO 审计、更新说明" },
  { key: "commerce", label: "商业化与定价", description: "区域定价、订阅本地化、RevenueCat 同步" },
  { key: "automation", label: "自动化与广告", description: "工作流编排、Apple Ads、数据报表" },
  { key: "community", label: "社区", description: "Wall of Apps 提交" },
]

export const SKILLS: Skill[] = [
  {
    id: "asc-cli-usage",
    title: "CLI 用法速查",
    category: "core",
    summary: "快速找到正确的 asc 命令、参数、分页与输出格式。",
    description:
      "这是所有工作流的起点技能：帮助智能体或开发者选择正确的 asc 命令、规范的参数组合、分页方式与输出格式（JSON / table / markdown），并覆盖 Apple Ads 相关的鉴权与分页细节。",
    useWhen: [
      "不确定该用哪个 asc 命令或参数组合时",
      "需要面向自动化场景的 JSON 输出与分页技巧时",
      "需要 Apple Ads 的鉴权、广告账户或分页指引时",
      "需要用 asc search / asc schema / asc capabilities 发现命令、查看接口字段或确认某项能力是否被公开 API 支持时",
      "需要区分 API Key 鉴权（asc auth）与 Apple 账号网页会话（asc web auth）时",
    ],
    example: [
      "# 不确定命令时，先用本地搜索发现命令路径",
      'asc search "submit app for review"',
      "",
      "# 以 JSON 格式列出某应用的全部构建，并自动翻页",
      "asc builds list --app 123456789 --output json --paginate",
    ],
  },
  {
    id: "asc-app-create-ui",
    title: "创建新应用",
    category: "build",
    summary: "通过浏览器自动化创建 App Store Connect 应用记录。",
    description:
      "App Store Connect 目前没有公开 API 用于创建新应用，该技能通过受控的浏览器自动化完成应用名称、Bundle ID、SKU 与主要语言的填写与提交。",
    useWhen: ["需要创建新的应用记录（名称 / Bundle ID / SKU / 主语言）时", "可以在真实浏览器中登录 App Store Connect 时"],
    example: [
      "# 第一步：先通过公开 API 注册 Bundle ID，并确认尚无同名应用记录",
      'asc bundle-ids create --identifier "com.example.myapp" --name "My App" --platform IOS',
      'asc apps list --bundle-id "com.example.myapp" --output json',
      "",
      "# 第二步：交给智能体在浏览器里填写 New App 表单（名称 / SKU / 主语言）",
      "> 创建一个 Bundle ID 为 com.example.myapp、SKU 为 MYAPP123、主语言为英语（美国）的新 App Store Connect 应用",
      "",
      "# 第三步：创建后通过 API 校验，并继续设置主语言、分类等",
      'asc apps list --bundle-id "com.example.myapp" --output json',
      'asc app-setup info set --app "APP_ID" --primary-locale "en-US"',
    ],
  },
  {
    id: "asc-xcode-build",
    title: "Xcode 构建与导出",
    category: "build",
    summary: "编译、归档、生成导出选项并导出 IPA / PKG，上传前的最后一步。",
    description:
      "覆盖从本地 Xcode 项目到可上传产物的全过程：构建、归档（archive）、生成并自定义 ExportOptions.plist、导出 IPA 或 PKG，并能管理版本号与构建号（asc xcode version）、衔接 asc builds upload / asc publish 完成上传，以及排查常见的导出签名与构建号问题。",
    useWhen: [
      "需要生成可上传的 IPA 或 PKG 时",
      "在搭建 CI/CD 构建流水线时",
      "需要生成或自定义 ExportOptions.plist 时",
      "需要面向已注册设备的现代 release-testing 导出时",
      "排查导出时「No profiles for bundle ID」、CFBundleVersion 过低、macOS 缺少图标导致构建被拒等问题时",
    ],
    example: [
      "# 自动取下一个可用构建号，再归档并导出（具体参数请用 asc xcode archive --help 查看）",
      'asc xcode version edit --next-build-number --app "APP_ID" --platform IOS',
      "> 归档并导出我的 iOS 应用为 IPA，以便上传到 App Store Connect",
      "",
      "# 导出后上传，或直接发布到 TestFlight",
      'asc builds upload --app "APP_ID" --ipa ".asc/artifacts/App.ipa" --wait',
      'asc publish testflight --app "APP_ID" --ipa ".asc/artifacts/App.ipa" --group "GROUP_ID" --wait',
    ],
  },
  {
    id: "asc-id-resolver",
    title: "资源 ID 解析",
    category: "build",
    summary: "把应用名、版本号等人类可读信息解析为 asc 命令需要的资源 ID。",
    description:
      "许多 asc 命令需要精确的资源 ID（应用、构建、App 版本、数字商品版本、测试组、测试员等），该技能负责把名称解析为确定性的 ID，也支持 API 4.4.1 中 IAP / 订阅 / 订阅组版本 ID 的解析，便于自动化脚本消费。",
    useWhen: [
      "某个命令需要 ID，但你只有名称时",
      "需要 API 4.4.1 的内购、订阅或订阅组版本 ID 时",
      "希望得到适合自动化消费的确定性输出时",
    ],
    example: [
      "# 解析应用 ID、最新构建 ID 与 TestFlight 测试组 ID",
      "asc apps list --output table",
      'asc builds info --app "APP_ID" --latest --platform IOS --output json',
      'asc testflight groups list --app "APP_ID" --paginate --output json',
      "",
      "# API 4.4.1：解析订阅版本 ID 与订阅组版本 ID",
      'asc subscriptions versions list --subscription-id "SUB_ID" --paginate --output json',
      'asc subscriptions groups versions list --group-id "GROUP_ID" --paginate --output json',
    ],
  },
  {
    id: "asc-release-flow",
    title: "发布流程编排",
    category: "release",
    summary: "以 dry-run 和确认机制驱动「暂存（stage）→ 提交审核」与「上传并发布」。",
    description:
      "负责把准备好的应用版本或构建产物送到 App Store：在 asc release stage（准备元数据并关联已有构建，但不提交审核）、asc review submit（提交已就绪的版本）、asc publish appstore（上传 IPA 并可选提交）之间做出正确选择，并支持组装包含 Game Center 或数字商品版本的多项提交。只读准备情况诊断、监控与重试请使用「提交健康诊断」技能。",
    useWhen: [
      "已准备好的应用版本或产物需要暂存、上传或提交审核时",
      "需要在 release stage / review submit / publish appstore 之间做选择时",
      "需要组装包含 Game Center 或数字商品版本的多项提交时",
    ],
    example: [
      "# 暂存：沿用上一版本的本地化元数据并关联构建，预览计划（不会创建审核提交）",
      "asc release stage --app 123456789 --version 1.2.3 --build-id BUILD_ID --copy-metadata-from 1.2.2 --dry-run",
      "",
      "# 暂存就绪后，先预览再提交审核",
      "asc review submit --app 123456789 --version 1.2.3 --build-id BUILD_ID --dry-run",
      "asc review submit --app 123456789 --version 1.2.3 --build-id BUILD_ID --confirm",
      "",
      "# 或：一步完成上传、关联构建与提交审核",
      "asc publish appstore --app 123456789 --ipa ./MyApp.ipa --version 1.2.3 --submit --confirm",
    ],
  },
  {
    id: "asc-submission-health",
    title: "提交健康诊断",
    category: "release",
    summary: "诊断提交阻塞原因、分类问题、监控审核状态并决定是否重试。",
    description:
      "当校验报告元数据、合规性、数字商品或 App Privacy 阻塞时，该技能负责判断应用当前是否可以提交、对每个阻塞项分类、给出修复路径，并支持监控、取消与安全重试的决策。发布与提交的具体执行请使用「发布流程编排」技能。",
    useWhen: [
      "想知道应用现在是否可以提交时",
      "校验报告出现元数据、合规性、数字商品或 App Privacy 阻塞时",
      "版本处于无效状态时",
      "需要监控、取消、修复或安全重试一次提交时",
    ],
    example: [
      "# 校验版本并查看严格模式下的阻塞详情",
      "asc validate --app 123456789 --version 1.2.3 --output json",
      "asc validate --app 123456789 --version 1.2.3 --strict",
      "",
      "# 校验内购与订阅，并做审核准备情况诊断",
      "asc validate iap --app 123456789 --output table",
      "asc validate subscriptions --app 123456789 --output table",
      "asc review doctor --app 123456789 --version 1.2.3 --platform IOS --output table",
      "",
      "# 监控审核状态；必要时取消提交",
      "asc review status --app 123456789 --version 1.2.3 --platform IOS --output table",
      "asc submit cancel --version-id VERSION_ID --app 123456789 --confirm",
    ],
  },
  {
    id: "asc-signing-setup",
    title: "签名与证书配置",
    category: "signing",
    summary: "管理 Bundle ID、Capabilities、证书、描述文件与加密签名同步。",
    description:
      "覆盖新应用或新 Bundle ID 的接入、证书与描述文件的创建或轮换，以及通过加密 Git 仓库（类似轻量版 fastlane match）同步私钥身份、协调（reconcile）Ad Hoc 描述文件、在隔离签名环境中运行命令等高级场景。",
    useWhen: [
      "正在接入一个新应用或新 Bundle ID 时",
      "需要创建或轮换签名资产时",
      "需要同步私钥身份、协调 Ad Hoc 描述文件，或在隔离环境中运行命令时",
    ],
    example: [
      "# 为 Bundle ID 启用 iCloud 能力，创建分发证书（同时生成密钥与 CSR）",
      'asc bundle-ids capabilities add --bundle "BUNDLE_ID" --capability ICLOUD',
      'asc certificates create --certificate-type IOS_DISTRIBUTION --generate-csr --key-out "./signing/dist.key" --csr-out "./signing/dist.csr"',
      "",
      "# 创建 App Store 描述文件并下载",
      'asc profiles create --name "AppStore Profile" --profile-type IOS_APP_STORE --bundle "BUNDLE_ID" --certificate "CERT_ID"',
      'asc profiles download --id "PROFILE_ID" --output "./profiles/AppStore.mobileprovision"',
    ],
  },
  {
    id: "asc-ad-hoc-distribution",
    title: "Ad Hoc 临时分发",
    category: "signing",
    tag: "experimental",
    summary: "在 TestFlight 之外，向受控设备列表发布经校验的私有安装包。",
    description:
      "使用实验性的 asc distribute 工作流，面向注册设备准备并发布私有的 iOS 安装包；会先给出只读计划，再执行追加式的签名与存储变更，并支持断点续传与实时校验私有的 S3 兼容分发流程。",
    useWhen: [
      "需要在 TestFlight 之外，向受控设备列表发布构建时",
      "希望在产生追加式签名与存储变更前先看到只读计划时",
      "需要断点续传或实时校验一次私有分发流程时",
    ],
    example: [
      "# 先规划（只读），确认计划后再执行；中断后可断点续传并校验",
      "> 基于这个 Xcode 归档规划一次私有的 release-testing 安装，先展示具体影响，我确认计划哈希后再执行",
      "",
      "# 对应的子命令（参数请用 --help 查看）",
      "asc distribute plan --help",
      "asc distribute apply --help",
      'asc distribute resume --run "RUN_ID" --state-dir ".asc/distribution/runs" --output json',
      'asc distribute verify --run "RUN_ID" --state-dir ".asc/distribution/runs" --timeout 30s --output json',
    ],
  },
  {
    id: "asc-notarization",
    title: "macOS 公证",
    category: "signing",
    summary: "使用 Developer ID 签名完成 macOS 应用的归档、导出与公证。",
    description:
      "覆盖 App Store 之外分发 macOS 应用所需的完整链路：归档 → Developer ID 导出 → 压缩 → 提交公证（asc notarization）→ 装订（可选，使用 xcrun stapler），并帮助排查 Developer ID 签名或信任链问题。",
    useWhen: [
      "需要为 App Store 之外的分发对 macOS 应用做公证时",
      "想走完整流程：归档 → Developer ID 导出 → 压缩 → 公证 →（可选）装订时",
      "排查 Developer ID 签名或信任链问题时",
    ],
    example: [
      "# 归档并以 Developer ID 方式导出（交给智能体执行 xcodebuild）",
      "> 归档我的 macOS 应用，以 Developer ID 方式导出并压缩为 zip",
      "",
      "# 提交公证并等待结果；失败时查看开发者日志",
      'asc notarization submit --file "./YourApp.zip" --wait',
      'asc notarization log --id "SUBMISSION_ID"',
      "",
      "# 公证通过后装订票据（Apple 自带工具，非 asc 命令）",
      'xcrun stapler staple "./YourApp.app"',
    ],
  },
  {
    id: "asc-testflight-orchestration",
    title: "TestFlight 编排",
    category: "testflight",
    summary: "管理 Beta 测试组、测试员、构建分发与「测试重点」说明。",
    description:
      "适合同时维护多个 TestFlight 测试组与测试员名单的团队，提供一致的 Beta 发布步骤，覆盖创建分组、添加测试员、关联最新构建与撰写测试说明。",
    useWhen: ["需要管理多个 TestFlight 测试组与测试员时", "希望 Beta 发布流程保持一致、可重复时"],
    example: [
      "# 导出当前 TestFlight 配置，创建测试组并添加测试员",
      'asc testflight config export --app "APP_ID" --output "./testflight.yaml"',
      'asc testflight groups create --app "APP_ID" --name "Beta Testers"',
      'asc testflight testers add --app "APP_ID" --email "tester@example.com" --group "Beta Testers"',
      "",
      "# 把构建分发给测试组，并写入「测试重点」",
      'asc builds add-groups --build-id "BUILD_ID" --group "GROUP_ID"',
      'asc builds test-notes create --build-id "BUILD_ID" --locale "en-US" --whats-new "请重点测试登录流程"',
    ],
  },
  {
    id: "asc-build-lifecycle",
    title: "构建生命周期管理",
    category: "testflight",
    summary: "构建处理状态跟踪、最新构建解析与自动化清理。",
    description:
      "在等待 Apple 处理构建、需要自动解析「最新可用构建」，或希望按保留策略批量清理过期 TestFlight 构建时使用，支持自动化清理与保留策略预览。",
    useWhen: ["正在等待构建处理完成时", "希望实现自动化清理与保留策略时"],
    example: [
      "# 找到最新构建，并获取下一个可用构建号",
      'asc builds info --app 123456789 --latest --version 1.2.3 --platform IOS',
      'asc builds next-build-number --app 123456789 --version 1.2.3 --platform IOS',
      "",
      "# 预览过期 90 天以上构建的清理计划，确认后再执行",
      "asc builds expire-all --app 123456789 --older-than 90d --dry-run",
      "asc builds expire-all --app 123456789 --older-than 90d --confirm",
    ],
  },
  {
    id: "asc-crash-triage",
    title: "崩溃与反馈分类",
    category: "testflight",
    summary: "汇总 TestFlight 崩溃、Beta 反馈与性能诊断信息。",
    description:
      "按崩溃签名、设备与构建对最近的 TestFlight 崩溃报告进行分组汇总，同时检查 Beta 测试员反馈与截图，并提供启动耗时、卡顿、磁盘写入等性能诊断数据。",
    useWhen: [
      "想查看最近的 TestFlight 崩溃报告时",
      "需要按签名、设备、构建分组的崩溃摘要时",
      "想检查 Beta 测试员反馈与截图时",
      "需要某个构建的性能诊断（卡顿、磁盘写入、启动耗时）时",
    ],
    example: [
      "# 查看最近 10 条 TestFlight 崩溃与带截图的 Beta 反馈",
      'asc testflight crashes list --app "APP_ID" --sort -createdDate --limit 10 --output table',
      'asc testflight feedback list --app "APP_ID" --sort -createdDate --limit 10 --include-screenshots',
      "",
      "# 查看某个构建的卡顿（HANGS）诊断",
      'asc performance diagnostics list --build-id "BUILD_ID" --diagnostic-type "HANGS"',
      "",
      "# 让智能体按签名和受影响构建分组汇总",
      "> 展示 MyApp 最新的 TestFlight 崩溃与反馈，按签名和受影响构建分组",
    ],
  },
  {
    id: "asc-screenshot-resize",
    title: "截图尺寸校验与调整",
    category: "media",
    summary: "基于最新尺寸目录校验并调整 App Store 截图尺寸。",
    description:
      "结合 asc screenshots sizes 返回的最新尺寸目录与 macOS 的 sips 工具，检查截图尺寸是否符合 Apple 当前要求，去除 Alpha 通道、按设备类型调整尺寸，并在上传前完成本地校验。",
    useWhen: [
      "需要查看 Apple 当前接受的截图尺寸时",
      "需要在上传前去除 Alpha 通道或调整截图尺寸时",
      "希望针对某个设备类型做本地校验时",
    ],
    example: [
      "# 查看 Apple 当前接受的截图尺寸，并校验本地截图",
      "asc screenshots sizes --output table",
      'asc screenshots validate --path "./screenshots/iphone" --device-type "IPHONE_65" --output table',
      "",
      "# 用 macOS 自带 sips 调整尺寸（宽 1284 × 高 2778），再重新校验",
      "sips -z 2778 1284 input.png --out output.png",
    ],
  },
  {
    id: "asc-shots-pipeline",
    title: "截图自动化流水线",
    category: "media",
    tag: "experimental",
    summary: "基于模拟器 + AXe + asc 的端到端截图采集、取景与上传流水线。",
    description:
      "面向智能体的截图流水线：使用 xcodebuild / simctl 启动模拟器，通过 AXe 驱动界面交互完成截图采集，再用实验性的 asc screenshots frame 加壳取景，最后通过 asc screenshots upload 上传；支持查询可用取景设备，并推荐固定版本的 Koubou 以保证取景结果可复现。",
    useWhen: [
      "需要可重复的模拟器截图自动化流程时",
      "希望先用 AXe 驱动界面再采集截图时",
      "需要「采集 → 取景 → 上传」的分阶段流水线时",
      "需要查询支持取景的设备列表时",
    ],
    example: [
      "# 构建应用，采集首页与设置页截图，取景后准备上传",
      "> 构建我的 iOS 应用，在模拟器中采集首页与设置页截图，加壳取景后准备好上传",
      "",
      "# 对应的 asc 子命令（取景前需安装 Koubou：kou setup-frames）",
      "asc screenshots list-frame-devices --output json",
      "asc screenshots frame --help",
      "asc screenshots upload --help",
    ],
  },
  {
    id: "asc-metadata-sync",
    title: "元数据同步",
    category: "metadata",
    summary: "拉取、校验并回写 App Store 元数据与本地化内容。",
    description:
      "负责 App Store 元数据与本地化内容的双向同步，包括从旧版元数据格式迁移、上传前的字数限制校验，以及更新隐私政策链接等应用级元数据。",
    useWhen: ["正在更新 App Store 元数据或本地化内容时", "需要在上传前校验字数限制时", "需要更新隐私政策链接等应用级元数据时"],
    example: [
      "# 拉取线上元数据 → 本地校验字数限制 → 以 dry-run 预览回写",
      "asc metadata pull --app 123456789 --version 1.2.3 --platform IOS --dir ./metadata",
      "asc metadata validate --dir ./metadata --output table",
      "asc metadata push --app 123456789 --version 1.2.3 --platform IOS --dir ./metadata --dry-run",
      "",
      "# 应用级字段（如隐私政策链接）使用 app-setup",
      'asc app-setup info set --app 123456789 --primary-locale en-US --privacy-policy-url "https://example.com/privacy"',
    ],
  },
  {
    id: "asc-localize-metadata",
    title: "元数据多语言翻译",
    category: "metadata",
    summary: "用 LLM 翻译提示词将元数据翻译成多语言，并在上传前供人复核。",
    description:
      "从源语言（通常是 en-US）出发，将应用描述、关键词、更新说明、副标题等翻译为多个本地化语言；关键词采用「符合当地搜索习惯」而非字面翻译，并严格执行各字段的字符数限制，提供上传前的人工复核环节。",
    useWhen: [
      "想把某个源语言的 App Store 列表信息本地化时",
      "需要符合当地搜索习惯的关键词而非字面翻译时",
      "希望在上传前先人工复核翻译结果时",
    ],
    example: [
      "# 下载源语言本地化 → 交给 LLM 翻译 → 上传前人工复核",
      'asc localizations download --version "VERSION_ID" --path "./localizations"',
      "> 把我的 en-US App Store 元数据翻译成德语、法语和日语，上传前先给我看改动",
      'asc localizations upload --version "VERSION_ID" --path "./localizations"',
    ],
  },
  {
    id: "asc-aso-audit",
    title: "ASO 离线审计",
    category: "metadata",
    summary: "对本地 ./metadata 做离线 ASO 审计，并结合 Astro MCP 发现关键词机会。",
    description:
      "对副标题、关键词、描述、更新说明等字段做格式与「浪费空间」问题审计，结合 Astro 跟踪的排名与竞品关键词做差距分析，并给出能直接映射到 asc metadata keywords 命令的后续动作。",
    useWhen: [
      "想审计副标题、关键词、描述、更新说明等字段的浪费与格式问题时",
      "想对比 Astro 跟踪的排名与竞品关键词做差距分析时",
      "希望后续动作能直接映射到 asc metadata keywords 命令时",
    ],
    example: [
      "# 先拉取规范化元数据，再做离线审计",
      'asc metadata pull --app "APP_ID" --version "1.2.3" --platform IOS --dir "./metadata"',
      "> 审计 ./metadata 中的 ASO 问题，再展示 Astro 中针对我最新版本的高价值关键词差距",
      "",
      "# 审计后的关键词调整可直接映射到：",
      'asc metadata keywords diff --app "APP_ID" --version "1.2.3" --platform IOS --dir "./metadata"',
    ],
  },
  {
    id: "asc-whats-new-writer",
    title: "更新说明撰写",
    category: "metadata",
    summary: "把 git log、要点或零散文字整理成有吸引力的多语言「新版本说明」。",
    description:
      "基于 ./metadata 下的规范化元数据，从 git 提交记录、要点列表或自由文本生成打磨过的 What's New 文案，并可将其本地化到已有的所有语言，提供基于 asc metadata push 或直接编辑元数据的上传前复核流程。",
    useWhen: [
      "想把粗糙的发布要点整理成打磨过的更新说明时",
      "想把更新说明本地化到已有的所有语言时",
      "希望在上传前走一遍复核流程时",
    ],
    example: [
      "# 把发布要点整理成文案并本地化到现有语言",
      "> 把这些发布要点整理成 en-US 的更新说明文案，并本地化到我现有的所有元数据语言",
      "",
      "# 复核后先 dry-run，再回写",
      'asc metadata push --app "APP_ID" --version "1.2.3" --dir "./metadata" --dry-run',
      'asc metadata push --app "APP_ID" --version "1.2.3" --dir "./metadata"',
    ],
  },
  {
    id: "asc-ppp-pricing",
    title: "PPP 购买力平价定价",
    category: "commerce",
    summary: "基于购买力平价为不同地区设置差异化价格。",
    description:
      "用于实现按地区购买力调整价格的策略，帮助为不同国家 / 地区设置不同的售价，常用于订阅与内购的区域化定价方案。",
    useWhen: ["想为不同国家设置不同价格时", "正在实施本地化定价策略时", "需要根据地区购买力调整价格时"],
    example: [
      "# 先查看某地区当前价格，再设置单个地区的价格",
      'asc subscriptions pricing summary --subscription-id "SUB_ID" --territory "IND"',
      'asc subscriptions pricing prices set --subscription-id "SUB_ID" --price "2.99" --territory "IND"',
      "",
      "# 批量调整：用 CSV 导入（子命令参数请用 --help 查看）",
      "asc subscriptions pricing prices import --help",
      "",
      "# 按购买力平价为多个地区调整并校验",
      "> 按购买力平价方式为印度、巴西和墨西哥调整我的订阅价格，并校验最终结果",
    ],
  },
  {
    id: "asc-subscription-localization",
    title: "订阅内购本地化",
    category: "commerce",
    summary: "批量为订阅与内购设置多语言展示名称，包含 API 4.4.1 版本化资源。",
    description:
      "一次性为订阅与内购的展示名称填充所有语言，补齐缺失的订阅 / 订阅组 / 内购本地化内容，覆盖 API 4.4.1 中版本化的 v2 资源，免去在 App Store Connect 后台逐语言点击的麻烦。",
    useWhen: [
      "想一次性为所有语言设置相同的订阅展示名称时",
      "需要补齐缺失的订阅 / 订阅组 / 内购本地化时",
      "厌倦了在 App Store Connect 后台逐语言手动点击时",
    ],
    example: [
      "# 从 JSON 文件一次性导入多语言名称（先 dry-run 再确认）",
      'asc subscriptions versions localizations import --version-id "VERSION_ID" --file "./localizations.json" --dry-run',
      'asc subscriptions versions localizations import --version-id "VERSION_ID" --file "./localizations.json" --confirm',
      "",
      "# 校验各语言是否已创建",
      'asc subscriptions versions localizations list --version-id "VERSION_ID" --paginate --output table',
    ],
  },
  {
    id: "asc-revenuecat-catalog-sync",
    title: "RevenueCat 目录同步",
    category: "commerce",
    summary: "将 App Store Connect 订阅 / 内购与 RevenueCat 的产品、权益、套餐对账。",
    description:
      "对账 App Store Connect 的订阅与内购同 RevenueCat 中的产品（Products）、权益（Entitlements）、Offering 与 Package，支持在建立映射前自动创建缺失的 ASC 订阅 / 内购，采用「先审计、后确认执行」的工作流。",
    useWhen: [
      "想把 ASC 产品目录同步到 RevenueCat 时",
      "需要在建立映射前先创建缺失的 ASC 订阅 / 内购时",
      "希望采用先审计、后确认执行的工作流时",
    ],
    example: [
      "# 读取 ASC 当前目录（RevenueCat 一侧通过 RevenueCat MCP 读取）",
      'asc subscriptions groups list --app "APP_ID" --paginate --output json',
      'asc iap list --app "APP_ID" --paginate --output json',
      "",
      "# 审计差异，确认后再创建映射",
      "> 审计我的 App Store Connect 订阅与内购同 RevenueCat 的差异，我确认后再创建缺失的映射",
    ],
  },
  {
    id: "asc-workflow",
    title: "工作流编排",
    category: "automation",
    summary: "用 asc workflow 与 .asc/workflow.json 定义可复用的本地自动化流程图。",
    description:
      "帮助团队从基于「lane」的自动化迁移到仓库本地的工作流定义，支持多步骤编排、面向 CI / 智能体的机器可读 JSON 输出、生命周期钩子（before_all / after_all / error）、条件判断（if）与可复用的私有子工作流，并在执行前通过 asc workflow validate 做环检测与引用校验。",
    useWhen: [
      "正在从基于 lane 的自动化迁移到仓库本地工作流时",
      "需要带机器可读 JSON 输出的多步骤编排（面向 CI / 智能体）时",
      "需要生命周期钩子、条件判断与可复用私有子工作流时",
      "希望在执行前做环路与引用校验时",
    ],
    example: [
      "# 校验工作流定义，再以 dry-run 方式预演一次测试发布",
      "asc workflow validate --output json",
      "asc workflow run --dry-run testflight_beta VERSION:1.2.3",
      "",
      "# 列出可用工作流；失败后用运行 ID 断点续跑",
      "asc workflow list",
      'asc workflow run release --resume "RUN_ID"',
    ],
  },
  {
    id: "asc-apple-ads",
    title: "Apple Ads 投放管理",
    category: "automation",
    summary: "Apple Ads 鉴权、账户发现、Platform API v1 的广告系列、定向、报表与资产管理。",
    description:
      "覆盖 Apple Ads 独立 OAuth 鉴权与广告账户发现、基于 Platform API v1 的广告系列与定向管理、报表与素材操作、有防护的变更操作（guarded mutations）、原始 API 调用，以及从废弃的 v5 自动化迁移到 Platform API v1 的路径。",
    useWhen: [
      "需要用 asc ads 读取或修改 Apple Ads 资源时",
      "需要 Apple Ads 的 OAuth、Profile、广告账户上下文或 ASC_ADS_* 相关指引时",
      "需要在修改真实广告账户前先制定只读的安全计划时",
      "需要把废弃的 asc ads v5 自动化迁移到 Platform API v1 时",
    ],
    example: [
      "# 登录 Apple Ads、发现账户并查询广告系列",
      "asc ads auth login --name Marketing --client-id SEARCHADS_CLIENT_ID --team-id SEARCHADS_TEAM_ID --key-id KEY_ID --private-key ./ads-key.pem --ad-account 987654",
      "asc ads campaigns find --ad-account 987654 --file query.json --output json",
    ],
  },
  {
    id: "asc-analytics-reports",
    title: "分析报告采集",
    category: "automation",
    summary: "采集、下载并校验私有的 App Store Connect 分析报告。",
    description:
      "帮助查找已存在的分析报告请求，按处理日期或粒度筛选报告实例，并下载每一个报告分段，同时依据 Apple 提供的文件大小与 MD5 元数据逐一校验完整性。",
    useWhen: [
      "需要查找已存在的分析报告请求时",
      "想按处理日期或粒度筛选报告实例时",
      "需要下载并对照 Apple 的大小与 MD5 元数据校验每个报告分段时",
    ],
    example: [
      "# 先确认命令契约，再交给智能体执行「查找请求 → 选择实例 → 下载分段 → 校验」",
      "asc analytics view --help",
      "",
      "# 查找已有报告请求，并列出某个请求下的报告实例",
      'asc analytics requests --app "APP_ID" --paginate --output json',
      'asc analytics view --request-id "REQUEST_ID" --paginate --output json',
      "",
      "# 按处理日期与粒度筛选，并下载单个分段（需 asc 3.5.0+）",
      'asc analytics view --request-id "REQUEST_ID" --processing-date "2026-01-15" --granularity DAILY --paginate --include-segments --output json',
      'asc analytics download --request-id "REQUEST_ID" --instance-id "INSTANCE_ID" --segment-id "SEGMENT_ID" --output "./segment.txt.gz"',
      "",
      "# 让智能体做完整采集与大小 / MD5 校验",
      "> 采集我最新的周度分析报告，私有下载每个分段文件，并在分析前逐一校验完整性",
    ],
  },
  {
    id: "asc-wall-submit",
    title: "Wall of Apps 提交",
    category: "community",
    summary: "通过 asc apps wall submit 把你的应用提交到 Wall of Apps 展示墙。",
    description:
      "使用内置的 CLI 提交流程，把应用加入 App-Store-Connect-CLI 的 Wall of Apps 展示墙，或更新已有条目；需在 App-Store-Connect-CLI 仓库根目录下运行，命令会使用已登录的 gh 会话 fork 仓库并发起 PR，自动从应用 ID 解析公开的名称、链接与图标。",
    useWhen: ["想把应用加入 Wall of Apps 时", "想更新已有的 Wall 条目时", "想使用内置的 CLI 提交流程时", "非 App Store 应用（如 TestFlight 公测）可用 --link 与 --name 代替 --app"],
    example: [
      "# 预览 fork / 分支 / PR 计划，再正式提交",
      "asc apps wall submit --app 1234567890 --dry-run",
      "asc apps wall submit --app 1234567890 --confirm",
      "",
      "# 非 App Store 条目（如 TestFlight 公测链接）",
      'asc apps wall submit --link "https://testflight.apple.com/join/ABCDEFG" --name "My Beta App" --confirm',
    ],
  },
]

export const SITE_URL = "https://ascskill.wiki"

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id)
}

export function getCategory(key: CategoryKey) {
  return CATEGORIES.find((c) => c.key === key)!
}

/** Shell command lines of a skill's example (excludes comments and agent prompts). */
export function getCommands(skill: Skill): string[] {
  return skill.example.filter((l) => l.trim() !== "" && !l.trimStart().startsWith("#") && !l.startsWith("> "))
}
