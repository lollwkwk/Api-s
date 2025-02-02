const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cors = require("cors");
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const session = require('express-session');
const { getLocalhost } = require('./telegram');
const si = require('systeminformation');
const axios = require('axios')
const cheerio = require('cheerio');
const { 
  getTikTokData,
  getCapCutData,
  getInstagramData,
  getMediaFireData,
  getSFileData,
  getSpotifyData,
  getTikMusicData,
  getTikTokData2,
  getXnxxData,
  getYoutubeData,
  getMp3Data
} = require('./lib/myfunct.js')
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
const validKeys = ['IM-REREZZ.2007', 'REREZZ-OFFICIAL.0208'];
const requestToday = `https://databse-apis.glitch.me/api/requesttoday/today`
const glitchApiUrl = 'https://databse-apis.glitch.me/api/increment-usage';
const requestAll = async () => {
  return Promise.all([
    axios.get('https://databse-apis.glitch.me/api/requesttoday/increment'),
    axios.get('https://databse-apis.glitch.me/api/increment-usage') 
  ]);
};

app.get('/api/ytplaymp3', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ status: 400, message: 'Query is required' });
  }
  try {
    await requestAll();
    const mp3Data = await getMp3Data(query);
    return res.status(200).json(mp3Data);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/ytmp4', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();
    const youtubeData = await getYoutubeData(url);
    return res.status(200).json(youtubeData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/xnxx', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll(); 
    const xnxxData = await getXnxxData(query);
    return res.status(200).json(xnxxData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/tiktok', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll(); 
    const tikTokData = await getTikTokData2(url);
    return res.status(200).json(tikTokData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/tikmusic', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();
    const tikMusicData = await getTikMusicData(url);
    return res.status(200).json(tikMusicData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/spotify', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();  
    const spotifyData = await getSpotifyData(url);
    return res.status(200).json(spotifyData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/sfile', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll();  
    const sFileData = await getSFileData(url);
    return res.status(200).json(sFileData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/mediafiredl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll(); 
    const mediaFireData = await getMediaFireData(url);
    return res.status(200).json(mediaFireData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/igdownload', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll()
    const instagramData = await getInstagramData(url);
    return res.status(200).json(instagramData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/capcutdl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll()
    const videoData = await getCapCutData(url);
    return res.status(200).json(videoData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});

app.get('/api/tiktokdl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 400, message: 'URL is required' });
  }
  try {
    await requestAll()
    const videoData = await getTikTokData(url);
    return res.status(200).json(videoData);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
});


app.get('/tes', (req, res) => {
  console.log("Halaman utama diakses");
  res.sendFile(path.join(__dirname, 'public', 'tes.html')); 
});


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

const akunFilePath = path.join(__dirname, 'akun.json');

const isAuthenticated = (req, res, next) => {
  console.log("Memeriksa autentikasi, loggedIn: ", req.session.loggedIn); 
  if (!req.session.loggedIn) {
      return res.redirect('/login');
  }
  next(); 
};

app.get('/', (req, res) => {
  console.log("Halaman utama diakses");
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      return res.redirect('/myadmin'); 
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html')); 
});

app.post('/login', (req, res) => {
  console.log("Login request received");
  const { username, password } = req.body;
  fs.readFile(akunFilePath, 'utf-8', (err, data) => {
      if (err) {
          console.error("Error reading akun.json", err);
          return res.status(500).json({ error: 'Terjadi kesalahan saat memuat data akun.' });
      }
      try {
          const akunList = JSON.parse(data);
          const akun = akunList.find(acc => acc.username === username && acc.password === password);
          if (akun) {
              console.log("Akun ditemukan. Login berhasil!");
              req.session.loggedIn = true; 
              return res.redirect('/myadmin'); 
          } else {
              console.log("Username atau password salah");
              return res.redirect('/login?error=Username%20atau%20password%20salah!');
          }
      } catch (parseError) {
          console.error("Error parsing JSON", parseError);
          return res.status(500).json({ error: 'Terjadi kesalahan dalam parsing data akun.' });
      }
  });
});


app.get('/myadmin', isAuthenticated, (req, res) => {
  console.log("Masuk ke /myadmin");
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html')); 
});


app.get('/api/user', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

app.get('/chat/openai', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'openai.html'));
});

app.get('/api/server', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'server.html'));
});

app.get('/rerezz', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

app.get('/rerez', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.get('/domain', (req, res) => {
  res.redirect(`${domain}`); 
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  try {
    const response = await axios.get(
      `https://www.api.im-rerezz.xyz/api/openai?message=${encodeURIComponent(message)}`
    );
    res.json({ reply: response.data });
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan respon dari ChatGPT" });
  }
});


const domain = 'https://dalang.x.decode.im-rerezz.xyz';
const apikey = 'ptla_c64EvoRQ2F15yVIv99I1tk53uDAAershnparTwhO77k';

app.post('/create-server', async (req, res) => {
    const { username, ramOption, key } = req.body; 
    console.log(`Received key: ${key}`);

    if (!validKeys.includes(key)) {
        return res.status(403).json({ message: '❌ Kunci key tidak valid!' });
    }
    if (!username || !ramOption) {
        return res.status(400).json({ message: '❌ Semua input harus diisi!' });
    }
    await requestAll();
    let ram, disk, cpu;

    switch (ramOption) {
      case "panel1gb":
        ram = 1000;
        disk = 1000;
        cpu = 50;
        break;
    case "panel2gb":
        ram = 2000;
        disk = 2000;
        cpu = 100;
        break;
    case "panel3gb":
        ram = 3000;
        disk = 3000;
        cpu = 150;
        break;
    case "panel4gb":
        ram = 4000;
        disk = 4000;
        cpu = 200;
        break;
    case "panel5gb":
        ram = 5000;
        disk = 5000;
        cpu = 250;
        break;
    case "panel6gb":
        ram = 6000;
        disk = 6000;
        cpu = 300;
        break;
    case "panel7gb":
        ram = 7000;
        disk = 7000;
        cpu = 350;
        break;
    case "panel8gb":
        ram = 8000;
        disk = 8000;
        cpu = 400;
        break;
    case "panel9gb":
        ram = 9000;
        disk = 9000;
        cpu = 450;
        break;
    case "panel10gb":
        ram = 10000;
        disk = 10000;
        cpu = 500;
        break;
    case "panel11gb":
        ram = 11000;
        disk = 11000;
        cpu = 550;
        break;
    case "panel12gb":
        ram = 12000;
        disk = 12000;
        cpu = 600;
        break;
    case "panel13gb":
        ram = 13000;
        disk = 13000;
        cpu = 650;
        break;
    case "panel14gb":
        ram = 14000;
        disk = 14000;
        cpu = 700;
        break;
    case "panel15gb":
        ram = 15000;
        disk = 15000;
        cpu = 750;
        break;
    case "panel16gb":
        ram = 16000;
        disk = 16000;
        cpu = 800;
        break;
    case "panel17gb":
        ram = 17000;
        disk = 17000;
        cpu = 850;
        break;
    case "panel18gb":
        ram = 18000;
        disk = 18000;
        cpu = 900;
        break;
    case "panel19gb":
        ram = 19000;
        disk = 19000;
        cpu = 950;
        break;
    case "panel20gb":
        ram = 20000;
        disk = 20000;
        cpu = 1000;
        break;
      case "unlimited":
          ram = 0;
          disk = 0;
          cpu = 0;
          break;
      default:
          return res.status(400).json({ message: "❌ Pilihan RAM tidak valid!" });
  }

    try {
        const response = await fetch(`https://apis.xyrezz.online-server.biz.id/api/cpanel?domain=${domain}&apikey=${apikey}&username=${username}&ram=${ram}&disk=${disk}&cpu=${cpu}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.error) {
            return res.status(500).json({ message: `Error: ${data.error}` });
        }
        res.status(200).json({ message: '✅ Server berhasil dibuat!', serverInfo: data });
    } catch (error) {
        res.status(500).json({ message: '❌ Terjadi kesalahan saat membuat server. Harap coba lagi.' });
    }
});

app.get('/api/list-users', async (req, res) => {
  try {
    await requestAll();
    let response = await fetch(`${domain}/api/application/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apikey}`,
      },
    });
    let data = await response.json();
    if (data.errors) {
      return res.status(500).json({ error: `❌ *Error:* ${data.errors[0].detail}` });
    }
    let users = data.data;
    if (users.length === 0) {
      return res.status(404).json({ message: '❌ *Tidak ada pengguna yang ditemukan.*' });
    }
    let userList = users.map(user => {
      let userInfo = user.attributes;
      return {
        id: userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
        language: userInfo.language
      };
    });
    res.status(200).json({ data: userList });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '❌ *Terjadi kesalahan saat mengambil daftar pengguna. Periksa konfigurasi atau coba lagi.*' });
  }
});

app.delete('/api/delete-user/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'ID pengguna tidak diberikan.' });
  try {
    await requestAll();
      let response = await fetch(`${domain}/api/application/users/${id}`, {
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apikey}`,
          },
      });
      let result = response.ok ? { message: 'Successfully deleted the user.' } : await response.json();
      if (result.errors) {
          return res.status(404).json({ error: 'User not found or deletion failed.' });
      }
      res.status(200).json(result);
  } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus pengguna.' });
  }
});

