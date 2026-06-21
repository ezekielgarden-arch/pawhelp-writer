"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const copybook = {
  zh: {
    eyebrow: "给流浪的小爪一点声音", brandZh: "小爪帮帮", brandEn: "PawHelp", tagline: "把遇见写清楚，让帮助更容易发生",
    stepOne: "01 · 填写救助卡", formTitle: "告诉我们你看见了什么", fillExample: "填入示例",
    animalInfo: "动物信息", animalInfoHint: "先写你能确定的，不确定的可以留空。", animalType: "动物", age: "年龄阶段",
    helpNeeded: "需要什么帮助", helpNeededHint: "选择现在最重要的一件事。", condition: "目前情况", helpType: "主要需求",
    whereContact: "地点与联系", whereContactHint: "公开内容中尽量不要写过细的私人地址。", location: "发现地点", contact: "联系方式",
    locationPlaceholder: "如：阳光花园北门", contactPlaceholder: "如：私信我 / 电话",
    voicePlatform: "语气与平台", voicePlatformHint: "文案会随平台稍微调整节奏。", tone: "语气", platform: "发布平台", length: "文字长度",
    details: "补充观察", detailsPlaceholder: "如：左后腿不敢着地，躲在灌木旁，可以靠近", generate: "生成求助文案与卡片",
    privacy: "内容只保存在你的浏览器里，不上传服务器", stepTwo: "02 · 可直接转发", generatedPost: "生成的求助文案", history: "历史记录",
    copyText: "复制文案", share: "分享", edit: "继续编辑", stepThree: "03 · 图片卡片工作室", studioTitle: "做一张真正能转发的求助卡",
    studioHint: "换模板不会清空内容，下载始终可用", shareCard: "分享图片", downloadPng: "保存高清图片", qualityNote: "离线可用 · 高清导出 · 无水印遮挡",
    templates: "选择模板", photoTools: "动物照片", photoHint: "带照片的模板可上传自己的图片，也可直接使用自带图", uploadPhoto: "上传自己的照片", useBuiltIn: "使用自带图", builtInActive: "正在使用自带图", photoReady: "已使用你的照片", cardTipTitle: "小提醒", cardTip: "卡片负责让人停下来，完整情况放在配套文案里更好读",
    installTitle: "把小爪帮帮带在手机里", installText: "添加到手机桌面，遇到流浪猫狗时可以快速打开", installHow: "如何添加到桌面",
    footer: "愿每一次被看见，都离帮助更近一点", footerPrivacy: "内容只保存在你的浏览器", footerObserve: "请以现场观察为准", footerCare: "受伤动物请尽快联系专业救助或宠物医院", disclaimer: "请以现场观察为准；受伤动物应尽快联系专业救助或宠物医院",
    installDialogTitle: "添加小爪帮帮 PawHelp 到主屏幕", gotIt: "知道了", historyTitle: "最近生成", clearHistory: "清空本机记录",
    installIos: "iPhone：用 Safari 打开，点击分享按钮，再选择“添加到主屏幕”",
    installAndroid: "Android：用 Chrome 打开，点击菜单，再选择“添加到主屏幕”",
    saveDialogTitle: "保存求助图片", saveDialogHint: "长按图片选择保存，或点击下方按钮打开手机系统菜单", systemShare: "打开系统保存 / 分享", close: "关闭",
    copied: "文案已复制", generated: "已生成新的求助文案与卡片", saved: "图片已准备好保存", shareUnavailable: "当前浏览器不支持直接分享，已打开保存图片",
    historyEmpty: "还没有历史记录。生成后的文案会保存在这台设备上。", historyRestored: "已恢复这条记录", cleared: "本机记录已清空",
    cardShared: "图片分享面板已打开", postShared: "分享面板已打开", copyFailed: "复制失败，请长按文案复制", needLocation: "请至少填写一个大概地点",
    unknownLocation: "附近", privateMessage: "请私信联系", observed: "现场观察", helpLabel: "需要", locationLabel: "地点", contactLabel: "联系", footerMark: "小爪帮帮 PawHelp"
  },
  en: {
    eyebrow: "Give a little paw a voice", brandZh: "PawHelp", brandEn: "Writer", tagline: "Tell the story clearly. Make help easier to find.",
    stepOne: "01 · Rescue card", formTitle: "Tell us what you observed", fillExample: "Use an example",
    animalInfo: "Animal info", animalInfoHint: "Only add what you know. Unknown is okay.", animalType: "Animal", age: "Age group",
    helpNeeded: "Help needed", helpNeededHint: "Choose the most important need right now.", condition: "Current condition", helpType: "Primary need",
    whereContact: "Location & contact", whereContactHint: "Avoid posting an overly precise private address.", location: "Location", contact: "Contact",
    locationPlaceholder: "e.g. North gate, Sunny Garden", contactPlaceholder: "e.g. DM me / phone",
    voicePlatform: "Tone & platform", voicePlatformHint: "The rhythm adapts slightly to the platform.", tone: "Tone", platform: "Platform", length: "Text length",
    details: "What you observed", detailsPlaceholder: "e.g. avoids putting weight on the back leg and stays near the bushes", generate: "Generate rescue post & card",
    privacy: "Your content stays in this browser and is never uploaded", stepTwo: "02 · Ready to share", generatedPost: "Generated rescue post", history: "History",
    copyText: "Copy text", share: "Share", edit: "Keep editing", stepThree: "03 · Image card studio", studioTitle: "Make a rescue card people can share",
    studioHint: "Switching templates keeps your content. Download is always ready", shareCard: "Share image", downloadPng: "Save HD image", qualityNote: "Works offline · High resolution · Clean export",
    templates: "Choose a template", photoTools: "Animal photo", photoHint: "Photo templates can use your own upload or the built-in image", uploadPhoto: "Upload your photo", useBuiltIn: "Use built-in photo", builtInActive: "Using built-in photo", photoReady: "Using your photo", cardTipTitle: "Quick tip", cardTip: "Let the card stop the scroll; keep the full story in the accompanying post",
    installTitle: "Keep PawHelp on your phone", installText: "Add it to your home screen for quick access when you meet a stray", installHow: "How to install",
    footer: "May every small life that is seen move one step closer to help", footerPrivacy: "Content stays in your browser", footerObserve: "Share only what you observed", footerCare: "Contact a rescue or vet quickly for injured animals", disclaimer: "Share observed facts only; contact a rescue or veterinary professional for injured animals",
    installDialogTitle: "Add 小爪帮帮 PawHelp to your home screen", gotIt: "Got it", historyTitle: "Recent posts", clearHistory: "Clear local history",
    installIos: "iPhone: Open in Safari, tap Share, then choose Add to Home Screen",
    installAndroid: "Android: Open in Chrome, tap the menu, then choose Add to Home screen",
    saveDialogTitle: "Save rescue image", saveDialogHint: "Press and hold the image to save, or use the button below to open your phone menu", systemShare: "Open system save / share", close: "Close",
    copied: "Post copied", generated: "A new rescue post and card are ready", saved: "Your image is ready to save", shareUnavailable: "Direct sharing is unavailable, so the save preview was opened",
    historyEmpty: "No history yet. Generated posts are stored on this device.", historyRestored: "Post restored", cleared: "Local history cleared",
    cardShared: "Image share sheet opened", postShared: "Share sheet opened", copyFailed: "Could not copy. Please select the post manually.", needLocation: "Please add at least a general location",
    unknownLocation: "this area", privateMessage: "please send a private message", observed: "Observed", helpLabel: "Need", locationLabel: "Location", contactLabel: "Contact", footerMark: "PawHelp Writer"
  }
};

