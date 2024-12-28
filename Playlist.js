var mainContainer = document.getElementById('main-container');
var musicPlayer = document.getElementById('music-player');
var musicPlaylist = document.getElementById('music-playlist');

// Replace API data with local data
var responseArray = [
    {
        "track": "Blue",
        "artist": "Yung Kai",
        "file": "mp3/Blue-Yung Kai.m4a", // Local MP3 file path
        "albumCover": "images/blue.jpg" // Local image path
    },
    {
        "track": "Like You Do",
        "artist": "Joji",
        "file": "mp3/Like You Do-Joji.m4a", // Local MP3 file path
        "albumCover": "images/likeyoudo.jpg" // Local image path
    },
    {
        "track": "Photograph",
        "artist": "Ed Sheeran",
        "file": "mp3/photograph.mp3", // Local MP3 file path
        "albumCover": "images/photograph.jpg" // Local image path
    },
    {
        "track": "Bawat Piyesa",
        "artist": "Munimuni",
        "file": "mp3/bawatpiyesa.mp3", // Local MP3 file path
        "albumCover": "images/bawatpiyesa.jpg" // Local image path
    },
    {
        "track": "Glue Song",
        "artist": "Beabadoobee",
        "file": "mp3/gluesong.mp3", // Local MP3 file path
        "albumCover": "images/gluesong.jpg" // Local image path
    },
    {
        "track": "Mundo",
        "artist": "IV Of Spades",
        "file": "mp3/mundo.mp3", // Local MP3 file path
        "albumCover": "images/mundo.jpg" // Local image path
    },
    {
        "track": "Sure Thing",
        "artist": "Miguel",
        "file": "mp3/surething.mp3", // Local MP3 file path
        "albumCover": "images/surething.jpg" // Local image path
    },
    {
        "track": "Keep On Loving You",
        "artist": "Cigarettes After Sex",
        "file": "mp3/keeponlovingyou.mp3", // Local MP3 file path
        "albumCover": "images/keeponlovingyou.jpg" // Local image path
    },
    {
        "track": "Home",
        "artist": "Reese Lansangan",
        "file": "mp3/home.mp3", // Local MP3 file path
        "albumCover": "images/home.jpg" // Local image path
    },
    {
        "track": "P.S I LOVE YOU",
        "artist": "Paul Partohap",
        "file": "mp3/ILY.mp3", // Local MP3 file path
        "albumCover": "images/ILY.jpg" // Local image path
    },
    // Add more tracks as needed
];

function createMusicPlayer(obj, i) {
    var playerSection = document.createElement('div');
    playerSection.className = "player-section";

    var audioPlay = document.createElement('audio');
    audioPlay.id = "play-audio";
    audioPlay.src = obj.file; // Use the local file URL
    playerSection.appendChild(audioPlay);

    var playerCoverImage = document.createElement('img');
    playerCoverImage.src = obj.albumCover; // Use the local image URL
    playerCoverImage.className = "player-cover-image";
    playerSection.appendChild(playerCoverImage);

    // Progress bar setup
    var progressWrapper = document.createElement('div');
    progressWrapper.id = "progress-wrapper";
    var progress = document.createElement('div');
    progress.id = "progress";
    progressWrapper.appendChild(progress);
    playerSection.appendChild(progressWrapper);

    var buttonWrapper = document.createElement('div');
    buttonWrapper.id = "button-wrapper";

    var randomBtn = document.createElement('i');
    randomBtn.className = "fas fa-random";
    buttonWrapper.appendChild(randomBtn);

    randomBtn.onclick = function () {
        var randomSrc = Math.floor((Math.random() * responseArray.length) + 1);
        if (i == 0 || i < responseArray.length) {
            i = randomSrc;
            handleForwordBackword([i]);
        }
    }

    var stepBackward = document.createElement('i');
    stepBackward.className = "fas fa-step-backward";
    buttonWrapper.appendChild(stepBackward);

    stepBackward.onclick = function () {
        if (i > 0 && i < responseArray.length - 1) {
            console.log(responseArray[i]);
            i--;
            handleForwordBackword([i])
        } else {
            i = responseArray.length - 1;
            handleForwordBackword([i])
        }
    }

    var playBtn = document.createElement('i');
    playBtn.className = "far fa-play-circle";
    buttonWrapper.appendChild(playBtn);

    playBtn.onclick = function () {
        audioPlay.play();
        audioPlay.ontimeupdate = function () {
            var progressPercentage = (audioPlay.currentTime / audioPlay.duration) * 100;
            progress.style.width = progressPercentage + '%';
        }
    }

    var pauseBtn = document.createElement('i');
    pauseBtn.className = "far fa-pause-circle";
    pauseBtn.classList.add('pause-button');
    buttonWrapper.appendChild(pauseBtn);

    pauseBtn.onclick = function () {
        audioPlay.pause();
    }

    var forwardBtn = document.createElement('i');
    forwardBtn.className = "fas fa-step-forward";
    buttonWrapper.appendChild(forwardBtn);

    forwardBtn.onclick = function () {
        if (i < responseArray.length - 1) {
            i++;
            handleForwordBackword([i]);
        } else {
            i = 0;
            handleForwordBackword([i]);
        }
    }

    var repeatBtn = document.createElement('i');
    repeatBtn.className = "fas fa-history";
    buttonWrapper.appendChild(repeatBtn);
    repeatBtn.onclick = function () {
        audioPlay.currentTime = 0;
        audioPlay.loop = true;
    }

    playerSection.appendChild(buttonWrapper);
    musicPlayer.appendChild(playerSection);

    var trackName = document.createElement('h1');
    trackName.innerHTML = obj.track;
    playerSection.appendChild(trackName);

    return playerSection;
}

