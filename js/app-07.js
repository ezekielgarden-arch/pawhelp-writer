function drawXhs(ctx,w,h,data,copy,u){
  ctx.fillStyle=gradientFill(ctx,0,0,w,h,[[0,'#fff8ef'],[1,'#ffe3d4']]);ctx.fillRect(0,0,w,h);
  drawPaw(ctx,w*.86,h*.12,150*u,'#d95c45',.1);const m=64*u,cw=w-m*2;
  drawBadge(ctx,state.lang==='zh'?'请帮忙留意':'PLEASE TAKE A LOOK',m,72*u,'#fff','#d95c45',u);
  ctx.fillStyle='rgba(246,194,139,.65)';roundedRect(ctx,m-10*u,h*.2,cw*.78,62*u,10*u,'rgba(246,194,139,.65)');
  ctx.fillStyle='#2f211b';ctx.font=titleFont(u,72,900);let ty=drawWrapped(ctx,copy.title,m,h*.17,cw,82*u,2);
  roundedRect(ctx,m,ty+36*u,cw,h*.31,28*u,'rgba(255,255,255,.86)');ctx.fillStyle='#5e493e';ctx.font=bodyFont(u,30);const bodyY=drawWrapped(ctx,copy.cardBody,m+36*u,ty+76*u,cw-72*u,45*u,Math.min(lineLimit(data),6));
  drawInfoChips(ctx,data,copy,m+36*u,Math.max(bodyY+24*u,ty+h*.23),cw-72*u,u,{bg:'#fff0e5',text:'#7c4b37'});
  roundedRect(ctx,m,h-180*u,cw,82*u,26*u,'#e9825a');ctx.fillStyle='#fff';ctx.font=bodyFont(u,29,800);ctx.textAlign='center';ctx.fillText(state.lang==='zh'?'有线索请联系 · 谢谢转发':'PLEASE DM WITH LEADS · SHARE IF YOU CAN',w/2,h-158*u);ctx.textAlign='left';
  drawFooter(ctx,m,h-70*u,cw,u,'#8d6959','center');
}

function drawPolaroid(ctx,w,h,data,copy,u){
  ctx.fillStyle='#f4e6d8';ctx.fillRect(0,0,w,h);const wide=w/h>1.25;const m=wide?80*u:75*u;const px=m,py=m,pw=w-m*2,ph=h-m*2;
  ctx.save();ctx.translate(w/2,h/2);ctx.rotate(.012);ctx.translate(-w/2,-h/2);ctx.shadowColor='rgba(58,42,34,.18)';ctx.shadowBlur=30*u;ctx.shadowOffsetY=16*u;roundedRect(ctx,px,py,pw,ph,8*u,'#fff');ctx.shadowColor='transparent';
  const imageX=px+38*u,imageY=py+38*u,imageW=wide?pw*.42:pw-76*u,imageH=wide?ph-76*u:ph*.43;
  ctx.fillStyle=gradientFill(ctx,imageX,imageY,imageX+imageW,imageY+imageH,[[0,'#f9cfad'],[1,'#e7efd8']]);ctx.fillRect(imageX,imageY,imageW,imageH);
  drawAnimalDoodle(ctx,imageX+imageW/2,imageY+imageH*.52,Math.min(imageW,imageH)*.56);drawHeart(ctx,imageX+imageW*.72,imageY+imageH*.25,45*u,'#e9825a',.8);
  const tx=wide?imageX+imageW+55*u:px+58*u,tw=wide?pw-imageW-131*u:pw-116*u,ty=wide?py+75*u:imageY+imageH+45*u;
  ctx.fillStyle='#3a2a22';ctx.font=titleFont(u,wide?56:53);let next=drawWrapped(ctx,copy.title,tx,ty,tw,62*u,2);
  ctx.fillStyle='#6f584c';ctx.font=bodyFont(u,wide?27:28);next=drawWrapped(ctx,copy.cardBody,tx,next+22*u,tw,42*u,wide?7:5);
  ctx.fillStyle='#c96a48';ctx.font=bodyFont(u,24,700);drawWrapped(ctx,copy.paw,tx,Math.max(next+25*u,wide?py+ph*.68:py+ph-130*u),tw,33*u,2);
  drawFooter(ctx,tx,py+ph-55*u,tw,u,'#8d7568');ctx.restore();
}

