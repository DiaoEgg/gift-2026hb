# 🎂 生日快乐 - 专属生日贺卡

一个精美的花卉主题生日贺卡网页，包含花瓣飘落、蛋糕吹蜡烛、烟花绽放、照片画廊等互动效果。

## ✨ 功能特色

- 🌸 花瓣飘落动画背景
- 🎂 点击蛋糕吹灭蜡烛
- 🎆 绚丽烟花绽放效果
- 📷 照片画廊展示
- 💌 专属祝福语
- 📱 支持手机和电脑浏览

## 🛠️ 自定义修改

### 修改名字和祝福语

打开 `index.html`，找到以下内容并修改：

```html
<!-- 修改名字（第26行附近） -->
<h1 class="name">小花花</h1>

<!-- 修改祝福语（第95行附近） -->
<h2>亲爱的小花花</h2>
<p class="message-text">
    在这个特别的日子里...（你的祝福语）
</p>
<div class="signature">—— 你的好朋友</div>
```

### 添加照片

1. 把照片放入 `images` 文件夹
2. 命名为 `photo1.jpg`、`photo2.jpg` ... `photo6.jpg`
3. 支持 jpg、png、webp 等格式

> 💡 如果不想用 6 张照片，可以在 `index.html` 中删除多余的 `<div class="photo-card">` 块

## 🚀 部署到 GitHub Pages

### 步骤 1：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 `+` → `New repository`
3. 仓库名建议用随机字符，如 `gift-x7k9m2`（保护隐私）
4. 选择 `Public`
5. 点击 `Create repository`

### 步骤 2：上传代码

方式一：使用命令行（推荐）
```bash
cd /Users/zhouzibo/code/demo
git init
git add .
git commit -m "birthday gift 🎂"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

方式二：直接在网页上传
1. 在仓库页面点击 `Add file` → `Upload files`
2. 拖入所有文件
3. 点击 `Commit changes`

### 步骤 3：开启 GitHub Pages

1. 进入仓库 → `Settings` → `Pages`
2. Source 选择 `Deploy from a branch`
3. Branch 选择 `main`，文件夹选 `/ (root)`
4. 点击 `Save`
5. 等待 1-2 分钟，刷新页面获取链接

### 步骤 4：获取链接

部署成功后，你会看到：
```
Your site is live at https://你的用户名.github.io/仓库名/
```

把这个链接发给她就行啦！🎉

## 📁 文件结构

```
demo/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # 交互逻辑
├── robots.txt      # 阻止搜索引擎索引
├── images/         # 照片文件夹
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
└── README.md       # 说明文档
```

## 🎨 预览

本地预览：直接用浏览器打开 `index.html` 即可

---

祝她生日快乐！🎂🎉

