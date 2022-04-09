# 社会工程师工具包（SET）

 https://github.com/trustedsec/social-engineer-toolkit

## 特点

`Social-Engineer Toolkit`是一个专为社交工程设计的开源渗透测试框架。SET有许多自定义攻击向量，可以让你快速进行可信的攻击。SET是TrustedSec，LLC的产品，`TrustedSec，LLC`是一家位于俄亥俄州克利夫兰的信息安全咨询公司

# 安装

## Ubuntu / Debian系统

```
apt-get --force-yes -y install git apache2 python-requests libapache2-mod-php \ 
  python-pymssql build-essential python-pexpect python-pefile python-crypto python-openssl

```

## Arch 系统

```
pacman -S --noconfirm --needed git python2 python2-beautifulsoup4 python2-pexpect python2-crypto

wget https://github.com/erocarrera/pefile/archive/master.zip && unzip master.zip


chmod a+x pefile-master/setup.py && rm -rf pefile-master*

```


## Fedora 系统

```
 dnf -y install git python-pexpect python-pefile python-crypto pyOpenSSL
```

## CentOS 系统

```
yum update -y && yum install python-pexpect python-crypto python-openssl python-pefile
```

## Mac OS X 系统

```
 pip install pexpect pycrypto pyopenssl pefile
```

## 安装SET

### 所有系统(不懂是什么系统或者不知道怎么安装就用这个，但是就很慢。)

```
git clone https://github.com/trustedsec/social-engineer-toolkit/ set / 

 cd  set

 python setup.py install
```






























