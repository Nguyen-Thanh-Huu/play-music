const song = document.getElementById("song");
const play = document.querySelector(".play");
const btnNext = document.querySelector(".fa-arrow-right");
const btnBack = document.querySelector(".fa-arrow-left");
const btnRepeatCurrent = document.querySelector(".repeat-current_music");
const durationTime = document.querySelector(".time-start");
const remainingTime = document.querySelector(".time-end");
const range = document.querySelector("#range");
const sound = document.querySelector(".sound");
const rangeSound = document.querySelector("#sound")



const single = document.querySelector(".single");
const titleMusic = document.querySelector(".title-music");
let changeSound = 1;

displayTimer();
let timer = setInterval(displayTimer, 500);

let indexSong = 0;
let isPlay = true;
let musics = [
  {
    name: "Day dứt nỗi đau.mp3",
    title:"Day dứt nỗi đau",
    single: "Mr.Siro",
    author: "Mr.Siro",
  },
  {
    name: "Áng mây vô tình.mp3",
    title:"Áng mây vô tình",
    single: "Lương Gia Hùng",
    author: "Nguyễn Công Thắng",
  },
  {
    name: "Nếu lúc trước em đừng tới.mp3",
    title:"Nếu lúc trước em đừng tới",
    single: "Quang Vinh",
    author: "Nhạc ngoại",
  },
];

song.setAttribute("src", `./music/${musics[indexSong].name}`);
single.innerHTML = musics[indexSong].single;
titleMusic.innerHTML = musics[indexSong].title;


// handle when clicked icon play -> pause and reverse.
play.addEventListener("click", changeIconPause);
function changeIconPause() {
  if (isPlay) {
    song.play();
    isPlay = false;
    play.innerHTML = `<i id="icon-pause" class="fa-solid fa-pause"></i>`;
   timer = setInterval(displayTimer, 500);

  } else {
    song.pause();
    isPlay = true;
    play.innerHTML = `<i id="icon-play" class="fa-solid fa-play"></i>`
    clearInterval(timer)
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
  single.innerHTML = musics[indexSong].single;
titleMusic.innerHTML = musics[indexSong].title;

  changeIconPause();
}

song.addEventListener('ended', handleFinishSong);
function handleFinishSong() {
  changeSong(1)
}

// handle next music
btnNext.addEventListener("click", function () {
  changeSong(1);
});

// handle back song
btnBack.addEventListener("click", function () {
  changeSong(-1);
});

// display time duration and remaining time song
function displayTimer() {
  // distructoring get 2 property of object audio duration and currentTime
    const {duration, currentTime} = song;
    // set max of input range equal duration
    range.max = duration;
    // set value input type range  equal currentTime
    range.value = currentTime;
    remainingTime.textContent =  formatTimer(currentTime);
    if(!duration) {
      durationTime.textContent = "00.00"
    } else {
      durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

// handle change range input (bar)
range.addEventListener('change', handleChangeBar);
function handleChangeBar() {
  song.currentTime = range.value;
}

// handle sound
sound.addEventListener('click', handleSound);
function handleSound() {        
  if(changeSound === 1) {
    sound.innerHTML = `<i id="mute" class="fas fa-volume-mute"></i>`; 
    song.volume = 0;
    changeSound = 2;
  }  else  if(changeSound === 2) {
    sound.innerHTML = `<i id="volume" class="fas fa-volume-up"></i>`;
    song.volume = 1;
    changeSound = 1;
  }     
}

// change value input icon sound 

rangeSound.addEventListener('change', handleChangeSound);
function handleChangeSound() {
  song.volume = rangeSound.value;
}
