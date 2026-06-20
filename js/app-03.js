function buildCopy(data) {
  const lang = state.lang;
  const animal = data.animal === 'cat' ? (lang === 'zh' ? '小猫' : 'cat') : data.animal === 'dog' ? (lang === 'zh' ? '小狗' : 'dog') : (lang === 'zh' ? '小动物' : 'animal');
  const age = optionLabel('age', data.age, lang);
  const location = data.location || t('unknownLocation');
  const contact = data.contact || t('privateMessage');

  const conditionZh = {
    injured: '它看起来可能受了伤，需要尽快确认情况', weak: '它看起来有些虚弱、消瘦', pregnant: '它看起来可能怀孕了',
    young: '它年纪很小，目前独自在外', stable: '目前看起来状态尚可，但还在外面徘徊', unknown: '目前还无法确定它的具体状况'
  }[data.condition];
  const conditionEn = {
    injured: 'It may be injured and needs its condition checked soon', weak: 'It looks weak and underweight', pregnant: 'It may be pregnant',
    young: 'It is very young and currently alone outside', stable: 'It appears stable for now but is still staying outside', unknown: 'Its condition is not clear yet'
  }[data.condition];
  const helpZh = { foster: '临时安置或救助资源', vet: '靠谱的医疗资源', transport: '安全转运', adoption: '合适的领养线索', food: '食物和干净饮水', share: '帮忙扩散这条信息' }[data.helpType];
  const helpEn = { foster: 'a safe foster or rescue contact', vet: 'reliable veterinary help', transport: 'safe transport', adoption: 'a suitable adoption lead', food: 'food and clean water', share: 'help sharing this post' }[data.helpType];
  const urgent = ['injured', 'weak', 'young'].includes(data.condition) || data.tone === 'urgent';
  const pawZh = { foster: '今晚如果有个安全的地方，就已经很重要。', vet: '早一点确认伤情，也许就能少受一点苦。', transport: '差的可能只是一段安全的路。', adoption: '它在等一个愿意认真了解它的人。', food: '一碗水和一点食物，也能撑过眼前。', share: '多一个人看见，就多一条可能的线索。' }[data.helpType];
  const pawEn = { foster: 'One safe place tonight would already mean a lot.', vet: 'An earlier check may spare this little one more pain.', transport: 'The missing piece may simply be one safe ride.', adoption: 'This little one is waiting for someone willing to know them.', food: 'A little food and clean water can help with the next step.', share: 'One more person seeing this may bring the right lead.' }[data.helpType];

  if (lang === 'zh') {
    const title = urgent ? `${location}这只${animal}需要尽快帮助` : `在${location}遇见一只需要帮助的${animal}`;
    const observed = data.details ? `我目前观察到：${data.details.replace(/[。.!！]+$/, '')}。` : '';
    const shortBody = `${location}发现一只${animal}。${conditionZh}。现在需要${helpZh}，如有线索请${contact}。`;
    const mediumBody = `在${location}发现一只${age === '不确定' ? '' : age}${animal}。${conditionZh}。${observed}现在最需要${helpZh}。如果你有相关资源或愿意搭把手，请${contact}，也谢谢帮忙转发。`;
    const fullBody = `${mediumBody}${data.condition === 'injured' ? ' 现场信息仅供参考，最好由专业人员进一步判断。' : ''}`;
    const platformTail = data.platform === 'xiaohongshu' ? '\n\n#流浪动物救助 #小动物求助' : data.platform === 'community' ? '\n\n麻烦邻居们帮忙留意，感谢。' : '';
    return { title, body: (data.length === 'short' ? shortBody : data.length === 'full' ? fullBody : mediumBody) + platformTail, cardBody: data.length === 'short' ? shortBody : mediumBody, paw: pawZh, location, contact, animal, age, help: helpZh, condition: conditionZh };
  }

  const title = urgent ? `This ${animal} near ${location} needs help soon` : `A ${animal} near ${location} may need a little help`;
  const observed = data.details ? `Observed: ${data.details.replace(/[.!]+$/, '')}. ` : '';
  const article = /^[aeiou]/i.test(age) ? 'an' : 'a';
  const agePhrase = data.age === 'unknown' ? `a ${animal}` : `${article} ${age.toLowerCase()} ${animal}`;
  const shortBody = `A ${animal} was found near ${location}. ${conditionEn}. We are looking for ${helpEn}. Please ${contact}.`;
  const mediumBody = `We found ${agePhrase} near ${location}. ${conditionEn}. ${observed}The most urgent need is ${helpEn}. If you have a useful contact or can help, ${contact}. Sharing is appreciated.`;
  const fullBody = `${mediumBody}${data.condition === 'injured' ? ' This is only an observation; a veterinary or rescue professional should assess the animal.' : ''}`;
  const platformTail = data.platform === 'instagram' ? '\n\n#StrayAnimalHelp #AnimalRescue' : '';
  return { title, body: (data.length === 'short' ? shortBody : data.length === 'full' ? fullBody : mediumBody) + platformTail, cardBody: data.length === 'short' ? shortBody : mediumBody, paw: pawEn, location, contact, animal, age, help: helpEn, condition: conditionEn };
}

function renderPost() {
  const copy = state.lastCopy;
  $('#postTitle').textContent = copy.title;
  $('#postBody').textContent = copy.body;
  $('#postMeta').replaceChildren(...[
    `📍 ${t('locationLabel')}: ${copy.location}`, `♡ ${t('helpLabel')}: ${copy.help}`, `☎ ${t('contactLabel')}: ${copy.contact}`
  ].map((text) => { const span = document.createElement('span'); span.textContent = text; return span; }));
}

function fillExample() {
  const data = state.lang === 'zh' ? {
    animal: 'cat', age: 'adult', condition: 'injured', helpType: 'foster', location: '阳光花园北门', contact: '请私信我', tone: 'gentle', platform: 'xiaohongshu', length: 'medium',
    details: '左后腿不太敢着地，躲在灌木旁，可以慢慢靠近'
  } : {
    animal: 'cat', age: 'adult', condition: 'injured', helpType: 'foster', location: 'North gate, Sunny Garden', contact: 'please DM me', tone: 'gentle', platform: 'instagram', length: 'medium',
    details: 'avoids putting weight on the back leg and stays near the bushes'
  };
  applyData(data);
  generate(data, false);
}

function generate(data = readForm(), save = true) {
  if (!data.location && save) { showToast(t('needLocation')); $('#location').focus(); return; }
  state.lastData = data;
  state.lastCopy = buildCopy(data);
  renderPost();
  drawMainCard();
  if (save) {
    state.history.unshift({ id: Date.now(), at: new Date().toISOString(), lang: state.lang, data });
    state.history = state.history.slice(0, 12);
    writeHistory();
    renderHistory();
    showToast(t('generated'));
    $('#resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


