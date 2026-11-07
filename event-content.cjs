const ticket='https://www.art-mate.net/doc/99977';
const ig='https://www.instagram.com/acahku/';
const external=(url,label)=>`<a class="text-link" href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;
const sheets=items=>items.map((html,i)=>`<section class="content-sheet" data-sheet ${i?'hidden':''}>${html}</section>`).join('');
const paragraph=text=>`<p>${text}</p>`;
const facts=en=>`<dl class="event-facts">
  <div><dt>${en?'Date':'日期'}</dt><dd>${en?'15 Nov 2026 (Sun)':'2026.11.15（日）'}</dd></div>
  <div><dt>${en?'Time':'時間'}</dt><dd>12:00–20:00</dd></div>
  <div><dt>${en?'Venue':'地點'}</dt><dd>${en?'AquaBeat 03, Kwun Tong Promenade':'觀塘海濱活動空間 03'}</dd></div>
  <div><dt>${en?'Tickets':'門票'}</dt><dd>${en?'HK$50 online · HK$60 on the day':'網上 HK$50 · 即日 HK$60'}</dd></div>
</dl>${external(ticket,en?'Get tickets':'購票')}`;
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
// The first eight slots match the supplied artwork; the rest were checked
// against slide 3 of the organizer's published stage schedule.
const stageSlots=[
 ['13:00–13:15','Sundae’s'],['13:15–13:30','Memoria'],['13:30–13:45','YASHOKU'],['13:45–14:00','Choco ID'],
 ['14:00–14:15','Sekai Stage'],['14:15–14:30','青春のシンフォニー'],['14:30–14:45','Naisho'],['14:45–15:00','Pikari'],
 ['15:30–15:45','霙雪OwO'],['15:45–16:00','iro²iro'],['16:00–16:15','Miraculous'],['16:15–16:30','Egaone'],
 ['16:30–16:45','JOJI DESU'],['16:45–17:00','HIT8'],['17:00–17:15','依芸ikumo'],['17:15–17:30','鏡泠風 Kenith']
];
const stage=en=>sheets([...Array.from({length:4},(_,i)=>`<table class="stage-schedule"><caption>15 NOV 2026 · ${i<2?'13:00–15:00':'15:30–17:30'}</caption><thead><tr><th scope="col">${en?'Time':'時間'}</th><th scope="col">${en?'Performer':'表演團體'}</th></tr></thead><tbody>${stageSlots.slice(i*4,i*4+4).map(([time,name])=>`<tr><td>${time}</td><td>${name}</td></tr>`).join('')}</tbody></table>`),`<p class="section-label">${en?'RANDOM PLAY DANCE':'隨機宅舞'}</p><p class="dance-time">17:45–19:00</p>${external(ig+'p/DfRgqOSD9p9/',en?'Official stage schedule':'官方舞臺時間表')}<p class="source-note"><a class="text-link" href="random-play-dance.html">${en?'RPD song list ↗':'隨舞歌單 ↗'}</a></p>`]);
const regulations=require('./current-regulations.cjs');
const rulePages=(en,type='cosplay')=>sheets(regulations[type][en?'en':'zh'].map(([heading,items])=>`<h2>${heading}</h2><ul class="rule-list">${items.map(x=>`<li>${x}</li>`).join('')}</ul>`))+`<p class="source-note">${external(ig+'p/'+(type==='cosplay'?'DfT3xdLD_g8':'DfUMVTpj9ZD')+'/',en?'Official regulations':'官方守則')}</p>`;
const floorPlan=en=>`<div class="floor-plan-content"><button class="floor-plan-button" data-open-map aria-label="${en?'Enlarge the floor plan':'放大場地平面圖'}"><img src="assets/event/floor-plan.webp" width="1080" height="1350" alt="${en?'Floor plan with booths, entrance, exit, stage and toilets':'場地平面圖：攤位、入口、出口、舞臺及洗手間'}"><span>${en?'Enlarge ＋':'放大查看 ＋'}</span></button><p class="map-address">${en?'AquaBeat 03 · 86 Hoi Bun Road':'觀塘海濱活動空間 03 · 觀塘海濱道 86 號'}</p><a class="text-link" href="https://www.google.com/maps/search/?api=1&query=AquaBeat+03+86+Hoi+Bun+Road" target="_blank" rel="noopener">${en?'Open location ↗':'查看位置 ↗'}</a></div>`;
const faqZh=[
 ['何時、在哪裏舉行？','2026年11月15日（日）12:00–20:00，觀塘海濱活動空間03，觀塘海濱道86號。'],
 ['門票多少錢？',`網上門票 HK$50；即日門票 HK$60。${external(ticket,'Art-mate 購票')}`],
 ['網上售票何時截止？','11月14日23:59截止。HK$40 早鳥優惠已於10月18日結束。'],
 ['最遲何時入場？','現場售票及入場於 18:00 截止。工作人員將於 19:00 起請參加者離場，活動於 20:00 結束。'],
 ['不是港大學生也可以參加嗎？','可以。活動歡迎公眾參與。'],
 ['一定要 Cosplay 嗎？','不需要；歡迎以日常服裝到場逛攤位及欣賞表演。'],
 ['隨舞是甚麼時候？',`17:45–19:00。${external(ig+'p/DfO75xKDzuQ/','查看官方歌單')}`],
 ['舞臺表演時間表在哪裏？','請到<a class="text-link" href="stage.html">舞臺表演頁</a>查看各團體的演出時間。'],
 ['如何聯絡主辦？','Instagram：@acahku<br>WhatsApp：Johanna 6110 7676 / Derek 5409 2129'],
 ['可以再次入場嗎？','可以，參加者可於 18:00 前憑手印再次入場，亦請保留門票供檢閱。'],
 ['遺失或拾獲物品怎麼辦？','請到官方攤位查詢或登記；活動後可留意 @acahku 的失物認領帖文。'],
 ['哪裏可以查看平面圖及守則？','請到<a class="text-link" href="map.html">場地地圖</a>、<a class="text-link" href="cosplayer-rules.html">Cosplayer 守則</a>及<a class="text-link" href="participants-regulations.html">參加者守則</a>頁。'],
 ['可以電郵查詢嗎？','可以：<a class="text-link" href="mailto:hkuaca.shimotsukicon@gmail.com">hkuaca.shimotsukicon@gmail.com</a>']
];
const faqEn=[
 ['When and where is it?','15 Nov 2026 (Sun), 12:00–20:00. AquaBeat 03, Kwun Tong Promenade, 86 Hoi Bun Road.'],
 ['How much are tickets?',`HK$50 online; HK$60 on the day. ${external(ticket,'Book on Art-mate')}`],
 ['When does online booking close?','14 Nov at 23:59. The HK$40 early-bird offer ended on 18 Oct.'],
 ['What is the last entry time?','On-site ticket sales and admission end at 18:00. Staff begin asking attendees to leave at 19:00. The event ends at 20:00.'],
 ['Can non-HKU visitors attend?','Yes. The event is open to the public.'],
 ['Do I have to cosplay?','No. You are welcome to visit booths and enjoy the shows in everyday clothes.'],
 ['When is Random Play Dance?',`17:45–19:00. ${external(ig+'p/DfO75xKDzuQ/','See the official song list')}`],
 ['Where is the stage schedule?','See each performance time on the <a class="text-link" href="stage.html">Stage page</a>.'],
 ['How can I contact ACA?','Instagram: @acahku<br>WhatsApp: Johanna 6110 7676 / Derek 5409 2129'],
 ['Can I re-enter?','Yes, participants may re-enter with a hand stamp before 18:00. Keep your ticket for inspection.'],
 ['What if I lose or find something?','Report it at the official booth. Check @acahku for lost-property collection posts after the event.'],
 ['Where are the floor plan and rules?','See the <a class="text-link" href="map.html">Map</a>, <a class="text-link" href="cosplayer-rules.html">Cosplayer Rules</a> and <a class="text-link" href="participants-regulations.html">Participants Regulations</a> pages.'],
 ['Can I email an enquiry?','Yes: <a class="text-link" href="mailto:hkuaca.shimotsukicon@gmail.com">hkuaca.shimotsukicon@gmail.com</a>']
];
const faq=items=>sheets(Array.from({length:Math.ceil(items.length/2)},(_,i)=>`<div class="faq-items">${items.slice(i*2,i*2+2).map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`));
module.exports={zh:{
 introduction:paragraph(introZh[0])+facts(false)+introZh.slice(1).map(paragraph).join(''),
 map:floorPlan(false),
 stage:stage(false),
 'random-play-dance':`<p class="section-label">11.15 SUN</p><p class="dance-time">17:45–19:00</p>${external(ig+'p/DfO75xKDzuQ/','隨舞歌單')}<p class="source-note">歌單已於 @acahku 公布。</p>`,
 'cosplayer-rules':rulePages(false),
 'participants-regulations':rulePages(false,'participants'),
 faq:faq(faqZh)
},en:{
 introduction:paragraph(introEn[0])+facts(true)+introEn.slice(1).map(paragraph).join(''),
 map:floorPlan(true),
 stage:stage(true),
 'random-play-dance':`<p class="section-label">15 NOV · SUN</p><p class="dance-time">17:45–19:00</p>${external(ig+'p/DfO75xKDzuQ/','RPD song list')}<p class="source-note">Official song list published by @acahku.</p>`,
 'cosplayer-rules':rulePages(true),
 'participants-regulations':rulePages(true,'participants'),
 faq:faq(faqEn)
}};
