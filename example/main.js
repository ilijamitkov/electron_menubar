const menubar = require('menubar')
const robotjs = require('robotjs')

const electron = require('electron')
const mb = menubar()
const globalShortcut = electron.globalShortcut

mb.on('ready', function ready () {
  //var screenSize = robotjs.getScreenSize();
  //var mousePosition = robotjs.getMousePos();
  var displays = electron.screen.getAllDisplays();
  //robotjs.setMouseDelay(20)
  var pointSaved = false;
  var previosX, previosY;
  globalShortcut.register('Ctrl+Alt+space', function() {
    var currentPoint = electron.screen.getCursorScreenPoint();
    var currentDisplay = electron.screen.getDisplayNearestPoint(currentPoint)
    var nextDisplay = displays.find((display) => {
      return display.bounds.x !== currentDisplay.bounds.x || display.bounds.y !== currentDisplay.bounds.y
    })
    if(nextDisplay ===undefined){
        nextDisplay = currentDisplay;
    }
    
    if(!pointSaved){
      var nextX = parseInt((nextDisplay.bounds.width / 2 + nextDisplay.bounds.x) * nextDisplay.scaleFactor);
      var nextY = parseInt((nextDisplay.bounds.height / 2 + nextDisplay.bounds.y) * nextDisplay.scaleFactor);
      robotjs.moveMouse(nextX, nextY);
    }else {
      robotjs.moveMouse(previosX, previosY);
    }
    pointSaved = true;
    previosX = currentPoint.x * currentDisplay.scaleFactor;
    previosY = currentPoint.y * currentDisplay.scaleFactor;
  });
})
