// Constants
const screenHeight = g.getHeight();
const midWidth = Math.floor(g.getWidth()/2);
const maxRad = 50;
const blockWidth = 20;

// Images
var blockI = require("heatshrink").decompress(atob("qEU4UB/9H///BIO6n1VACVq1QAQ1NrFwIAB34DC/wID/QED9NsJgfAAYUDBAcPAgcpCf4T/Cf4T/CYdv/4AC34EDABHptWqACGpCaYA="));

var blockSquare = require("heatshrink").decompress(atob("lEo4UC9H/A4P//8kwmqABFVABFfDAIAF+tQFoUD4AECgoJ/BP4JVrgJHmqz/BP6zzqoAIyoIHqw="));

var blockL = require("heatshrink").decompress(atob("lE84UBoH8///BIOg7dVABGqAAeVBJusFoUCBP4J/BMmrZwP//xF/BP6991QADCYgJIgfAAgU6BP4J/BKuvWYQAE/SuEABwA="));

var blockS = require("heatshrink").decompress(atob("lE84UB9FH///BINjjdVABFq1QACyoJDt4aB//+BIlsFoUDBP4J/BMlrWYbBD1QTEBoX//QJDgHAAYUKBP4J/BKtvUoYJEtS4D36zDBImACYbVDqwJ/BP4JfWYgJEW4eqBIdVBAep"));

var blockT = require("heatshrink").decompress(atob("nko4UBn/6///BIO55Nq1QAMBx1vEgIAB34EDAAf6tg9D4ADCgYEDhQO/B34O/B0Fq1QAC2AJChwID1QOE1//AAP+BwlVAAegDoUCyoKEB34O/B34Oz1QADByYA=="));
const blocks = [blockI,blockSquare,blockL,blockS,blockT];

// Initial Settings
let y=0;
let x = midWidth;
let index = 0;
let rotation = 0;
let metrics =g.imageMetrics(blocks[index]);

const rotate = ()=>{
  rotation += Math.PI/2;
  if (rotation === 2*Math.PI)
  { rotation = 0;}
};

const updateBlockIndex = ()=>{
  index = Math.floor(Math.random() * (blocks.length-1));
  metrics =g.imageMetrics(blocks[index]);
};

const resetBlock=()=>{
  y=0;
  x= midWidth;
  rotation=0;
  updateBlockIndex();
};

const fallBlock = ()=>{
  g.clear();
  y+=blockWidth;
  if (y  > screenHeight){resetBlock();}
  g.drawImage(blocks[index], x, y,{rotate:rotation});
};

g.setBgColor(0.1,0.1,0.1);
setWatch(() => {
  rotate();
}, BTN1,{repeat:true});

Bangle.on('touch', function(button, xy) {console.log(button);x += button*blockWidth; });
setInterval(()=> {fallBlock();},1000);
