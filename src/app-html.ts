import fs from 'fs'
import http from 'http'

const server = http.createServer((req, resp) => {
    
    // console.log(req.url)
    // if(req.url === '/index'){
    //     resp.write('Its INDEX')
    //     resp.end()
    // }

    // const data = {name: 'Json DATA', format: 'JSON', large: 1}
    // resp.writeHead(200,{'Content-Type': 'application/json'})
    // resp.end(JSON.stringify(data))

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        resp.writeHead(200,{'Content-Type': 'text/html'})
        resp.end(htmlFile)
    } else{
        resp.writeHead(404,{'Content-Type': 'text/html'})
        resp.end();
    }
})

server.listen(8080, () =>{
    console.log('Server running on port 8080')
})