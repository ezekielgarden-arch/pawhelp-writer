function drawFloralKindness(ctx,w,h,data,copy,u){
  ctx.fillStyle='#fffaf4';ctx.fillRect(0,0,w,h);const m=64*u,cw=w-m*2;
  drawLeaf(ctx,w-75*u,h*.63,350*u,'rgba(224,139,98,.55)',-1);drawLeaf(ctx,60*u,h-80*u,230*u,'rgba(224,139,98,.38)',1);
  roundedRect(ctx,m,45*u,330*u,64*u,2*u,'#e99a78');ctx.fillStyle='#fff';ctx.font=bodyFont(u,29,750);ctx.fillText(state.lang==='zh'?'今日待助 / 04':'TODAY / 04',m+28*u,62*u);
  ctx.fillStyle='#392a22';ctx.font=`700 ${92*u}px Georgia,"Songti SC",serif`;let ty=drawWrapped(ctx,copy.paw,m,170*u,cw*.74,105*u,4);
  ctx.fillStyle='#db8b64';ctx.font=bodyFont(u,28,750);ty=drawWrapped(ctx,state.lang==='zh'?'一个需要帮助的小生命':'A SMALL LIFE NEEDS HELP',m,ty+18*u,cw*.72,40*u,2);
  ctx.fillStyle='#514036';ctx.font=bodyFont(u,28);drawWrapped(ctx,copy.cardBody,m,ty+42*u,cw*.66,44*u,7);
  roundedRect(ctx,m,h-310*u,cw,100*u,24*u,'#fff9f1','#e6a27d',2*u);ctx.fillStyle='#4f382d';ctx.font=bodyFont(u,27,700);drawWrapped(ctx,`📍 ${copy.location}   ·   ${copy.contact}`,m+30*u,h-278*u,cw-60*u,38*u,2,'center');
  roundedRect(ctx,m,h-190*u,cw,105*u,20*u,'#e99a78');ctx.fillStyle='#fff';ctx.font=bodyFont(u,34,800);drawWrapped(ctx,copy.paw,m+35*u,h-158*u,cw-70*u,43*u,2,'center');
  drawFooter(ctx,m,h-56*u,cw,u,'#92715f','center');
}

function drawWarmAppeal(ctx,w,h,data,copy,u){
  ctx.fillStyle=gradientFill(ctx,0,0,w,h,[[0,'#fff1dc'],[.5,'#fffdfa'],[1,'#fde3c9']]);ctx.fillRect(0,0,w,h);const m=58*u,cw=w-m*2;
  roundedRect(ctx,28*u,28*u,w-56*u,h-56*u,48*u,'rgba(255,255,255,.72)','#f4d5b7',2*u);
  drawHeart(ctx,w*.5,120*u,52*u,'#ed8b55',1);drawPaw(ctx,w*.88,h*.17,90*u,'#e99a65',.18);
  ctx.fillStyle='#3a2921';ctx.font=titleFont(u,82,900);let ty=drawWrapped(ctx,state.lang==='zh'?'今晚，它可能需要一点帮助':'TONIGHT, A LITTLE HELP MAY MATTER',m,200*u,cw,96*u,4,'center');
  roundedRect(ctx,m+115*u,ty+18*u,cw-230*u,62*u,31*u,'#fff1df','#f4d3b3',2*u);ctx.fillStyle='#65493a';ctx.font=bodyFont(u,27,700);drawWrapped(ctx,state.lang==='zh'?'一次转发，也许就是一个机会':'ONE SHARE MAY OPEN A DOOR',m+130*u,ty+37*u,cw-260*u,35*u,1,'center');
  ctx.fillStyle='#4e3b31';ctx.font=bodyFont(u,29);ty=drawWrapped(ctx,copy.cardBody,m+70*u,ty+125*u,cw-140*u,45*u,7,'center');
  drawInfoChips(ctx,data,copy,m+60*u,Math.max(ty+32*u,h-310*u),cw-120*u,u,{bg:'#fff4e8',text:'#704b39'});
  drawContact(ctx,copy,m+60*u,h-225*u,cw-120*u,u,'#fff0de');
  roundedRect(ctx,m,h-145*u,cw,82*u,38*u,'#ef9a63');ctx.fillStyle='#fff';ctx.font=bodyFont(u,31,850);drawWrapped(ctx,copy.paw,m+35*u,h-121*u,cw-70*u,38*u,1,'center');
  drawFooter(ctx,m,h-50*u,cw,u,'#a37256','center');
}

