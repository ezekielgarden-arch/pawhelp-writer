function roundedRect(ctx, x, y, width, height, radius, fill, stroke, lineWidth = 1) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r); ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r); ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
}

function wrapLines(ctx, text, maxWidth, maxLines) {
  const source = String(text || '').replace(/\s*#\S+/g, '').trim();
  const useChars = /[\u3400-\u9fff]/.test(source);
  const paragraphs = source.split(/\n+/);
  const lines = [];
  for (const paragraph of paragraphs) {
    const tokens = useChars ? Array.from(paragraph) : paragraph.split(/\s+/).filter(Boolean);
    let line = '';
    for (const token of tokens) {
      const joiner = useChars || !line ? '' : ' ';
      const test = line + joiner + token;
      if (ctx.measureText(test).width <= maxWidth || !line) line = test;
      else { lines.push(line); line = token; }
      if (lines.length >= maxLines) break;
    }
    if (lines.length < maxLines && line) lines.push(line);
    if (lines.length >= maxLines) break;
  }
  const truncated = lines.length === maxLines && ctx.measureText(lines.join(useChars ? '' : ' ')).width < ctx.measureText(source.replace(/\s+/g, useChars ? '' : ' ')).width;
  if (truncated && lines.length) {
    const ellipsis = state.lang === 'zh' ? '……' : '...';
    let last = lines[lines.length - 1];
    while (last && ctx.measureText(last + ellipsis).width > maxWidth) last = last.slice(0, -1).trimEnd();
    lines[lines.length - 1] = last + ellipsis;
  }
  return lines;
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines, align = 'left') {
  const cleanText = String(text || '').replace(/[。！？.!?]+(?=[”"’'）)】》」』]*\s*$)/, '');
  const lines = wrapLines(ctx, cleanText, maxWidth, maxLines);
  ctx.textAlign = align;
  const anchor = align === 'center' ? x + maxWidth / 2 : align === 'right' ? x + maxWidth : x;
  lines.forEach((line, index) => ctx.fillText(line, anchor, y + index * lineHeight));
  ctx.textAlign = 'left';
  return y + lines.length * lineHeight;
}

function drawPaw(ctx, x, y, size, color, opacity = 1) {
  ctx.save(); ctx.globalAlpha = opacity; ctx.fillStyle = color;
  [[-.34,-.26,.16],[-.1,-.43,.17],[.17,-.4,.16],[.39,-.2,.14]].forEach(([dx,dy,r]) => {
    ctx.beginPath(); ctx.arc(x + size * dx, y + size * dy, size * r, 0, Math.PI * 2); ctx.fill();
  });
  ctx.beginPath(); ctx.ellipse(x, y + size * .12, size * .34, size * .27, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

function drawHeart(ctx, x, y, size, color, opacity = 1) {
  ctx.save(); ctx.globalAlpha = opacity; ctx.fillStyle = color; ctx.beginPath();
  ctx.moveTo(x, y + size * .25); ctx.bezierCurveTo(x - size * .7, y - size * .2, x - size * .55, y - size * .75, x, y - size * .35);
  ctx.bezierCurveTo(x + size * .55, y - size * .75, x + size * .7, y - size * .2, x, y + size * .25); ctx.fill(); ctx.restore();
}

function drawLeaf(ctx, x, y, size, color, flip = 1) {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = Math.max(1, size * .045); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + size * .2 * flip, y - size * .55, x + size * .46 * flip, y - size); ctx.stroke();
  for (let i = 1; i < 5; i++) {
    const py = y - size * i / 5; const px = x + size * .08 * i * flip;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px + size * .3 * flip, py - size * .18, px + size * .28 * flip, py - size * .38); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(px - size * .16 * flip, py - size * .22, px - size * .12 * flip, py - size * .35); ctx.stroke();
  }
  ctx.restore();
}

function drawAnimalDoodle(ctx, x, y, size, palette = {}) {
  const cat = palette.cat || '#e9825a', dog = palette.dog || '#f6c28b', ink = palette.ink || '#3a2a22';
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.fillStyle = cat; ctx.beginPath(); ctx.arc(x - size * .18, y, size * .26, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - size * .39, y - size * .13); ctx.lineTo(x - size * .34, y - size * .43); ctx.lineTo(x - size * .13, y - size * .22); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x + size * .02, y - size * .13); ctx.lineTo(x - size * .03, y - size * .43); ctx.lineTo(x - size * .23, y - size * .22); ctx.fill();
  ctx.fillStyle = dog; ctx.beginPath(); ctx.arc(x + size * .22, y + size * .04, size * .29, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#b9825a'; ctx.beginPath(); ctx.ellipse(x + size * .02, y, size * .12, size * .25, -.35, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x + size * .43, y, size * .12, size * .25, .35, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = ink;
  [[x-size*.26,y-size*.02],[x-size*.09,y-size*.02],[x+size*.14,y],[x+size*.31,y]].forEach(([cx,cy]) => { ctx.beginPath(); ctx.arc(cx,cy,size*.025,0,Math.PI*2);ctx.fill(); });
  ctx.beginPath(); ctx.arc(x - size * .18, y + size * .09, size * .035, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + size * .225, y + size * .12, size * .045, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = ink; ctx.lineWidth = size * .018;
  ctx.beginPath(); ctx.arc(x - size*.18, y + size*.105, size*.09, .25, 2.9); ctx.stroke();
  ctx.beginPath(); ctx.arc(x + size*.225, y + size*.135, size*.1, .22, 2.92); ctx.stroke();
  ctx.restore();
}

const templateImages = new Map();

function preloadTemplateImages() {
  templates.filter((template) => template.photo).forEach((template) => {
    if (templateImages.has(template.id)) return;
    const image = new Image(); image.decoding = 'async';
    image.onload = () => { templateImages.set(template.id, image); drawMainCard(); renderTemplates(); };
    image.src = `${template.photo}?v=6`;
  });
}

function getTemplatePhoto(templateId) {
  if (state.photoMode === 'user' && state.userPhoto) return state.userPhoto;
  return templateImages.get(templateId) || null;
}

function drawCoverImage(ctx, image, x, y, width, height, radius = 0, focusX = .5, focusY = .5) {
  if (!image?.naturalWidth || !image?.naturalHeight) return false;
  const sourceRatio = image.naturalWidth / image.naturalHeight; const targetRatio = width / height;
  let sx = 0, sy = 0, sw = image.naturalWidth, sh = image.naturalHeight;
  if (sourceRatio > targetRatio) { sw = sh * targetRatio; sx = (image.naturalWidth - sw) * focusX; }
  else { sh = sw / targetRatio; sy = (image.naturalHeight - sh) * focusY; }
  ctx.save();
  if (radius) { roundedRect(ctx, x, y, width, height, radius); ctx.clip(); }
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height); ctx.restore(); return true;
}

function drawTemplatePhoto(ctx, templateId, x, y, width, height, radius, unit, focusX, focusY = .5) {
  const template = templates.find((item) => item.id === templateId); const image = getTemplatePhoto(templateId);
  if (drawCoverImage(ctx, image, x, y, width, height, radius, focusX ?? template?.focusX ?? .5, focusY)) return;
  roundedRect(ctx, x, y, width, height, radius, gradientFill(ctx, x, y, x + width, y + height, [[0, '#f8d8c0'], [1, '#e5edda']]));
  drawAnimalDoodle(ctx, x + width / 2, y + height / 2, Math.min(width, height) * .42);
}

function drawBadge(ctx, text, x, y, color, background, unit, align = 'left') {
  ctx.font = `700 ${Math.max(8, 25 * unit)}px ${getCanvasFont()}`;
  const pad = 18 * unit; const height = 48 * unit; const width = ctx.measureText(text).width + pad * 2;
  const bx = align === 'right' ? x - width : x;
  roundedRect(ctx, bx, y, width, height, 24 * unit, background);
  ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.fillText(text, bx + pad, y + height / 2); ctx.textBaseline = 'top';
  return width;
}

function getCanvasFont() { return 'Inter, system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif'; }
function titleFont(unit, size = 63, weight = 800) { return `${weight} ${Math.max(11, size * unit)}px ${getCanvasFont()}`; }
function bodyFont(unit, size = 31, weight = 500) { return `${weight} ${Math.max(8, size * unit)}px ${getCanvasFont()}`; }
function lineLimit(data) { return data.length === 'short' ? 4 : data.length === 'full' ? 12 : 7; }

function gradientFill(ctx, x0, y0, x1, y1, stops) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([at, color]) => gradient.addColorStop(at, color)); return gradient;
}

function drawInfoChips(ctx, data, copy, x, y, maxWidth, unit, colors = {}) {
  const items = [`📍 ${copy.location}`, `♡ ${copy.help}`];
  const gap = 12 * unit; let cx = x; let cy = y;
  ctx.font = bodyFont(unit, 24, 700); ctx.textBaseline = 'middle';
  items.forEach((text) => {
    const width = Math.min(maxWidth, ctx.measureText(text).width + 34 * unit);
    if (cx + width > x + maxWidth && cx > x) { cx = x; cy += 58 * unit; }
    roundedRect(ctx, cx, cy, width, 46 * unit, 23 * unit, colors.bg || '#fff5eb', colors.stroke || null, 1.5 * unit);
    ctx.fillStyle = colors.text || '#6c4b39'; ctx.fillText(text, cx + 17 * unit, cy + 23 * unit); cx += width + gap;
  });
  ctx.textBaseline = 'top'; return cy + 46 * unit;
}

function drawContact(ctx, copy, x, y, width, unit, background = '#f4b8a8', color = '#4c3327') {
  roundedRect(ctx, x, y, width, 62 * unit, 20 * unit, background);
  ctx.fillStyle = color; ctx.font = bodyFont(unit, 25, 750); ctx.textBaseline = 'middle';
  const label = `${state.lang === 'zh' ? '联系' : 'Contact'} · ${copy.contact}`;
  const clipped = wrapLines(ctx, label, width - 36 * unit, 1)[0] || label;
  ctx.fillText(clipped, x + 18 * unit, y + 31 * unit); ctx.textBaseline = 'top';
}

function drawFooter(ctx, x, y, width, unit, color = '#7a6a5e', align = 'left') {
  ctx.fillStyle = color; ctx.font = bodyFont(unit, 20, 700); ctx.textAlign = align;
  ctx.fillText(t('footerMark'), align === 'center' ? x + width / 2 : align === 'right' ? x + width : x, y); ctx.textAlign = 'left';
}

