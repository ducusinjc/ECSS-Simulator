const electron = require('electron');
const url = require('url');
const path= require('path');
const { BrowserWindow } = require('electron');

const {app, Browserwindow, Menu} = electron;

// SET ENV
process.env.NODE_ENV = "production"; 

let mainwindow;
let addwindow;

// listen for the app to be ready 
app.on('ready', function(){
    // create new window 
    mainwindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
    }
    });
    //load the html file 
    mainwindow.loadURL(url.format({
      pathname: path.join(__dirname, 'mainwindow.html'),
      protocol: 'file:',
      slashes: true
      
    }));
    // quit app when closed 
    mainwindow.on('closed', function(){
      app.quit();
    })
    
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainmenutemplate)
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});
// add window 1 npm
function createaddwindow(){
  // create new window 
  addwindow = new BrowserWindow({
    width: 500,
    height: 300,
    title:'output'
  });
  // quit app when main window is closed
  addwindow.on('close', function(){addwindow = null});
  }
 
// create menu template
const mainmenutemplate=[{
  label: 'File', 
  submenu:[
    {
      label:'Home', click(){
        //load the html file 
        mainwindow.loadURL(url.format({
          pathname: path.join(__dirname, 'mainwindow.html'),
          protocol: 'file:',
          slashes: true
        }));
      }
    },
    {
      label:'FM', click(){
        //load the html file 
        mainwindow.loadURL(url.format({
          pathname: path.join(__dirname, 'frequency modulation/mainwindow2.2.html'),
          protocol: 'file:',
          slashes: true
        }));      
      }
    },
    {
      label:'PAM', click(){
       //load the html file 
       mainwindow.loadURL(url.format({
        pathname: path.join(__dirname,'PAM/mainwindowko.html'),
        protocol: 'file:',
        slashes: true
      }));
      }
    },
    {
      label:'FDM', click(){
        //load the html file 
        mainwindow.loadURL(url.format({
          pathname: path.join(__dirname, 'frequency division multiplexing/mainwindow3.html'),
          protocol: 'file:',
          slashes: true
        })); 
      }
    },
    {
      label:'TDM', click(){
        //load the html file 
        mainwindow.loadURL(url.format({
          pathname: path.join(__dirname, 'TDM/mainwindow4.html'),
          protocol: 'file:',
          slashes: true
        })); 
      }
    },
    {
     label:'Quit',
     accelerator:process.plotform== 'darwin' ? 'Command+Q' : 'Ctrl+Q',
     click(){app.quit()},
    }
  ]
}];

  
//mac user addempty object to menu
if(process.platform=='darwin'){
  mainmenutemplate.unshift({});
}

// add developer tool if not in production 
if (process.env.NODE_ENV !=='production'){
  mainmenutemplate.push({
    label: 'Developer tools',
    submenu: [{
      label: 'Toggle Devtools',
      accelerator:process.plotform== 'darwin' ? 'Command+I' : 'Ctrl+I',
      click(item,focusedWindow){
        focusedWindow.toggleDevTools();
      }
    },{
    role:'reload'
    }
  ]
  })
}