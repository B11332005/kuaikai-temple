/* ════════════════════════════════════════════
   乖乖神殿 — script.js
   ════════════════════════════════════════════ */

// ════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════
let currentLang   = 'zh';
let currentGod    = 'green';
let currentScreen = 'screen-landing';
let screenHistory = [];

// ════════════════════════════════════════════
// DATA — 神明資訊
// ════════════════════════════════════════════
const godInfo = {
  green: {
    color: '#1C4A1C', accent: '#3A7A3A', light: '#90C890',
    img: 'bag-green.png',
    badgeZh: '🟢 綠色乖乖 · 人生與健康 🟢', badgeEn: '🟢 Green Kuai Kuai · Life & Health 🟢' ,
    buyZh: ' 去買一包綠色乖乖 → 奶油椰子口味 ', buyEn: ' Get a Green Kuai Kuai → Butter Coconut Flavor ',
    flashColor: '#90C890', burstText: '開運！', burstTextEn: 'Good Luck!'
  },
  red: {
    color: '#6B1A1A', accent: '#C4453A', light: '#F09090',
    img: 'bag-red.png',
    badgeZh: '🔴 紅色乖乖 · 愛情與人際 🔴', badgeEn: '🔴 Red Kuai Kuai · Love & Relations 🔴' ,
    buyZh: ' 去買一包紅色乖乖 → 香濃巧克力口味 ', buyEn: ' Get a Red Kuai Kuai → Rich Chocolate Flavor ',
    flashColor: '#F09090', burstText: '有緣！', burstTextEn: 'Destined!'
  },
  yellow: {
    color: '#6B5800', accent: '#C49B00', light: '#F0D080',
    img: 'bag-yellow.png',
    badgeZh: '🟡 黃色乖乖 · 財富與運勢 🟡', badgeEn: '🟡 Yellow Kuai Kuai · Wealth & Fortune 🟡' ,
    buyZh: ' 去買一包黃色乖乖 → 五香口味 ', buyEn: ' Get a Yellow Kuai Kuai → Five-Spice Flavor ',
    flashColor: '#F0D080', burstText: '發財！', burstTextEn: 'Get Rich!'
  }
};