function drawAlert(ctx,w,h,data,copy,u){
  ctx.fillStyle='#fff1d8';ctx.fillRect(0,0,w,h);const m=60*u,cw=w-m*2;
  ctx.fillStyle='#d95c45';ctx.beginPath();ctx.arc(m+48*u,80*u,38*u,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font=titleFont(u,46,900);ctx.textAlign='center';ctx.fillText('!',m+48*u,53*u);ctx.textAlign='left';
  drawBadge(ctx,state.lang==='zh'?'需要帮助':'NEEDS HELP',m+105*u,55*u,'#a74635','#ffe0ca',u);
  ctx.fillStyle='#3a2a22';ctx.font=titleFont(u,70,900);let ty=drawWrapped(ctx,copy.title,m,160*u,cw,80*u,2);
  roundedRect(ctx,m,ty+38*u,cw,h*.34,30*u,'#fff');ctx.fillStyle='#59443a';ctx.font=bodyFont(u,31);let by=drawWrapped(ctx,copy.cardBody,m+40*u,ty+80*u,cw-80*u,47*u,Math.min(lineLimit(data),6));
  roundedRect(ctx,m+40*u,Math.max(by+25*u,ty+h*.25),cw-80*u,78*u,18*u,'#ffe0ca');ctx.fillStyle='#9c4838';ctx.font=bodyFont(u,27,800);drawWrapped(ctx,`${t('helpLabel')} · ${copy.help}`,m+62*u,Math.max(by+25*u,ty+h*.25)+22*u,cw-124*u,36*u,1);
  drawContact(ctx,copy,m,h-190*u,cw,u,'#d95c45','#fff');ctx.fillStyle='#875c4d';ctx.font=bodyFont(u,23,650);drawWrapped(ctx,copy.paw,m,h-110*u,cw,32*u,2,'center');drawFooter(ctx,m,h-49*u,cw,u,'#806c61','center');
}

function drawCommunity(ctx,w,h,data,copy,u){
  ctx.fillStyle='#f7f0e8';ctx.fillRect(0,0,w,h);const m=62*u,px=m,py=56*u,pw=w-m*2,ph=h-112*u;
  ctx.shadowColor='rgba(58,42,34,.12)';ctx.shadowBlur=24*u;ctx.shadowOffsetY=10*u;roundedRect(ctx,px,py,pw,ph,12*u,'#fff');ctx.shadowColor='transparent';
  ctx.fillStyle='#9dbf9e';ctx.beginPath();ctx.arc(px+80*u,py+15*u,14*u,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(px+pw-80*u,py+15*u,14*u,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#3a2a22';ctx.font=bodyFont(u,25,850);ctx.textAlign='center';ctx.fillText(state.lang==='zh'?'社区流浪动物求助':'COMMUNITY RESCUE NOTICE',w/2,py+55*u);ctx.textAlign='left';
  ctx.strokeStyle='#e9825a';ctx.lineWidth=5*u;ctx.beginPath();ctx.moveTo(px+55*u,py+103*u);ctx.lineTo(px+pw-55*u,py+103*u);ctx.stroke();
  ctx.fillStyle='#3a2a22';ctx.font=titleFont(u,55);let ty=drawWrapped(ctx,copy.title,px+55*u,py+140*u,pw-110*u,64*u,2,'center');
  ctx.fillStyle='#6d584c';ctx.font=bodyFont(u,28);ty=drawWrapped(ctx,copy.cardBody,px+55*u,ty+25*u,pw-110*u,42*u,Math.min(lineLimit(data),6));
  const tableY=Math.max(ty+25*u,py+ph*.59),rowH=64*u;const rows=[[t('locationLabel'),copy.location],[t('helpLabel'),copy.help],[t('contactLabel'),copy.contact]];
  rows.forEach(([label,value],i)=>{const y=tableY+i*rowH;roundedRect(ctx,px+55*u,y,pw-110*u,rowH-6*u,13*u,i%2?'#fff8ef':'#f2f6ed','#eadfd5',1.5*u);ctx.fillStyle='#876554';ctx.font=bodyFont(u,22,800);ctx.fillText(label,px+77*u,y+18*u);ctx.fillStyle='#3a2a22';ctx.font=bodyFont(u,24,650);ctx.textAlign='right';ctx.fillText(wrapLines(ctx,value,(pw-110*u)*.62,1)[0],px+pw-77*u,y+18*u);ctx.textAlign='left';});
  drawFooter(ctx,px+55*u,py+ph-48*u,pw-110*u,u,'#7a6a5e','center');
}

function drawQuote(ctx,w,h,data,copy,u){
  ctx.fillStyle='#fff8ef';ctx.fillRect(0,0,w,h);drawHeart(ctx,w*.5,h*.14,60*u,'#f4b8a8',.8);drawPaw(ctx,w*.86,h*.78,130*u,'#e9825a',.08);
  const m=90*u,cw=w-m*2;ctx.fillStyle='#e9825a';ctx.font=`900 ${Math.max(28,140*u)}px Georgia, serif`;ctx.globalAlpha=.3;ctx.fillText('“',m,h*.2);ctx.globalAlpha=1;
  ctx.fillStyle='#3a2a22';ctx.font=titleFont(u,74,850);drawWrapped(ctx,copy.paw,m,h*.31,cw,88*u,3,'center');
  ctx.strokeStyle='#f6c28b';ctx.lineWidth=4*u;ctx.beginPath();ctx.moveTo(w*.35,h*.59);ctx.lineTo(w*.65,h*.59);ctx.stroke();
  ctx.fillStyle='#6d584d';ctx.font=bodyFont(u,29,600);drawWrapped(ctx,`${t('locationLabel')}：${copy.location}\n${t('contactLabel')}：${copy.contact}`,m,h*.65,cw,45*u,4,'center');
  drawFooter(ctx,m,h-72*u,cw,u,'#8a7569','center');
}

function drawCard(canvas, data, copy, templateId, thumbnail = false) {
  if (!canvas || !data || !copy) return;
  const ctx = canvas.getContext('2d'); const w=canvas.width,h=canvas.height,u=Math.min(w,h)/1080;
  ctx.clearRect(0,0,w,h);ctx.save();ctx.textBaseline='top';ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  const drawers={
    warm:drawWarm,notice:drawNotice,green:drawGreen,alert:drawAlert,quote:drawQuote,
    'voice-photo':drawVoicePhoto,'paper-pets':drawPaperPets,'urgent-photo':drawUrgentPhoto,
    'starlight-photo':drawStarlightPhoto,'polaroid-photo':drawPolaroidPhoto,'editorial-photo':drawEditorialPhoto,
    'floral-kindness':drawFloralKindness,'warm-appeal':drawWarmAppeal,'moonlight-shelter':drawMoonlightShelter,'scrapbook-help':drawScrapbookHelp
  };
  (drawers[templateId] || drawWarm)(ctx,w,h,data,copy,u,thumbnail);ctx.restore();
}

function drawMainCard() {
  if (!state.lastData || !state.lastCopy) return;
  const canvas=$('#cardCanvas');const [width,height]=ratioSizes[state.ratio];
  if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
  drawCard(canvas,state.lastData,state.lastCopy,state.template,false);
}

