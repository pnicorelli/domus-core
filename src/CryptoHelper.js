const NodeRSA = require('node-rsa');
const sha256 = require('js-sha256').sha256;

module.exports = class CryptoHelper {
  constructor(args){
    let privateKey = null;
    if( args && typeof args.privateKey !== 'undefined'){
      privateKey = args.privateKey;
    }
    this.engine = NodeRSA(privateKey);
  }

  setPrivateKey(pk){
    this.engine.importKey(pk)
  }

  getPublicKey(){
    return this.engine.exportKey('public');
  }

  getPrivateKey(){
    return this.engine.exportKey('private');
  }

  encrypt(data){
    let buf = Buffer.from(data, 'utf8')
    return this.engine.encrypt(buf);
  }

  decrypt(data){
    let buf = this.engine.decrypt(data, 'utf8');
    return buf.toString();
  }

  sha(data){
    return sha256(data);
  }
}
