'use stricts';

const fs = require('fs');
const Resource = require('./Resource');

/**
 * Class ResourcesRepository
 */
module.exports = class ResourcesRepository {
  constructor(args){
    this.crypto = args.crypto,
    this.ipfs = args.ipfs;
    this.resources = {};
  }

  add(r){
    this.resources[r.path] = r;
  }

  async create(r, owner){
    let self = this;
    let newResource = new Resource(r);
    // newResource.path = r.type + '://' + r.path;
    let duplicate = this.findByPath(newResource.path);
    if( duplicate.length > 0 ){
      newResource.addRevision(duplicate[0]);
    }
    let result;
    switch (newResource.type) {
      case 'file':
        /*
         {
             type: 'file',                               // resource's type, required for handle different kind of resources
             local_path: './filename.js',                //where the file is, full path, need for loading
             path: '/users/name/apps/vname.js',          // virtual path, need for indexing
             tags: 'javascript example, javascrit, apps' // something for taxonomy, optional for create classes of resources
          }
        */
        try{
          let data = fs.readFileSync(r.local_path);
          let encryptedContent = self.crypto.encrypt(data);
          result = await self.ipfs.add({
            content: encryptedContent
          });
          newResource.name = newResource.path.split('\\').pop().split('/').pop(); //magic function to extract filename from abs path
        } catch (e){
          console.error('ResourcesRepository.create file', e);
        }
        break;
      case 'post':
        /*
         {
             name: 'The title',                               // resource's type, required for handle different kind of resources
             type: 'post',                               // resource's type, required for handle different kind of resources
             data: 'Lorem Ipsum',                        // MarkDown Text
             path: '/projects/abstract',                 // virtual path, need for indexing
             tags: 'news, bla bla bla'                   // something for taxonomy, optional for create classes of resources
          }
        */
        try{
          let encryptedContent = self.key.encrypt(r.data);
          result = await self.ipfs.add({
            content: encryptedContent
          });
        } catch (e){
          console.error('ResourcesRepository.create post', e);
        }
        break;
      default:
        throw new Error('Resource type not implemented');
    }
    newResource.userId = owner.getUserId();
    newResource.hash = result[0].hash;
    newResource.size = result[0].size;
    newResource.cdate = new Date().getTime();
    this.add(newResource);
  }

  async fetch(resource){
    let encryptedContent = await this.ipfs.cat(resource.hash);
    let data = await this.crypto.decrypt(encryptedContent);
    return {
      resource: resource,
      content: data
    }
  }

  findByName(search){
    let result = [];
    var rgxp = new RegExp(search, 'g');
    for(let hash in this.resources){
        let tmp = this.resources[hash];
        if( tmp.name.match(rgxp) ){
          result.push(tmp)
        }
    }
    return result;
  }

  findByPath(path){
    let result = [];
    var rgxp = new RegExp(path, 'g');
    for(let hash in this.resources){
        let tmp = this.resources[hash];
        if( tmp.path.match(rgxp) ){
          result.push(tmp)
        }
    }
    return result;
  }

}