// ════════════════════════════════════════════
// DATA — 籤文
// ════════════════════════════════════════════
const oracles = {
  green: [
    { zh:"今天的你，比昨天更靠近那個你想成為的樣子。", en:"Today you are one step closer to who you want to be.", cmdZh:"吃一顆綠色乖乖，今天做一件讓未來的你感謝現在的事。", cmdEn:"Eat a green Kuai Kuai. Do one thing today your future self will thank you for." },
    { zh:"你正走在對的路上，只是還沒到風景最好的地方。", en:"You're on the right path — the best view is still ahead.", cmdZh:"把綠色乖乖帶出門走一段路，在你覺得最舒服的那個點停下來食用。", cmdEn:"Take a green Kuai Kuai on a walk and eat it at the spot that feels most peaceful." },
    { zh:"有一件事，你一直想開始，但一直等「更好的時機」。", en:"You've been waiting for the right moment. This is it.", cmdZh:"把綠色乖乖放在那件事旁邊，做完第一步再食用，現在就是時機。", cmdEn:"Put a green Kuai Kuai beside that thing, do the first step, then eat it. Now is the time." },
    { zh:"你身邊有一個人，值得你更認真對待。", en:"Someone near you deserves more of your attention.", cmdZh:"把綠色乖乖送給那個人，什麼都不用說，送出去就好。", cmdEn:"Give a green Kuai Kuai to that person. No words needed — just give it." },
    { zh:"你最近太累了，連自己都沒注意到。", en:"You've been running on empty without realizing it.", cmdZh:"吃下綠色乖乖，今天提早一小時休息，給自己一個喘息。", cmdEn:"Eat a green Kuai Kuai and give yourself permission to rest one hour earlier." },
    { zh:"你的直覺正在告訴你一件重要的事，但你一直假裝沒聽到。", en:"Your instincts are telling you something important. Listen.", cmdZh:"把綠色乖乖握在手心，閉眼靜置五分鐘，睜眼後食用，聽聽那個聲音。", cmdEn:"Hold a green Kuai Kuai in your palm, close your eyes for five minutes, then eat it and listen." },
    { zh:"一個你以為結束的事，正在轉化成禮物。", en:"What you thought was an ending is turning into a gift.", cmdZh:"吃下綠色乖乖，今天回想一件壞事，找出它帶給你的一個收穫寫下來。", cmdEn:"Eat a green Kuai Kuai. Think of a past hardship and write down one thing it gave you." },
    { zh:"你的身體在說話，但你一直沒有在聽。", en:"Your body has been speaking. It's time to listen.", cmdZh:"吃一顆綠色乖乖，今天好好吃一頓飯，不滑手機，專心吃。", cmdEn:"Eat a green Kuai Kuai. Have one proper meal today — no phone, just food." },
    { zh:"你最近給別人的愛，超過你給自己的愛。", en:"You've been giving more love to others than to yourself.", cmdZh:"把綠色乖乖帶去你喜歡的地方，一個人靜靜食用，不需要陪伴。", cmdEn:"Take a green Kuai Kuai somewhere you love. Eat it alone. No company needed." },
    { zh:"你的人生在一個重要的轉彎口，但你低頭趕路沒發現。", en:"You're at a turning point. Lift your head and look around.", cmdZh:"吃下綠色乖乖，今天抬頭看看周圍，注意身邊出現的新事物。", cmdEn:"Eat a green Kuai Kuai and spend today noticing what's new around you." },
    { zh:"有一份緣分正在靠近，你需要稍微打開自己。", en:"A new connection is approaching. Open up just a little.", cmdZh:"把綠色乖乖帶去一個新場合，在那裡食用，對陌生環境說一句「好，我試試」。", cmdEn:"Take a green Kuai Kuai to a new place. Eat it there and say: 'Okay, I'll try.'" },
    { zh:"你一直想說的那句話，今天是說出口的好時機。", en:"That thing you've been holding back — today is the day.", cmdZh:"吃一顆綠色乖乖，今天把那句話說出來，無論對誰。", cmdEn:"Eat a green Kuai Kuai and say that thing out loud today — to anyone." },
    { zh:"你的運勢正在「清場」，舊的離開是為了讓新的進來。", en:"The old is clearing out to make room for something new.", cmdZh:"清掉一個讓你不舒服卻一直留著的東西後，再把綠色乖乖放在那個空位食用。", cmdEn:"Remove one thing that no longer serves you. Place a green Kuai Kuai in that empty space and eat it." },
    { zh:"你的人生劇本正在改寫，你是唯一的編劇。", en:"Your story is being rewritten — and you're the only author.", cmdZh:"把綠色乖乖放在空白紙旁邊，寫下三個月後你希望自己在哪裡，再食用。", cmdEn:"Put a green Kuai Kuai beside blank paper. Write where you want to be in three months, then eat it." },
    { zh:"你有個夢，你已經很久沒讓自己認真做夢了。", en:"You have a dream you haven't let yourself dream in a long time.", cmdZh:"吃下綠色乖乖，今天花五分鐘幻想「如果一切順利，五年後的生活是⋯⋯」", cmdEn:"Eat a green Kuai Kuai. Spend five minutes imagining: if everything went right, what would life look like in five years?" },
    { zh:"你的運氣在靠近，但你的擔憂讓它走慢了。", en:"Luck is on its way. Your worry is slowing it down.", cmdZh:"吃一顆綠色乖乖，今天只想今天的事，把三週後的擔憂先放下。", cmdEn:"Eat a green Kuai Kuai. Think only about today. Put the worries three weeks from now on hold." },
    { zh:"你對自己太嚴苛了，神明都替你喊累。", en:"You've been too hard on yourself. Even the deity is tired for you.", cmdZh:"把綠色乖乖放在鏡子前，對著鏡子說：「你已經很努力了。」然後食用。", cmdEn:"Put a green Kuai Kuai in front of a mirror. Say: 'You've been working so hard.' Then eat it." },
    { zh:"你身邊有一個人，正在偷偷為你加油。", en:"Someone near you is quietly rooting for you.", cmdZh:"吃下綠色乖乖，今天謝謝那個你覺得一直在背後支持你的人。", cmdEn:"Eat a green Kuai Kuai. Thank the person you feel has been quietly supporting you." },
    { zh:"你的好運氣，住在你的笑容裡。", en:"Your good luck lives inside your smile.", cmdZh:"把綠色乖乖帶出門，對今天第一個對你笑的人也回一個笑，然後食用。", cmdEn:"Take a green Kuai Kuai out. Return the first smile you receive today, then eat it." },
    { zh:"你已經擁有改變生活的能力，你只是還沒相信。", en:"You already have the power to change your life. You just don't believe it yet.", cmdZh:"吃一顆綠色乖乖，今天寫下三件你做到過、曾讓自己驚訝的事。", cmdEn:"Eat a green Kuai Kuai. Write down three things you've done that surprised even yourself." },
    { zh:"你的好運正在被比較心消耗。", en:"Your good luck is being drained by comparison.", cmdZh:"吃下綠色乖乖，今天取消追蹤一個讓你感到焦慮的社群帳號。", cmdEn:"Eat a green Kuai Kuai and unfollow one account that makes you feel anxious." },
    { zh:"你的生活需要多一點色彩，不只是努力。", en:"Your life needs more color — not just effort.", cmdZh:"把綠色乖乖帶去做一件你上次做是幾個月前的娛樂，在那裡食用。", cmdEn:"Take a green Kuai Kuai to do something fun you haven't done in months. Eat it there." },
    { zh:"你最近太努力「看起來沒事」，但其實不太好。", en:"You've been working hard at looking fine. But you're not entirely fine.", cmdZh:"吃下綠色乖乖，今天讓自己承認一件「其實我不太好」的事，說給一個人聽。", cmdEn:"Eat a green Kuai Kuai. Admit one 'I'm not doing great' thing to someone today." },
    { zh:"你的生活正在悄悄變好，只是幅度還小，你還沒察覺。", en:"Your life is quietly improving. The changes are small but real.", cmdZh:"吃一顆綠色乖乖，今天找出一件三個月前沒有、現在有的好事。", cmdEn:"Eat a green Kuai Kuai. Find one good thing you have now that you didn't have three months ago." },
    { zh:"你一直在往前衝，但方向需要微調。", en:"You're moving fast — but a small course correction is needed.", cmdZh:"把綠色乖乖帶去找一個你信任的人，邊吃邊請他說說你最近的狀態。", cmdEn:"Take a green Kuai Kuai to someone you trust. Eat it while asking them how you seem lately." },
    { zh:"你的好運跟你的整潔度成正比。", en:"Your good fortune correlates with your surroundings.", cmdZh:"整理完一個抽屜或包包後，把綠色乖乖放在裡面取出食用。", cmdEn:"Tidy a drawer or bag. Take a green Kuai Kuai from inside it and eat it." },
    { zh:"你正在的地方，就是你需要在的地方。", en:"Where you are is exactly where you need to be.", cmdZh:"吃一顆綠色乖乖，今天停止羨慕別人的位置，感謝自己現在的處境。", cmdEn:"Eat a green Kuai Kuai. Stop envying where others are. Be grateful for where you are." },
    { zh:"一件讓你糾結已久的事，其實答案你早就知道。", en:"You've known the answer to that dilemma all along.", cmdZh:"把綠色乖乖握在手心，閉眼問自己那個問題，食用後相信你的第一直覺。", cmdEn:"Hold a green Kuai Kuai, close your eyes, ask yourself the question. Eat it and trust your first instinct." },
    { zh:"你的運氣住在你的行動裡，不在你的擔心裡。", en:"Your luck lives in your actions, not your worries.", cmdZh:"吃下綠色乖乖，今天把最大的擔心換成最小的行動。", cmdEn:"Eat a green Kuai Kuai. Replace your biggest worry with your smallest possible action." },
    { zh:"你的運勢需要你「動起來」才能啟動。", en:"Your fortune activates when you start moving.", cmdZh:"把綠色乖乖帶出門走路十五分鐘，走完後在戶外食用。", cmdEn:"Take a green Kuai Kuai out for a fifteen-minute walk. Eat it outside when you're done." },
    { zh:"你的好運，在你做完那件拖了最久的事之後出現。", en:"Your good luck appears right after you finish that thing you've been avoiding.", cmdZh:"把綠色乖乖放在那件拖最久的事旁邊，做完再食用。", cmdEn:"Put a green Kuai Kuai beside that long-avoided task. Finish it, then eat." },
    { zh:"你正在積累的，比你以為的更有價值。", en:"What you're building up is worth far more than you realize.", cmdZh:"吃下綠色乖乖，把過去半年做過的事寫成一個清單，不求完美，寫就對了。", cmdEn:"Eat a green Kuai Kuai. List everything you've done in the past six months. Don't aim for perfect — just write." },
    { zh:"你的家人正在偷偷為你擔心，雖然他們不說。", en:"Your family worries about you quietly, even if they don't say it.", cmdZh:"把綠色乖乖帶回家，和家人一起分著吃，說說你最近的狀況。", cmdEn:"Bring a green Kuai Kuai home. Share it with family and tell them how you've been." },
    { zh:"你一直想改變的那個習慣，今天是好的起點。", en:"Today is a good day to start changing that habit.", cmdZh:"吃一顆綠色乖乖，今天替換一個小習慣，哪怕只是把手機放到另一個房間。", cmdEn:"Eat a green Kuai Kuai. Swap one small habit today — even just moving your phone to another room." },
    { zh:"你有時候會懷疑自己走錯路，但你沒有。", en:"Sometimes you doubt you're on the right path. You are.", cmdZh:"吃下綠色乖乖，今天找出一個你走對了的證據，哪怕是很小的一件事。", cmdEn:"Eat a green Kuai Kuai. Find one piece of evidence, however small, that you're on track." },
    { zh:"你的笑，是你最強大的護身符。", en:"Your smile is your most powerful charm.", cmdZh:"把綠色乖乖帶去做一件讓你真心發笑的事，笑出來的那一刻食用。", cmdEn:"Take a green Kuai Kuai to something that makes you genuinely laugh. Eat it at the moment of laughter." },
    { zh:"你正在走的這段路，將來你會很慶幸自己走過。", en:"One day you'll be glad you walked this stretch of road.", cmdZh:"吃下綠色乖乖，今天為這段旅程拍一張照片，留下紀錄。", cmdEn:"Eat a green Kuai Kuai. Take a photo of this chapter of your life to remember it by." },
    { zh:"你太習慣等別人給你許可，但你不需要。", en:"You've been waiting for permission. You don't need it.", cmdZh:"把綠色乖乖放在那件一直在等人點頭的事旁邊，給自己許可，食用後去做。", cmdEn:"Put a green Kuai Kuai beside that thing you're waiting to be approved. Give yourself permission. Eat it. Go do it." },
    { zh:"有一條新的路，正在你腳下慢慢成形。", en:"A new path is forming beneath your feet.", cmdZh:"吃下綠色乖乖，今天對一件新事物說「我願意試試看」。", cmdEn:"Eat a green Kuai Kuai. Say 'I'm willing to try' to something new today." },
    { zh:"你的好運需要你「好好吃飯」來維持基礎。", en:"Good luck starts with taking care of the basics. Eat well.", cmdZh:"吃下綠色乖乖，今天好好吃一頓有蔬菜的正餐，不將就。", cmdEn:"Eat a green Kuai Kuai. Have one proper meal with vegetables today. No skimping." },
    { zh:"你有一個從小就有的夢，你已經很久沒想它了。", en:"You have a childhood dream you haven't thought about in years.", cmdZh:"吃下綠色乖乖，今天花五分鐘想那個夢，看它現在是什麼形狀。", cmdEn:"Eat a green Kuai Kuai. Spend five minutes with that old dream. See what shape it's in now." },
    { zh:"你的好運藏在你最自在的那個版本裡。", en:"Your best luck hides inside your most authentic self.", cmdZh:"把綠色乖乖帶去做一件讓你最像「自己」的事，在那裡食用。", cmdEn:"Take a green Kuai Kuai to do the thing that makes you most feel like yourself. Eat it there." },
    { zh:"你的人生下一章，比這一章精彩。", en:"The next chapter of your life is better than this one.", cmdZh:"吃下綠色乖乖，今天做一件為下一章做準備的事。", cmdEn:"Eat a green Kuai Kuai. Do one thing today to prepare for your next chapter." },
    { zh:"你一直努力讓別人安心，但你自己也需要被安慰。", en:"You've been reassuring everyone else. You need reassurance too.", cmdZh:"把綠色乖乖帶去找一個你信任的人，邊吃邊說說你的不安。", cmdEn:"Take a green Kuai Kuai to someone you trust. Eat it while sharing your uncertainties." },
    { zh:"你的存在，對你身邊某個人來說非常重要，雖然他們說不出口。", en:"Your presence matters deeply to someone near you — even if they can't say it.", cmdZh:"把綠色乖乖放在心口停三秒，感受一下，食用後相信自己的存在是有意義的。", cmdEn:"Hold a green Kuai Kuai to your chest for three seconds. Feel it. Eat it. Believe your presence matters." },
    { zh:"你已經比你以為的，走得更遠、更好了。", en:"You've come further and done better than you think.", cmdZh:"把這包綠色乖乖慢慢吃完，今天停下來，好好看看你走過的距離，然後為自己鼓掌。", cmdEn:"Slowly eat this green Kuai Kuai. Pause today. Look at how far you've come. Give yourself a round of applause." }
  ],

  red: [
    { zh:"有人正在默默關心你。", en:"Someone watches over you in silence.", cmdZh:"吃一顆紅色乖乖，並傳訊息給最近關心你的人。", cmdEn:"Eat a red Kuai Kuai and message someone who has been on your mind." },
    { zh:"緣分正在靠近，只是比你想像得慢。", en:"Your connection draws near — slower than you imagine.", cmdZh:"將紅色乖乖放進包包一天再食用。", cmdEn:"Tuck a red Kuai Kuai in your bag and wait a full day before eating it." },
    { zh:"今天適合主動跨出第一步。", en:"Today calls for a first step forward.", cmdZh:"吃三顆紅色乖乖後，主動開啟一段對話。", cmdEn:"Eat three red Kuai Kuais, then start that conversation you've been putting off." },
    { zh:"有些答案需要坦白才能獲得。", en:"Some answers only come through honesty.", cmdZh:"分享一顆紅色乖乖給別人，並說出一件真心話。", cmdEn:"Share a red Kuai Kuai with someone and say one thing you genuinely mean." },
    { zh:"不要替別人預設答案。", en:"Stop writing the ending before it begins.", cmdZh:"吃下一顆紅色乖乖後，發出那則猶豫已久的訊息。", cmdEn:"Eat a red Kuai Kuai, then finally send that message you've been holding back." },
    { zh:"今天的人際運比你想像得好。", en:"Your social energy today is stronger than you think.", cmdZh:"帶著紅色乖乖出門，並主動和一位陌生人或同學打招呼。", cmdEn:"Take a red Kuai Kuai out and greet one person you normally wouldn't." },
    { zh:"舊朋友將帶來新的驚喜。", en:"An old friend carries a new surprise.", cmdZh:"拍下紅色乖乖並傳給一位老朋友。", cmdEn:"Snap a photo of a red Kuai Kuai and send it to an old friend." },
    { zh:"愛不是追趕，而是相遇。", en:"Love is not a chase — it is a meeting.", cmdZh:"將紅色乖乖放在桌上十分鐘後再食用。", cmdEn:"Set a red Kuai Kuai on your desk for ten minutes before eating it." },
    { zh:"你的真誠比技巧更有力量。", en:"Your sincerity outweighs any strategy.", cmdZh:"吃一顆紅色乖乖，今天不刻意迎合任何人。", cmdEn:"Eat a red Kuai Kuai and spend the day without trying to please anyone." },
    { zh:"有人正在等待你的回應。", en:"Someone is waiting for you to respond.", cmdZh:"吃兩顆紅色乖乖後，回覆一則拖延中的訊息。", cmdEn:"Eat two red Kuai Kuais, then reply to that message you've been ignoring." },
    { zh:"今天適合修補關係。", en:"Today is the right time to mend a bond.", cmdZh:"分享紅色乖乖給曾經有誤會的人。", cmdEn:"Share a red Kuai Kuai with someone you've had a falling out with." },
    { zh:"不是所有離開的人都值得追回。", en:"Not everyone who leaves deserves to be chased.", cmdZh:"吃下紅色乖乖後，刪除一則讓你反覆糾結的聊天紀錄。", cmdEn:"Eat a red Kuai Kuai, then delete that chat thread you keep revisiting." },
    { zh:"緣分藏在日常裡。", en:"Fate hides in the ordinary moments.", cmdZh:"帶著紅色乖乖去平常不會去的地方。", cmdEn:"Bring a red Kuai Kuai somewhere you wouldn't normally go today." },
    { zh:"今天適合傾聽。", en:"Today, your greatest gift is your ears.", cmdZh:"吃一顆紅色乖乖後，認真聽完一個人的分享。", cmdEn:"Eat a red Kuai Kuai, then sit with someone and truly listen — no advice, just presence." },
    { zh:"有些感情正在慢慢升溫。", en:"Something warm is slowly building.", cmdZh:"將紅色乖乖留到晚上再食用。", cmdEn:"Save a red Kuai Kuai and eat it tonight." },
    { zh:"不必急著定義關係。", en:"There is no rush to put a label on this.", cmdZh:"吃下紅色乖乖後，停止猜測對方心意一天。", cmdEn:"Eat a red Kuai Kuai and stop trying to read the other person's mind for one day." },
    { zh:"今天的善意會被記住。", en:"Today's kindness will be remembered.", cmdZh:"分享紅色乖乖給一位朋友。", cmdEn:"Share a red Kuai Kuai with a friend." },
    { zh:"家人的關心比表面更多。", en:"Your family cares more than they show.", cmdZh:"吃一顆紅色乖乖後，主動和家人聊五分鐘。", cmdEn:"Eat a red Kuai Kuai and spend five minutes talking with family." },
    { zh:"桃花運正在更新中。", en:"Your romantic fortune is being refreshed.", cmdZh:"購買一包新的紅色乖乖作為幸運補給。", cmdEn:"Buy a fresh pack of red Kuai Kuai as your lucky recharge." },
    { zh:"勇敢比完美重要。", en:"Being brave matters more than being perfect.", cmdZh:"吃下紅色乖乖後，主動表達你的想法。", cmdEn:"Eat a red Kuai Kuai and express what you've been thinking." },
    { zh:"今天的笑容特別有感染力。", en:"Your smile has extra power today.", cmdZh:"吃一顆紅色乖乖後，對三個人微笑。", cmdEn:"Eat a red Kuai Kuai and smile at three people." },
    { zh:"愛情需要耐心發酵。", en:"Love needs time to ferment.", cmdZh:"將紅色乖乖留到明天再食用。", cmdEn:"Save the red Kuai Kuai for tomorrow." },
    { zh:"有人欣賞你卻沒說出口。", en:"Someone admires you and hasn't said so.", cmdZh:"將紅色乖乖放在身邊一整天。", cmdEn:"Keep a red Kuai Kuai with you all day." },
    { zh:"別讓誤會過夜。", en:"Don't let the misunderstanding last the night.", cmdZh:"睡前吃一顆紅色乖乖，並主動說清楚一件事。", cmdEn:"Eat a red Kuai Kuai before bed and clear up one thing before you sleep." },
    { zh:"今天的連結會留下記憶。", en:"The connection made today will leave a lasting memory.", cmdZh:"分享紅色乖乖並拍下一張紀錄照片。", cmdEn:"Share a red Kuai Kuai and take a photo to remember the moment." },
    { zh:"今天的你值得被喜歡。", en:"You deserve to be liked — exactly as you are today.", cmdZh:"吃下一顆紅色乖乖，並對鏡中的自己微笑。", cmdEn:"Eat a red Kuai Kuai and smile at yourself in the mirror." }
  ],

  yellow: [
    { zh:"近期有一筆意外之財正在靠近你。", en:"An unexpected windfall is making its way toward you.", cmdZh:"把錢包整理乾淨後再食用，財神才找得到你。", cmdEn:"Tidy your wallet before eating. The fortune deity needs to find you." },
    { zh:"你最近花太快了，錢跑掉是有原因的。", en:"You've been spending fast. There's a reason money keeps slipping away.", cmdZh:"吃下黃色乖乖，今天不准打開任何購物 App。", cmdEn:"Eat a yellow Kuai Kuai. No shopping apps today." },
    { zh:"你一直在付出，但收穫要來了。", en:"You've been giving. The harvest is coming.", cmdZh:"把黃色乖乖放在你的存摺或帳戶截圖旁邊拍照，再食用。", cmdEn:"Place a yellow Kuai Kuai beside your bank book or statement screenshot. Take a photo, then eat it." },
    { zh:"機會從不主動敲門，但它今天剛好路過你家。", en:"Opportunity rarely knocks — but today it happens to be passing by.", cmdZh:"吃一顆黃色乖乖，今天把那件一直猶豫的事列進行事曆。", cmdEn:"Eat a yellow Kuai Kuai and add that hesitation to your calendar today." },
    { zh:"你身邊有一個人，正是你財運的貴人。", en:"Someone near you is the key to your financial fortune.", cmdZh:"把黃色乖乖帶去找那個給你「好感覺」的朋友，一起分著吃。", cmdEn:"Take a yellow Kuai Kuai to that friend who gives you good energy. Share it." },
    { zh:"你的努力帳本，老天正在結算中。", en:"Heaven is tallying up your ledger of effort.", cmdZh:"吃下黃色乖乖，今晚記帳，哪怕只有一筆。", cmdEn:"Eat a yellow Kuai Kuai. Log at least one expense tonight." },
    { zh:"過去的投資，即將有回音。", en:"A past investment is about to echo back.", cmdZh:"把黃色乖乖放在桌上，先翻出三個月前的筆記或計畫，再食用。", cmdEn:"Place a yellow Kuai Kuai on your desk. Pull out notes or plans from three months ago, then eat it." },
    { zh:"你習慣低估自己的價值，這很傷財運。", en:"Undervaluing yourself is hurting your fortune.", cmdZh:"吃下黃色乖乖，今天拒絕一件你本來會免費幫忙的事。", cmdEn:"Eat a yellow Kuai Kuai. Decline one thing you'd normally do for free." },
    { zh:"財神說你最近睡太晚，氣場很亂。", en:"The wealth deity says your late nights are scattering your energy.", cmdZh:"吃一顆黃色乖乖，今晚十二點前上床，睡前不看手機。", cmdEn:"Eat a yellow Kuai Kuai. Be in bed before midnight — no phone." },
    { zh:"一個「算了」的念頭，擋住了你一筆錢。", en:"One 'forget it' thought blocked a sum of money from reaching you.", cmdZh:"把黃色乖乖握在手心，閉眼想那件你說「算了」的事，然後食用，重新想一次。", cmdEn:"Hold a yellow Kuai Kuai. Close your eyes and think of that thing you gave up on. Eat it. Think again." },
    { zh:"你的財運正在等你整理環境。", en:"Your financial fortune is waiting for you to clean up your space.", cmdZh:"清掉桌上五樣用不到的東西後，再把黃色乖乖放在桌上食用。", cmdEn:"Remove five unused items from your desk. Place a yellow Kuai Kuai on it and eat." },
    { zh:"近期數字對你特別友善，別忽視細節。", en:"Numbers are favoring you lately. Don't overlook the details.", cmdZh:"吃一顆黃色乖乖，今天注意一下你遇到的每一個數字。", cmdEn:"Eat a yellow Kuai Kuai. Pay attention to every number you encounter today." },
    { zh:"你一直在等的那個時機，其實已經過了，但下一個更好。", en:"The moment you were waiting for has passed — but the next one is better.", cmdZh:"吃下黃色乖乖，現在就行動，今天不再等了。", cmdEn:"Eat a yellow Kuai Kuai and act now. No more waiting today." },
    { zh:"有個小副業的念頭已經在你腦中很久了。", en:"That side hustle idea has been living in your head for a long time.", cmdZh:"把黃色乖乖放在筆記本旁邊，寫下那個念頭後再食用。", cmdEn:"Put a yellow Kuai Kuai beside a notebook. Write the idea down, then eat it." },
    { zh:"你最近的財運被壞情緒壓住了。", en:"Bad moods have been suppressing your financial fortune.", cmdZh:"吃一顆黃色乖乖，今天做一件讓自己真心開心的小事。", cmdEn:"Eat a yellow Kuai Kuai. Do one small thing that genuinely makes you happy." },
    { zh:"人脈就是財脈，你現在的圈子需要更新一下。", en:"Your network is your net worth. Time to refresh your circle.", cmdZh:"把黃色乖乖帶去一個新場合，在那裡食用。", cmdEn:"Take a yellow Kuai Kuai to a new gathering. Eat it there." },
    { zh:"你有個技能，正在被嚴重低估。", en:"You have a skill that's being severely underestimated.", cmdZh:"吃下黃色乖乖，今天把它寫進履歷或自我介紹裡。", cmdEn:"Eat a yellow Kuai Kuai. Add that skill to your resume or bio today." },
    { zh:"財神最近在你工作的地方徘徊。", en:"The wealth deity has been lingering near your workplace.", cmdZh:"把黃色乖乖帶去辦公桌或書桌旁放著，工作一小時後再食用。", cmdEn:"Place a yellow Kuai Kuai at your desk. Work for an hour, then eat it." },
    { zh:"你有一個夢想規模太大，所以一直沒啟動。", en:"Your dream felt too big to start. Break it smaller.", cmdZh:"吃一顆黃色乖乖，把它拆成三個小步驟，只做第一個。", cmdEn:"Eat a yellow Kuai Kuai. Break it into three small steps. Only do the first one." },
    { zh:"你對錢的態度太客氣了，該強勢一點。", en:"You've been too polite about money. Time to assert yourself.", cmdZh:"吃下黃色乖乖，今天主動開口談一次你認為應得的報酬。", cmdEn:"Eat a yellow Kuai Kuai. Bring up fair compensation today." },
    { zh:"一筆錢卡在別人那裡，是時候開口了。", en:"Money is stuck with someone else. Time to speak up.", cmdZh:"把黃色乖乖放在口袋，等你追完那筆款後再食用。", cmdEn:"Keep a yellow Kuai Kuai in your pocket. Eat it after you follow up on that money." },
    { zh:"你的財運和你的健康正相關，照顧好身體就是照顧荷包。", en:"Your finances and health are linked. Taking care of one helps the other.", cmdZh:"吃一顆黃色乖乖，今天喝足兩公升的水。", cmdEn:"Eat a yellow Kuai Kuai. Drink two liters of water today." },
    { zh:"你正站在財富的轉角，再走幾步就看到了。", en:"You're at the corner of fortune. A few more steps and you'll see it.", cmdZh:"把黃色乖乖帶出門走路十五分鐘，在最遠的那個點食用。", cmdEn:"Take a yellow Kuai Kuai on a fifteen-minute walk. Eat it at the furthest point." },
    { zh:"財神說你的工作空間太亂，氣場都散了。", en:"The wealth deity says your workspace is too cluttered.", cmdZh:"整理桌面，只留必要的東西，再把黃色乖乖放正中間食用。", cmdEn:"Clear your desk. Keep only essentials. Place a yellow Kuai Kuai in the center and eat it." },
    { zh:"財神說，你已經準備好了，只是還沒相信自己準備好了。", en:"You are ready. You just don't believe it yet.", cmdZh:"把黃色乖乖放在鏡子前，對著鏡子說：「我已經夠好了，我準備好了。」然後食用。", cmdEn:"Put a yellow Kuai Kuai in front of a mirror. Say: 'I am enough. I am ready.' Then eat it." }
  ]
};

