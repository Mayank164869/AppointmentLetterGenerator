const generatePDF = async (name,pos,date,join, ter) => {
  const { PDFDocument, rgb } = PDFLib;

  const exBytes = await fetch("./certificates/img2.pdf").then((res) => {
    return res.arrayBuffer();
  });

  const exfont = await fetch("./Fonts/DancingScript-Bold.ttf").then(res => {
    return res.arrayBuffer()
  });
  const exfont1 = await fetch("./Fonts/Roboto-Medium.ttf").then(res => {
    return res.arrayBuffer()
  });
  const exfont2 = await fetch("./Fonts/Roboto-Light.ttf").then(res => {
    return res.arrayBuffer()
  });

  // console.log(exBytes)
  const pdfDoc = await PDFDocument.load(exBytes)
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exfont);
  const myFont1 = await pdfDoc.embedFont(exfont1);
  const myFont2 = await pdfDoc.embedFont(exfont2);

  const pages = pdfDoc.getPages();
  const pg1 = pages[0];
  pg1.drawText(name, {
    x: 95,
    y: 730,
    size: 35,
    font: myFont,
    color: rgb(0,0,0)
  })

  pg1.drawText(pos, {
    x: 530,
    y: 650,
    size: 27,
    font: myFont1,
    color: rgb(0,0,0)
  })

  pg1.drawText(date, {
    x: 1020,
    y: 1150,
    size: 25,
    font: myFont1,
    color: rgb(0,0,0)
  })
  pg1.drawText(join, {
    x: 390,
    y: 530,
    size: 25,
    font: myFont1,
    color: rgb(0,0,0)
  })
  pg1.drawText(ter, {
    x: 740,
    y: 530,
    size: 25,
    font: myFont1,
    color: rgb(0,0,0)
  })
  pg1.drawText("The Internship will start from ", {
    x: 50,
    y: 530,
    size: 25,
    font: myFont2,
    color: rgb(0,0,0)
  })
  pg1.drawText("and will end at ", {
    x: 550,
    y: 530,
    size: 25,
    font: myFont2,
    color: rgb(0,0,0)
  })
  const uri = await pdfDoc.saveAsBase64({ dataUri: true })
  // // console.log(uri)
  // // window.open(uri)
  // saveAs(uri, "Padhega India Certificate.pdf", { autoBom: true })
  document.querySelector("#mypdf").src = uri;
};

const subBTN = document.getElementById("submit");
const inputVal = document.querySelector("#name");
const inputPos = document.querySelector("#pos");
const inputDate = document.querySelector("#date");
const inputJoin = document.querySelector("#join");
const inputTer = document.querySelector("#ter");

subBTN.addEventListener("click", () => {
  const val = inputVal.value;
  const pos = inputPos.value;
  const date = inputDate.value;
  const join = inputJoin.value;
  const ter = inputTer.value;
  generatePDF(val,pos,date,join,ter)
})

generatePDF(val,pos)