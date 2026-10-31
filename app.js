(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let motion = !reducedMotion.matches;
  let timers = [];
  let introActive = false;
  let replayFocus = false;
  const intro = $('#intro');
  const hero = $('#hero-art');
  const toggle = $('#motion-toggle');
  const storage = {
    get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { sessionStorage.setItem(key, value); } catch {} }
  };
  if (storage.get('saikyou-motion') === 'off') motion = false;

  // Two rings of independently moving facets give the mirror depth.
  const center = [56, 44];
  const boundary = [[0,0],[24,0],[61,0],[100,0],[100,30],[100,72],[100,100],[70,100],[33,100],[0,100],[0,64],[0,25]];
  const ns = 'http://www.w3.org/2000/svg';
  const inner = boundary.map((p,i)=>p.map((n,axis)=>center[axis]+(n-center[axis])*(.36+.06*Math.sin(i*2))));
  let facetIndex=0;
  function addFacet(points) {
    const i=facetIndex++;
    const shard = document.createElement('div');
    shard.className = 'intro-shard';
    shard.style.clipPath = `polygon(${points.map(p=>`${p[0]}% ${p[1]}%`).join(',')})`;
    const mid=points.reduce((sum,p)=>[sum[0]+p[0]/3,sum[1]+p[1]/3],[0,0]);
    const x=mid[0]-center[0], y=mid[1]-center[1];
    shard.style.setProperty('--dx', `${x * 3.6}vw`);
    shard.style.setProperty('--dy', `${y * 3.6}vh`);
    shard.style.setProperty('--dz', `${200 + (i%7) * 95}px`);
    shard.style.setProperty('--rx', `${(i%2?1:-1)*(18+i%5*12)}deg`);
    shard.style.setProperty('--ry', `${(i%3?1:-1)*(22+i%7*10)}deg`);
    shard.style.setProperty('--rotation', `${(i % 2 ? 1 : -1) * (10 + i * 3)}deg`);
    shard.style.setProperty('--angle', `${i * 29}deg`);
    shard.style.setProperty('--origin', `${mid[0]}% ${mid[1]}%`);
    shard.style.setProperty('--shard-delay',`${(i%6)*65}ms`);
    $('#shards').append(shard);
  }
  boundary.forEach((a, i) => {
    const next=(i+1)%boundary.length, b=boundary[next];
    addFacet([center,inner[i],inner[next]]);
    addFacet([inner[i],a,b]);
    addFacet([inner[i],b,inner[next]]);
    const sx=center[0]*14.4, sy=center[1]*10, ex=a[0]*14.4, ey=a[1]*10;
    const mx=sx+(ex-sx)*.48+(i%2?19:-19), my=sy+(ey-sy)*.48;
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', `M${sx} ${sy} L${sx+(ex-sx)*.23+8} ${sy+(ey-sy)*.23} L${mx} ${my} L${ex} ${ey} M${mx} ${my} l${(i%2?1:-1)*45} ${(ey-sy)*.11} M${inner[i][0]*14.4} ${inner[i][1]*10} L${inner[next][0]*14.4} ${inner[next][1]*10}`);
    path.setAttribute('pathLength', '1');
    path.style.setProperty('--delay', `${i*42}ms`);
    $('#crack-lines').append(path);
  });

  const tints=['#a9efdc','#cbb6ff','#f1b9de','#a7d8ff','#f4dfb3'];
  for(let i=0;i<34;i++){
    const dust=document.createElement('i');
    const props={'--x':`${(i*37+13)%100}%`,'--y':`${(i*23+11)%100}%`,'--size':`${3+i%5*2}px`,'--tint':tints[i%tints.length],'--duration':`${3+i%4}s`,'--offset':`${-i*.27}s`};
    Object.entries(props).forEach(([k,v])=>dust.style.setProperty(k,v));$('#intro-dust').append(dust);
  }
  function finishIntro() {
    timers.forEach(clearTimeout); timers=[];
    intro.className='intro'; intro.setAttribute('aria-hidden','true');
    $('#skip-intro').tabIndex=-1;
    document.body.classList.remove('intro-running','intro-lock');
    introActive=false;
    document.querySelectorAll('header,main,footer').forEach(el=>el.inert=false);
    storage.set('saikyou-entered-v2','yes');
    if(replayFocus) { $('#replay').focus({preventScroll:true}); replayFocus=false; }
  }
  function playIntro(replay=false) {
    if (!motion || reducedMotion.matches) return;
    finishIntro();
    replayFocus=replay;
    if(replay) window.scrollTo({top:0,behavior:'instant'});
    introActive=true;
    intro.className='intro active'; intro.setAttribute('aria-hidden','false');
    $('#skip-intro').tabIndex=0;
    document.querySelectorAll('header,main,footer').forEach(el=>el.inert=true);
    document.body.classList.add('intro-running','intro-lock');
    $('#skip-intro').focus({preventScroll:true});
    timers.push(setTimeout(()=>intro.classList.add('awakening'),250));
    timers.push(setTimeout(()=>intro.classList.add('cracking'),2050));
    timers.push(setTimeout(()=>{
      intro.classList.add('shattering');
      document.body.classList.remove('intro-running');
    },3650));
    timers.push(setTimeout(finishIntro,7000));
  }
  $('#skip-intro').addEventListener('click',finishIntro);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&introActive)finishIntro()});
  $('#replay').addEventListener('click',()=>{
    if(!motion){motion=true;applyMotion();}
    playIntro(true);
  });
  function applyMotion() {
    if(reducedMotion.matches)motion=false;
    document.body.classList.toggle('has-motion',motion);
    document.body.classList.toggle('motion-paused',!motion);
    toggle.setAttribute('aria-pressed',String(motion));
    toggle.setAttribute('aria-label',motion?'關閉動態效果':'開啟動態效果');
    $('.motion-label').textContent=motion?'動態 ON':'動態 OFF';
    storage.set('saikyou-motion',motion?'on':'off');
    if(!motion) {
      if(introActive)finishIntro();
      document.querySelectorAll('.fx-layer').forEach(el=>el.remove());
      document.getAnimations().filter(a=>a.effect?.target?.dataset?.shattering==='true').forEach(a=>a.cancel());
    }
  }
  toggle.addEventListener('click',()=>{motion=!motion;applyMotion()});
  reducedMotion.addEventListener('change',e=>{motion=!e.matches;applyMotion()});
  applyMotion();

  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  $('.hero').addEventListener('pointermove',e=>{
    if(!motion||e.pointerType==='touch') return;
    const rect=hero.getBoundingClientRect();
    hero.style.setProperty('--px',`${Math.max(-7,Math.min(7,(e.clientX-rect.left-rect.width/2)/55))}px`);
    hero.style.setProperty('--py',`${Math.max(-5,Math.min(5,(e.clientY-rect.top-rect.height/2)/65))}px`);
  });
  $('.hero').addEventListener('pointerleave',()=>{hero.style.setProperty('--px','0px');hero.style.setProperty('--py','0px')});
  function getFxLayer() {
    const host=document.querySelector('dialog[open]')||document.body;
    let layer=[...host.children].find(el=>el.classList.contains('fx-layer'));
    if(!layer){layer=document.createElement('div');layer.className='fx-layer';layer.setAttribute('aria-hidden','true');layer.inert=true;host.append(layer);}
    return layer;
  }
  function removeSoon(el,ms){setTimeout(()=>{const parent=el.parentElement;el.remove();if(parent?.classList.contains('fx-layer')&&!parent.children.length)parent.remove()},ms)}
  function clickGlass(x,y) {
    const layer=getFxLayer();
    if(layer.children.length>110)return;
    const ring=document.createElement('i');ring.className='click-ring';ring.style.setProperty('--x',x+'px');ring.style.setProperty('--y',y+'px');layer.append(ring);removeSoon(ring,700);
    for(let i=0;i<11;i++){
      const piece=document.createElement('i');piece.className='glass-click';
      const angle=i/11*Math.PI*2+.2, distance=40+Math.random()*48;
      const props={'--x':x+'px','--y':y+'px','--size':(5+Math.random()*7)+'px','--dx':Math.cos(angle)*distance+'px','--dy':(Math.sin(angle)*distance+16)+'px','--spin':i*47+'deg','--tint':tints[i%tints.length],'--life':(700+i*24)+'ms'};
      Object.entries(props).forEach(([key,value])=>piece.style.setProperty(key,value));layer.append(piece);removeSoon(piece,1100);
    }
  }
  function shatterButton(button) {
    if(button.dataset.shattering==='true')return;
    const rect=button.getBoundingClientRect();
    if(!rect.width||!rect.height)return;
    button.dataset.shattering='true';
    const layer=getFxLayer(), style=getComputedStyle(button);
    const edge=[[0,0],[40,0],[75,0],[100,0],[100,100],[62,100],[25,100],[0,100]];
    edge.forEach((a,i)=>{
      const b=edge[(i+1)%edge.length],piece=document.createElement('div');piece.className='button-fragment';
      piece.style.left=rect.left+'px';piece.style.top=rect.top+'px';piece.style.width=rect.width+'px';piece.style.height=rect.height+'px';
      piece.style.clipPath=`polygon(48% 49%,${a[0]}% ${a[1]}%,${b[0]}% ${b[1]}%)`;
      const dx=((a[0]+b[0])/2-48)*1.9,dy=((a[1]+b[1])/2-49)*1.5;
      Object.entries({'--dx':dx+'px','--dy':dy+'px','--rx':(i%2?30:-35)+'deg','--ry':(i%3?24:-45)+'deg','--rz':(i%2?i*4:-i*5)+'deg','--ox':'48%','--oy':'49%'}).forEach(([k,v])=>piece.style.setProperty(k,v));
      const copy=button.cloneNode(true);copy.removeAttribute('id');copy.removeAttribute('aria-controls');copy.removeAttribute('data-shattering');
      copy.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
      copy.classList.add('shatter-snapshot');copy.setAttribute('tabindex','-1');copy.setAttribute('aria-hidden','true');copy.inert=true;
      copy.style.width=rect.width+'px';copy.style.height=rect.height+'px';copy.style.font=style.font;copy.style.color=style.color;copy.style.backgroundColor=style.backgroundColor;
      piece.append(copy);layer.append(piece);removeSoon(piece,950);
    });
    const animation=button.animate([{opacity:1,offset:0},{opacity:.06,offset:.15},{opacity:.06,offset:.48},{opacity:1,offset:1}],{duration:750,easing:'ease-out'});
    const done=()=>{delete button.dataset.shattering};animation.onfinish=done;animation.oncancel=done;
  }
  document.addEventListener('click',e=>{
    if(!motion||reducedMotion.matches||introActive||e.target.closest('.fx-layer'))return;
    const button=e.target.closest('button,.button,.nav-cta');
    if(e.detail>0)clickGlass(e.clientX,e.clientY);
    if(button&&!button.matches('#replay,#skip-intro,.dialog-close'))shatterButton(button);
  },true);

  const menu=$('#menu-toggle'), mobileNav=$('#mobile-nav');
  function closeMenu(){mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','開啟導覽')}
  menu.addEventListener('click',()=>{
    const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'關閉導覽':'開啟導覽');mobileNav.hidden=!open;
  });
  mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menu.focus()}});

  const content={
    doujin:{label:'DOUJIN',title:'同人攤位',text:'攤位申請、參展名單及場地配置，稍後公布！'},
    stage:{label:'LIVE STAGE',title:'舞臺表演',text:'表演報名、演出陣容及時間表，稍後公布！'},
    cosplay:{label:'COSPLAY',title:'Cosplay',text:'更衣設施、攝影及道具守則，活動前公布。'}
  };
  const info=$('#info-dialog');
  info.setAttribute('aria-labelledby','dialog-title');info.setAttribute('aria-describedby','dialog-description');
  document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',()=>{
    const item=content[button.dataset.info];$('#dialog-label').textContent=item.label;$('#dialog-title').textContent=item.title;$('#dialog-description').textContent=item.text;setTimeout(()=>{if(!info.open)info.showModal()},motion?360:0);
  }));
  ['#show-poster','#character-poster'].forEach(selector=>$(selector).addEventListener('click',()=>setTimeout(()=>{if(!$('#poster-dialog').open)$('#poster-dialog').showModal()},motion?360:0)));
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
  });
  // Decode the provided artwork before the first reveal, with a bounded fallback.
  if(motion&&!storage.get('saikyou-entered-v2')){
    const img=$('#hero-image');
    introActive=true;
    intro.className='intro active';intro.setAttribute('aria-hidden','false');
    $('#skip-intro').tabIndex=0;
    document.body.classList.add('intro-running','intro-lock');
    document.querySelectorAll('header,main,footer').forEach(el=>el.inert=true);
    Promise.race([img.decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,1500))]).then(()=>{if(motion&&introActive)playIntro()});
  }
})();
