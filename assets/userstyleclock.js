const weather = "https://weather-forcast.dk-ubg.workers.dev/weather/api/forecast.json?ip="

    let timeOffset = 0;
    let isIPTime = false;
    let currentCalendarDate = new Date();


    async function fetchIPTime() {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        const serverTime = new Date(data.datetime);
        timeOffset = serverTime - new Date();
        isIPTime = true;
        document.getElementById('source-tag').textContent = "Network Sync";
      } catch (err) {
        document.getElementById('source-tag').textContent = "System Local";
      }
    }

    function updateClock() {
      let now = new Date();
      if (isIPTime) {
        now = new Date(Date.now() + timeOffset);
      }

      let hoursNum = now.getHours();
      const ampm = hoursNum >= 12 ? 'PM' : 'AM';
      hoursNum = hoursNum % 12;
      hoursNum = hoursNum ? hoursNum : 12; 

      const hours = String(hoursNum).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      document.getElementById('time-display').textContent = `${hours}:${minutes} ${ampm}`;
      document.getElementById('seconds-display').textContent = seconds;
      document.getElementById('date-display').textContent = dateStr;
    }

  
    async function initBattery() {
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        
        const updateBatteryUI = () => {
          const level = Math.round(battery.level * 100);
          const isCharging = battery.charging;
          
          document.getElementById('battery-percentage').textContent = `${level}%`;
          document.getElementById('battery-status-text').textContent = isCharging ? "Charging" : "Battery";
          
          const bar = document.getElementById('battery-level-bar');
          bar.style.width = `${level}%`;

       
          if (level <= 20) {
            bar.style.backgroundColor = '#ef4444'; 
          } else if (level <= 50) {
            bar.style.backgroundColor = '#f59e0b'; 
          } else {
            bar.style.backgroundColor = '#10b981'; 
          }
        };

        updateBatteryUI();
        battery.addEventListener('levelchange', updateBatteryUI);
        battery.addEventListener('chargingchange', updateBatteryUI);
      } else {
        document.getElementById('battery-status-text').textContent = "Power Eco";
        document.getElementById('battery-percentage').textContent = "100%";
        document.getElementById('battery-level-bar').style.width = "100%";
      }
    }

 
    function renderCalendar() {
      const year = currentCalendarDate.getFullYear();
      const month = currentCalendarDate.getMonth();

      const firstDayIndex = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month + 1, 0).getDate();
      const prevLastDay = new Date(year, month, 0).getDate();

      const monthYearText = currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      document.getElementById('calendar-month-year').textContent = monthYearText;

      let daysHtml = "";
      const today = new Date();


      for (let x = firstDayIndex; x > 0; x--) {
        daysHtml += `<div class="day prev-date">${prevLastDay - x + 1}</div>`;
      }


      for (let i = 1; i <= lastDay; i++) {
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          daysHtml += `<div class="day today">${i}</div>`;
        } else {
          daysHtml += `<div class="day">${i}</div>`;
        }
      }

  
      const totalSlots = firstDayIndex + lastDay;
      const nextDays = totalSlots % 7 === 0 ? 0 : 7 - (totalSlots % 7);
      for (let j = 1; j <= nextDays; j++) {
        daysHtml += `<div class="day next-date">${j}</div>`;
      }

      document.getElementById('calendar-days').innerHTML = daysHtml;
    }


    const widgetContainer = document.getElementById('widget-container');
    const summaryTrigger = document.getElementById('widget-summary-trigger');


    summaryTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      widgetContainer.classList.toggle('expanded');
      currentCalendarDate = new Date(); 
      renderCalendar();
    });

  
    document.getElementById('calendar-section').addEventListener('click', (e) => {
      e.stopPropagation();
    });

 
    window.addEventListener('click', () => {
      widgetContainer.classList.remove('expanded');
    });

   
    document.getElementById('prev-month').addEventListener('click', () => {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
      renderCalendar();
    });


    fetchIPTime();
    initBattery();
    setInterval(updateClock, 1000);
    updateClock();
    renderCalendar();
