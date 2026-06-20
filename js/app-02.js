const optionSets = {
  animal: [
    { value: "cat", zh: "猫", en: "Cat" }, { value: "dog", zh: "狗", en: "Dog" }, { value: "unknown", zh: "不确定", en: "Not sure" }
  ],
  age: [
    { value: "young", zh: "幼年", en: "Young" }, { value: "adult", zh: "成年", en: "Adult" }, { value: "senior", zh: "年长", en: "Senior" }, { value: "unknown", zh: "不确定", en: "Not sure" }
  ],
  condition: [
    { value: "injured", zh: "疑似受伤", en: "May be injured" }, { value: "weak", zh: "虚弱 / 消瘦", en: "Weak / underweight" },
    { value: "pregnant", zh: "疑似怀孕", en: "May be pregnant" }, { value: "young", zh: "幼崽独处", en: "Young and alone" },
    { value: "stable", zh: "状态尚可", en: "Appears stable" }, { value: "unknown", zh: "暂不确定", en: "Not sure" }
  ],
  helpType: [
    { value: "foster", zh: "救助 / 临时安置", en: "Rescue / foster" }, { value: "vet", zh: "医疗资源", en: "Veterinary help" },
    { value: "transport", zh: "转运", en: "Transport" }, { value: "adoption", zh: "领养线索", en: "Adoption lead" },
    { value: "food", zh: "食物 / 饮水", en: "Food / water" }, { value: "share", zh: "扩散信息", en: "Share the post" }
  ],
  tone: [
    { value: "gentle", zh: "温柔克制", en: "Gentle" }, { value: "urgent", zh: "紧急清楚", en: "Urgent" },
    { value: "objective", zh: "客观简洁", en: "Objective" }, { value: "story", zh: "温暖讲述", en: "Story-like" }
  ],
  platform: [
    { value: "wechat", zh: "朋友圈", en: "WeChat Moments" }, { value: "community", zh: "小区群", en: "Community group" },
    { value: "xiaohongshu", zh: "小红书", en: "Xiaohongshu" }, { value: "rescue", zh: "救助组织", en: "Rescue organization" },
    { value: "instagram", zh: "Instagram", en: "Instagram" }
  ],
  length: [
    { value: "short", zh: "精简 Short", en: "Short" }, { value: "medium", zh: "适中 Medium", en: "Medium" }, { value: "full", zh: "完整 Full", en: "Full" }
  ]
};

const templates = [
  { id: "warm", en: "Warm Minimal", zh: "暖色极简" },
  { id: "journal", en: "Soft Journal", zh: "温柔手账" },
  { id: "notice", en: "Rescue Notice", zh: "清晰公告" },
  { id: "cute", en: "Cute Paw", zh: "可爱小爪" },
  { id: "green", en: "Calm Green", zh: "自然治愈" },
  { id: "xhs", en: "Social Cover", zh: "小红书封面" },
  { id: "polaroid", en: "Polaroid Story", zh: "拍立得故事" },
  { id: "alert", en: "Gentle Alert", zh: "温柔紧急" },
  { id: "community", en: "Community Poster", zh: "社区海报" },
  { id: "quote", en: "Simple Quote", zh: "治愈短句" }
];

const ratioSizes = {
  "1:1": [1080, 1080], "3:4": [1080, 1440], "4:5": [1080, 1350], "9:16": [1080, 1920], "16:9": [1920, 1080]
};

const state = {
  lang: localStorage.getItem("pawhelp-lang") || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"),
  ratio: "4:5",
  template: "warm",
  lastData: null,
  lastCopy: null,
  installPrompt: null,
  history: (() => {
    try { return JSON.parse(localStorage.getItem('pawhelp-history') || '[]'); }
    catch { return []; }
  })()
};

function t(key) { return copybook[state.lang][key] || key; }
function optionLabel(group, value, lang = state.lang) { return optionSets[group].find((item) => item.value === value)?.[lang] || value; }

function renderLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.title = state.lang === "zh" ? "小爪帮帮 PawHelp" : "PawHelp Writer";
  $$('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  $$('.lang-switch button').forEach((button) => button.classList.toggle('active', button.dataset.lang === state.lang));
  renderSelects();
  renderInstallSteps();
  renderTemplates();
  if (state.lastData) {
    state.lastCopy = buildCopy(state.lastData);
    renderPost();
    drawMainCard();
  }
  renderHistory();
}

function renderSelects() {
  Object.entries(optionSets).forEach(([id, options]) => {
    const select = document.getElementById(id);
    if (!select) return;
    const current = select.value || ({ animal: 'cat', age: 'adult', condition: 'injured', helpType: 'foster', tone: 'gentle', platform: 'xiaohongshu', length: 'medium' }[id]);
    select.replaceChildren(...options.map((item) => {
      const option = document.createElement('option');
      option.value = item.value;
      option.textContent = item[state.lang];
      return option;
    }));
    select.value = current;
  });
}

function readForm() {
  return {
    animal: $('#animal').value, age: $('#age').value, condition: $('#condition').value, helpType: $('#helpType').value,
    location: $('#location').value.trim(), contact: $('#contact').value.trim(), tone: $('#tone').value,
    platform: $('#platform').value, length: $('#length').value, details: $('#details').value.trim()
  };
}

function applyData(data) {
  ['animal','age','condition','helpType','location','contact','tone','platform','length','details'].forEach((key) => {
    const field = document.getElementById(key);
    if (field && data[key] !== undefined) field.value = data[key];
  });
  $('#detailCount').textContent = $('#details').value.length;
}

