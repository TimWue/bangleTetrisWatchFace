// Constants
const screenHeight = g.getHeight();
const twoThirdWidth = Math.floor((g.getWidth()/3)*2);

const midWidth = Math.floor(g.getWidth()/2);
const maxRad = 50;
const blockWidth = 10;

// Images

var blockI = require("heatshrink").decompress(atob("qEU4UB/9H///BIO6n1VACVq1QAQ1NrFwIAB34DC/wID/QED9NsJgfAAYUDBAcPAgcpCf4T/Cf4T/CYdv/4AC34EDABHptWqACGpCaYA="));

var blockSquare = require("heatshrink").decompress(atob("lEo4UC9H/A4P//8kwmqABFVABFfDAIAF+tQFoUD4AECgoJ/BP4JVrgJHmqz/BP6zzqoAIyoIHqw="));

var blockL = require("heatshrink").decompress(atob("lE84UBoH8///BIOg7dVABGqAAeVBJusFoUCBP4J/BMmrZwP//xF/BP6991QADCYgJIgfAAgU6BP4J/BKuvWYQAE/SuEABwA="));

var blockS = require("heatshrink").decompress(atob("lE84UB9FH///BINjjdVABFq1QACyoJDt4aB//+BIlsFoUDBP4J/BMlrWYbBD1QTEBoX//QJDgHAAYUKBP4J/BKtvUoYJEtS4D36zDBImACYbVDqwJ/BP4JfWYgJEW4eqBIdVBAep"));

var blockT = require("heatshrink").decompress(atob("nko4UBn/6///BIO55Nq1QAMBx1vEgIAB34EDAAf6tg9D4ADCgYEDhQO/B34O/B0Fq1QAC2AJChwID1QOE1//AAP+BwlVAAegDoUCyoKEB34O/B34Oz1QADByYA=="));

const getIBlock = (x,y)=>{
  return[x,y,x+4*blockWidth,y,x+4*blockWidth, y+blockWidth,x,y+blockWidth]; 
};

const getSquaredBlock = (x,y)=>{
  return[x,y,x+2*blockWidth,y,x+2*blockWidth, y+2*blockWidth,x,y+2*blockWidth]; 
};

const getLBlock = (x,y)=>{
  let indices ;
  indices = 
    [x, y,
     x+3*blockWidth, y,
     x+3*blockWidth,y+2*blockWidth,
     x+2*blockWidth,y+2*blockWidth,
     x+2*blockWidth,y+blockWidth,
     x,y+blockWidth];
  return indices;
};

const getSBlock = (x,y)=>{
  let indices = 
      [x,y,
       x+2*blockWidth,y,
       x+2*blockWidth,y+1*blockWidth,
       x+3*blockWidth,y+blockWidth,
       x+3*blockWidth,y+2*blockWidth,
       x+blockWidth,y+2*blockWidth,
       x+blockWidth,y+1*blockWidth,
       x,y+blockWidth]; 
  return indices;
};


const getTBlock = (x,y)=>{
  return[x,y,x+3*blockWidth,y,x+3*blockWidth,y+blockWidth,x+2*blockWidth,y+blockWidth,x+2*blockWidth,y+2*blockWidth,
         x+blockWidth,y+2*blockWidth,x+blockWidth,y+blockWidth,x,y+blockWidth]; 
};

const blockFuncs = [getIBlock,getSquaredBlock,getLBlock,getSBlock,getTBlock];
const colors = [{r:1,g:0,b:0},{r:0,g:1,b:0},{r:0,g:0,b:1},{r:1,g:1,b:0},{r:0,g:1,b:1}];
// Initial Settings
let y=0;
let x = 25;
let index = 0;
let rotation = 0;

const rotate = ()=>{
  rotation += Math.PI/2;
  if (rotation === 2*Math.PI)
  { rotation = 0;}
};

const updateBlockIndex = ()=>{
  index = Math.floor(Math.random() * (blockFuncs.length-1));
};

const resetBlock=()=>{
  y = 0;
  x = 25;
  rotation=0;
  updateBlockIndex();
  g.setColor(colors[index].r,colors[index].g,colors[index].b);
};

const fallBlock = ()=>{
  y+=blockWidth;
  if (y  > screenHeight){resetBlock();}
  const func =blockFuncs[index];
  g.fillPoly(func(x,y),true);
};


const drawBackground = ()=>{
  g.setColor(0,0,0);
  g.fillRect(twoThirdWidth - 25,0,g.getWidth(),screenHeight);
};

const drawFirstContainer = (x,y,key)=>{
  const h = 15;
  const w = 70;
  const pad = 2;
  g.setColor(1,1,1);
  g.fillRect(x,y, x + w,y+h);
  g.setColor(0,0,0);
  g.drawRect(x + pad, y+pad, x + w -pad,y+h-pad);
  g.setFont("6x8:2x1");
  g.drawString(key, x+12,y+2*pad);
};

const drawDateContainer = (x,y,key)=>{
  const h = 25;
  const w = 90;
  const pad = 1;
  g.setColor(1,1,1);
  g.clearRect(x,y, x + w,y+h);
  g.fillRect(x,y, x + w,y+h);
  g.setColor(0,0,0);
  g.drawLine(x,y+pad,x+w,y+pad);
  g.drawLine(x,y+h-pad,x+w,y+h-pad);
  g.setFont("12x20");
  g.drawString(key, x+20,y+4*pad);
};

const drawWhiteContainer = (x,y,key,value)=>{
  const h = 25;
  const w = 70;
  const pad = 2;
  g.setColor(1,1,1);
  g.clearRect(x,y, x + w,y+h);

  g.fillRect(x,y, x + w,y+h);
  g.setColor(0,0,0);
  const a = g.drawRect(x + pad, y+pad, x + w -pad,y+h-pad);
  g.setFont("6x8");
  g.drawString(key, x+3*pad,y+2*pad);
  g.drawString(value, x+3*pad,y+2*pad+10);
};

const getTimeString = ()=>{
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  return ("0"+h).substr(-2) + ":" + ("0"+m).substr(-2);
};

const getDateString = ()=>{
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  return ("0"+day).substr(-2) + "." + ("0"+month).substr(-2)+ "." + year;
};

const drawWall = (x)=>{
  const thickness = 8;
  g.setColor(0.4,0.3,0.15);
  g.fillRect(x,0,x+thickness,screenHeight);
};

const clearArea = ()=>{
g.clearRect(10,0,twoThirdWidth-38,screenHeight);
};

const draw = ()=>{
  clearArea();

fallBlock();
};

setWatch(() => {
  rotate();
}, BTN1,{repeat:true});

Bangle.on('touch', function(button, xy) {x = Math.min(40, x+ button*blockWidth); });

const drawInformation= ()=>{
  drawFirstContainer(twoThirdWidth-18, 10,"Time");
  drawDateContainer(twoThirdWidth-25, 35,getTimeString());
  drawWhiteContainer(twoThirdWidth-18, 70,"Date",getDateString());
  drawWhiteContainer(twoThirdWidth-18, 100,"Battery",E.getBattery()+"%");
  g.setColor(colors[index].r,colors[index].g,colors[index].b);

};

// Start Clock-Face
g.clear();
drawBackground();
drawWall(twoThirdWidth-35);
drawWall(0);
drawInformation();
setInterval(()=> drawInformation,60000);

var blockInterval = setInterval(draw,1000);

Bangle.on('lcdPower',on=>{
  if (blockInterval) clearInterval(blockInterval);
  blockInterval = undefined;
  if (on) {
    blockInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  }
});

// Show launcher when middle button pressed
Bangle.setUI("clock");
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
