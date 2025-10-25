
    const key = 'bloxcraftubg_737234765923567482938465828475648';
    const messages = [
"New Games Are Added Oftem, Check Bavk Soon!",
"Tip: Bookmark Bloxcraft UBG So You Never Lose It!",
"Fun Fact: Bloxcraft UBG Was Made With HTML, CSS & JavaScript!",
"Join The Fun — Share Bloxcraft UBG With Friends!",
"Found A Bug? Report It Using The Support Tab!",
"Enjoying A Game? Try Fullscreen Mode For The Best Experience!",
"Remember: Some Apps Work Best In Landscape Mode!",
"All Games Are 100% Unblocked — Enjoy Anywhere!",
"Tip: Use The Search Bar To Find Your Favorite Games Fast!",
"Don’t Forget To Check Out The Proxy Page!",
"Apps Are Probbaly Better Then Games 👀 — Head To The Apps Section At The Games Page!!",
"Try Playing With Friends During Breaks!",
"Fun Fact: The UBG Stands For ‘Unblocked Games’!",
"Explore. Play. Repeat. That’s The Bloxcraft Way.",
"Want Early Updates? Keep An Eye On The Announcements!",
"Tip: Clear Your Cache If Games Don’t Load Properly!",
"Try The Secret Codes Section — You Might Find Something Cool!",
"All Games Are Handpicked By Bloxcraft Studios.",
"More Games = More Fun. Keep Exploring!",
"Remember To Stay Safe Online While Gaming!",
"Updates Happen Almost Weekly — Come Back Often!",
"Support Bloxcraft UBG By Sharing It Around School!",
"Most Games Here Are Mobile Supported :)",
"Fun Fact: Bloxcraft UBG Started As A Simple HTML Page!",
"Check Out Tharun9772’s GitHub For Cool Projects!",
"Have An Idea? Suggest It To Bloxcraft Studios!",
"Tip: Use Dark Mode If You’re Gaming At Night!",
"Bloxcraft UBG Is Not Just Built For Students!",
"Check Out The ‘Apps’ Tab — Not Just Games Here!",
"Fun Fact: Bloxcraft UBG Is Always Evolving!",
"Play Smart — Don’t Get Caught 😉",
"Try Beating Your Old High Scores!",
"Every Visit = New Adventures!",
"Got Free Time? That’s Bloxcraft Time!",
"Stay Tuned — More Surprises Are Coming Soon!",
"Your Feedback Makes Bloxcraft Better!",
"Try The Chat — Meet Other Bloxcraft Players!",
"Fun Fact: Bloxcraft UBG Has Over 100+ Games!",
"Bloxcraft UBG: The Home Of Fun At School!",
"Games Load Faster Thanks To Cloudflare Pages!",
"More Updates From Tharun9772Gaming Are On The Way!",
"Fun Fact: Bloxcraft UBG Is Growing Every Single Day!",
"Want A Sneak Peek? Future Games Are Already Being Tested!",
"Tip: Turn On Fullscreen For The Ultimate Gaming Experience!",
"Did You Know? Some Games Have Secret Easter Eggs!",
"Make Sure To Check Back Daily — Something New Might Appear 👀",
"Try Refreshing The Games Page For A Fresh Shuffle!",
"Fun Fact: Bloxcraft UBG Uses Custom HTML Themes Built From Scratch!",
"Support Your Favorite Developers By Sharing Their Games!",
"Tip: Visit The Apps Page For Useful Tools And Cool Features!",
"Every Visit Helps Bloxcraft UBG Grow — Thanks For Playing!",
"Try Sorting Games By Category To Find Something New!",
"Keep An Eye On The Loading Screen — It Sometimes Changes!",
"Fun Fact: Bloxcraft UBG Uses Cloudflare For Faster Access At School!",
"New Proxy Updates Keep Everything Running Smoothly!",
"Tip: If A Game Doesn’t Load, Try A Different Browser!",
"Bloxcraft UBG Works Best In Chrome Or Edge!",
"More Mini-Games Are Coming Soon — Stay Tuned!",
"Want To See Your Game Here? Suggest It To Bloxcraft Studios!",
"Every Update Brings You A Better Experience!",
"Fun Fact: Some Of The Games Are Over 10 Years Old — Classic Fun!"


      
    ];

 
    function loadSeen() {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
      } catch(e) { return []; }
    }

    function saveSeen(arr) {
      try { localStorage.setItem(key, JSON.stringify(arr)); } catch(e) {}
    }

    function pickNoRepeat() {
      const seen = new Set(loadSeen());
      const available = messages.filter((m,i) => !seen.has(i));
   
      if (available.length === 0) {
        saveSeen([]); 
        return pickNoRepeat();
      }
      const msg = available[Math.floor(Math.random() * available.length)];
      const index = messages.indexOf(msg);
      seen.add(index);
      saveSeen(Array.from(seen));
      return msg;
    }

    const card = document.getElementById('card');
    setTimeout(() => {
      card.innerHTML = `<div>${pickNoRepeat()}</div>`;
      card.classList.add('show');
    }, 80);
