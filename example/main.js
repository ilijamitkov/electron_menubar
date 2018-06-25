const menubar = require('menubar')
const robotjs = require('robotjs')

const electron = require('electron')
const mb = menubar()
const globalShortcut = electron.globalShortcut

mb.on('ready', function ready () {
  console.log('app is ready')
  var screenSize = robotjs.getScreenSize();
  console.log(screenSize);
  var mousePosition = robotjs.getMousePos();
  console.log(mousePosition);
  var displays = electron.screen.getAllDisplays();
  var currentPoint = electron.screen.getCursorScreenPoint();
  debugger;
  console.log('current point: ' + currentPoint.x );
  var currentDisplay = electron.screen.getDisplayNearestPoint(currentPoint)
  console.log('ccurrentDisplay: ' + currentDisplay.bounds.x);
  console.log(displays);

  var externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  var savedPoint;
  var savedPointId;
  globalShortcut.register('Ctrl+Alt+space', function() {
    console.log('shortcut activated')
    var currentPoint = electron.screen.getCursorScreenPoint();
    var currentDisplay = electron.screen.getDisplayNearestPoint(currentPoint)
    var nextDisplay = displays.find((display) => {
      return display.bounds.x !== currentDisplay.bounds.x || display.bounds.y !== currentDisplay.bounds.y
    })
    console.log(nextDisplay)
    if(nextDisplay ===undefined){
        nextDisplay = currentDisplay;
    }
    console.log('currentDisplayId: ' + currentDisplay.id);
    console.log('nextDisplay: ' + nextDisplay.id);
    console.log('savedPoint: ' + savedPoint);
    savedPoint = savedPoint !== undefined ? savedPoint : {x: (nextDisplay.workArea.width / 2) + nextDisplay.workArea.x, y: (nextDisplay.workArea.height / 2) + nextDisplay.workArea.y }
    console.log('savedPoint.x: ' + savedPoint.x);
    console.log('savedPoint.y: ' + nextDisplay.workArea.y);
    console.log('nextDisplay.workArea.x: ' + nextDisplay.workArea.x);
    console.log('nextDisplay.workArea.y: ' + nextDisplay.workArea.y);
    console.log('nextDisplay.workArea.width: ' + nextDisplay.workArea.width);
    console.log('nextDisplay.workArea.height: ' + nextDisplay.workArea.height);
    console.log('savedPoint.x: ' + savedPoint.x);
    console.log('savedPoint.y: ' + nextDisplay.workArea.y);
    robotjs.moveMouse(savedPoint.x, savedPoint.y)
    savedPoint = currentPoint;
  });
})
