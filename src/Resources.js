'use stricts';
const sha256 = require('js-sha256');
const NodeRSA = require('node-rsa');
var fs = require('fs');

module.exports = class Resources {
  constructor(args){
    this.key = NodeRSA(args.privateKey);
    this.ipfs = args.ipfs;
    this.resources = {};
  }

  /*
   {
       local_path: './filename.js',                //where the file is, full path, need for loading
       path: '/users/name/apps/vname.js',          // virtual path, need for indexing
       type: 'ASCII text',                         // resource's type, optional for handle different kind of file before use it
       tags: 'javascript example, javascrit, apps' // something for taxonomy, optional for create classes of resources
    }
  */
  async addFile(r, owner){
    let newResource = {};
    try{

      let data = fs.readFileSync(r.local_path);
      let encryptedContent = this.key.encrypt(data);
      let result = await this.ipfs.add({
        content: encryptedContent
      });
      newResource['path'] = r.path,
      newResource['owner'] = owner.userId,
      newResource['type'] = r.type,
      newResource['tags'] = r.tags,
      newResource['hash'] = result[0].hash,
      newResource['size'] = result[0].size,
      newResource['cdate'] = new Date().getTime(),
      this.resources[r.path] = newResource;
    } catch (error) {
      console.error('Resources.addFile ERROR', error);
    }
  }

  async readFile(){
    let hash = 'QmepQrJABN6ZkRSYHqM4PxnLEr22Y89z7mFJ792zufx78a';
    let encryptedContent = await this.ipfs.cat(hash);
    let data = await this.key.decrypt(encryptedContent);
    fs.writeFile("/tmp/sucamelo", data, function(err) {
      if(err) {
          return console.error(err);
      }
    });
  }

  find(search){
    let result = [];
    var rgxp = new RegExp(search, 'g');
    for(let hash in this.resources){
        let tmp = this.resources[hash];
        if( tmp.path.match(rgxp) ){
          result.push(tmp)
        }
    }
    return result;
  }

  // findResourceCallback(result){
  //   let old = this.resources;
  //   this.resources = [...new Set([...old ,...result])];
  // }

  addReference(r){
    this.resources[r.path] = r;
  }
}