app.get('/api/list-servers', async (req, res) => {
  try {
    await requestAll();
      const page = req.query.page || '1'; 
      const response = await fetch(`${domain}/api/application/servers?page=${page}`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apikey}`
          }
      });
      const data = await response.json();
      const servers = data.data;
      if (!servers || servers.length === 0) {
          return res.json({ error: '❌ Tidak ada server yang ditemukan.' });
      }
      const serverList = servers.map(server => ({
          id: server.attributes.id,
          identifier: server.attributes.identifier,
          name: server.attributes.name,
          description: server.attributes.description,
          suspended: server.attributes.suspended,
          memory: server.attributes.limits.memory == 0 ? "unlimited" : `${server.attributes.limits.memory / 1000} GB`,
          disk: server.attributes.limits.disk == 0 ? "unlimited" : `${server.attributes.limits.disk / 1000} GB`,
          cpu: server.attributes.limits.cpu == 0 ? "unlimited" : `${server.attributes.limits.cpu}%`
      }));

      res.json({ data: serverList, page: data.meta.pagination.current_page, total_pages: data.meta.pagination.total_pages });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: '❌ Terjadi kesalahan saat mengambil daftar server.' });
  }
});
app.delete('/api/delete-server/:id', async (req, res) => {
  const srvId = req.params.id;
  if (!srvId) {
      return res.json({ error: 'ID server tidak ditemukan.' });
  }
  try {
    await requestAll();
      const response = await fetch(`${domain}/api/application/servers/${srvId}`, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apikey}`
          }
      });
      if (response.ok) {
          return res.json({ message: 'Server berhasil dihapus.' });
      }
      const result = await response.json();
      return res.json({ error: result.errors || 'Server tidak ditemukan.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: '❌ Terjadi kesalahan saat menghapus server.' });
  }
});


