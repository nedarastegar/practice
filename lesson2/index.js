const {rmSync, createWriteStream } = require('fs');
const http=require('http');
const multiparty=require('multiparty');
const PORT=3000;


const server=http.createServer((req,res)=>{
    const {url,method}= req;
    if(url=="/" && method.toUpperCase()=="POST"){
        console.log('ok')

        let form = new multiparty.Form();
    form.parse(req);
        form.on('part',(part)=>{
            part.pipe(createWriteStream(`./stream/${part.filename}`))
            .on('close',()=>{
            res.writeHead(200,{'Content-type':'text/html'});
             res.end(
            `
            <h1>file uploaded</h1>
            `);
            })
        })

    }else{
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(
            `
            <form enctype="multipart/form-data" methode="POST" action="/" >
            <input type="file" name="upload-file">
            <button>upload file</button>
            </form>
            `);
    }
}


)
server.listen(PORT);
console.log(`run server ${PORT}`);