function drawMoonlightShelter(ctx,w,h,data,copy,u){
  ctx.fillStyle=gradientFill(ctx,0,0,w,h,[[0,'#263347'],[.58,'#4d5c6c'],[1,'#d7bda7']]);ctx.fillRect(0,0,w,h);const m=58*u,cw=w-m*2;
  ctx.fillStyle='#f8ddb4';ctx.beginPath();ctx.arc(w*.79,135*u,70*u,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#263347';ctx.beginPath();ctx.arc(w*.82,112*u,66*u,0,Math.PI*2);ctx.fill();
  for(let i=0;i<18;i++){ctx.fillStyle='rgba(255,239,205,.72)';ctx.beginPath();ctx.arc(((95+i*113)%950)*u,((75+i*167)%520)*u,(2+i%3)*u,0,Math.PI*2);ctx.fill();}
  drawBadge(ctx,state.lang==='zh'?'今晚待助':'HELP NEEDED TONIGHT',m,72*u,'#283548','#f8ddb4',u);
  ctx.fillStyle='#fff8eb';ctx.font=titleFont(u,68,820);let ty=drawWrapped(ctx,copy.title,m,185*u,cw,80*u,3);
  roundedRect(ctx,m,ty+34*u,cw,h-ty-285*u,32*u,'rgba(255,250,241,.94)');
  ctx.fillStyle='#415063';ctx.font=bodyFont(u,30);ty=drawWrapped(ctx,copy.cardBody,m+45*u,ty+82*u,cw-90*u,46*u,Math.min(lineLimit(data),7));
  drawInfoChips(ctx,data,copy,m+45*u,Math.max(ty+28*u,h-325*u),cw-90*u,u,{bg:'#e8ddd1',text:'#425066'});
  drawContact(ctx,copy,m+45*u,h-220*u,cw-90*u,u,'#f0d1aa','#3c4654');
  ctx.fillStyle='#fff6e8';ctx.font=bodyFont(u,24,750);drawWrapped(ctx,copy.paw,m,h-122*u,cw,34*u,2,'center');
  drawFooter(ctx,m,h-58*u,cw,u,'#f6e8d5','center');
}

function drawScrapbookHelp(ctx,w,h,data,copy,u){
  ctx.fillStyle='#ead3b7';ctx.fillRect(0,0,w,h);const m=45*u,cw=w-m*2;
  roundedRect(ctx,m,75*u,cw,h-150*u,7*u,'#fff7e9');
  ctx.fillStyle='#e7b5a7';ctx.save();ctx.translate(w*.52,85*u);ctx.rotate(.04);roundedRect(ctx,-125*u,-23*u,250*u,54*u,5*u,'#e7b5a7');ctx.restore();
  ctx.fillStyle='#f4e5d0';ctx.font=bodyFont(u,26,800);ctx.textAlign='center';roundedRect(ctx,w-315*u,58*u,240*u,72*u,12*u,'#f4e5d0','#c99d78',2*u);ctx.fillStyle='#583c2d';ctx.fillText(state.lang==='zh'?'转 发 求 助':'PLEASE SHARE',w-195*u,80*u);ctx.textAlign='left';
  ctx.fillStyle='#5a2f22';ctx.font=`900 ${82*u}px "KaiTi","STKaiti",${getCanvasFont()}`;let ty=drawWrapped(ctx,copy.title,m+65*u,205*u,cw-130*u,96*u,4,'center');
  ctx.strokeStyle='#e08c77';ctx.lineWidth=5*u;ctx.beginPath();ctx.moveTo(w*.25,ty+15*u);ctx.quadraticCurveTo(w*.5,ty+40*u,w*.75,ty+8*u);ctx.stroke();
  ctx.fillStyle='#4c392f';ctx.font=bodyFont(u,28);ty=drawWrapped(ctx,copy.cardBody,m+110*u,ty+58*u,cw-220*u,45*u,7);
  ctx.setLineDash([8*u,7*u]);roundedRect(ctx,m+95*u,h-320*u,cw-190*u,100*u,24*u,'#fff8eb','#c99575',2*u);ctx.setLineDash([]);
  ctx.fillStyle='#563a2c';ctx.font=bodyFont(u,27,750);drawWrapped(ctx,`📍 ${copy.location}   ·   ${copy.contact}`,m+120*u,h-287*u,cw-240*u,38*u,2,'center');
  ctx.fillStyle='#dda995';roundedRect(ctx,m+40*u,h-190*u,cw-80*u,105*u,4*u,'#dda995');ctx.fillStyle='#4c3226';ctx.font=`800 ${35*u}px "KaiTi","STKaiti",${getCanvasFont()}`;drawWrapped(ctx,copy.paw,m+75*u,h-157*u,cw-150*u,46*u,2,'center');
  drawFooter(ctx,m,h-55*u,cw,u,'#79594a','center');
}