// ════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════
function goTo(screenId) {
  document.getElementById(currentScreen).classList.remove('active');
  document.getElementById(screenId).classList.add('active');
  screenHistory.push(currentScreen);
  currentScreen = screenId;
  const backBtn = document.getElementById('back-btn');
  backBtn.style.display = (screenId !== 'screen-landing') ? 'block' : 'none';
  backBtn.textContent   = currentLang === 'zh' ? '← 返回' : '← Back';

   // 語言切換鈕位置：首頁置中，其他頁靠右
  const langToggle = document.querySelector('.lang-toggle');
  if (screenId === 'screen-landing') {
    langToggle.style.left      = '50%';
    langToggle.style.transform = 'translateX(-50%)';
    langToggle.style.right     = 'auto';
  } else {
    langToggle.style.left      = 'auto';
    langToggle.style.transform = 'none';
    langToggle.style.right     = '24px';
  }
}

function goBack() {
  if (!screenHistory.length) return;
  const prev = screenHistory.pop();
  document.getElementById(currentScreen).classList.remove('active');
  document.getElementById(prev).classList.add('active');
  currentScreen = prev;
  document.getElementById('back-btn').style.display = (prev !== 'screen-landing') ? 'block' : 'none';

  // 語言切換鈕位置：首頁置中，其他頁靠右
  const langToggle = document.querySelector('.lang-toggle');
  if (prev === 'screen-landing') {
    langToggle.style.left      = '50%';
    langToggle.style.transform = 'translateX(-50%)';
    langToggle.style.right     = 'auto';
  } else {
    langToggle.style.left      = 'auto';
    langToggle.style.transform = 'none';
    langToggle.style.right     = '24px';
  }
}

