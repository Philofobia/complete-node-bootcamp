//fs = file system
const fs = require("fs");
//reading and putting a file text inside a variable
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
//writing inside a text we create while taking text from another file
const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");
/*  SYNCHRONOUS CODE is also BLOCKING CODE because it will wait until the operation is finished to execute the next one.-
 because js is single thread.
 That is why we use ASYNCHRONOUS code, also called NON-BLOCKING code => non blocking I/O (input/output) model
 => this is why we use so many callback functions in Node.js 
 => time consuming tasks are executed in the background */
fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("Reading file...");
