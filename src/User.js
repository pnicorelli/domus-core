'use stricts';
const sha256 = require('js-sha256');
const NodeRSA = require('node-rsa');

module.exports = class User {
  constructor(args){
    this.name = args.name;
    this.privateKey = args.privateKey;
    this.peerId = '';
    let key = NodeRSA(this.privateKey);
    this.publicKey = key.exportKey('public');
    this.userId = this.getUserId();
  }

  getUserId(){
    return sha256(this.publicKey);
  }

  setPeerId(peerId){
    this.peerId = peerId;
  }

  getName(){
    return this.name;
  }

  headers(){
    return JSON.stringify({
      userId: this.getUserId(),
      name: this.getName(),
      db: 'to be defined',
    });
  }
}
