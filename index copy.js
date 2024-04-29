
const puppeteer=require('puppeteer');
const fs = require("fs");
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless:false,
    defaultViewport:false,
    userDataDir:"./tmp"
  });
  const page = await browser.newPage();
  const url='https://blog.ankitsanghvi.in/'
  // Navigate the page to a URL
  await page.goto(url);
  const Data=await page.evaluate(()=>{
    const article=Array.from(document.querySelectorAll('Article'))
    const datas=article.map((value,index)=>{
      
        c={}
        c.title=value.querySelector(".post-card-title").innerText
        c.info=value.querySelector("div a section p").innerText
        c.imgSrc='https://blog.ankitsanghvi.in/'+value.querySelector("a img").getAttribute('src')
        return c
    })
    return datas
  })
 
  let csv = "title,info,imgSrc\n";
  Data.forEach( l => {
    csv += `${l.title}` + ',';
    csv += `${l.info}` + `,`;
    csv += l.imgSrc + "\n";
  })
  console.log('@success', csv);
  fs.writeFileSync("final.csv", csv)
  // let's just call them tweetHandle 
// const productHandles = await page.$$('.a-unordered-list.a-nostyle.a-horizontal.a-spacing-none');

// // loop thru all handles
// for(const producthandle of productHandles){

//    // pass the single handle below
//    const singleProduct = await page.evaluate(el => el.querySelector("div.a-section.octopus-dlp-asin-title > a").textContent, productHandles)

//    // do whatever you want with the data
//    console.log(singleProduct) 
// }

  await browser.close();
  })();
