#! /usr/bin/env node
const chalk = require('chalk')
const open = require('open');
const process = require('process')
const {Web3Storage,getFilesFromPath}=require('web3.storage')
const boxen = require('boxen')
const yargs = require("yargs");
const figlet = require('figlet');
const { ThirdwebSDK } =require ("@thirdweb-dev/sdk/evm");
const sdk = new ThirdwebSDK("goerli");
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc2M2U4ZkMzNTFkNGQ0MUE4NWNFYUUyM2REMUQzNmFFODZDZEVlOGUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzI4MjIzOTc4ODUsIm5hbWUiOiJwcmFjdGljZSJ9.4bYpuLAKN_3pZAY0DSxrHY_8ejGG3CU-LRkRQrxzNs4";
let data={
    "root":{
            "Tongue.mp4":"bafybeibd5rmgklya5foogrttemgblorxvwma2s3bvatg3cjpxbben337l4",
            "folder3":{
                "years.txt":"bafybeibhb3mgrddh3s7dq7eywieql2rdesz2upxqh7kbb2mtggrbg7lmrq",
                "qr.png":"bafybeieaaycoktceieii4dnjbbdjgqyyq6ve66ctx72ffl3akfxcajxgoa"
                }
        }

    }
 let data_list={"dataset.csv":"bafybeighsdgr6pciygessmkcvc3h42kf3kjg6zyjxigacvvfewvktce3xi", "Tongue.mp4":"bafybeibd5rmgklya5foogrttemgblorxvwma2s3bvatg3cjpxbben337l4","years.txt":"bafybeibhb3mgrddh3s7dq7eywieql2rdesz2upxqh7kbb2mtggrbg7lmrq","qr.png":"bafybeieaaycoktceieii4dnjbbdjgqyyq6ve66ctx72ffl3akfxcajxgoa"}
present_directory="root"
present_directory_path=["root"]
present_root=data["root"]

function traverse(o,level) {

        for (var i in o) {
            let space=""
            for(let h=0;h<level;h++){
                space=space+"  "
            }
            space=space+"|_"
            console.log(space,i);
            if (!!o[i] && typeof(o[i])=="object") {
                traverse(o[i],level+1);
            }
        }
    }
function get_present_root(o){
    for (var i in data) {
        console.log(i);
        if(i==o){
            return data[i]
        }
        if (!!data[i] && typeof(data[i])=="object") {
            return traverse(data[i],level+1);
        }
    }
    return undefined
}
// reading token from token.txt
var fs = require("fs");
const { demandOption } = require('yargs')
fs.readFile("token.txt", function(err, buf) {
    if(buf==null){
        fs.writeFile("token.txt", "");
    }
    token=buf.toString();
});
// console.log(token)
// function to upload file
async function upload_files(){
    // const contract = await sdk.getContract("0x1E40f4230B9ae6aFfa91dB05b0Dc5566E8DC8C0a");

    const storage = new Web3Storage({ token })
    const files = []
    path=argv.u||argv.upload
    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)

    console.log(`Uploading ${files.length} files`)
    const cid = await storage.put(files)
    data_list[path]=cid;
    // const data = await contract.call("put_file", path, cid)
    console.log('Content added with CID:', cid)

}
async function download_file(){
    // const contract = await sdk.getContract("0x1E40f4230B9ae6aFfa91dB05b0Dc5566E8DC8C0a");
    console.log("Downloading...")
    file_name=argv.d||argv.download
    if(file_name in data_list){
        // cid=await contract.call("get_cid", file_name)
        link="https://"+data_list[file_name]+".ipfs.w3s.link/"+file_name
        open(link) 
    }
}
const usage = 
boxen(chalk.green("\n" + "IPFS Storage manager" + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n"
+chalk.keyword('violet')("\nUsage: #drive <options>\n"
+chalk.keyword('blue')('\nInstallation steps ')
+ chalk.keyword('orange')("\n1. Signup with https://web3.storage/login/ \n2.Get you API token at https://web3.storage/tokens \n3.Run the command ")
+ chalk.keyword('violet')("hashdrive -t <your-API-TOKEN-key>")
);
const options = yargs
      .usage(usage)
      .option("t",{alias:"token",describe:"updating the web3.storage API token",type : "string" , demandOption : false})
      .option("u",{alias:"upload",describe:"upload file to web3.storage",type:"string",demandOption:false})
      .option("d",{alias:"download",describe:"download file",type:"string",demandOption:false})
      .option("l",{alias:"ls",describe:"list all file structures in present directory",type:Boolean ,demandOption:false})
      .option("p",{alias:"pwd",describe:"returns the present working directory",type:Boolean ,demandOption:false})
      .option("c",{alias:"cd",describe:"change directory",type:"string" ,demandOption:false})
      .help(true)
      .argv;

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

if(argv.l!=null || argv.list!=null){
    traverse(present_root,0)
}
else if(argv.c!=null || argv.cd!=null){
    file_name=argv.c||argv.cd
    if(file_name=".."){
        if(present_directory="root"){
            console.log("presently in root")
        }
        else{
            present_directory_path.pop()
            present_directory=present_directory_path[-1]
            get_present_root(present_directory)
            console.log("changed to ",present_directory)
        }
    }
    else{
        let flag=false
        for (var i in present_directory){
            if(i==file_name ){
                flag=true
                if(typeof(present_directory[i])=="object"){
                    present_directory=file_name
                    present_directory_path.push(file_name)
                    present_directory=present_directory[file_name]
                }
                else{
                    console.log("Enter valid folder name")
                }
            }
        }
        if(flag==flase){
            console.log("No such folder exists!")

        }
    }
}
else if (argv.token != null || argv.t != null){
    var fs = require("fs");
    var API_token = argv.t  || argv.token;
    token=API_token;
    fs.writeFile("token.txt", API_token, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
    });
}
else if(argv.d!=null || argv.download!=null){
    download_file();
}
else if(argv.p!=null || argv.pwd != null){
    console.log("We have",present_directory)
}
else if (argv.upload != null || argv.u != null){
    upload_files()

    // if (token==null ||(argv.token==null && argv.t==null) ) {
    //     return console.error('A token is needed. You can create one on https://web3.storage')
    // }
    // else{
    //     upload_files()
    // }
}
else {
    console.log(
        chalk.yellow(
            figlet.textSync('#DRIVE', { horizontalLayout: 'full' })
        )
    );
    yargs.showHelp();
}


