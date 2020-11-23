# httpd

---

**Apache 与 httpd 的区别与关系**

从我们仅仅web服务器使用者的角度说的话，它们是同一个东西。在 Apache 的网站上有两种安装包下载
httpd-2.0.50-i686-pc-linux-gnu.tar.gz   和 apache_1.3.33-i686-whatever-linux22.tar.gz
其实都是提供 Web 服务的，只是一个是早期版一个是新的版本模式。

httpd 是 apache 开源项目的一部分，如果只需要 web 服务器，现在只需安装 httpd2.* 就可以了。

早期的 Apache 小组，现在已经成为一个拥有巨大力量的 Apache 软件基金会，而 apache 现在成为 apache 基金会下几十种开源项目的标识。其中有一个项目做 HTTP Server，httpd 是 HTTP  Server 的守护进程，在 Linux 下最常用的是 Apache，所以一提到 httpd 就会想到 Apache HTTP Server。

他们把起家的 apache 更名为 httpd，也更符合其 http server 的特性。以前 apache 的 http server 在 1.3 的时候直接叫 apache_1.3.37，现在 2.* 版本的都叫 httpd_2.2.3。在 Linux 下最常用的是 Apache，所以一提到 httpd 就会想到 Apache HTTP Server。

---

# 案例1

- 配置 http 服务，以虚拟主机的方式建立一个 web 站点;
- 配置文件名为 virthost.conf，放置在 `/etc/httpd/conf.d` 目录下;
- 仅监听 192.168.2.22:8080 端口;
- 使用 www.abc.com 作为域名进行访问;
- 网站根目录为 `/data/web_data` ;
- index.html 内容使用 fubuki!!fubuki!!fubuki!!fubuki!!.

**安装**
```bash
yum -y install httpd
yum -y install mod_ssl
```

**配置虚拟主机文件**
```bash
vim /etc/httpd/conf.d/virthost.conf

Listen 192.168.2.22:8080
<VirtualHost 192.168.2.22:8080>
	ServerName  www.abc.com
	DocumentRoot "/data/web_data"
	<Directory "/data/web_data">
		Require all granted
	</Directory>
</VirtualHost>
```

index.html 内容使用 fubuki!!fubuki!!fubuki!!fubuki!!
```bash
mkdir -p /data/web_data
```
```vim
vim /data/web_data/index.html

fubuki!!fubuki!!fubuki!!fubuki!!
```

```bash
httpd -t # 检查配置
setenforce 0
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload
service httpd start
```

---

# 案例2
## A

- 配置 http 服务，以虚拟主机的方式创建 web 站点
- 将 `/etc/httpd/conf.d/ssl.conf` 重命名为 ssl.conf.bak
- 配置文件名为 virthost.conf，放置在 `/etc/httpd/conf.d` 目录下;
- 配置 https 功能，https 所用的证书 httpd.crt、私钥 httpd.key 放置在 `/etc/httpd/ssl` 目录中(目录需自己创建);
- 使用 www.abc.com 作为域名进行访问;
- 网站根目录为 `/data/web_data` ;
- 提供 http、https 服务，仅监听 192.168.1XX.22 的 IP 地址;
- index.html 内容使用 fubuki!!fubuki!!fubuki!!fubuki!!;

**安装**
```bash
yum -y install httpd
yum -y install mod_ssl
```

**配置虚拟主机文件**
```vim
vim /etc/httpd/conf.d/virthost.conf

<VirtualHost 192.168.1xx.22:80>
	ServerName  www.abc.com
	DocumentRoot "/data/web_data"
	<Directory "/data/web_data">
		Require all granted
	</Directory>
</VirtualHost>

Listen 192.168.1XX.33:443
<VirtualHost 192.168.1xx.22:443>
	ServerName  www.abc.com
	DocumentRoot "/data/web_data"

	SSLEngine on
	SSLCertificateFile /etc/httpd/ssl/httpd.crt
	SSLCertificateKeyFile /etc/httpd/ssl/httpd.key

	<Directory "/data/web_data">
		Require all granted
	</Directory>
</VirtualHost>
```

!!!!注意，必须要改名，大坑
> mv /etc/httpd/conf.d/ssl.conf /etc/httpd/conf.d/ssl.conf.bak