// ════════════════════════════════════════════
// LANGUAGE
// ════════════════════════════════════════════
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add('active');
  const isZh = lang === 'zh';
  document.querySelectorAll('.zh-text').forEach(el => el.style.display = isZh ? '' : 'none');
  document.querySelectorAll('.en-text').forEach(el => el.style.display = isZh ? 'none' : '');
  document.querySelectorAll('.oracle-text-zh,.command-text-zh').forEach(el => el.style.display = isZh ? '' : 'none');
  document.querySelectorAll('.oracle-text-en,.command-text-en').forEach(el => el.style.display = isZh ? 'none' : '');
  document.getElementById('back-btn').textContent = isZh ? '← 返回' : '← Back';

  // 購買按鈕
  document.getElementById('buy-text-zh').style.display = isZh ? '' : 'none';
  document.getElementById('buy-text-en').style.display = isZh ? 'none' : '';

  // ── 神諭和指令強制顯示 ──  加這四行
  const oracleZh = document.getElementById('oracle-zh');
  const oracleEn = document.getElementById('oracle-en');
  if (oracleZh) oracleZh.style.display = isZh ? '' : 'none';
  if (oracleEn) oracleEn.style.display = isZh ? 'none' : '';

  // hero 圖切換
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    heroImg.src = isZh ? 'hero.png' : 'hero-EN.png';
    heroImg.alt = isZh ? '綠上乖乖神殿' : 'Virtual Kuai Kuai Shrine';
  }
}

