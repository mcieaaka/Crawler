const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
ArticleList = async(url) =>{
    const browser = await puppeteer.launch({
      headless:true
    })
    const page = await browser.newPage();
    await page.goto(url);
  
    const htmlContent = await page.content();
    const $= cheerio.load(htmlContent);
    const articleLinks = [];
    $("article> div > div > div > div > div > div:nth-child(2) > div > div.l.dq > div > div > div > div > div > div:nth-child(1) > a").each((index,element)=>{
      articleLinks.push({
        link:$(element).attr("href"),
        title:$(element).find("h2").text(),
        intro:$(element).find("p").text()
      }) ;
    })
    return (articleLinks);
}

SpecificArticle = async(url)=>{
    const browser = await puppeteer.launch({
      headless:true
    })
    const page = await browser.newPage();
    await page.goto(url);
  
    const htmlContent = await page.content();
    const $= cheerio.load(htmlContent);
    const title=$("article > div > div:nth-child(2) > section > div > div:nth-child(2) > div").find("h1").text();
    const image=$("article > div > div:nth-child(2) > header > div").find("img").attr("src");
    const author=$("article > div > div:nth-child(2) > header > div").find("a").text();
    const date = $("article > div > div:nth-child(2) > header > div >div>div:nth-child(2)>div:nth-child(2)").find("span").text();
    const headings =[];
    $("article > div > div:nth-child(2) > section > div > div:nth-child(2)>h1").each((index,element)=>{
      headings.push($(element).text());
  })
    $("article > div > div:nth-child(2) > section > div > div:nth-child(2)>h2").each((index,element)=>{
        headings.push($(element).text());
    })
    const content_paras =[];
    $("article > div > div:nth-child(2) > section > div > div:nth-child(2)>p").each((index,element)=>{
        content_paras.push($(element).text());
    });
    const allimages = []
    $("article > div > div:nth-child(2) > section > div > div:nth-child(2)>figure").each((index,element)=>{
        allimages.push($(element).find("img").attr("src"));
    })
    article={
      title,
      author,
      image,
      date,
      headings,
      content_paras,
      allimages
    };
    return (article);
}

module.exports={
    SpecificArticle,
    ArticleList
}