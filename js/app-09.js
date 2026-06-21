function drawStarlightPhoto(ctx,w,h,data,copy,u){
  ctx.fillStyle=gradientFill(ctx,0,0,w,h,[[0,'#fff7e8'],[.55,'#fdebdc'],[1,'#e8d9ee']]);ctx.fillRect(0,0,w,h);const m=58*u,cw=w-m*2;
  ctx.strokeStyle='rgba(191,138,146,.55)';ctx.lineWidth=2*u;roundedRect(ctx,32*u,32*u,w-64*u,h-64*u,46*u,null,'rgba(191,138,146,.55)',2*u);
  for(let i=0;i<22;i++){const x=(53+(i*97)%940)*u,y=(64+(i*163)%1200)*u;ctx.fillStyle=i%3?'#fff':'#e9b88e';ctx.beginPath();ctx.arc(x%w,y%h,(i%4+2)*u,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='#75645f';ctx.font=`700 ${70*u}px Georgia,"Songti SC",serif`;let ty=drawWrapped(ctx,copy.paw,m,95*u,cw,84*u,3);
  ctx.fillStyle='#a36f78';ctx.font=bodyFont(u,27,700);drawWrapped(ctx,state.lang==='zh'?'请帮它被更多人看见':'HELP THIS SMALL LIFE BE SEEN',m,ty+16*u,cw,38*u,2);
  const photoY=Math.max(ty+70*u,h*.36),photoH=Math.max(320*u,h*.42);drawTemplatePhoto(ctx,'starlight-photo',w*.43,photoY,w*.52,photoH,36*u,u,.62,.5);
  ctx.fillStyle='#725f5c';ctx.font=bodyFont(u,27);drawWrapped(ctx,copy.cardBody,m,photoY+45*u,w*.37,42*u,6);
  drawContact(ctx,copy,m,h-186*u,cw,u,'rgba(255,249,241,.82)','#865b63');
  drawFooter(ctx,m,h-74*u,cw,u,'#9d7387','center');
}

function drawPolaroidPhoto(ctx,w,h,data,copy,u){
  ctx.fillStyle='#f3e5d8';ctx.fillRect(0,0,w,h);const m=62*u,cw=w-m*2;
  ctx.fillStyle='#fffaf2';ctx.save();ctx.translate(w/2,h*.37);ctx.rotate(-.035);ctx.shadowColor='rgba(70,45,35,.17)';ctx.shadowBlur=25*u;ctx.shadowOffsetY=12*u;roundedRect(ctx,-cw*.45,-h*.26,cw*.9,h*.52,8*u,'#fffaf2');ctx.shadowColor='transparent';
  drawTemplatePhoto(ctx,'polaroid-photo',-cw*.41,-h*.22,cw*.82,h*.34,4*u,u,.5,.52);ctx.restore();
  ctx.save();ctx.translate(w*.23,h*.12);ctx.rotate(-.12);roundedRect(ctx,-65*u,-20*u,180*u,46*u,5*u,'rgba(222,150,137,.72)');ctx.restore();
  ctx.fillStyle='#463129';ctx.font=titleFont(u,62,850);let ty=drawWrapped(ctx,copy.title,m,h*.63,cw,72*u,2,'center');
  ctx.fillStyle='#735e52';ctx.font=bodyFont(u,28);ty=drawWrapped(ctx,copy.cardBody,m+30*u,ty+12*u,cw-60*u,42*u,3,'center');
  drawInfoChips(ctx,data,copy,m,Math.max(ty+20*u,h-245*u),cw,u,{bg:'#fff4e9',text:'#704c3d'});
  drawContact(ctx,copy,m,h-160*u,cw,u,'#d99b8e','#fff');drawFooter(ctx,m,h-57*u,cw,u,'#775d51','center');
}

function drawEditorialPhoto(ctx,w,h,data,copy,u){
  ctx.fillStyle='#fffaf4';ctx.fillRect(0,0,w,h);const m=48*u,cw=w-m*2,wide=w/h>1.2;
  ctx.strokeStyle='#5e4c41';ctx.lineWidth=2*u;ctx.beginPath();ctx.moveTo(m,42*u);ctx.lineTo(w-m,42*u);ctx.stroke();
  ctx.fillStyle='#5e4c41';ctx.font=bodyFont(u,18,800);ctx.fillText('PAWHELP · STRAY ANIMAL RESCUE',m,17*u);
  const photoX=wide?w*.51:w*.46,photoY=90*u,photoW=w-photoX-m,photoH=h-340*u;
  drawTemplatePhoto(ctx,'editorial-photo',photoX,photoY,photoW,photoH,2*u,u,.58,.5);
  const tx=m,tw=photoX-m-35*u;ctx.fillStyle='#34271f';ctx.font=`700 ${82*u}px Georgia,"Songti SC",serif`;let ty=drawWrapped(ctx,copy.paw,tx,145*u,tw,94*u,4);
  ctx.fillStyle='#dd8b63';ctx.font=bodyFont(u,25,750);ty=drawWrapped(ctx,state.lang==='zh'?'一个需要帮助的小生命':'A SMALL LIFE WAITING FOR HELP',tx,ty+15*u,tw,36*u,3);
  ctx.fillStyle='#4d3d34';ctx.font=bodyFont(u,25);drawWrapped(ctx,copy.cardBody,tx,ty+45*u,tw,39*u,7);
  roundedRect(ctx,m,h-265*u,cw,84*u,24*u,'#fff7ed','#e6b897',2*u);ctx.fillStyle='#46342b';ctx.font=bodyFont(u,25,700);drawWrapped(ctx,`📍 ${copy.location}   ·   ${copy.contact}`,m+28*u,h-238*u,cw-56*u,34*u,2,'center');
  roundedRect(ctx,m,h-162*u,cw,74*u,14*u,'#efad82');ctx.fillStyle='#3e2e26';ctx.font=bodyFont(u,28,800);drawWrapped(ctx,copy.paw,m+25*u,h-141*u,cw-50*u,36*u,1,'center');
  drawFooter(ctx,m,h-55*u,cw,u,'#765b4d','center');
}

