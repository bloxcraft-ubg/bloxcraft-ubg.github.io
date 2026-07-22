    const weather = "https://weather-forcast.dk-ubg.workers.dev/weather/api/forecast.json?ip=";
    const alerts = "https://weather-forcast.dk-ubg.workers.dev/weather/api/alerts.json?ip=";

    let timeOffset = 0;
    let isIPTime = false;
    let currentCalendarDate = new Date();
    let userIP = "";
    let weatherFetched = false;


let timerAnimationFrame = null;
let timerStartTime = 0;
let timerElapsedTime = 0;
let isTimerRunning = false;

function updateTimerDisplay() {
  let totalMs = timerElapsedTime;
  if (isTimerRunning) {
    totalMs += Date.now() - timerStartTime;
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const ms = String(Math.floor((totalMs % 1000) / 10)).padStart(2, '0');

  document.getElementById('timer-display').textContent = `${hours}:${minutes}:${seconds}.${ms}`;


  if (isTimerRunning) {
    timerAnimationFrame = requestAnimationFrame(updateTimerDisplay);
  }
}

function toggleTimer(e) {
  if (e) e.stopPropagation();
  const toggleBtn = document.getElementById('timer-toggle-btn');

  if (isTimerRunning) {
  
    timerElapsedTime += Date.now() - timerStartTime;
    isTimerRunning = false;
    cancelAnimationFrame(timerAnimationFrame);
    toggleBtn.textContent = 'Start';
    updateTimerDisplay();
  } else {

    timerStartTime = Date.now();
    isTimerRunning = true;
    toggleBtn.textContent = 'Pause';
    timerAnimationFrame = requestAnimationFrame(updateTimerDisplay);
  }
}

function resetTimer(e) {
  if (e) e.stopPropagation();
  cancelAnimationFrame(timerAnimationFrame);
  isTimerRunning = false;
  timerElapsedTime = 0;
  document.getElementById('timer-toggle-btn').textContent = 'Start';
  updateTimerDisplay();
}

document.getElementById('timer-toggle-btn').addEventListener('click', toggleTimer);
document.getElementById('timer-reset-btn').addEventListener('click', resetTimer);

    async function fetchIPTime() {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        const serverTime = new Date(data.datetime);
        timeOffset = serverTime - new Date();
        isIPTime = true;
        if (data.client_ip) userIP = data.client_ip;
        document.getElementById('source-tag').textContent = "Network Sync";
      } catch (err) {
        document.getElementById('source-tag').textContent = "System Local";
      }
    }

    async function getUserIP() {
      if (userIP) return userIP;
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIP = data.ip;
        return userIP;
      } catch (e) {
        return '';
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
          bar.style.height = `${level}%`;

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
        document.getElementById('battery-level-bar').style.height = "100%";
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

    function fixIconUrl(url) {
      if (!url) return '';
      return url.startsWith('//') ? 'https:' + url : url;
    }

    function formatHourLabel(timeStr) {
      if (!timeStr) return '';
      const timePart = timeStr.split(' ')[1] || timeStr;
      const hour = parseInt(timePart.split(':')[0], 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${displayHour}${ampm}`;
    }

    async function loadWeatherData() {
      const loadingEl = document.getElementById('weather-loading');
      const errorEl = document.getElementById('weather-error');
      const contentEl = document.getElementById('weather-content');

      loadingEl.classList.remove('hidden');
      errorEl.classList.add('hidden');
      contentEl.classList.add('hidden');

      try {
        const ip = await getUserIP();
        
        const [weatherRes, alertsRes] = await Promise.allSettled([
          fetch(`${weather}${ip}`).then(res => res.json()),
          fetch(`${alerts}${ip}`).then(res => res.json())
        ]);

        if (weatherRes.status !== 'fulfilled') {
          throw new Error('Weather forecast fetch failed');
        }

        const weatherData = weatherRes.value;
        const alertsData = alertsRes.status === 'fulfilled' ? alertsRes.value : null;

        renderWeatherData(weatherData, alertsData);

        loadingEl.classList.add('hidden');
        contentEl.classList.remove('hidden');
        weatherFetched = true;
      } catch (err) {
        loadingEl.classList.add('hidden');
        errorEl.classList.remove('hidden');
      }
    }

    function renderWeatherData(weatherData, alertsData) {
      const loc = weatherData.location || {};
      document.getElementById('weather-city').textContent = loc.name || 'Unknown';
      document.getElementById('weather-region').textContent = `${loc.region || ''}${loc.country ? ', ' + loc.country : ''}`;

      const current = weatherData.current || {};
      const cond = current.condition || {};
      document.getElementById('weather-temp-main').textContent = `${Math.round(current.temp_c)}°C`;
      document.getElementById('weather-condition').textContent = cond.text || '';
      document.getElementById('weather-icon').src = fixIconUrl(cond.icon);

      const forecastDay0 = weatherData.forecast?.forecastday?.[0] || {};
      const dayStats = forecastDay0.day || {};
      document.getElementById('weather-max-temp').textContent = Math.round(dayStats.maxtemp_c ?? current.temp_c);
      document.getElementById('weather-min-temp').textContent = Math.round(dayStats.mintemp_c ?? current.temp_c);

      document.getElementById('weather-humidity').textContent = `${current.humidity ?? 0}%`;
      document.getElementById('weather-wind').textContent = `${Math.round(current.wind_kph ?? 0)} km/h`;
      document.getElementById('weather-rain-chance').textContent = `${current.chance_of_rain ?? dayStats.daily_chance_of_rain ?? 0}%`;
      document.getElementById('weather-uv').textContent = `UV ${current.uv ?? 0}`;

      const astro = forecastDay0.astro || {};
      document.getElementById('weather-sunrise').textContent = astro.sunrise || '--';
      document.getElementById('weather-sunset').textContent = astro.sunset || '--';

      const hourlyList = forecastDay0.hour || [];
      const hourlyContainer = document.getElementById('hourly-container');
      hourlyContainer.innerHTML = hourlyList.map(h => `
        <div class="hourly-card">
          <span class="hourly-time">${formatHourLabel(h.time)}</span>
          <img class="hourly-icon" src="${fixIconUrl(h.condition?.icon)}" alt="${h.condition?.text || ''}" />
          <span class="hourly-temp">${Math.round(h.temp_c)}°</span>
          <span class="hourly-rain">💧${h.chance_of_rain}%</span>
        </div>
      `).join('');

      const alertBadge = document.getElementById('weather-alert-badge');
      const alertsDrawer = document.getElementById('weather-alerts-drawer');
      const alertsList = document.getElementById('alerts-list');
      const alertArray = alertsData?.alerts?.alert || [];

      if (alertArray.length > 0) {
        alertBadge.classList.remove('hidden');
        document.getElementById('alert-count-text').textContent = `${alertArray.length} Alert${alertArray.length > 1 ? 's' : ''}`;
        
        alertsList.innerHTML = alertArray.map(a => `
          <div class="alert-card">
            <div class="alert-card-headline">⚠️ ${a.event || 'Weather Alert'}: ${a.headline || ''}</div>
            <div class="alert-card-desc">${a.desc || a.instruction || ''}</div>
          </div>
        `).join('');
      } else {
        alertBadge.classList.add('hidden');
        alertsDrawer.classList.add('hidden');
      }
    }

    const widgetContainer = document.getElementById('widget-container');
    const clockTrigger = document.getElementById('clock-trigger');

    clockTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      widgetContainer.classList.toggle('weather-expanded');
      
      if (widgetContainer.classList.contains('weather-expanded') && !weatherFetched) {
        loadWeatherData();
      }
    });

    document.getElementById('weather-alert-badge').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('weather-alerts-drawer').classList.toggle('hidden');
    });

    document.getElementById('weather-retry-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      loadWeatherData();
    });

    document.getElementById('weather-section').addEventListener('click', (e) => {
      e.stopPropagation();
    });

    document.getElementById('prev-month').addEventListener('click', (e) => {
      e.stopPropagation();
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
      renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', (e) => {
      e.stopPropagation();
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
      renderCalendar();
    });

    window.addEventListener('click', () => {
      widgetContainer.classList.remove('weather-expanded');
    });

    fetchIPTime();
    initBattery();
    setInterval(updateClock, 1000);
    updateClock();
    renderCalendar();