// ════════════════════════════════════════════
// GOD SELECTION
// ════════════════════════════════════════════
function selectGod(god) {
  currentGod = god;
  const info = godInfo[god];
  const bagImg = document.getElementById('animated-bag-img');
  bagImg.src       = info.img;
  bagImg.className = 'bag-state-idle';
  bagImg.style.opacity = '1';
  document.getElementById('screen-drawing').style.background =
    `radial-gradient(ellipse at 50% 38%, ${info.color}CC 0%, #050505 62%)`;
  const btn = document.getElementById('draw-btn');
  btn.style.background = info.accent;
  btn.style.color      = '#F0EDD8';
  btn.disabled = false;
  document.getElementById('explosion-layer').innerHTML = '';
  document.getElementById('explosion-layer').style.display = 'none';
  goTo('screen-drawing');
}

// ════════════════════════════════════════════
// DRAWING ANIMATION — 浮誇爆炸版
// ════════════════════════════════════════════
function startDrawing() {
  const btn     = document.getElementById('draw-btn');
  const bagImg  = document.getElementById('animated-bag-img');
  const explode = document.getElementById('explosion-layer');
  const info    = godInfo[currentGod];

  btn.disabled      = true;
  bagImg.className  = 'bag-state-inflate';
  explode.innerHTML = '';
  explode.style.display = 'none';

  // 爆炸在 2.6s 觸發
  setTimeout(() => {
    bagImg.style.opacity = '0';
    explode.style.display = 'block';
    spawnExplosion(explode, info);
  }, 2600);

  // 跳結果在 3.6s
  setTimeout(() => {
    explode.style.display = 'none';
    bagImg.style.opacity  = '1';
    bagImg.className      = 'bag-state-idle';
    showResult();
    goTo('screen-result');
  }, 3600);
}