app.get('/api/get-usage-count', async (req, res) => {
  try {
    const response = await fetch('https://databse-apis.glitch.me/api/usage-count');
    const data = await response.json();
    res.status(200).json({ usageCount: data.usageCount });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Failed to fetch usage count from Glitch', error: error.message });
  }
});

app.get('/api/reqtoday', async (req, res) => {
  try {
    const response = await fetch('https://databse-apis.glitch.me/api/requesttoday/today');
    const data = await response.json();
    res.status(200).json({ reqtoday: data.requestCount });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Failed to fetch usage count from Glitch', error: error.message });
  }
});

app.get('/api/visitor', async (req, res) => {
  try {
    const response = await axios.get('https://databse-apis.glitch.me/increment-visitor');
    const visitorCount = response.data.count || 0; 
    res.status(200).send(visitorCount.toString());
  } catch (error) {
    console.error('Error fetching visitor data:', error);
    res.status(500).send('Failed to fetch visitor data');
  }
});

app.get('/api/platform', (req, res) => {
  try {
    const platform = os.platform(); 
    res.json({ platform });
  } catch (error) {
    console.error('Error detecting platform:', error);
    res.status(500).json({ error: 'Failed to detect platform' });
  }
});

app.get('/api/ram', (req, res) => {
  try {
    const totalMem = os.totalmem(); 
    const freeMem = os.freemem(); 
    const usedMem = totalMem - freeMem;
    const totalMemGB = (totalMem / (1024 * 1024 * 1024)).toFixed(2);
    const usedMemGB = (usedMem / (1024 * 1024 * 1024)).toFixed(2);  
    const freeMemGB = (freeMem / (1024 * 1024 * 1024)).toFixed(2);  
    res.json({
      used: `${usedMemGB} GB`, 
      free: `${freeMemGB} GB`, 
      total: `${totalMemGB} GB`
    });
  } catch (error) {
    console.error('Error detecting RAM usage:', error);
    res.status(500).json({ error: 'Failed to detect RAM usage' });
  }
});

app.get('/api/rom', async (req, res) => {
  try {
    const diskData = await si.fsSize(); 
    if (diskData && diskData.length > 0) {
      const totalDisk = diskData[0].size;  
      const usedDisk = diskData[0].used;  
      const totalDiskGB = (totalDisk / (1024 * 1024 * 1024)).toFixed(2);
      const usedDiskGB = (usedDisk / (1024 * 1024 * 1024)).toFixed(2);
      const freeDiskGB = ((totalDisk - usedDisk) / (1024 * 1024 * 1024)).toFixed(2); 
      res.json({
        used: `${usedDiskGB} GB`, 
        free: `${freeDiskGB} GB`, 
        total: `${totalDiskGB} GB`
      });
    } else {
      res.status(500).json({ error: 'No disk data available' });
    }
  } catch (error) {
    console.error('Error detecting ROM usage:', error);
    res.status(500).json({ error: 'Failed to detect ROM usage' });
  }
});

let startTime = Date.now(); 
const getUptime = () => {
  const uptime = ((Date.now() - startTime) / 1000); 
  const uptimeMinutes = (uptime / 60).toFixed(2); 
  return uptimeMinutes;
};
app.get('/api/uptime', (req, res) => {
  const uptimeMinutes = getUptime();
  res.json({ uptime: `${uptimeMinutes} menit` });
});

app.listen(port, async () => {
  console.log(`Server berjalan di port ${port}`);
  await getLocalhost();
  const startTime = Date.now(); 
  setInterval(() => {
    const uptime = ((Date.now() - startTime) / 1000); 
    const uptimeMinutes = (uptime / 60).toFixed(2); 
    console.log(`Runtime: ${uptimeMinutes} menit`); 
  }, 60000); 
});
