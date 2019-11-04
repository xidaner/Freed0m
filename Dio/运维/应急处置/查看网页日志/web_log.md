# web_log的查看

在web目录下执行
[Bash shell] 纯文本查看 复制代码
```
find ./ -mitime 0 -name "*.php"
```
返回最近24小时内被修改的php脚本