function spawnExplosion(container, info) {
  const cx = 50, cy = 45; // 爆炸中心 %

  // ── 1. 多層閃光圓 ──────────────────────────
  const flashSizes  = [80, 140, 220, 300];
  const flashDelays = [0, 0.04, 0.08, 0.14];
  flashSizes.forEach((size, i) => {
    const f = document.createElement('div');
    f.className = 'flash-circle';
    f.style.cssText = `
      width:${size}px; height:${size}px;
      background: radial-gradient(circle, ${info.flashColor}FF 0%, ${info.flashColor}88 40%, transparent 75%);
      animation: flash-bang 0.55s ${flashDelays[i]}s ease-out forwards;
      margin-left: -${size/2}px; margin-top: -${size/2}px;
    `;
    container.appendChild(f);
  });

  // ── 2. 爆炸文字 ──────────────────────────
  const bt = document.createElement('div');
  bt.className = 'burst-text';
  bt.style.color = info.flashColor;
  bt.style.textShadow = `0 0 20px ${info.flashColor}, 0 0 40px ${info.flashColor}`;
  bt.style.animationDelay = '0.1s';
  bt.textContent = currentLang === 'zh' ? info.burstTextZh : info.burstTextEn;
  container.appendChild(bt);

  // ── 3. 碎片（包裝袋碎片感） ──────────────
  const shardColors = [info.accent, info.flashColor, '#F0EDD8', info.color];
  for (let i = 0; i < 28; i++) {
    const s    = document.createElement('div');
    s.className = 'shard';
    const angle = (i / 28) * 360;
    const dist  = 80 + Math.random() * 160;
    const tx    = Math.cos(angle * Math.PI/180) * dist;
    const ty    = Math.sin(angle * Math.PI/180) * dist;
    const tr    = (Math.random() - 0.5) * 720;
    const w     = 6 + Math.random() * 18;
    const h     = 6 + Math.random() * 14;
    const color = shardColors[Math.floor(Math.random() * shardColors.length)];
    const delay = Math.random() * 0.1;
    s.style.cssText = `
      left:calc(${cx}% - ${w/2}px);
      top:calc(${cy}% - ${h/2}px);
      width:${w}px; height:${h}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '2px' : '50%'};
      --tx:${tx}px; --ty:${ty}px; --tr:${tr}deg;
      animation: shard-fly 0.75s ${delay}s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
    `;
    container.appendChild(s);
  }

  // ── 4. 玉米粒（小圓點四散） ──────────────
  const cornColors = ['#F0D080', '#E8C060', '#F5EDD0', info.flashColor];
  for (let i = 0; i < 20; i++) {
    const c     = document.createElement('div');
    c.className = 'corn';
    const angle = (i / 20) * 360 + Math.random() * 18;
    const dist  = 50 + Math.random() * 120;
    const cx_   = Math.cos(angle * Math.PI/180) * dist;
    const cy_   = Math.sin(angle * Math.PI/180) * dist;
    const color = cornColors[Math.floor(Math.random() * cornColors.length)];
    const size  = 5 + Math.random() * 8;
    const delay = 0.05 + Math.random() * 0.15;
    c.style.cssText = `
      left: calc(${cx}% - ${size/2}px);
      top:  calc(${cy}% - ${size/2}px);
      width:${size}px; height:${size}px;
      background:${color};
      --cx:${cx_}px; --cy:${cy_}px;
      animation: corn-pop 0.95s ${delay}s ease-out forwards;
      border-radius: 3px;
    `;
    container.appendChild(c);
  }

  // ── 5. 輻射線 ──────────────────────────
  for (let i = 0; i < 10; i++) {
    const line  = document.createElement('div');
    const angle = (i / 10) * 360;
    line.style.cssText = `
      position:absolute;
      left:${cx}%; top:${cy}%;
      width: 2px; height: 80px;
      background: linear-gradient(to bottom, ${info.flashColor}CC, transparent);
      transform-origin: top center;
      transform: rotate(${angle}deg);
      animation: flash-bang 0.5s ${0.05}s ease-out forwards;
      border-radius: 1px;
    `;
    container.appendChild(line);
  }
}

