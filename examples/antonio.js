const Domus = require('../index');


const user = {
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEA/K2CP159yya5zq+FdwilQuTA08YP5zIv0DSRqfuUVoSO5i8c
  oT35t3oUeTK52jEcTjEIfciVTCfYe1+25OfX6ww/AqldWSwnaarnTQuEpbrGVDt5
  ItCYni6asitQSf4YX+3iPGKKxfy5H733m1MaF2reqN7NuWmryf/ig+/kvcWpe7Ja
  wFLdUIKskrxDD9e+oqvQiQSNSPsRkNYlVUt6jfZm1Vnwfjh2pJXsze0UTx7YtRPy
  jFBb1hzbYIJR6gn/Qzc9xVeeTxIWzOrpzMa6T5Nm06E+xAQETlKfsuDpSTrLRxjv
  j4IxzK5D+BpVyIxr8pzXEXd8aVbNXRVhp28HZQIDAQABAoIBAGi6FYDkTikUTPDg
  iOXUPILkQxPDRLYjc/PMxg75CftuB7haEHi4Mjccrz2oi6Vms3+pDQbtSwv8e9pu
  ymRHv5NZSQh2YA1kopVGU4X4Xys9pZQl7khCwu7VDCMKlsWEPmAMPbefdDspSyVf
  3C+Rmv/XuJ+vcP8HUD9yAlWC6YDJiGg3vNIFp24JjjsHsMR8qrZp9wQqvGzRNKsL
  1wjgW4K88bVvacO6JVKj6vybAKu2PuQtnlzc+u+wsglXj/WZ1seCPNmDCfRiGlbH
  tfCLGUl7bFoKlOzOyX1lttJG0h0I9G2qXhWVHeYR0UuTrFh9CAaIohSaArWqPVLK
  ggHCY8ECgYEA/mDROWco8N2/nhD4SBSAEx0MpsbPgyaEq9bZ/kSObiU6a10IGm7n
  /8Ma0fxUimue9117cLUo8W+AJmx3b/RomWvFZK40J8vYagdWFsLGpes6aXynZYyp
  BZpvsksYy4zroiAPnhbo2WbtiWUG7Xt8C/MifpxF0vJOLecPKMWEdpUCgYEA/knq
  iR/qE8VD0BUU/JKo1Si1MZlAEfh9JnT2xTjWHT2TKQP0AzYxCtbgPlXGmA53jXps
  l8uRYzaFnoNUCI+hTMwUGSk8GpTKzBmoWGdqm3p/hNUnJx29/OtxQ8qOAomfh3ya
  qDmQw69onWupmSznWrcBjeSZ5RtXpe0O84ZCKZECgYBQf0zWUHnZNyMDHzWigbJB
  2ih9wl46j37ebiAP4Zv86RUCkq8UxlHuUsxy9Nm/7+yfNNryQLHTLUitYBevuvU6
  z6rogGQKz+wNKYMpsrtwF+8lIIhMj2WRW1zLXA5do5uRc3ndujw3R+YVW34EutX3
  ZhpdXJCP/5OT3RGkAlU3vQKBgCy/uztIV3wFMerTWu8brARe9ov06RaAgR2cZbTN
  TLi2lkgYfv91sOm0aJ/vnlQx744BJk0MMNihxp/fgpFDHWKTY1IONJqE5q9GMJ7m
  DBeyVfB9RjeW/1Eb6cHBSn5d06oXHmxOPRCCtMlHIgBnq4sGO4rJ2N89kY4Mip4G
  WWxRAoGBAMoIUGiIGsWr7xYxf6qpJL2a9NpgzO/uA1XIjTz0WbxgVh8AksSQudF6
  s5XXLW8yZZgGpEnRqfbFB0xFwmeaRxMCsO3zorfs6RB8AfMRtXncLLSd80g1gNIY
  NQ3KeOfxuCM1dQR2JicZgFT098LaOYW1o3G8ju7wEAa4jxsMGd5R
  -----END RSA PRIVATE KEY-----
`,
  name: 'Antonio Lopresti'
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
  console.log(`${user.name} join us`, user);
  console.log(`---------------------------`);
})
