const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108
    },
    {
      trackId: "trk103",
      artist: "Lunar Arcade",
      title: "Midnight Frequency",
      votes: 4,
      bpm: 128
    }
  ],
  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115
    },
    {
      trackId: "trk202",
      artist: "Velvet Comet",
      title: "Satellite Hearts",
      votes: 6,
      bpm: 124
    }
  ]
];

function flattenPlaylists(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  const hasil = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const objekBaru = {
        trackId: arr[i][j].trackId,
        artist: arr[i][j].artist,
        title: arr[i][j].title,
        votes: arr[i][j].votes,
        bpm: arr[i][j].bpm,
        source: [i, j] 
      };
      hasil.push(objekBaru);
    }
  }
  return hasil;
}

function scoreTracks(arr) {
  let hasil = [];
  for (let i = 0; i < arr.length; i++) {
    const objekBaru = {
      trackId: arr[i].trackId,
      artist: arr[i].artist,
      title: arr[i].title,
      votes: arr[i].votes,
      bpm: arr[i].bpm,
      source: arr[i].source,
      score: Number(arr[i].votes * 10 - Math.abs(arr[i].bpm - 120)) 
    }
    hasil.push(objekBaru);
  }
  return hasil;
}

function dedupeTracks(arr) {
  let hasil = [];
  let idYangSudahAda = [];
  for (let i = 0; i < arr.length; i++) {
    const trackSekarang = arr[i];
    let sudahAda = false;
    for (let j = 0; j < idYangSudahAda.length; j++) {
      if (idYangSudahAda[j] === trackSekarang.trackId) {
        sudahAda = true;
      }
    }
    if (sudahAda === false) {
      idYangSudahAda.push(trackSekarang.trackId);
      hasil.push(trackSekarang);
    }
  }
  return hasil;
}

function enforceArtistQuota(arr, num) {
  const hasil = [];
  const jumlahArtist = [];
  for (let i = 0; i < arr.length; i++) {
    const trackSekarang = arr[i];
    const artistSekarang = trackSekarang.artist;
    if (jumlahArtist[artistSekarang] === undefined) {
      jumlahArtist[artistSekarang] = 0;
    }
    if (jumlahArtist[artistSekarang] < num) {
      hasil.push(trackSekarang);
      ++jumlahArtist[artistSekarang];
    }
  }
  return hasil;
}

function buildSchedule(arr) {
  const hasil = [];
  for (let i = 0; i < arr.length; i++) {
    const trackSekarang = arr[i];
    const jadwalBaru = {
      slot: i + 1,
      trackId: trackSekarang.trackId
    };
    hasil.push(jadwalBaru);
  }
  return hasil;
}

function remixPlaylist(arr, num) {
  return buildSchedule(enforceArtistQuota(dedupeTracks(scoreTracks(flattenPlaylists(arr))), num));
}
