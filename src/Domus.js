'use stricts';

const IPFS = require('ipfs');
const Room = require('ipfs-pubsub-room');
const NodeRSA = require('node-rsa');
const User = require('./User');
const Resources = require('./Resources');
const EventEmitter = require( 'events' );

module.exports = class Domus extends EventEmitter {
  constructor(args){
    super();
    //get public key
    this.name = args.name;

    let key = NodeRSA(args.privateKey);
    this.publicKey = key.exportKey('public');
    this.privateKey = key.exportKey('private');

    //// TODO: Current User and peers should be all User objects
    this.user = new User(args.user);
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
      this.resources = new Resources({
        privateKey: self.privateKey,
        publicKey: self.publicKey,
        ipfs: self.ipfs
      });

      self.nodeId = info.id

      const domusHall = Room(self.ipfs, self.getPublicAddress());

      domusHall.on('peer joined', (peer) => {
        domusHall.sendTo(peer, this.writeMessage('HELLO', self.user.headers()));
      });

      domusHall.on('peer left', (peer) => {
        this.userLeft(peer);
      });

      domusHall.on('message', (message) => {
        let msg = this.readMessage(message.data.toString())
        if( msg.type === 'HELLO'){
          this.addUser(msg.data, message.from);
        }
        if( msg.type === 'RESOURCE_SEARCH' && (this.user.userId !== msg.from)){
          let r = this.resources.find(msg.data.query);
          if( r.length > 0 ){
            domusHall.sendTo(message.from, this.writeMessage('RESOURCE_SEARCH_RESULT', r));
          }
        }
        if( msg.type === 'RESOURCE_SEARCH_RESULT'){
          let result = msg.data;
          for(let i in msg.data){
            this.resources.addReference(msg.data[i]);
            this.emit('resource finded', result)
          }
        }
        if( msg.type === 'ERROR'){
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
    return this.publicKey
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '').trim()
      .replace(/\n/g,'')
      .replace(/ /g,'')
  }

  getPublicKey(){
    return this.publicKey;
  }

  getPrivateKey(){
    return this.privateKey;
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
    return result;
  }

  /*
  read a Domus message
   */
  readMessage(message){
    //TO DO decrypt with ORG privatekey
    let msg, tmp, data;
    try{
      tmp = JSON.parse(message);
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
          error: err
        }
      }
      console.error('readMessage ERROR', err, msg, '--------');
    }
    return msg;
  }

  addUser(user, peerId){
    let newUser = {
      name: user.name,
      userId: user.userId,
      db: user.db,
      peerId: peerId,
      isOnline: true
    };
    this.peers[user.userId] = newUser;
    this.emit('user joined', newUser);
  }

  userLeft(peerId){
    for(let userId in this.peers){
      if( this.peers[userId].peerId === peerId){
        this.peers[userId].isOnline = false;
        this.emit('user left', this.peers[userId]);
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
    this.resources.addFile(resource, this.user);
  }

  findResource(search){
    if( search !== ''){
      this.domusHall.broadcast( this.writeMessage('RESOURCE_SEARCH', {query:search}));
      let result = this.resources.find(search);
    }
  }
}
