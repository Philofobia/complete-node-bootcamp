//fs = file system
const fs = require("fs");
//http module => network capabilities such as building a http server
const http = require("http");
//needed for routing
const url = require("url");

//FILES
//reading and putting a file text inside a variable
/* const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn); */

//writing inside a text we create while taking text from another file
/* const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!"); */

/*  SYNCHRONOUS CODE is also BLOCKING CODE because it will wait until the operation is finished to execute the next one.-
 because js is single thread.
 That is why we use ASYNCHRONOUS code, also called NON-BLOCKING code => non blocking I/O (input/output) model
 => this is why we use so many callback functions in Node.js 
 => time consuming tasks are executed in the background */

// CALLBACK HELL
/* fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR!");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) return console.log("ERROR 1!");
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      if (err) return console.log("ERROR 2!");
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
        if (err) return console.log("ERROR 3!");
        console.log("Your file has been written.")
      })
    });
  })
});
console.log("Reading file...");
 */

//SERVER
//possiamo caricare il json all'esterno e in modo sincrono perché verrà caricato solo una volta all'avvio del server
//successivamente verrà renderizzato ogniqualvolta verrà richiamato all'interno della const server,pathName /api
// qui il file viene letto e messo in un oggetto, quando viene richiesto invece viene solo riprodotto dal client
/* fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err,data) => {
  const productData = JSON.parse(data);
}); */
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);


//working with templates, we will learn to do it with frameworks like angular/react
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
}
// when we have a server running like this to exit we dont use ctrl+d anymore but ctrl+c
// request/response
const server = http.createServer((req, res) => {
  const pathName = req.url;

  //Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-Type": "html" });
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
    //product page
  } else if (pathName === "/product") {
    res.end("This is the product!");

  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(dataObj);
  } else {
    //you can write the header, always write them before the response
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not Found!</h1>");
  }
  //simpliest way to send a response from a server
  //res.end("Hello from the server!");
});

//accept ports, hosts(default is localhost), callback function that will start as soon as the server start listening
// now the app can exit right away because of the EVENT LOOP, the all goal is to wait the requests to come
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