index.html 内容使用 fubuki!!fubuki!!fubuki!!fubuki!!
```bash
mkdir -p /data/web_data
```
```vim
vim /data/web_data/index.html

fubuki!!fubuki!!fubuki!!fubuki!!
```

**创建证书**
```bash
cd /etc/pki/CA/private
openssl genrsa 2048 > cakey.pem
openssl req -new -x509 -key cakey.pem > /etc/pki/CA/cacert.pem

cd /etc/pki/CA
touch index.txt	# 索引问文件
touch serial	# 给客户发证编号存放文件
echo 01 > serial

mkdir /etc/httpd/ssl
cd /etc/httpd/ssl
openssl genrsa 1024 > httpd.key
openssl req -new -key httpd.key > httpd.csr
openssl ca -days 365 -in httpd.csr > httpd.crt

# 查看 openssl 证书数据库文件
cat /etc/pki/CA/index.txt
```

```bash
httpd -t	# 检查配置
setenforce 0
firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --zone=public --add-service=https --permanent
firewall-cmd --reload
service httpd start
```
```bash
curl http://www.abc.com
curl https://www.abc.com
```

## B

- 配置 http 服务，以虚拟主机的方式创建 web 站点
- 将 `/etc/httpd/conf.d/ssl.conf` 重命名为 ssl.conf.bak
- 配置文件名为 virthost.conf，放置在 `/etc/httpd/conf.d` 目录下;
- 配置 https 功能，https 所用的证书httpd.crt、私钥 httpd.key 放置在 `/etc/httpd/ssl` 目录中(目录需自己创建，httpd.crt、httpd.key 均文件从 serverA 复制);
- 使用 www.abc.com 作为域名进行访问;
- 提供 http、https 服务，仅监听 192.168.1XX.33 的地址.

**安装**
```
yum -y install httpd
yum -y install mod_ssl
```

**配置虚拟主机文件**
```vim
vim /etc/httpd/conf.d/virthost.conf

<VirtualHost 192.168.1xx.33:80>
	ServerName  www.abc.com
	DocumentRoot "/data/web_data"
	<Directory "/data/web_data">
		Require all granted
	</Directory>
</VirtualHost>

Listen 192.168.1XX.33:443
<VirtualHost 192.168.1xx.33:443>
	ServerName  www.abc.com
	DocumentRoot "/data/web_data"

	SSLEngine on
	SSLCertificateFile /etc/httpd/ssl/httpd.crt
	SSLCertificateKeyFile /etc/httpd/ssl/httpd.key

	<Directory "/data/web_data">
		Require all granted
	</Directory>
</VirtualHost>
```

> mv /etc/httpd/conf.d/ssl.conf /etc/httpd/conf.d/ssl.conf.bak

index.html 内容使用 fubuki!!fubuki!!fubuki!!fubuki!!
```bash
mkdir -p /data/web_data
```
```vim
vim /data/web_data/index.html

fubuki!!fubuki!!fubuki!!fubuki!!
```

```bash
mkdir /etc/httpd/ssl
cd /etc/httpd/ssl

scp root@192.168.1xx.22:/etc/httpd/ssl/httpd.key /etc/httpd/ssl/httpd.key
scp root@192.168.1xx.22:/etc/httpd/ssl/httpd.crt /etc/httpd/ssl/httpd.crt
```

```bash
httpd -t	# 检查配置
setenforce 0
firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --zone=public --add-service=https --permanent
firewall-cmd --reload
service httpd start
```

---

# 目录结构

**apache2**

`/etc/apache2`

- apache2.conf : 这是服务器的主要配置文件。几乎所有的配置都可以在这个文件中完成，不过为了简单起见，建议使用单独的指定文件。这个文件将配置默认值，是服务器读取配置细节的中心点。

- ports.conf : 这个文件用于指定虚拟主机应该监听的端口。如果你在配置 SSL，请务必检查这个文件是否正确。

- conf.d/ : 这个目录用于控制 Apache 配置的特定方面。例如，它经常被用来定义 SSL 配置和默认安全选择。

- sites-available/ : 这个目录包含了所有定义不同网站的虚拟主机文件。这些文件将确定哪些内容被服务于哪些请求。这些是可用的配置，而不是活动的配置。

