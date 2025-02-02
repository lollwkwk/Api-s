    function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('active');
      document.getElementById('overlay').classList.toggle('active');
    }

    function closeSidebar() {
      document.getElementById('sidebar').classList.remove('active');
      document.getElementById('overlay').classList.remove('active');
    }

    function toggleMode() {
      document.body.classList.toggle('light-mode');
      const modeIcon = document.getElementById('mode-icon');
      modeIcon.classList.toggle('fa-moon');
      modeIcon.classList.toggle('fa-sun');
    }

    function openLink(url) {
      window.open(url, '_blank');
    }

    fetch('/api/get-usage-count')
      .then(response => response.json())
      .then(data => {
        document.getElementById('usage-count').textContent = `${data.usageCount}`;
    })
      .catch(error => {
        document.getElementById('usage-count').textContent = `Error: ${error.message}`;
    });

    fetch('/api/reqtoday')
      .then(response => response.json())
      .then(data => {
          document.getElementById('req-today').textContent = `${data.reqtoday}`;
      })
      .catch(error => {
          document.getElementById('req-today').textContent = `Error: ${error.message}`;
      });

    fetch('/api/visitor')
      .then(response => response.text())
      .then(data => {
        document.getElementById('visitor-count').textContent = ` ${data}`;
    })
      .catch(error => {
        document.getElementById('visitor-count').textContent = `Error: ${error.message}`;
    });

    fetch('/api/platform') 
      .then(response => response.json())  
      .then(data => {
        document.getElementById('platform-info').textContent = `${data.platform}`;
    })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('platform-info').textContent = 'Error loading data';
    });

    fetch('/api/ram') 
      .then(response => response.json())
      .then(data => {
        document.getElementById('ram-info').textContent = `${data.used} / ${data.total}`;
    })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('ram-info').textContent = 'Error loading data';
    });

    fetch('/api/rom') 
      .then(response => response.json()) 
      .then(data => {
        document.getElementById('rom-info').textContent = `${data.used} / ${data.total}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('rom-info').textContent = 'Error loading data';
    });

    fetch('https://httpbin.org/ip')
      .then(response => response.json()) 
      .then(data => {
          document.getElementById('ip-address').textContent = `${data.origin}`;
    })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('ip-address').textContent = 'Error loading IP';
    });
    
    const uptimeElement = document.getElementById('uptime');
    const updateUptime = async () => {
      try {
        const response = await fetch('/api/uptime'); 
        const data = await response.json();
        uptimeElement.innerText = data.uptime;
      } catch (error) {
        console.error('Gagal memuat uptime:', error);
      }
    };
    setInterval(updateUptime, 1000);
    updateUptime();
   

    document.querySelectorAll('.menu-toggle').forEach(item => {
      item.addEventListener('click', function() {
        const parent = this.closest('.menu-item');
        const submenu = parent.querySelector('.menu-sub');
        
        if (parent.classList.contains('active')) {
          submenu.style.height = '0';
          submenu.style.opacity = '0';
          setTimeout(() => {
            parent.classList.remove('active');
          }, 500);
        } else {

          document.querySelectorAll('.menu-item.active').forEach(activeMenu => {
            if (activeMenu !== parent) {
              const activeSubmenu = activeMenu.querySelector('.menu-sub');
              activeSubmenu.style.height = '0';
              activeSubmenu.style.opacity = '0';
              activeMenu.classList.remove('active');
            }
          });

          parent.classList.add('active');
          submenu.style.height = submenu.scrollHeight + 'px';
          submenu.style.opacity = '1';
        }
      });
    });

    function showLoading() {
      document.getElementById('loading').style.display = 'flex';
      setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
      }, 1500); // 1.5 s
    }
    showLoading();
    
    
