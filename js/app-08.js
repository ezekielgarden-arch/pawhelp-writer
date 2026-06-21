function drawVoicePhoto(ctx,w,h,data,copy,u){
  ctx.fillStyle='#fffaf4';ctx.fillRect(0,0,w,h);const m=64*u,cw=w-m*2;
  ctx.fillStyle='#f7e8da';ctx.font=`900 ${150*u}px Georgia,serif`;ctx.fillText('“',m,45*u);
  drawPaw(ctx,w-92*u,116*u,92*u,'#df9b76',.8);
  ctx.fillStyle='#9e472d';ctx.font=titleFont(u,64,760);let ty=drawWrapped(ctx,copy.paw,m,180*u,cw,76*u,3);
  ctx.fillStyle='#7b675b';ctx.font=bodyFont(u,25,650);drawWrapped(ctx,state.lang==='zh'?'— 一只等待帮助的小生命':'— A small life waiting for help',m,ty+8*u,cw,34*u,2);
  const photoY=Math.max(ty+75*u,h*.42),photoH=Math.max(240*u,h-photoY-330*u);
  drawTemplatePhoto(ctx,'voice-photo',w*.54,photoY,w*.42,photoH,28*u,u,.68,.54);
  ctx.fillStyle='#49362e';ctx.font=bodyFont(u,28);drawWrapped(ctx,copy.cardBody,m,photoY+18*u,w*.45,43*u,Math.min(6,lineLimit(data)));
  drawInfoChips(ctx,data,copy,m,h-250*u,cw,u,{bg:'#fff0e5',text:'#824f39'});
  drawContact(ctx,copy,m,h-174*u,cw,u,'#f7e5d5');
  drawFooter(ctx,m,h-70*u,cw,u,'#a25c3e','center');
}

function drawPaperPets(ctx,w,h,data,copy,u){
  ctx.fillStyle='#f7ead8';ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#a7a58b';ctx.beginPath();ctx.arc(w*.16,h*.3,w*.28,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#c85f46';ctx.beginPath();ctx.arc(w*.55,h*.23,w*.42,0,Math.PI*2);ctx.fill();
  const m=55*u,cw=w-m*2,photoH=Math.max(300*u,h*.43);
  drawTemplatePhoto(ctx,'paper-pets',m,45*u,cw,photoH,46*u,u,.5,.42);
  drawHeart(ctx,w*.78,photoH*.18,55*u,'#f4a08a',1);
  const paperY=photoH*.76;roundedRect(ctx,m,paperY,cw,h-paperY-70*u,34*u,'#fff4df','#e3ceb0',2*u);
  ctx.fillStyle='#3f2c20';ctx.font=titleFont(u,65,850);let ty=drawWrapped(ctx,copy.title,m+50*u,paperY+58*u,cw-100*u,76*u,2,'center');
  ctx.fillStyle='#5d6749';ctx.font=bodyFont(u,27,700);ty=drawWrapped(ctx,copy.cardBody,m+60*u,ty+16*u,cw-120*u,40*u,4,'center');
  drawInfoChips(ctx,data,copy,m+55*u,Math.max(ty+22*u,h-282*u),cw-110*u,u,{bg:'#a7aa81',text:'#fff'});
  roundedRect(ctx,m+55*u,h-180*u,cw-110*u,72*u,28*u,'#d87158');ctx.fillStyle='#fff';ctx.font=bodyFont(u,28,800);drawWrapped(ctx,copy.paw,m+80*u,h-158*u,cw-160*u,34*u,1,'center');
  drawFooter(ctx,m,h-61*u,cw,u,'#664832','center');
}

function drawUrgentPhoto(ctx,w,h,data,copy,u){
  ctx.fillStyle='#fff8ec';ctx.fillRect(0,0,w,h);const m=60*u,cw=w-m*2;
  ctx.fillStyle='#d94c27';ctx.font=titleFont(u,76,900);let ty=drawWrapped(ctx,state.lang==='zh'?'它可能需要尽快帮助':'HELP MAY BE NEEDED SOON',m,55*u,cw,84*u,2,'center');
  drawBadge(ctx,`${optionLabel('condition',data.condition)} · ${optionLabel('animal',data.animal)}`,w/2,ty+10*u,'#4d3428','#f8d9b7',u,'right');
  const photoY=ty+80*u,photoH=Math.max(270*u,h*.38);drawTemplatePhoto(ctx,'urgent-photo',m,photoY,cw,photoH,30*u,u,.5,.5);
  roundedRect(ctx,m,photoY+photoH+24*u,cw,145*u,26*u,'#fff2df','#f0dbc4',2*u);
  ctx.fillStyle='#533d30';ctx.font=bodyFont(u,29,650);drawWrapped(ctx,copy.cardBody,m+35*u,photoY+photoH+52*u,cw-70*u,43*u,3);
  drawInfoChips(ctx,data,copy,m,h-260*u,cw,u,{bg:'#fff0e3',text:'#6a4634'});
  roundedRect(ctx,m,h-170*u,cw,78*u,30*u,'#dc5734');ctx.fillStyle='#fff';ctx.font=bodyFont(u,29,850);drawWrapped(ctx,copy.paw,m+30*u,h-147*u,cw-60*u,36*u,1,'center');
  drawFooter(ctx,m,h-60*u,cw,u,'#9a684f','center');
}

