const fs = require('fs');
const readline = require('readline');
const axios = require('axios').default

async function processLineByLine() {
  const fileStream = fs.createReadStream('../pessoas.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let firstLine = true;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if(firstLine){
        firstLine = false
    }else{
        const user = line.split(";")
        console.log(user)
    }
  }
}

processLineByLine();