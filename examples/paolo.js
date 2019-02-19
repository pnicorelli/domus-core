const Domus = require('../index');


const user = {
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAytz2Xk5z2egsk9du+moBzl8i/QJmNdgG4BHyNTeBgbwFPh0+
Sxnk5RYsMNzM0vKrLwx4cstY2iep1K1Gl3Bw3ZgTXCRZ0PWYMAHcmEazxEaZiSdu
ggTQiCLsR7iAgBa5TyFUWRPPLjyXPdyow4Ub5yAO+8uhzvjQIDSAMTpTl2wMn8ZS
FrdP/U8ZJrDHkWgSfl+TdLF6LgDWYHekhZ74uLcupKl+tSW9XeLvE5WYfSvHTOM6
sdkzovkmzVYwqvEycB/DurTUSdsP0FGlyJWfBDy90q+sOKFr/k3mNKongUJigjpa
1mIWp2uRYz2uxbT1Gz5VEUX+qYG10KmGOo7jwwIDAQABAoIBAGch6saLD+7KUE9h
CPSaDA0E5N7H53qcNvKXbRGNBHQWSHwJle/MXEfy+8hjmGXuJQUoS9vgcW2HGJoc
9XRsH5UoiT8g4+CN2y8c4y8vUpkIY2oM9+t10yZCyuizbfCwnMkT4rPelEenWiSD
F/E+rK7V54gvQDXe3MBisIFWa8TgqtLf6kxtNxZuZhmhk8hZt6oeHPiHWB5akIHX
Q1F25an6aSUJAyMDyliGy7kxYTzKVGRguUHowS6uJ7FeQVyh1KexpeMsbsS9TnXq
VDV+QnVCnTyCR9CltEaFqh2tnF9XjISvKmLDftK0UHvqioO4M1L2z095Tq7LOjAr
rVOvOeECgYEA+nexG908P408urX91FrgQQak6YyROYN05JcXApZFspkMPJ/Aba8v
zkhPmZh98aoRaVS/tcqX1ykg2YqEhfX7CViWh/1cnuvFj8+gbdopOVm0sZQt/1fY
6cUPn9SOVH/ChSTijAH6NrIVB3kuoa7POiQUPbgxJE/qmT8H30W2dQkCgYEAz1gV
erpx5NA6Ohy8X+O0tJBBt2zBuYu+7QEdl631z0Cw5jDX+hxb1n6ZxVKLq3LkonxR
VMjAaGPIbLyGzuel+wpdOayTnjVAy5GNMnZHs3FL1flzXbcUqSl6I920sglCrJKH
5gzF6Ls95Wxk9xEBnRFNgpuhqQFqK7XGnSRLcWsCgYAuFEEgKDaCVqCalQrKu6FQ
NUG3ueWp2BZ0S5uvHShbcC7BJH7JbxZzc/g5AMYC5M/pOe8/KbN/oRBrFUHGR3fU
w1iGUkVs82FYUNFqBF3bMDa/CMzhki7U6y0xsXAx+YM27Y9ERMTctSyLQG8kzb1Q
K/0RUcawsIcvhFoVaITlyQKBgQDLQnhcBaZdPtu12DG6dsjRMZGatNz8fcg/IpbV
+M09zRcdscgoAeDt1tH7pD4TZuBHgUNhsCMesqLqJa6p6mDGRpS5UzqrH11Tsm4O
h/EmMey76Hx15GI2qth3jIH0/isEbekXVnI1AkldPPOFWICSb0HixZqmySJBk0MP
DWN/3QKBgQCJR4GwLHdgQl5MlwUoTsQT3OqBYfn0Oxx63hvH+eKjFa8QJ8Nn+ISj
Ei6dwcJXzz+jYA0aBKZ1fFxtUib5nitDwAWY5s9pbYgeiRs+3BTo8iEV6hwRWSIF
7GZXRhpq1q+QtiYJW9Rr7uuZFE5E78H6IMM+kmHUQf3uwwFjPcrdIA==
-----END RSA PRIVATE KEY-----`,
  name: 'Paolo Nicorelli'

}

const orgConfig = {
  privateKey : `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAnlXRcSPkEM8Epv59wdrFjUW4fjHSK5hKd14tldXvcoyKPnJhgCPpwNpB
+qUh3+ZnCH3PvW8D9wjMbMCLZXE0Z/S4zbJuaV32YA9PscUOBW/hWnBX7GFhubXiaJ8N21Zf
p1V+7D9n8rGk1I7Fk0ArTavFUkTB89B+5kQu7pmhGhovkv+8HZg71eCyDDcWNMLkIoa9drFx
n2InAQ5SOt05iwA3BtSKyg424aeGbJ8V4V4ElvXph04rcP4r0FNp3xa23Jla5MrFrEEn+Ssq
10Y8bIry0NENRRHXx/Dmp15e1VUVuTOj3dLEbbXWTK2FukYwS+Ws/MLY8Czz2IghPvU9awID
AQABAoIBAQCbu7UBH1gW4EenKPDwVwmv5j+Mf9xEXMoBlnQnyAB4HptqyH3111z2/rWengUv
gCMfSv+lRygTNmg7Hzb8U9hD14RdbX8DzBOkb+rm4vbjiiORHKaeLTo9uxQx6x9p+Q6kO4dX
PxYys194YeUa7CargqPWQyKxeQUX30B6FklKraFOy8HQojOxrNwkcaiQcwIXn5BSDUv4jtuG
8cuCfT+aWKhx73yxP9bmpCw5wMgJkEOpngOcvAD647XrEe0rOn/wxxQiVJjHU4EnSqkbz5oj
hWI9iSpdKACCZPz4c2xx5mRIKiVdZOZlKCXVVKLb05f4VrFKWi+J+22pFFj2CoNhAoGBANt7
g2Q5mb58OD9i4ZBmzY8RztJk4HifiVL2im5awUVmc4stz0t+XY4xoxC8Pt4M4gB2o9o4j9UL
uBxnZ5+7FsJmd1H7LnaegZPQKrvVuBGJdKrPpS0soBVyfGG2ZgcpovHu2arpEsToEXtzjVpn
ktcFWA6XhoCXjhGjzFUf8T23AoGBALit1z1T9RFsJZrlIxTI0CIsLa4X6PfVFkY4oGEqb5mg
gWm8jaoLoua2O4IzCGDWgDBwsjY3iS09ZcPcmirVQU//mMsopIJpscGVHw9U8/zmrdtVfuUj
URdccGAo7yw7zP56+eu1iARwP+We7RRl4YOEKemwqebvx0A7be7Oab3tAoGAaitnNZY/bst8
Ef1tC4MPMIP2vgOaKf9SWFV2RUeVclLK1aqFOgmYi+4q6S+GYbdto7fALxFpUi9nEiZbFANW
URdr5LZSlYK7P5tU8KPDdIg/bVkgl6eckINe841d8V0Mu2dE184DDEkOG9+bov2zJFwranOV
1qJ5UMMhVpQrCCUCgYATN+QCOc5y9bIkIFw6OXuPUtGeIFbaE46x2Aq4kdXzQsS04C5N19An
+ibPMchZa3kDkXa6NaVM0+rXKwnQE0ksrgiUe7JC8ATThFUrH0gUtVy6SndeGQLDT5dSKnBZ
Rg/bG6kOYmG5NIUxvAwn50JEkWhbLUtBAQrXIFgcVdajMQKBgAZGPuS4YJlloCkQ4LlTjEZw
tnrEgd9svuKCWCyoCuePtYwy5RsDZtwKB01rjaaDZOYx7cq8ovjwIaE38AXHDmjCgO/hZHiw
v7C1QQVKNBy8tjcgdmUU7/eqsPMIJJNzc4T//XVqcdkqTaPi2TjetIn8UUgqxC756uxAfilW
8RGx-----END RSA PRIVATE KEY-----`,
  name: 'My Home',
  user: user
};

const dc = new Domus(orgConfig);
dc.on('user joined', (user)=>{
  console.log(`---------------------------`);
  dc.getUsersArray().forEach( (u)=>{
    // let status = u.isOnline ? 'online':'offline';
    console.log(`${u.name} join`);
  })
  console.log(`---------------------------`);
});

dc.on('user left', (user)=>{
  console.log(`---------------------------`);
  dc.getUsersArray().forEach( (u)=>{
    // let status = u.isOnline ? 'online':'offline';
    console.log(`${u.name} left`);
  })
  console.log(`---------------------------`);
});

dc.on('ready', ()=>{
  dc.addResource({
    local_path: './examples/rocco.js',                   //where the file is, need for loading
    path: '/users/rocco/apps/domus/rocco.js',   // virtual path, need for indexing
    type: 'file',                         // resource's type, optional for handle different kind of file before use it
    tags: 'javascript example, javascrit, apps' // something for taxonomy, optional for create classes of resources
  });
//   dc.addResource({
//     local_path: './examples/antonio.js',                   //where the file is, need for loading
//     path: '/users/rocco/rocco/domus/antonio.js',   // virtual path, need for indexing
//     type: 'file',                         // resource's type, optional for handle different kind of file before use it
//     tags: 'javascript, JS, apps' // something for taxonomy, optional for create classes of resources
//   });
})

dc.on('chat message', (m)=>{
  console.log(m);
})
