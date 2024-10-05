let all = document.querySelector("html");
let lua = document.querySelector("#lua");
let sol = document.querySelector("#sol");

const toggleView = () => {
  lua.classList.toggle("hide");
  sol.classList.toggle("hide");
  
  if (lua.classList.contains("hide")) {
    all.style.animation = "";
    all.style.animation = "toNight 1s forwards";
    modal.style.background = "#536d88"
  } else {
    all.style.animation = "";
    all.style.animation ="toEarly 1s forwards reverse";
    modal.style.background = "#6cf3d5"
  }
}

let playButton = document.querySelector("#play_btn");
let pauseButton = document.querySelector("#pause_btn");
let resetButton = document.querySelector("#reset_btn");
let setButton = document.querySelector("#set_btn");
let modal = document.querySelector("#modal");

let hours = document.querySelector("#mins");
let seconds = document.querySelector("#secs");
  let hoursRestore = hours.innerHTML;
  let secondsRestore = seconds.innerHTML;

const toggleBtn = () => {
  playButton.classList.toggle("hide");
  pauseButton.classList.toggle("hide");
  resetButton.classList.toggle("hide");
  setButton.classList.toggle("hide");
}

let timerInterval;
const timerAction = (action, func) => {
  switch(action){
    case "play":
      timerInterval = setInterval(() => {func();}, 1000);
      break;
    
    case "pause":
      clearInterval(timerInterval);
      break;
      
    case "reset":
      clearInterval(timerInterval);
      hours.innerHTML = func[0];
      seconds.innerHTML = func[1];
      break;
    
    default:
      alert("erro");
      break;
  }
}

const openSetting = () => {
  modal.classList.toggle("hide");
  modal.style.animation = "";
  modal.style.animation = "openSetting 1s forwards";
}

const closeSetting = () => {
  modal.style.animation = "";
  modal.style.animation = "closeSetting 1s forwards reverse";
  setTimeout(() => {
    modal.classList.toggle("hide")
    modal.querySelector("#formHours").classList.remove("hide");
    modal.querySelector("#formSeconds").classList.add("hide");
  }, 1000);
}

const settingHours = () => {
  let inputHours = document.querySelector("#inputHours");
  let pegaHoras = parseInt(inputHours.value);
  
  if(pegaHoras > 999 || pegaHoras < 0 || isNaN(pegaHoras) === true){
    alert("O valor inserido não é um número válido.");
  } else {
    hours.innerHTML = pegaHoras;
    hoursRestore = hours.innerHTML;
    if(pegaHoras < 10){hours.innerHTML = "0" + pegaHoras; hoursRestore = hours.innerHTML;}
    modal.querySelector("#formHours").classList.toggle("hide");
    modal.querySelector("#formSeconds").classList.toggle("hide");
  }
}

const settingSeconds = () => {
  let inputSeconds = document.querySelector("#inputSeconds");
  let pegaSegundos = parseInt(inputSeconds.value);
  
  if(pegaSegundos > 60 || pegaSegundos < 0 || isNaN(pegaSegundos) === true){
    alert("Inválido")
  } else {
    seconds.innerHTML = pegaSegundos;
    secondsRestore = seconds.innerHTML;
    if(pegaSegundos < 10){seconds.innerHTML = "0" + pegaSegundos; secondsRestore = seconds.innerHTML}
    closeSetting();
  }
}

const playTimer = () => {
  toggleBtn();
  
  const contagem = () => {
    let hoursAtual = parseInt(hours.innerHTML);  
    let secondsAtual = parseInt(seconds.innerHTML);

    secondsAtual -= 1;
    seconds.innerHTML = secondsAtual;
    
    if(hoursAtual.toString().length == 1){hours.innerHTML = "0" + hoursAtual;}
    if(secondsAtual.toString().length == 1){seconds.innerHTML = "0" + secondsAtual;}
    
    if(hoursAtual <= 0 && secondsAtual <= 0) {
      timerAction("pause");
      hours.innerHTML = hoursRestore;
      seconds.innerHTML = secondsRestore;
      toggleBtn();
      return;
    }
    
    if(hoursAtual > 0 && secondsAtual < 0){
      hoursAtual = parseInt(hours.innerHTML);  
      hoursAtual -= 1;
      if(hoursAtual.toString().length == 1){hours.innerHTML = "0" + hoursAtual;}
      else {hours.innerHTML = hoursAtual};
      
      secondsAtual += 60;
      seconds.innerHTML = secondsAtual;
    }
  };
  timerAction("play", contagem);
}

const pauseTimer = () => {
  toggleBtn();
  timerAction("pause");
}

const resetTimer = () => {
  toggleBtn();
  timerAction("reset", [hoursRestore, secondsRestore]);
}