// ════════════════════════════════════════════
// RESULT
// ════════════════════════════════════════════
function showResult() {
  const list = oracles[currentGod];
  const pick = list[Math.floor(Math.random() * list.length)];
  const info = godInfo[currentGod];

  const badge = document.getElementById('result-badge');
  badge.style.background  = info.color + '55';
  badge.style.borderColor = info.accent + '99';
  badge.style.color       = info.light;
  document.getElementById('result-badge-text').innerHTML =
    `<span class="zh-text">${info.badgeZh}</span><span class="en-text" style="display:none">${info.badgeEn}</span>`;

  document.getElementById('oracle-card').style.background  = info.color + '44';
  document.getElementById('oracle-card').style.borderColor = info.accent + '55';
  document.getElementById('oracle-zh').textContent = pick.zh;
  document.getElementById('oracle-en').textContent = pick.en;

  document.getElementById('command-card').style.borderColor = info.accent + '55';
  document.getElementById('command-zh').textContent = pick.cmdZh;
  document.getElementById('command-en').textContent = pick.cmdEn;

  document.getElementById('buy-btn').style.background = info.accent;
  document.getElementById('buy-text-zh').textContent  = info.buyZh;
  document.getElementById('buy-text-en').textContent  = info.buyEn;

  setLang(currentLang);
}

function drawAgain() {
  const bagImg = document.getElementById('animated-bag-img');
  bagImg.className   = 'bag-state-idle';
  bagImg.style.opacity = '1';
  document.getElementById('draw-btn').disabled = false;
  document.getElementById('explosion-layer').innerHTML = '';
  document.getElementById('explosion-layer').style.display = 'none';
  goTo('screen-drawing');
}

function buyKuaiKuai() {
  alert(currentLang === 'zh'
    ? '去便利商店找找看 🛒\n乖乖神明祝你今天順利！'
    : 'Head to your nearest convenience store 🛒\nThe deity blesses your day!');
}

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => setLang('zh'));