function handleForwordBackword() {
    var audioPlay = document.getElementById('play-audio');
    audioPlay.src = responseArray[i].file; // Use the local file URL
    audioPlay.currentTime = 0;
    var playerCoverImage = document.querySelector('.player-cover-image');
    playerCoverImage.src = responseArray[i].albumCover; // Use the local image URL
    var trackName = document.querySelector('h1');
    trackName.innerHTML = responseArray[i].track;

    audioPlay.play();
    audioPlay.ontimeupdate = function () {
        var progress = document.getElementById('progress');
        var progressPercentage = (audioPlay.currentTime / audioPlay.duration) * 100;
        progress.style.width = progressPercentage + '%';
    }
}

var xhttp = new XMLHttpRequest();
// Commented out the API call, no longer needed
// apiEndpoint = "https://5dd1894f15bbc2001448d28e.mockapi.io/playlist";
// xhttp.open("GET", apiEndpoint, true);
// xhttp.onreadystatechange = function () {
//     if (this.readyState === 4) {
//         responseArray = JSON.parse(this.responseText);
//         console.log(responseArray);
//         for (i = 0; i < responseArray.length; i++) {
//             musicPlaylist.appendChild(createPlaylistItems(responseArray[i], i));
//         }
//         musicPlayer.appendChild(createMusicPlayer(responseArray[0], 0));
//     }
// }
// xhttp.send();

// Remove the following section if not needed
for (i = 0; i < responseArray.length; i++) {
    musicPlaylist.appendChild(createPlaylistItems(responseArray[i], i));
}
musicPlayer.appendChild(createMusicPlayer(responseArray[0], 0));

// Playlist item creation remains the same
function createPlaylistItems(obj, pos) {
    var playlistItems = document.createElement('div');
    playlistItems.className = "playlist";
    playlistItems.onclick = function () {
        musicPlayer.innerHTML = "";
        musicPlayer.appendChild(createMusicPlayer(responseArray[pos], pos));
        var playSong = document.getElementById('play-audio');
        playSong.play();
        var progress = document.getElementById('progress');
        playSong.ontimeupdate = function () {
            var progressPercentage = (playSong.currentTime / playSong.duration) * 100;
            progress.style.width = progressPercentage + '%';
        }
    }

    var playlistAlbumCover = document.createElement('img');
    playlistAlbumCover.className = "playlist-album-cover";
    playlistAlbumCover.src = obj.albumCover; // Local image path
    playlistItems.appendChild(playlistAlbumCover);

    var sectionDiv = document.createElement('div');
    var track = document.createElement('h3');
    track.innerHTML = obj.track;
    sectionDiv.appendChild(track);
    var artist = document.createElement('h4');
    artist.innerHTML = obj.artist;
    sectionDiv.appendChild(artist);
    playlistItems.appendChild(sectionDiv);

    return playlistItems;
}
