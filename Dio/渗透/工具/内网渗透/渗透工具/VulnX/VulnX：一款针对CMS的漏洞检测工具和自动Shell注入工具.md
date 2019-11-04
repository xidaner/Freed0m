# VulnX：一款针对CMS的漏洞检测工具和自动Shell注入工具

https://www.freebuf.com/sectool/206008.html




## 安装

工具安装


> Docker安装
```
$ git clone https://github.com/anouarbensaad/VulnX.git

$ cd VulnX

$ docker build -t vulnx ./docker/

$ docker run -it --name vulnx vulnx:latest -u http://exemple.com

docker container run -it vulnx:latest -u http://目标IP -w

```

>查看日志文件：
```
$ docker run -it --name vulnx -v "$PWD/logs:/VulnX/logs" vulnx:latest-u http://exemple.com
```

> Ubuntu安装
```
$ git clone https://github.com/anouarbensaad/vulnx.git

$ cd VulnX

$ chmod +x install.sh

$ ./install.sh
```
> Termux安装
```
$ pkg update

$ pkg install -y git

$ git clone http://github.com/anouarbensaad/vulnx

$ cd vulnx

$ chmod +x install.sh

$ ./install.sh
```
 > 在Windows中安装vulnx

点击这里
https://github.com/anouarbensaad/vulnx/archive/master.zip

下载vulnx

下载并安装python3

在c中解压缩vulnx-master.zip：/
打开命令提示符cmd。
```
> cd c:/vulnx-master
> python vulnx.py
```

![](img/4.png)


> 可使用命令行选项：
```
usage:vulnx [options]

  -u --url              目标URL地址

  -D --dorks            搜索Dock

  -o --output           指定输出目录

  -t --timeout          HTTP请求超时

  -c --cms-info         搜索CMS信息，包括主题、插件、用户和版本

  -e --exploit           扫描并利用安全漏洞

  -w --web-info        Web信息收集

  -d --domain-info     子域名信息收集

  -l, --dork-list         枚举Dork列表

  -n, --number-page   搜索引擎的页面数量(Google)

  -p, --ports           端口扫描

  -i, --input            从输入文件导入目标域名

  --threads            扫描线程数量

  --dns                DNS信息收集
  ```


工具常用命令

参考命令样本：
```
settimeout=3 , cms-gathering = all , -d subdomains-gathering , run–exploits
```
```
vulnx -u http://example.com --timeout 3 -c all -d -w –exploit
```
搜索Dork样本命令：
```
-D or –dorks , -l –list-dorks
```
vulnx–list-dorks命令将会返回可利用漏洞表。

搜索单个目标网站

选项：-u或–url
```
vulnx -u http://example.com
```
扫描超时

选项：–timeout（默认为3秒）
```
vulnx-u http://example.com --timeout=4
```
运行漏洞利用模块

选项：–exploit或-e
```
vulnx-u http://example.com --exploit
```
CMS信息收集

选项：–cms-info或-c
```
vulnx-u http://example.com --cms-info all
```
子域名&IP信息收集

选项：–domain-info或-d
```
vulnx-u http://example.com --domain-info
```
网站信息收集

选项：–web-info或-w
```
vulnx-u http://example.com --web-info
```
扫描开放端口

选项：–ports或-p
```
vulnx-u http://example.com --ports
```
DNS信息收集

选项：–dns
```
vulnx-u http://example.com --dns
```







