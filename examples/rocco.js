const Domus = require('../index');


const user = {
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEogIBAAKCAQEA3CbCadyAZ81BvMrIeLqmJMXLFsswgpu+RSf4fD9VYzkrsIpt
  P6tHANssq/yyBbllPijthcPR+yaE1QuCUztWiOXNsXMXJLuBKHRw2VfsL3rQTXkP
  ACILx2o3hCGYZp4C1xFa8PJzBa2NEDZCaT0aKAoJcaBrF+sIXDLonaRLjwfuhLLv
  Ccd5f7dQpeHWDHXMwhfr/Lc7WNGs2xHAUCrfztjOXAm/bXWQXXDllv0IQqNewgFk
  CelOxkXaajpU/4m4bgSnzBjhGA6YzLRG2R+wLeYRGgQGWBpQOudgtSGfPRHqwR9E
  qFVB5RGzwS0pqPLudw/dtfzTEWtkOTgwd3orYQIDAQABAoIBADdsXpduFrmLOBiC
  aLPUMY2iaf2EC+NluCIK7QjCnQmM1A3u25Ai245An19xD5RXV0Ct5xY89TkoOlq0
  OgwgLSnryLv6wIHT3rFDl0FwXBqb7aMDbh5Xc+WxPOa72nVDJG3mhaGROBne1luV
  fWSnKFWaKUR84Vk1J3amrl85hHguTHUiiXu0wMJrWq6DGeKT2RNsgoIrYFEhmBpu
  2GIRbap4etoudoyC5NTbLD6Eq0zjAtlHpe/J5jl5/nzpiUiDzOBP76TJKX0nPLZ1
  XWVVVkZnPk5Das0cPuaQwi54rw9luQlpD9FNod9mFs1nrZzvme3IUjOPpr1bf0Wf
  QqJ+UkECgYEA8ebUSIF1dhUk9IioNIZR6CnC4S7BGaeEhZPys7T/KGsKmn/1+Bpv
  LTOJ1xQY1Og9m8jyfoU2w6qHP/5m9BIj0wxIdh9Ce6sTLd7KLp5GnppPoy8HX7U2
  I8ndkSEARMRrlN6aJ5rA8T4F5aZCMzO7f228rSsZqbBVegEgqRqPMJkCgYEA6Ptq
  lJ+HXa+tuogac/VNN7necDEQhFYFhwrvZvUqwizUZ2zGgz13Ws3sUKlDmKohPyTG
  Wv/Z6FK+5ghWDVdjHNGrz0q7dLw2Je8bo8lKL+IrJ9bh4nlCymH+NXAufL69QvQB
  TP36jD/Vawb44WCjjU1n23g5SWt6S1UdQA4I5gkCgYB+x+gCiDczyCkyMF1YCf3r
  m9eThZmXBIEkMUJGhVolqNRJ3T7g5ZnXKufXXaUWERIZD9xoCxGEw19XXtI+oTM9
  bXac0g1aG3NV2ypD/Jguj9mlQQSwWJ0jbK0/XvhxEjEAORq6HxV4WnVkwxp3E2n1
  g2IbsDcnBFAIPYcMmerqIQKBgAD+0f3AkLt9vKhHXJWSPro2ORURoJhwJaXmDg/K
  jFw4BNBMTqzQ3mms542Qq5FDaND0P0S0QyIS+G3TK0rzTKEa5DkGgLaG91RCKUQR
  4BdESBrreBuXmQl0Ubm4uPofdn+Ku1aw3xkqTKcgaH/OAeTgp8jwQo5lvygDPRTA
  +pjBAoGAagXys+sY+1lvd7HCYPFqPcVcU8i3tWM6vexJ8iHM8qp8dowo02pPaGxT
  etSVmcDfdUHfw/bi3GD9dHaA0QZG1aRbIxNfiMzraHpykc3FCIpZGq6/1nMUnhdC
  3/u9BLw6lMWjyNTPiIwI1w1/Ahk3SqNW2D/oPUue7BHnzbnLmcU=
  -----END RSA PRIVATE KEY-----`,
  name: 'Rocco Tanica'

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
dc.on('ready', ()=>{
  setTimeout(()=>{
    dc.findResource('rocco')
  }, 10000)

})
dc.on('resource finded', (r)=>{

  dc.resources.fetch(r[0]).then( (result)=>{
    console.log(result);
  })

})
