'use stricts';

const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');
const User = require('./User');
const CryptoHelper = require('./CryptoHelper');
const ResourcesRepository = require('./ResourcesRepository');
const EventEmitter = require( 'events' );

module.exports = class Domus extends EventEmitter {
  constructor(args){
    super();
    this.name = args.name;
    if ( !args || typeof args.privateKey !== 'string') {
      throw new Error('You need to provide a privateKey');
    }
    this.crypto = new CryptoHelper({
      privateKey: args.privateKey
    });

    this.user = new User(args.user.name);
    this.user.setPrivateKey(args.user.privateKey)
    this.peers = {};

    // start IPFS
    this.initIPFS();

    //subscribe to pubsub /:publickey channel
    var self = this;
    self.ipfs.once('ready', () => self.ipfs.id((err, info) => {
      if (err) {
        throw err
      }
      this.user.setPeerId(info.id);
      this.resources = new ResourcesRepository({
        crypto: self.crypto,
        ipfs: self.ipfs
      });

      const domusHall = Room(self.ipfs, self.getPublicAddress());

      domusHall.on('peer joined', (peer) => {
        domusHall.sendTo(peer, this.writeMessage('HELLO', self.user.headers()));
      });

      domusHall.on('peer left', (peer) => {
        this.userLeft(peer);
      });

      domusHall.on('message', (message) => {
        let msg = self.readMessage(message.data)
        switch (msg.type) {
          /*
            When user join a channel send a HELLO with his infos
           */
          case 'HELLO':
            self.addUser(msg.data, message.from);
            break;
          /*
            Someone ask me for resources
           */
          case 'RESOURCE_SEARCH':
            if( self.user.userId !== msg.from ){ //I receive my RESOURCE_SEARCH message because is broadcast
              let r = self.resources.findByName(msg.data.query);
              if( r.length > 0 ){
                domusHall.sendTo(message.from, self.writeMessage('RESOURCE_SEARCH_RESULT', r));
              }
            }
            break;
          /*
            Someone reply me for resources
           */
          case 'RESOURCE_SEARCH_RESULT':
            let result = msg.data;
            for(let i in msg.data){
              self.resources.add(msg.data[i]);
              self.emit('resource finded', result)
            }
            break;
          /*
            Yeah, everyone want to chat :P
           */
          case 'CHAT':
            let m = {
              userId: msg.from,
              cdate: msg.data.cdate,
              msg: msg.data.msg
            }
            self.emit('chat message', m)
            break;
          default:
            console.error('This message is invalid', msg, message)
        }
      });

      this.domusHall = domusHall;
      this.emit('ready');
    }));
  }

  initIPFS(){
    this.ipfs = new IPFS({
      EXPERIMENTAL:{
        pubsub: true
      },
      repo: this.repoName(),
      config: {
        Addresses: {
          Swarm: [
            '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
          ]
        }
      }
    });
  }

  repoName(){
    return 'data/pubsub/' + Math.random();
  }

  /*
  kind of querystring for publicKey
   */
  getPublicAddress(){
    let addr = this.getPublicKey();
    return addr
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '').trim()
      .replace(/\n/g,'')
      .replace(/ /g,'')
  }

  getPublicKey(){
    return this.crypto.getPublicKey();
  }

  getPrivateKey(){
    return this.crypto.getPrivateKey();
  }

  /*
  Build a Domus message
   */
  writeMessage(type, data){
    let msg = {
      from: this.user.userId,
      type: type,
      data: data
    }
    //TO DO encryption with ORG pubkey
    let result = JSON.stringify(msg);
    return this.crypto.encrypt(result);
  }

  /*
  read a Domus message
   */
  readMessage(message){
    //TO DO decrypt with ORG privatekey
    let msg, tmp, data;
    let plainMessage = this.crypto.decrypt(message);
    try{
      tmp = JSON.parse(plainMessage);
      try{
        data = JSON.parse(tmp.data);
      } catch (e){
        data = tmp.data;
      }
      msg = {
        from: tmp.from,
        type: tmp.type,
        data: data
      }
    } catch (err) {
      msg = {
        from: null,
        type: 'ERROR',
        data: {
          original: message,
          plain: plainMessage,
          error: err
        }
      }
      console.error('readMessage ERROR', err, msg, '--------');
    }
    return msg;
  }

  addUser(user, peerId){
    let u = new User(user.name);
    u.setPeerId(peerId);
    u.setUserId(user.userId);
    this.peers[user.userId] = u;
    this.emit('user joined', u);
  }

  userLeft(peerId){
    for(let userId in this.peers){
      if( this.peers[userId].peerId === peerId){
        this.emit('user left', this.peers[userId]);
        delete this.peers[userId];
        return;
      }
    }
  }

  getUsersArray(){
    let arr = [];
    for(let userId in this.peers){
      arr.push(this.peers[userId]);
    }
    return arr;
  }

  addResource(resource){
    this.resources.create(resource, this.user);
  }

  findResource(search){
    if( search !== ''){
      this.domusHall.broadcast( this.writeMessage('RESOURCE_SEARCH', {query:search}));
      let result = this.resources.findByName(search);
    }
  }

  sendChatMessage(msg){
    let cdate = (new Date()).toISOString();
    this.domusHall.broadcast( this.writeMessage('CHAT', {msg:msg, cdate:cdate }));
  }
}
