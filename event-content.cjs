const ticket='https://www.art-mate.net/doc/99977';
const ig='https://www.instagram.com/acahku/';
const external=(url,label)=>`<a class="text-link" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;
const sheets=items=>items.map((html,i)=>`<section class="content-sheet" data-sheet ${i?'hidden':''}>${html}</section>`).join('');
const paragraph=text=>`<p>${text}</p>`;
const facts=en=>`<dl class="event-facts"><div><dt>${en?'Date':'日期'}</dt><dd>${en?'15 Nov 2026 (Sun)':'2026.11.15（日）'}</dd></div><div><dt>${en?'Time':'時間'}</dt><dd>12:00–20:00</dd></div><div><dt>${en?'Venue':'地點'}</dt><dd>${en?'AquaBeat 03, Kwun Tong Promenade':'觀塘海濱活動空間 03'}</dd></div><div><dt>${en?'Tickets':'門票'}</dt><dd>${en?'HK$50 online · HK$60 on the day':'網上 HK$50 · 即日 HK$60'}</dd></div></dl>${external(ticket,en?'Get tickets':'購票')}`;
const introZh=[
'以霜為名，以月為鏡。香港大學動漫聯盟為你呈獻 —— 第十五屆「霜月式」同人祭。',
'「淬鏡」一詞，指將昏暗的銅鏡燒紅浸入水中，再進行打磨，使其重新明亮照人。本屆霜月式期望延續一貫理念，致力精煉及推廣同人文化，令其映照出閃耀奪目的光芒，展現無盡的可能性。',
'秉持著這樣的信念，今年我們在延續舞臺表演環節的同時，亦將作出新嘗試，加入隨舞環節，令各位宅舞愛好者亦能展露出色一刻，為祭典增色添彩。',
'現誠邀各位蒞臨第十五屆《霜月式·淬鏡》，期望當日各位能到場一同見證同人文化光芒迸發的瞬間，與我們一起繼續共渡種種「燦」爛時刻。'];
const introEn=[
'Named for frost, with the moon as our mirror. The Animation and Comics Association, HKU presents the 15th ShimotsukiCon — Saikyou.',
'“Saikyou” describes restoring a tarnished bronze mirror: heating it until red-hot, quenching it in water, then polishing it until it shines again.',
'In that spirit, this year’s ShimotsukiCon continues our commitment to refining and promoting doujin culture, reflecting its dazzling brilliance and endless possibilities.',
'Alongside our returning stage performances, we are introducing Random Play Dance this year, giving dance lovers a chance to shine and bring even more colour to the festival.',
'We warmly invite you to the 15th ShimotsukiCon · Saikyou. Join us to witness doujin culture shine, and share many more brilliant moments together.'];
const performers=[
 ['Memoria','LoveLive! 舞蹈','LoveLive! dance'],['Sekai Stage','世界計畫 Cosplay 舞蹈','Project Sekai cosplay dance'],['《Naisho》','動漫歌曲・VOCALOID','Anime songs · VOCALOID'],['青春のシンフォニー','日本偶像歌曲翻跳','Japanese idol dance covers'],['HIT8','NIJISANJI EN 舞蹈','NIJISANJI EN dance'],
 ['依芸ikumo','學園偶像大師・歌唱','Gakuen Idolmaster · vocals'],['鏡泠風 Kenith','粵語翻唱・歌唱','Cantonese covers · vocals'],['霙雪OwO','SOLO 表演','Solo performance'],['Pikari','Trickstar 主題表演','Trickstar performance'],['Sundae’s','Printemps 歌曲翻跳','Printemps dance covers'],
 ['iro²iro','五人宅舞團體','Five-member dance group'],['Miraculous','宅舞翻跳','Dance covers'],['Egaone','Wonderlands × Showtime','Wonderlands × Showtime'],['Choco ID','MORE MORE JUMP!','MORE MORE JUMP!'],['JOJI DESU','HIMEHINA','HIMEHINA'],['YASHOKU','J-POP・VOCALOID 歌唱','J-pop · VOCALOID vocals']
];
const posts=['DeWM6LOD-ej','DebAjYmj639','Debb7TtD10j'];
const stage=en=>sheets([...Array.from({length:4},(_,i)=>`<p class="section-label">${en?'Announced performers':'表演陣容'}</p><ul class="performer-list">${performers.slice(i*4,i*4+4).map(p=>`<li><strong>${p[0]}</strong><span>${p[en?2:1]}</span></li>`).join('')}</ul><small>${en?'Display order is not the running order.':'展示順序並非演出次序。'}</small>`),`<p>${en?'Meet the performers on @acahku.':'到 @acahku 認識各位表演者。'}</p><div class="source-links">${posts.map((p,i)=>external(ig+'p/'+p+'/',(en?'Performer introductions ':'表演團體介紹 ')+(i+1))).join('')}</div>`]);
const rulePages=en=>sheets((en?[
 ['Costumes & props',['Avoid overly revealing costumes or visible underwear. Safety shorts and stockings are recommended.','Avoid real military, police or security uniforms. Do not bring airsoft guns, fireworks, sharpened blades or dangerous hard props.']],
 ['Changing & cleanliness',['Do not block toilets while changing or applying makeup. Do not use sprays there.','Do not scatter feathers, confetti or glitter, or use fake blood that may stain the venue.']],
 ['Photography',['Keep booths and main walkways clear when taking photographs.','Share photography spaces; do not occupy them for extended periods.']],
 ['On-site assistance',['Follow staff instructions. Staff may request changes to unsafe costumes or props, and ask visitors to leave if needed.','Look after your belongings. Ask ACA staff for help with lost property or other issues.']]
]:[
 ['服裝與道具',['避免過於暴露的服裝或外露內衣，建議穿著安全褲及絲襪。','避免真實軍警或保安制服；請勿攜帶氣槍、煙花、開鋒刀劍或危險硬質道具。']],
 ['更衣與整潔',['請勿因更衣或化妝而阻塞洗手間，亦請勿在內使用噴劑。','請勿散落羽毛、紙碎或閃粉，或使用可能弄污場地的假血。']],
 ['攝影',['拍攝時請保持攤位及主要通道暢通。','請與他人共享攝影位置，避免長時間佔用。']],
 ['現場協助',['請遵從工作人員指示；不安全的服裝或道具可能須作調整，未能配合者可能被要求離場。','請保管個人物品；如遺失物品或需要協助，請向 ACA 工作人員求助。']]
]).map(([heading,items])=>`<h2>${heading}</h2><ul class="rule-list">${items.map(x=>`<li>${x}</li>`).join('')}</ul>`));
const faqZh=[
 ['何時、在哪裏舉行？','2026年11月15日（日）12:00–20:00，觀塘海濱活動空間03，觀塘海濱道86號。'],
 ['門票多少錢？',`網上門票 HK$50；即日門票 HK$60。${external(ticket,'Art-mate 購票')}`],
 ['網上售票何時截止？','11月14日23:59截止。HK$40 早鳥優惠已於10月18日結束。'],
 ['最遲何時入場？','最遲入場時間為19:00，即活動結束前一小時。'],
 ['不是港大學生也可以參加嗎？','可以。活動歡迎公眾參與。'],
 ['一定要 Cosplay 嗎？','不需要；歡迎以日常服裝到場逛攤位及欣賞表演。'],
 ['隨舞是甚麼時候？',`17:35–18:35。${external(ig+'p/DfO75xKDzuQ/','查看官方歌單')}`],
 ['可以看甚麼舞臺表演？','已公布的陣容包括宅舞、Cosplay 舞蹈及動漫、J-POP、VOCALOID 歌曲演出；詳見舞臺表演頁。'],
 ['如何聯絡主辦？','Instagram：@acahku<br>WhatsApp：Johanna 6110 7676 / Derek 5409 2129'],
 ['可以電郵查詢嗎？','可以：<a class="text-link" href="mailto:hkuaca.shimotsukicon@gmail.com">hkuaca.shimotsukicon@gmail.com</a>']
];
const faqEn=[
 ['When and where is it?','15 Nov 2026 (Sun), 12:00–20:00. AquaBeat 03, Kwun Tong Promenade, 86 Hoi Bun Road.'],
 ['How much are tickets?',`HK$50 online; HK$60 on the day. ${external(ticket,'Book on Art-mate')}`],
 ['When does online booking close?','14 Nov at 23:59. The HK$40 early-bird offer ended on 18 Oct.'],
 ['What is the last entry time?','19:00, one hour before the event ends.'],
 ['Can non-HKU visitors attend?','Yes. The event is open to the public.'],
 ['Do I have to cosplay?','No. You are welcome to visit booths and enjoy the shows in everyday clothes.'],
 ['When is Random Play Dance?',`17:35–18:35. ${external(ig+'p/DfO75xKDzuQ/','See the official song list')}`],
 ['What is on stage?','The announced line-up includes dance covers, cosplay dance and anime, J-pop and VOCALOID vocals. See the Stage page.'],
 ['How can I contact ACA?','Instagram: @acahku<br>WhatsApp: Johanna 6110 7676 / Derek 5409 2129'],
 ['Can I email an enquiry?','Yes: <a class="text-link" href="mailto:hkuaca.shimotsukicon@gmail.com">hkuaca.shimotsukicon@gmail.com</a>']
];
const faq=items=>sheets(Array.from({length:Math.ceil(items.length/2)},(_,i)=>`<div class="faq-items">${items.slice(i*2,i*2+2).map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`));
module.exports={zh:{
 introduction:sheets([introZh.slice(0,2).map(paragraph).join(''),introZh.slice(2).map(paragraph).join(''),facts(false)]),
 stage:stage(false),
 'random-play-dance':`<p class="section-label">11.15 SUN</p><p class="dance-time">17:35–18:35</p><p>跟著喜歡的歌，一起跳舞。</p>${external(ig+'p/DfO75xKDzuQ/','隨舞歌單')}<p class="source-note">歌單已於 @acahku 公布。</p>`,
 'cosplayer-rules':rulePages(false)+`<p class="source-note">${external('https://www.acabox.studsoc.hku.hk/function/28/shimotsuki/cosplay-rules','參考 2025 年守則整理')}</p>`,
 faq:faq(faqZh)
},en:{
 introduction:sheets([introEn.slice(0,2).map(paragraph).join(''),introEn.slice(2,4).map(paragraph).join(''),paragraph(introEn[4]),facts(true)]),
 stage:stage(true),
 'random-play-dance':`<p class="section-label">15 NOV · SUN</p><p class="dance-time">17:35–18:35</p><p>Hear a favourite? Join the dance.</p>${external(ig+'p/DfO75xKDzuQ/','RPD song list')}<p class="source-note">Official song list published by @acahku.</p>`,
 'cosplayer-rules':rulePages(true)+`<p class="source-note">${external('https://www.acabox.studsoc.hku.hk/function/28/shimotsuki/cosplay-rules','Adapted from the 2025 guidelines')}</p>`,
 faq:faq(faqEn)
}};
