# PHP审计中的命令注入

- 👴 like that old time rock 'n' roll ！ 
<<[Old Time Rock & Roll](https://music.163.com/#/song?id=1098827)>> 
专辑：Stranger in Town
歌手：Bob Seger

##  什么是PHP命令注入

PHP中可以使用[特殊函数](PHP中的特殊函数.md)来执行外部的应用程序或函数.

可以理解为，将外部输入的代码执行为php可执行代码，也就是俗称的 `webshell` 。在服务器不进行权限设置的时候。权限仅仅是 www权限(apache为apache权限)。

**常见注入有**

![](img/6.png)







