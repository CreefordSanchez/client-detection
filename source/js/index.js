'use strict';

function selector(selector) {
  return document.querySelector(selector);
}

function listener (selector, callback, event) {
  return selector.addEventListener(event, callback);
}

// Print Everything
listener(window, output, 'resize');
listener(window, output, 'load');
listener(window, output, 'online');
listener(window, output, 'offline');
function output(){ 
  windowOutput();
  systemOutput();
  getBrowserName();
  batteryOutput();  
  netStatOutput();
}

// Grab system types
const osType = selector('.system-os');
const langType = selector('.system-lang');
const browserType = selector('.system-browser');

const osListTypes = [
  'MacOS', 'UNIX', 'Windows', 'iOS', 'ChromeOS'
];
const browserListTypes = [
  'Edg','Firefox', 'OPR', 'IE', 'Chrome','Safari'
];
const browserName = [
  'Microsoft Edge','Firefox', 'Opera', 'Internet Explorer', 'Chrome','Safari'
];

//Store userAgent and splits its content into an array
const getList = navigator.userAgent.split('');
  const remove = getList.map(os => 
    os.replace('(',' ').replace(';',' ').replace('/',' ')
  );
  const userAgent = remove.join("").split(" ");

function systemOutput() {
  printAgentType(osListTypes, osType, "OS");
  printAgentType(browserListTypes, browserType, "Browser");
  langType.innerText = `Language: ${navigator.language}`;
}

function printAgentType(listTypes, selector, type) {
  for (let value of listTypes) {
    selector.innerText = userAgent.filter(element => element == value);
    if(selector.innerText !== "") {
      selector.innerText= `${type}: ${selector.innerText}`;
      break;
    }
  }

  if(selector.innerText === "") {
    selector.innerText= `Unknown ${type}`;
  }
}

function getBrowserName() {
  browserType.innerText = browserType.innerText.replace('Browser: ', "");
  let index = browserListTypes.indexOf(browserType.innerText);
  browserType.innerText = `Browser: ${browserName[index]}`;
}

// Grab window types
const widthSize = selector('.window-width');
const heightSize = selector('.window-height');
const orientationTypes = selector('.window-orientation');

function windowOutput() {
  widthSize.innerText = `Window Size: ${window.innerWidth}px`;
  heightSize.innerText = `Window Size: ${window.innerHeight}px`;
  orientationTypes.innerText = `Orientation: ${window.screen.orientation.type}`;
}

// grab battery types
const level = selector(".battery-lvl");
const status = selector(".battery-stat");

function batteryOutput() {
  //need to delcare a .then function in order to access the battery manager
  navigator.getBattery().then(function(battery) {
    let getBattery = battery.level*100;
    if (Number.isInteger(getBattery)){
      level.innerText = `Battery: ${battery.level *100}%`;
    } else {
      level.innerText = `Battery: Not Available`;
    }
    let getStatus = battery.charging;
    if(typeof getStatus === 'boolean') {
       status.innerText = `Status ${getStatus ? "Charging" : "Not Charging"}`;
    } else {
      status.innerText = `Status: Not Available`;
    }
  });
}

// grab nerwork status
const netStat = selector('.network-output');
function netStatOutput() {
  if(navigator.onLine) {
    netStat.innerText = 'Online';
  } else {
    netStat.innerText = 'Offline';
  }
}