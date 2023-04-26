const song = document.getElementById("song");
const play = document.querySelector(".play");
const btnNext = document.querySelector(".fa-arrow-right");
const btnBack = document.querySelector(".fa-arrow-left");
let indexSong = 0;

let isPlay = true;
let musics = [
  {
    name: "Day dứt nỗi đau.mp3",
    single: "Mr.Siro",
    author: "Mr.Siro",
  },
  {
    name: "Áng mây vô tình.mp3",
    single: "Lương Gia Hùng",
    author: "Nguyễn Công Thắng",
  },
  {
    name: "Nếu lúc trước em đừng tới.mp3",
    single: "Quang Vinh",
    author: "Nhạc ngoại",
  },
];

song.setAttribute("src", `./music/${musics[indexSong].name}`);

// handle when clicked icon play -> pause and reverse.
play.addEventListener("click", changeIconPause);
function changeIconPause() {
  if (isPlay) {
    song.play();
    isPlay = false;
    
    play.innerHTML = `<i id="icon-pause" class="fa-solid fa-pause"></i>`;
  } else {
    song.pause();
    isPlay = true;
    play.innerHTML = `<i id="icon-play" class="fa-solid fa-play"></i>`
  }
}

function changeSong(change) {
  if (change === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlay = true;
  } else if (change === -1) {
    // back song
    indexSong--;
    if(indexSong < 0) {
        indexSong = musics.length - 1;
    }
    isPlay = true;
  }

  song.setAttribute("src", `./music/${musics[indexSong].name}`);
  changeIconPause();
}

// handle next music
btnNext.addEventListener("click", function () {
  changeSong(1);
});

// handle back song
btnBack.addEventListener("click", function () {
  changeSong(-1);
});
