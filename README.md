HTML(WORD)
1. mudar enconding (UTF-* ou western ISO 8859-1) para acentos
2. ctrl+h (replace)
3. \n --- ''
4. \t --- ' '
5. '  ' --- ' ' (repeat until 0)
6. ' ------ \'
7. subistituir dados (cliente, representante cnpj)

GIT
1. git init
2. git add README.md
3. git commit -m "first commit"
4. git branch -M main
5. git remote add origin https://github.com/Caitano09/observer.git
6. git push -u origin main
7. git checkout f55b8056678b9a98f58ba9103700c706b17a812e -- .

MIDIA QUERIES
1. 320px — 480px: Mobile devices
2. 481px — 768px: iPads, Tablets
3. 769px — 1024px: Small screens, laptops
4. 1025px — 1200px: Desktops, large screens
5. 1201px and more —  Extra large screens, TV

GCP
1. Comando do contêiner: /layers/google.nodejs.runtime/node/bin/node 
2. Argumentos de contêiner: src/job.js  | MarcasIntegracao

CODIFICAÇÂO
1. incode: Buffer.from("a830452f9fe7062f77f946a816a6bed77247929e:123", 'utf8').toString('base64')
2. decode: Buffer.from("YTgzMDQ1MmY5ZmU3MDYyZjc3Zjk0NmE4MTZhNmJlZDc3MjQ3OTI5ZToxMjM=", 'base64').toString('utf8')
-. obs: caso seja obj usar JSON.stringify(obj) no lugar do primeiro argumento

