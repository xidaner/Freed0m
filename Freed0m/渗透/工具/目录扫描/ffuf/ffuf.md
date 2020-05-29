# FFUF--基于GO语言开发的爆破工具

[FFUF](https://github.com/ffuf/ffuf)

## 目录扫描

1. Windows 端扫描

./ffuf -w /path/to/wordlist(字典路径) -u https://target/FUZZ(在要爆破的路径后面加上`FUZZ`)

2. Linux 扫描

```
tar -xvf ffuf_1.0.2_linux_amd64.tar.gz 
chmod 777 ffuf
./ffuf -w /path/to/wordlist -u https://target/FUZZ
```