- sites-enabled/ : 这个目录确定了实际使用的虚拟主机定义。通常，这个目录由 "sites-available"目录中定义的文件的符号链接组成。

- mods-[enabled,available]/ : 这些目录在功能上与网站目录类似，但它们定义了可以选择加载的模块。

---

# apache+mod_ssl

- 配置 http+https 服务，建立一个 web 站点;

0. 安装
```bash
yum -y install httpd
yum -y install mod_ssl
```

1. 使用 www.abc.com 作为域名进行访问;
```bash
nslookup www.abc.com
```

2. 网站根目录为 /var/www/html;
```vim
vim /etc/httpd/conf/httpd.conf

	DocumentRoot "/var/www/html"
	ServerName  xx.xx.xx.xx:80
```

3. Index.html 内容使用 fubuki!fubuki!fubuki!fubuki!;
```vim
vim var/www/html/index.html

fubuki!fubuki!fubuki!fubuki!
```
```bash
service httpd restart 或 systemctl start httpd
记得关防火墙
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload
```

4. 配置 https 服务使原站点能使用 https 访问.
```bash
# 查看证书密钥位置
sed -n '/^SSLCertificateFile/p;/^SSLCertificateKeyFile/p '/etc/httpd/conf.d/ssl.conf

# 删除原来的密钥
cd /etc/pki/tls/private/
rm -f localhost.key

# 新建密钥文件
openssl genrsa 1024 > localhost.key

# 删除原来的证书
cd ../certs
rm -rf localhost.crt

# 新建证书文件
openssl req -new -x509 -days 365 -key ../private/localhost.key -out localhost.crt

防火墙放行 https，重启服务，测试
```
设置 SELINUX 状态为 Disabled;
```bash
setenforce 0
```
```vim
vim /etc/selinux/config

SELINUX=disabled
```

---

# 配置https

**使用 Let’s Encrypt 直接上 https**
```bash
yum install -y yum-utils
yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
yum install -y certbot python2-certbot-apache

certbot --apache
firewall-cmd --zone=public --add-service=https --permanent
firewall-cmd --reload
```

**mod_ssl 为 linux 提供 web 证书**

```bash
cd /etc/pki/CA/private
openssl genrsa 2048 > cakey.pem
openssl req -new -x509 -key cakey.pem > /etc/pki/CA/cacert.pem

cd /etc/pki/CA
touch index.txt     # 索引问文件
touch serial        # 给客户发证编号存放文件
echo 01 > serial

mkdir /etc/httpd/ssl
cd /etc/httpd/ssl
openssl genrsa 1024 > httpd.key
openssl req -new -key httpd.key > httpd.csr
openssl ca -days 365 -in httpd.csr > httpd.crt

# 使用 cat /etc/pki/CA/index.txt 查看 openssl 证书数据库文件
cat /etc/pki/CA/index.txt
```

**mod_ssl 为 windows 提供 web 证书**

```bash
cd /etc/pki/CA/private
openssl genrsa 2048 > cakey.pem
openssl req -new -x509 -key cakey.pem > /etc/pki/CA/cacert.pem

cd /etc/pki/CA
touch index.txt   # 索引问文件
touch serial      # 给客户发证编号存放文件
echo 01 > serial

cd
openssl genrsa 1024 > httpd.key
openssl req -new -key httpd.key > httpd.csr
openssl ca -days 365 -in httpd.csr > httpd.crt

openssl pkcs12 -export -out server.pfx -inkey httpd.key -in httpd.crt
# 自己把 server.pfx 导出给 windows2008 主机
```

**向 windows CA 服务器申请证书**

```bash
Openssl genrsa 2048 > httpd.key
openssl req -new -key httpd.key -out httpd.csr
```
通过这个 csr 文件在内部的 windows CA 服务器上申请证书

---

# 配置php

<p align="center">
    <img src="../../../../assets/img/logo/php.svg" width="20%">
</p>

