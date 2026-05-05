# 密网巡哨 TraﬀicVigil

“密网巡哨 TraﬀicVigil” 是一个面向加密流量识别、行为分析与群组溯源场景的前端系统，用于承载“融合多模态大数据的加密流量识别溯源系统”的核心界面、功能模块与交互流程。



## 1. 项目特点

- 支持静态化部署，开箱即用
- 可直接本地打开或通过静态服务器运行
- 适合部署到 GitHub Pages
- 包含项目化首页、数据展示、业务模块与交互动画
- 可继续扩展为多页面系统并接入真实接口

## 2. 运行环境

本项目可直接部署运行，无需额外安装 npm 依赖。

只需要以下任意一种方式即可运行：

- 直接双击 `index.html`
- 使用 VS Code 的 Live Server
- 使用 Python 启动本地静态服务器
- 使用任意静态网站托管服务部署

## 3. 项目文件说明

当前核心文件如下：

```text
index.html    页面主体结构
styles.css    页面样式与动画
app.js        前端交互逻辑与模拟数据
README.md     项目说明文档
```



## 4. 本地运行方法

### 方法一：直接打开

找到项目目录中的 `index.html`，双击即可在浏览器中打开。

说明：

- 这种方式最简单
- 适合只做页面预览
- 某些浏览器对本地脚本或资源路径限制更严格时，建议改用方法二或方法三

### 方法二：使用 VS Code Live Server

1. 使用 VS Code 打开项目文件夹
2. 安装 `Live Server` 插件
3. 右键 `index.html`
4. 点击 `Open with Live Server`

这样可以获得更稳定的本地预览体验。

### 方法三：使用 Python 启动本地服务器

在项目目录下运行：

```bash
python -m http.server 8000
```

然后在浏览器访问：

```text
http://localhost:8000
```

## 5. 上传到 GitHub 的方法

### 方式一：普通仓库展示

1. 新建一个 GitHub 仓库
2. 将项目文件上传到仓库根目录
3. 提交并推送

示例命令：

```bash
git init
git add .
git commit -m "init TrafficVigil frontend"
git branch -M main
git remote add origin 你的仓库地址
git push -u origin main
```

### 方式二：部署到 GitHub Pages

如果想直接生成在线演示链接：

1. 将项目上传到 GitHub 仓库
2. 打开仓库的 `Settings`
3. 找到 `Pages`
4. 在 `Build and deployment` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. 保存设置

等待几分钟后，GitHub 会生成一个公开访问地址，例如：

```text
https://你的用户名.github.io/你的仓库名/
```

## 6. 部署注意事项

- 所有页面之间跳转建议使用相对路径
- 图片、图标、视频等资源建议统一放入 `assets/` 目录
- 文件名尽量使用英文，避免部分环境下中文路径兼容问题
- 如果后续增加多页面，建议统一顶部导航和页脚结构
- 建议在正式部署时统一配置访问路径、资源目录与页面跳转规则

## 7. 项目说明

本项目已经具备完整的页面结构、模块入口、交互流程与数据展示能力，可作为“密网巡哨 TraﬀicVigil”系统的部署版本直接使用。

项目特点如下：

- 页面结构完整
- 交互流程清晰
- 数据看板与功能模块完整
- 可直接部署上线

如需进一步增强系统能力，可继续增加：

- 用户登录鉴权
- 文件上传接口
- PCAP 分析结果回传
- 实时日志 WebSocket 推送
- 报告导出功能
- 后台管理与权限分级

