# FFUF--基于GO语言开发的爆破工具

[FFUF](https://github.com/ffuf/ffuf)

## 目录扫描

1. Windows 端扫描

./ffuf -w /path/to/wordlist(字典路径) -u https://target/FUZZ(在要爆破的路径后面加上`FUZZ`)

-fc 401
过滤401页面

2. Linux 扫描

```
tar -xvf ffuf_1.0.2_linux_amd64.tar.gz 
chmod 777 ffuf
./ffuf -w /path/to/wordlist -u https://target/FUZZ
```



http://106.120.82.19/www/res/index/index.shtml
https://140.143.25.20/
http://106.120.82.23:8001/
https://106.120.82.210/
http://111.205.50.48/
http://111.205.50.55/
http://106.120.80.215:8080/
https://106.120.82.210/
http://111.205.50.54/
http://www.cmamoc.cn/
https://cmdp.ncc-cma.net/
http://ncclcs.ncc-cma.net/
http://ncclcs2020.ncc-cma.net/
http://106.120.82.20/
http://111.205.114.130:8080/
http://weather.cma.cn/
http://www.cco.cma.cn/
http://111.205.114.23/
https://qxxzsp.cma.cn/
http://www.cma.gov.cn/






106.120.82.19/www/res/index/index.shtml
140.143.25.20
106.120.82.23:8001
106.120.82.210
111.205.50.48
111.205.50.55
106.120.80.215:8080
106.120.82.210
111.205.50.54
www.cmamoc.cn
cmdp.ncc-cma.net
ncclcs.ncc-cma.net
ncclcs2020.ncc-cma.net
106.120.82.20
111.205.114.130:8080
weather.cma.cn
www.cco.cma.cn
111.205.114.23
qxxzsp.cma.cn
www.cma.gov.cn