```bash
若之前安装过其他版本 PHP,先删除
yum remove php*

rpm 安装 PHP7 相应的 yum 源
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
yum install php70w php70w-fpm

php -v                # 查看PHP版本

service php-fpm start # 要运行 PHP 网页,要启动 php-fpm 解释器
```
```bash
vim /etc/httpd/conf/httpd.conf

# 将Require all denied 改为Require all granted
<Directory />
    AllowOverride none
    Require all granted
</Directory>

# 增加一行 AddType application/x-httpd-php .php
    AddType application/x-httpd-php .php

# 增加索引页 index.php,在 DirectoryIndex index.html 后面 增加索引页 index.php
<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>
```

检查配置文件 httpd.conf 的语法是否正确
```bash
apachectl -t
```

检测 php 是否正常解析
```
echo "<?php phpinfo(); ?>"  > /var/www/html/1.php

service httpd restart
firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --reload
```

访问 `机器相应ip/1.php`

---

**Source & Reference**
- [Linux下Apache与httpd的区别与关系](https://blog.csdn.net/yxfabcdefg/article/details/32324035)

**linux上httpd.conf基本配置**

> 在CentOS里Apache的默认文档路径的位置是在/var/www/html，配置文件的路径是/etc/httpd/conf/httpd.conf。其他的配置存储在/etc/httpd/conf.d/ 文件夹里。

 1. ServerRoot：

    服务器的基础目录，一般来说它将包含conf/和logs/子目录，其它配置文件的相对路径即基于此目录。默认为安装目录，不需更改。

    语法：ServerRoot directory-path

    如：　ServerRoot "/usr/local/apache-2.2.6"

    注意，此指令中的路径最后不要加 / 

2. Listen：

    指定服务器监听的IP和端口。默认情况下Apache会在所有IP地址上监听。Listen是Apache2.0以后版本必须设置的指令，如果在配置文件中找不到这个指令，服务器将无法启动。

    语法：Listen [IP-address:]portnumber [protocol]

    Listen指令指定服务器在那个端口或地址和端口的组合上监听接入请求。如果只指定一个端口，服务器将在所有地址上监听该端口。如果指定了地址和端口的组合，服务器将在指

定地址的指定端口上监听。可选的protocol参数在大多数情况下并不需要，若未指定该参数，则将为443端口使用默认的https 协议，为其它端口使用http协议。

    使用多个Listen指令可以指定多个不同的监听端口和/或地址端口组合。

    默认为：Listen 80

    如果让服务器接受80和8080端口上请求，可以这样设置：

     Listen 80

     Listen 8080

    如果让服务器在两个确定的地址端口组合上接受请求，可以这样设置：

     Listen 192.168.2.1:80

     Listen 192.168.2.2:8080

    如果使用IPV6地址，必须用方括号把IPV6地址括起来：

     Listen [2001:db8::a00:20ff:fea7:ccea]:80



	 配置多端口映射。

2.2、首先需要监听端口，在文档httpd.conf的Listen 80下添加需要监听的端口，举例为8080
```
Listen 80
Listen 8080
```
2.2、在文档最后添加端口映射功能
```html
<VirtualHost ExampleIp:8080>
 DocumentRoot /var/www/html/website3
 ServerName ExampleIp:8080
</VirtualHost>
<Directory "/var/www/html/website3">
 Options Indexes FollowSymLinks
 AllowOverride All
 Order allow,deny
 Allow from all
</Directory>
```
1. LoadModule：

     加载特定的DSO模块。Apache默认将已编译的DSO模块存放于4.1目录结构小节中所示的动态加载模块目录中。

     语法：LoadModule module filename

     如：LoadModule rewrite_module modules/mod_rewrite.so

     如果filename使用相对路径，则路径是相对于ServerRoot所指示的相对路径。

     Apache配置文件默认加载所有已编译的DSO模块，笔者建议只加载如下模块：authn_file、authn_default、 authz_host、authz_user、authz_default、auth_basic、dir、alias

、filter、speling、 log_config、env、vhost_alias、setenvif、mime、negotiation、rewrite、deflate、 expires、headers、cache、file-cache、disk-cache、mem-cache。

 4. User：

     设置实际提供服务的子进程的用户。为了使用这个指令，服务器必须以root身份启动和初始化。如果你以非root身份启动服务器，子进程将不能够切换至非特权用户，并继续以启动服务器的原始用户身份运行。如果确实以root用户启动了服务器，那么父进程将仍然以root身份运行。

     用于运行子进程的用户必须是一个没有特权的用户，这样才能保证子进程无权访问那些不想为外界所知的文件，同样的，该用户亦需没有执行那些不应当被外界执行的程序的权限。强烈建议专门为Apache子进程建立一个单独的用户和组。一些管理员使用nobody用户，但是这并不能总是符合要求，因为可能有其他程序也在使用这个用户。

例：User daemon

 5. Group：

     设置提供服务的Apache子进程运行时的用户组。为了使用这个指令，Apache必须以root初始化启动，否则在切换用户组时会失败，并继续以初始化启动时的用户组运行。

     例：Group daemon

 6. ServerAdmin：

     设置在所有返回给客户端的错误信息中包含的管理员邮件地址。

     语法：ServerAdmin email-address|URL

     如果httpd不能将提供的参数识别为URL，它就会假定它是一个email-address ，并在超连接中用在mailto:后面。推荐使用一个Email地址，因为许多CGI脚本是这样认为的。如果你确实想使用URL，一定要保证指向一个你能够控制的服务器，否则用户将无法确保一定可以和你取得联系。

 7. ServerName：

     设置服务器用于辨识自己的主机名和端口号。

     语法：ServerName [scheme://]fully-qualified-domain-name[:port]

     可选的'scheme://'前缀仅在2.2.3以后的版本中可用，用于在代理之后或离线设备上也能正确的检测规范化的服务器URL。

     当没有指定ServerName时，服务器会尝试对IP地址进行反向查询来推断主机名。如果在ServerName中没有指定端口号，服务器会使用接受请求的那个端口。

     为了加强可靠性和可预测性，建议使用ServerName显式的指定一个主机名和端口号。

     如果使用的是基于域名的虚拟主机，在<VirtualHost>段中的ServerName将是为了匹配这个虚拟主机，在"Host:"请求头中必须出现的主机名。

8. DocumentRoot：

    设置Web文档根目录。

    语法：DocumentRoot directory-path

    在没有使用类似Alias这样的指令的情况下，服务器会将请求中的URL附加到DocumentRoot后面以构成指向文档的路径。

    如果directory-path不是绝对路径，则被假定为是相对于ServerRoot的路径。

    指定DocumentRoot时不应包括最后的"/"。

9. <Directory>：

     <Directory>和</Directory>用于封装一组指令，使之仅对某个目录及其子目录生效。

     语法：<Directory Directory-path> ... </Directory>

     Directory-path可以是一个目录的完整路径，或是包含了Unix shell匹配语法的通配符字符串。在通配符字符串中，"?"匹配任何单个的字符，"*"匹配任何字符序列。也可以使用"[]"来确定字符范围。在"~" 字符之后也可以使用正则表达式。

     如果有多个(非正则表达式)<Directory>配置段符合包含某文档的目录(或其父目录)，那么指令将以短目录优先的规则进行应用，并包含.htaccess文件中的指令。

     正则表达式将在所有普通配置段之后予以考虑。所有的正则表达式将根据它们出现在配置文件中的顺序进行应用。

     <Directory>指令不可被嵌套使用，也不能出现在<Limit>或<LimitExcept>配置段中。

10. <Files>：

      提供基于文件名的访问控制，类似于<Directory>和<Location>指令。

      语法：<Files filename> ... </Files>

       filename参数应当是一个文件名或是一个包含通配符的字符串，其中"?"匹配任何单个字符，"*"匹配任何字符串序列。在"~"字符之后可以使用正则表达式。

       在此配置段中定义的指令将作用于其基本名称(不是完整的路径)与指定的文件名相符的对象。<Files>段将根据它们在配置文件中出现的顺序被处理：在<Directory>段和.htaccess

文件被处理之后，但在<Location>段之前。<Files>能嵌入到<Directory>段中以限制它们作用的文件系统范围，也可用于.htaccess文件当中，以允许用户在文件层面上控制对它们自己文件的访问。

 11. <IfModule>：

       封装根据指定的模块是否启用而决定是否生效的指令。

       语法：<IfModule [!]module-file|module-identifier> ... </IfModule>

        module-file是指编译模块时的文件名，比如mod_rewrite.c　。

        module-identifier是指模块的标识符，比如mod_rewrite　。

        在<IfModule>配置段中的指令仅当测试结果为真的时候才进行处理，否则所有其间的指令都将被忽略。

12. Options：

        控制在特定目录中将使用哪些服务器特性

        语法：Options [+|-]option [[+|-]option] ...

         option可以为None，不启用任何额外特性，或者下面选项中的一个或多个：

                All 　除MultiViews之外的所有特性，这是默认设置。

                ExecCGI 　允许使用mod_cgi执行CGI脚本。

                FollowSymLinks 　服务器允许在此目录中使用符号连接，如果此配置位于<Location>配置段中，则会被忽略。

                Includes 　允许使用mod_include提供的服务器端包含。

                IncludesNOEXEC 　允许服务器端包含，但禁用"#exec cmd"和"#exec cgi"，但仍可以从ScriptAlias目录使用"#include virtual"虚拟CGI脚本。

                Indexes 　如果一个映射到目录的URL被请求，而此目录中又没有DirectoryIndex(例如：index.html)，那么服务器会返回由mod_autoindex生成的一个格式化后的目录列表。

                MultiViews 　允许使用mod_negotiation提供内容协商的"多重视图"(MultiViews)。

                SymLinksIfOwnerMatch 　服务器仅在符号连接与其目的目录或文件的拥有者具有相同的uid时才使用它。 如果此配置出现在<Location>配置段中，则将被忽略。

         一般来说，如果一个目录被多次设置了Options ，则最特殊的一个会被完全接受(其它的被忽略)，而各个可选项的设定彼此并不融合。然而，如果所有作用于Options指令的可选项前都加有"+" 或"-"符号，此可选项将被合并。所有前面加有"+"号的可选项将强制覆盖当前的可选项设置，而所有前面有"-"号的可选项将强制从当前可选项设置中去除。

13. AllowOverride：

         确定允许存在于.htaccess文件中的指令类型。

         语法：AllowOverride All|None|directive-type [directive-type] ...

          如果此指令被设置为None ，那么.htaccess文件将被完全忽略。事实上，服务器根本不会读取.htaccess文件。

          当此指令设置为All时，所有具有".htaccess"作用域的指令都允许出现在.htaccess文件中。

         directive-type可以是下列各组指令之一：

                 AuthConfig 　允许使用与认证授权相关的指令

                 FileInfo 　允许使用控制文档类型的指令、控制文档元数据的指令、mod_rewrite中的指令、mod_actions中的Action指令

                 Indexes 　允许使用控制目录索引的指令

                 Limit 　允许使用控制主机访问的指令

                 Options[=Option,...] 　允许使用控制指定目录功能的指令(Options和XBitHack)。可以在等号后面附加一个逗号分隔的(无空格的)Options选项列表，用来控制允许Options指令

使用哪些选项。

                 AllowOverride仅在不包含正则表达式的<Directory>配置段中才是有效的。在<Location>, <DirectoryMatch>, <Files>配置段中都是无效的。

                 Order：控制默认的访问状态与Allow和Deny指令生效的顺序。

                 Ordering取值范围是以下几种范例之一：

                      Deny,Allow 　Deny指令在Allow指令之前被评估。默认允许所有访问。任何不匹配Deny指令或者匹配Allow指令的客户都被允许访问。

                      Allow,Deny 　Allow指令在Deny指令之前被评估。默认拒绝所有访问。任何不匹配Allow指令或者匹配Deny指令的客户都将被禁止访问。

                      Mutual-failure 　只有出现在Allow列表并且不出现在Deny列表中的主机才被允许访问。这种顺序与"Order Allow,Deny"具有同样效果，不赞成使用。

                      关键字只能用逗号分隔，它们之间不能有空格，在所有情况下每个Allow和Deny指令语句都将被评估。

                Allow：控制哪些主机可以访问服务器的该区域。可以根据主机名、IP地址、 IP地址范围或其他环境变量中捕获的客户端请求特性进行控制。

                     语法：Allow from all|host|env=env-variable [host|env=env-variable] ...

                     这个指令的第一个参数总是"from"，随后的参数可以有三种不同形式：如果指定"Allow from all"，则允许所有主机访问，按照下述Deny和Order指令的配置；若要只允许特定的主

机或主机群访问服务器。

                      host可以用下面任何一种格式来指定：一个（部分）域名、完整的IP地址、部分IP地址、网络/掩码、网络/nnn无类别域间路由规格；

                      第三种参数格式允许对服务器的访问由环境变量的一个扩展指定，指定"Allow from env=env-variable"时，如果环境变量env-variable存在则访问被允许，使用由mod_setenvif提供的指令，服务器用一种基于客户端请求的弹性方式提供了设置环境变量的能力。因此，这条指令可以用于允许基于像User-Agent(浏览器类型)、Referer或其他 HTTP请求头字段的访问。

                Deny：控制哪些主机被禁止访问服务器的该区域。可以根据主机名、IP地址、 IP地址范围或其他环境变量中捕获的客户端请求特性进行控制。

                      语法：Deny from all|host|env=env-variable [host|env=env-variable] ...

                       此指令的参数设置和Allow指令完全相同。 

14. DirectoryIndex：

         当客户端请求一个目录时寻找的资源列表。

         语法：DirectoryIndex Local-url [Local-url] ...

         Local-url(%已解码的)是一个相对于被请求目录的文档的URL(通常是那个目录中的一个文件)。可以指定多个URL，服务器将返回最先找到的那一个，

         比如：

                DirectoryIndex index.html index.php

15. ErrorLog：

          指定当服务器遇到错误时记录错误日志的文件。

          语法：ErrorLog file-path|syslog[:facility]

          如果file-path不是一个以斜杠(/)开头的绝对路径，那么将被认为是一个相对于ServerRoot的相对路径；如果file-path以一个管道符号(|)开头，那么会为它指定一个命令来处理错误日志，如 ErrorLog "|/usr/local/sbin/cronolog /var/log/httpd/%w/errors_log"。

          如果系统支持，使用"syslog"替代文件名将通过 syslogd(8)来记载日志。默认将使用系统日志机制local7 ，但您可以用"syslog:facility"语法来覆盖这个设置，其中，facility的取值为syslog(1)中记载的任何一个名字。

 16. LogLevel：

         用于调整记录在错误日志中的信息的详细程度。

         语法：LogLevel level

         可以选择下列level，依照重要性降序排列：

               emerg 　紧急(系统无法使用)

               alert 　  必须立即采取措施

               crit 　    致命情况

               error 　  错误情况

               warn 　  警告情况

               notice 　一般重要情况

               info 　   普通信息

              debug 　 调试信息

         当指定了某个级别时，所有级别高于它的信息也会被同时记录。比如，指定 LogLevel info ，则所有notice和warn级别的信息也会被记录。建议至少使用crit级别。

         当错误日志是一个单独分开的正式文件的时候，notice级别的消息总是会被记录下来，而不能被屏蔽。但是，当使用syslog来记录时就没有这个问题。 

17. LogFormat：

         定义访问日志的记录格式。

         语法：LogFormat format|nickname [nickname]

         LogFormat指令可以使用两种定义格式中的一种。

         在第一种格式中，指令只带一个参数，以定义后续的TransferLog指令定义的日志格式。另外它也可以通过下述的方法使用nickname来引用某个之前的LogFormat定义的日志格式。

         第二种定义LogFormat指令的格式中，将一个直接的format和一个nickname联系起来。这样在后续的LogFormat或 CustomLog指令中，就不用一再重复整个冗长的格式串。

         定义别名的LogFormat指令仅仅用来定义一个nickname ，而不做其它任何事情，也就是说，它只是定义了这个别名，它既没有实际应用这个别名，也不是把它设为默认的格式。

         因此，它不会影响后续的 TransferLog指令。另外，LogFormat不能用一个别名来定义另一个别名。nickname不能包含百分号(%)。

         关于format的格式，请参见Apache2.2官方文档中的自定义日志格式小节。

18. CustomLog：

         设定日志的文件名和格式。

         语法：CustomLog file|pipe format|nickname [env=[!]environment-variable]

         第一个参数指定了日志记录的位置，可以使用以下两种方式来设定：

               file 　相对于ServerRoot的日志文件名。
               pipe 　管道符"|"后面紧跟着一个把日志输出当作标准输入的处理程序路径。

         第二个参数指定了写入日志文件的内容。它既可以是由前面的LogFormat指令定义的nickname ，也可以是直接按Apache2.2官方文档中的自定义日志格式小节所描述的规则定义的format字符串。

         第三个参数是可选的，它根据服务器上特定的环境变量是否被设置来决定是否对某一特定的请求进行日志记录。如果这个特定的环境变量被设置(或者在"env=!name"的情况下未被设置)，那么这个请求将被记录。可以使用mod_setenvif和/或mod_rewrite模块来为每个请求设置环境变量。

 19. TransferLog：

        指定日志文件的位置。

        语法：TransferLog file|pipe

         本指令除不允许直接定义日志格式或根据条件进行日志记录外，与CustomLog指令有完全相同的参数和功能。实际应用中，日志的格式是由最近的非别名定义的LogFormat指令指定。如果没有定义任何日志格式，则使用通用日志格式。

 20. Alias：

          映射URL到文件系统的特定区域。

          语法：Alias URL-path file-path|directory-path

          Alias指令使文档可以被存储在DocumentRoot以外的本地文件系统中。以(%已解码的)url-path路径开头的URL可以被映射到以directory-path开头的本地文件。

          如果对在DocumentRoot之外的某个目录建立了一个Alias ，则可能需要通过<Directory>段明确的对目标目录设定访问权限。

21.ScriptAlias：

          映射一个URL到文件系统并视之为CGI脚本目录。

          语法：ScriptAlias URL-path file-path|directory-path

          ScriptAlias指令的行为与Alias指令相同，但同时它又标明此目录中含有应该由cgi-script处理器处理的CGI脚本。以URL-path开头的(%已解码的)的URL会被映射到由第二个参数指定的具有完整路径名的本地文件系统中的脚本。

          ScriptSock：在以线程式MPM(worker)运行的Apache中设置用来与CGI守护进程通信的套接字文件名前缀(其后附加父进程 PID组成完整的文件名)。这个套接字将会用启动Apache服

务器的父进程用户权限(通常是root)打开。为了维护与CGI脚本通讯的安全性，不允许其他用户拥有写入套接字所在目录的权限是很重要的。

 22. DefaultType：

         在服务器无法由其他方法确定内容类型时，发送的默认MIME内容类型。

         语法：DefaultType MIME-type

         默认：DefaultType text/plain

23. AddType：

         在给定的文件扩展名与特定的内容类型之间建立映射关系。

         语法：AddType MIME-type extension [extension] ...

         MIME-type指明了包含extension扩展名的文件的媒体类型。这个映射关系会添加在所有有效的映射关系上，并覆盖所有相同的extension扩展名映射。

         extension参数是不区分大小的，并且可以带或不带前导点。

24. ErrorDocument：

         批示当遇到错误的时候服务器将给客户端什么样的应答。

         语法：ErrorDocument error-code document

         error-code 　服务器返回的错误代码

         document 　可以由一个斜杠(/)开头来指示一个本地URL(相对于DocumentRoot)，或是提供一个能被客户端解释的完整的URL。

         此外还能提供一个可以被浏览器显示的消息。

         比如：

                 ErrorDocument 500http://www.entage.net/err500.html

                 ErrorDocument 404 /errors/bad_urls.html

                 ErrorDocument 403 "Sorry can't allow you access today"

25. EnableMMAP：

          指示httpd在递送中如果需要读取一个文件的内容，它是否可以使用内存映射。

          语法：EnableMMAP On|Off

          当处理一个需要访问文件中的数据的请求时，比如说当递送一个使用mod_include进行服务器端分析的文件时，如果操作系统支持，Apache将默认使用内存映射。

          这种内存映射有时会带来性能的提高，但在某些情况下，您可能会需要禁用内存映射以避免一些操作系统的问题：

          在一些多处理器的系统上，内存映射会减低一些httpd的性能；

          在挂载了NFS的DocumentRoot上，若已经将一个文件进行了内存映射，则删除或截断这个文件会造成httpd因为分段故障而崩溃。

          在可能遇到这些问题的服务器配置过程中，应当使用下面的命令来禁用内存映射：

26. EnableMMAP Off

          对于挂载了NFS的文件夹，可以单独在<directory>段中指定禁用内存映射：

          <Directory "/path-to-nfs-files">
             EnableMMAP Off
          </Directory>