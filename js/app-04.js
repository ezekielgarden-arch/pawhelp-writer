function readHistory() {
  try { return JSON.parse(localStorage.getItem('pawhelp-history') || '[]'); } catch { return []; }
}
function writeHistory() { localStorage.setItem('pawhelp-history', JSON.stringify(state.history)); }

function renderHistory() {
  $('#historyCount').textContent = state.history.length;
  const list = $('#historyList');
  if (!list) return;
  if (!state.history.length) {
    const empty = document.createElement('div'); empty.className = 'history-empty'; empty.textContent = t('historyEmpty'); list.replaceChildren(empty); return;
  }
  list.replaceChildren(...state.history.map((entry) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'history-entry'; button.dataset.id = entry.id;
    const entryLang = entry.lang || state.lang;
    const previousLang = state.lang; state.lang = entryLang; const copy = buildCopy(entry.data); state.lang = previousLang;
    const strong = document.createElement('strong'); strong.textContent = copy.title;
    const stamp = document.createElement('span'); stamp.textContent = new Date(entry.at).toLocaleString(state.lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    button.append(strong, stamp);
    button.addEventListener('click', () => {
      if (entry.lang && entry.lang !== state.lang) { state.lang = entry.lang; localStorage.setItem('pawhelp-lang', state.lang); renderLanguage(); }
      applyData(entry.data); generate(entry.data, false); $('#historyDialog').close(); showToast(t('historyRestored'));
    });
    return button;
  }));
}

function renderInstallSteps() {
  const steps = $('#installSteps');
  steps.replaceChildren(...[t('installIos'), t('installAndroid')].map((text, index) => {
    const div = document.createElement('div'); div.className = 'install-step'; div.textContent = `${index === 0 ? '' : '●'}  ${text}`; return div;
  }));
}

function renderTemplates() {
  const scroller = $('#templateScroller');
  scroller.replaceChildren(...templates.map((template, index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = `template-option${state.template === template.id ? ' active' : ''}`; button.dataset.template = template.id;
    button.setAttribute('aria-pressed', state.template === template.id ? 'true' : 'false');
    const canvas = document.createElement('canvas'); canvas.width = 240; canvas.height = 300;
    const strong = document.createElement('strong'); strong.textContent = template.en;
    const small = document.createElement('small'); small.textContent = template.zh;
    button.append(canvas, strong, small);
    button.addEventListener('click', () => {
      state.template = template.id; $('#templatePosition').textContent = `${index + 1} / 10`; renderTemplates(); drawMainCard();
    });
    requestAnimationFrame(() => drawCard(canvas, state.lastData, state.lastCopy, template.id, true));
    return button;
  }));
}

function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyPost() {
  const text = `${state.lastCopy.title}\n\n${state.lastCopy.body}\n\n📍 ${state.lastCopy.location}\n☎ ${state.lastCopy.contact}`;
  try { await navigator.clipboard.writeText(text); showToast(t('copied')); }
  catch { showToast(t('copyFailed')); }
}

async function sharePost() {
  const text = `${state.lastCopy.title}\n\n${state.lastCopy.body}\n\n📍 ${state.lastCopy.location}\n☎ ${state.lastCopy.contact}`;
  if (navigator.share) { try { await navigator.share({ title: state.lastCopy.title, text }); showToast(t('postShared')); } catch (error) { if (error.name !== 'AbortError') copyPost(); } }
  else copyPost();
}

function canvasBlob(canvas) { return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1)); }
function fileName() {
  const date = new Date(); const stamp = [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  const animal = state.lastData.animal === 'cat' ? (state.lang === 'zh' ? '猫' : 'cat') : state.lastData.animal === 'dog' ? (state.lang === 'zh' ? '狗' : 'dog') : (state.lang === 'zh' ? '小动物' : 'animal');
  return state.lang === 'zh' ? `喵汪求助卡-${animal}-${stamp}.png` : `pawhelp-card-${animal}-${stamp}.png`;
}

async function downloadCard(showMessage = true) {
  const blob = await canvasBlob($('#cardCanvas')); const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = fileName(); document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  if (showMessage) showToast(t('saved')); return blob;
}

async function shareCard() {
  const blob = await canvasBlob($('#cardCanvas')); const file = new File([blob], fileName(), { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: state.lastCopy.title, text: state.lastCopy.paw }); showToast(t('cardShared')); return; }
    catch (error) { if (error.name === 'AbortError') return; }
  }
  await downloadCard(false); showToast(t('shareUnavailable'));
}

function bindEvents() {
  $('.lang-switch').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-lang]'); if (!button) return;
    state.lang = button.dataset.lang; localStorage.setItem('pawhelp-lang', state.lang); renderLanguage();
  });
  $('#rescueForm').addEventListener('submit', (event) => { event.preventDefault(); generate(); });
  $('#fillExample').addEventListener('click', fillExample);
  $('#details').addEventListener('input', () => { $('#detailCount').textContent = $('#details').value.length; });
  $('#copyPost').addEventListener('click', copyPost); $('#sharePost').addEventListener('click', sharePost);
  $('#editPost').addEventListener('click', () => { $('#rescueForm').scrollIntoView({ behavior: 'smooth', block: 'start' }); $('#details').focus({ preventScroll: true }); });
  $('#downloadCard').addEventListener('click', () => downloadCard()); $('#shareCard').addEventListener('click', shareCard);
  $('#ratioSwitch').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-ratio]'); if (!button) return; state.ratio = button.dataset.ratio;
    $$('#ratioSwitch button').forEach((item) => item.classList.toggle('active', item === button)); drawMainCard();
  });
  $('#installButton').addEventListener('click', async () => {
    if (state.installPrompt) { state.installPrompt.prompt(); await state.installPrompt.userChoice; state.installPrompt = null; }
    else $('#installDialog').showModal();
  });
  $('#historyButton').addEventListener('click', () => { renderHistory(); $('#historyDialog').showModal(); });
  $('#closeHistory').addEventListener('click', () => $('#historyDialog').close());
  $('#clearHistory').addEventListener('click', () => { state.history = []; writeHistory(); renderHistory(); showToast(t('cleared')); });
  window.addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); state.installPrompt = event; });
  window.addEventListener('appinstalled', () => { state.installPrompt = null; });
}

function init() {
  renderSelects();
  const starter = { animal: 'cat', age: 'adult', condition: 'injured', helpType: 'foster', location: '', contact: '', tone: 'gentle', platform: 'xiaohongshu', length: 'medium', details: '' };
  applyData(starter); state.lastData = starter; state.lastCopy = buildCopy(starter);
  bindEvents(); renderLanguage(); renderPost(); drawMainCard(); renderHistory();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
}

document.addEventListener('DOMContentLoaded', init);

// Canvas rendering follows. The preview and exported PNG use the same drawing path.


