const axios = require('axios')


async function getTikTokData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tiktok?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    console.error('Error retrieving TikTok data:', error);
    throw new Error('Failed to retrieve TikTok video data.');
  }
}

async function getCapCutData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/capcutdl?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    console.error('Error retrieving CapCut data:', error);
    throw new Error('Failed to retrieve CapCut video data.');
  }
}

async function getInstagramData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/igdownload?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev"; 
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve Instagram data.');
  }
}

async function getMediaFireData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/mediafiredl?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve MediaFire data.');
  }
}

async function getSFileData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/sfile?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve SFile data.');
  }
}

async function getSpotifyData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve Spotify data.');
  }
}

async function getTikMusicData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tikmusic?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev"; 
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve TikTok music data.');
  }
}

async function getTikTokData2(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/tiktok?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve TikTok data.');
  }
}

async function getXnxxData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/xnxxdl?query=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve XNXX data.');
  }
}

async function getYoutubeData(url) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/ytmp4?url=${encodeURIComponent(url)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve YouTube video data.');
  }
}

async function getMp3Data(query) {
  try {
    const response = await axios.get(`https://api.vreden.web.id/api/ytplaymp3?query=${encodeURIComponent(query)}`);
    const data = response.data;
    data.creator = "Decode Rezz Dev";
    return data;
  } catch (error) {
    throw new Error('Failed to retrieve MP3 data.');
  }
}
  
module.exports = {
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
};
