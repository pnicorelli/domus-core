'use stricts';

module.exports = class Resource {

  constructor(args){
      if( !args.type ){
        throw new Error('Resource type is mandatory');
      }
      this.name = args.name || null;
      this.type = args.type || null;
      this.path = args.type + '://' + args.path;
      this.hash = args.hash || null;
      this.signature = args.signature || null;
      this.userId = args.userId || null;
      this.tags = args.tags || null;
      this.size = args.size || null;
      this.cdate = args.cdate || null;
      this.versions = args.versions || [];
  }

  addRevision(r){
    let newResource = new this(r);
    newResource.version.push(r)
  }

}
