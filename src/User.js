'use stricts';

const CryptoHelper = require('./CryptoHelper');

module.exports = class User {
  constructor(name){
    this.name = name;
    this.crypto = new CryptoHelper();
    this.peerId = '';
    this.userId = '';
  }

  setPrivateKey(pk){
    this.crypto.setPrivateKey(pk)
    this.userId = this.crypto.sha(this.crypto.getPublicKey());
  }

  setUserId(uid){
    this.userId = uid;
  }

  getUserId(){
    return this.userId;
  }

  setPeerId(peerId){
    this.peerId = peerId;
  }

  getPeerId(peerId){
    return this.peerId;
  }

  getName(){
    return this.name;
  }

  headers(){
    return JSON.stringify({
      userId: this.getUserId(),
      name: this.getName()
    });
  }
}
