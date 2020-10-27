# PHPbugs

  - Github 项目：https://github.com/bowu678/php_bugs
  - 参考：https://www.cnblogs.com/-mo-/p/11652926.html

<p align="center">
    <img src="img/1.jpg" width="25%">
</p>

<p align="center">👴 I never want once from the cherry tree！</p>
<p align="center"><a href="http://music.163.com/song?id=28390955&userid=262256866"><font>《Work Song》</font></a> </p>
<p align="center">专辑：From Eden EP</p>
<p align="center">歌手：Hozier</p>


###   1.变量覆盖

  - 1 [extract()](https://www.php.net/manual/zh/function.extract.php)

> 该函数使用数组键名作为变量名，使用数组键值作为变量值。针对数组中的每个元素，将在当前符号表中创建对应的一个变量。条件：若有EXTR_SKIP则不行。


一个简单的变量覆盖的例子：
```php
 <?php
 $a = 1;    //原变量值为1
 $b = array('a' => '3'); // b数组，键名为a，键值为3
 extract($b);    //经过extract()函数对$b处理后
 echo $a;    //输出结果为3
 ?>
```

```php
<?php
$flag='xxx'; 
extract($_GET);
 if(isset($shiyan))
 { 
    $content=trim(file_get_contents($flag)); # 内容为0，flag可以是任何东西，导致文件获取内容不能打开文件，返回0
    if($shiyan==$content)
    { 
        echo'ctf{xxx}'; 
    }
   else
   { 
    echo'Oh.no';
   } 
   }
```

所以这里构造 payload 为 `?shiyan=&flag=1`
将 `&flag=1` 赋值给 `shiyan` 值一定要是空，不然无法和 0 对应。这里的0不是数值的0。


### 2. 绕过过滤的空白字符

```php
<?php
 
$info = ""; 
$req = [];
$flag="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
 
ini_set("display_error", false); //为一个配置选项设置值
error_reporting(0); //关闭所有PHP错误报告
 
if(!isset($_GET['number'])){
   header("hint:26966dc52e85af40f59b4fe73d8c323a.txt"); //HTTP头显示hint 26966dc52e85af40f59b4fe73d8c323a.txt
 
   die("have a fun!!"); //die — 等同于 exit()
 
}
 
foreach([$_GET, $_POST] as $global_var) {  //foreach 语法结构提供了遍历数组的简单方式 
    foreach($global_var as $key => $value) { 
        $value = trim($value);  //trim — 去除字符串首尾处的空白字符（或者其他字符）
        is_string($value) && $req[$key] = addslashes($value); // is_string — 检测变量是否是字符串，addslashes — 使用反斜线引用字符串
    } 
} 
 
 
function is_palindrome_number($number) { 
    $number = strval($number); //strval — 获取变量的字符串值
    $i = 0; 
    $j = strlen($number) - 1; //strlen — 获取字符串长度
    while($i < $j) { 
        if($number[$i] !== $number[$j]) { 
            return false; 
        } 
        $i++; 
        $j--; 
    } 
    return true; 
} 
 
 
if(is_numeric($_REQUEST['number'])) //is_numeric — 检测变量是否为数字或数字字符串 
{
 
   $info="sorry, you cann't input a number!";
 
}
elseif($req['number']!=strval(intval($req['number']))) //intval — 获取变量的整数值
{
 
     $info = "number must be equal to it's integer!! ";  
 
}
else
{
 
     $value1 = intval($req["number"]);
     $value2 = intval(strrev($req["number"]));  
 
     if($value1!=$value2){
          $info="no, this is not a palindrome number!";
     }
     else
     {
 
          if(is_palindrome_number($req["number"])){
              $info = "nice! {$value1} is a palindrome number!"; 
          }
          else
          {
             $info=$flag;
          }
     }
 
}
 
echo $info;
```



### 3. 因缺思汀的绕过

  ```php
  <?php
  error_reporting(0);

  if (!isset($_POST['uname']) || !isset($_POST['pwd'])) {
      echo '<form action="" method="post">'."<br/>";
      echo '<input name="uname" type="text"/>'."<br/>";
      echo '<input name="pwd" type="text"/>'."<br/>";
      echo '<input type="submit" />'."<br/>";
      echo '</form>'."<br/>";
      echo '<!--source: source.txt-->'."<br/>";
      die;
  }

  function AttackFilter($StrKey,$StrValue,$ArrReq){  
      if (is_array($StrValue)){

  //检测变量是否是数组

          $StrValue=implode($StrValue);

  //返回由数组元素组合成的字符串

      }
      if (preg_match("/".$ArrReq."/is",$StrValue)==1){   

  //匹配成功一次后就会停止匹配

          print "水可载舟，亦可赛艇！";
          exit();
      }
  }

  $filter = "and|select|from|where|union|join|sleep|benchmark|,|\(|\)";
  foreach($_POST as $key=>$value){ 

  //遍历数组

      AttackFilter($key,$value,$filter);
  }

  $con = mysql_connect("XXXXXX","XXXXXX","XXXXXX");
  if (!$con){
      die('Could not connect: ' . mysql_error());
  }
  $db="XXXXXX";
  mysql_select_db($db, $con);

  //设置活动的 MySQL 数据库

  $sql="SELECT * FROM interest WHERE uname = '{$_POST['uname']}'";
  $query = mysql_query($sql); 

  //执行一条 MySQL 查询

  if (mysql_num_rows($query) == 1) { 

  //返回结果集中行的数目

      $key = mysql_fetch_array($query);

  //返回根据从结果集取得的行生成的数组，如果没有更多行则返回 false

      if($key['pwd'] == $_POST['pwd']) {
          print "CTF{XXXXXX}";
      }else{
          print "亦可赛艇！";
      }
  }else{
      print "一颗赛艇！";
  }
  mysql_close($con);
  ?>
  ```
可以看到主要是:

`$filter = "and|select|from|where|union|join|sleep|benchmark|,|(|)";`

这句话过滤了很多关键词，加上function AttackFilter这个函数起到了过滤的作用，这里是巧妙地用了select过程中​​用`group by with rollup`这个统计的方法进行插入查询。

```sql
mysql> create table test (
    -> user varchar(100) not null,
    -> pwd varchar(100) not null);  
mysql>insert into test values("admin","mypass");
mysql>select * from test group by pwd with rollup
mysql> select * from test group by pwd with rollup
mysql> select * from test group by pwd with rollup;
+-------+------------+
| user  | pwd        |
+-------+------------+
| guest | alsomypass |
| admin | mypass     |
| admin | NULL       |
+-------+------------+
3 rows in set

mysql> select * from test group by pwd with rollup limit 1
;
+-------+------------+
| user  | pwd        |
+-------+------------+
| guest | alsomypass |
+-------+------------+
mysql> select * from test group by pwd with rollup limit 1 offset 0
;
+-------+------------+
| user  | pwd        |
+-------+------------+
| guest | alsomypass |
+-------+------------+
1 row in set
mysql> select * from test group by pwd with rollup limit 1 offset 1
;
+-------+--------+
| user  | pwd    |
+-------+--------+
| admin | mypass |
+-------+--------+
1 row in set
mysql> select * from test group by pwd with rollup limit 1 offset 2
;
+-------+------+
| user  | pwd  |
+-------+------+
| admin | NULL |
+-------+------+
1 row in set 
————————————————
```


### 4.strcmp比较字符串

```php
<?php
$flag = "flag";
if (isset($_GET['a'])) {
    if (strcmp($_GET['a'], $flag) == 0) //如果 str1 小于 str2 返回 < 0； 如果 str1大于 str2返回 > 0；如果两者相等，返回 0。

    //比较两个字符串（区分大小写）
        die('Flag: '.$flag);
    else
        print 'No';
}

?>
```

这里用的是strcmp()函数，这个函数是用于比较字符串的函数，但是倘若他收到一个数组形式的数据时，这个函数将发生错误。
但是在5.3之前的php中，显示了报错的警告信息后，将return 0 !!!! 也就是虽然报了错，但却判定其相等了。这对于使用这个函数来做选择语句中的判断的代码来说简直是一个致命的漏洞。

### 5.sha()函数比较绕过

```php
<?php

$flag = "flag";

if (isset($_GET['name']) and isset($_GET['password']))//判断name和password是否一样
{
    if ($_GET['name'] == $_GET['password'])//一样就报错
        echo '<p>Your password can not be your name!</p>';
    else if (sha1($_GET['name']) === sha1($_GET['password']))//===是要包括变量值与类型完全相等
      die('Flag: '.$flag);
    else
        echo '<p>Invalid password.</p>';
}
else
    echo '<p>Login first!</p>';
?>
```

解题思路：`===` 会比较类型，比如 bool sha1() 函数和 md5() 函数存在着漏洞, sha1() 函数默认的传入参数类型是字符串型，那要是给它传入数组呢会出现错误，使 sha1() 函数返回错误，也就是返回false，这样一来 `===` 运算符就可以发挥作用了，需要构造 `username` 和 `password` 既不相等，又同样是数组类型。


### 6.SESSION验证绕过

```php
<?php

$flag = "flag";

session_start();
if (isset ($_GET['password'])) {
    if ($_GET['password'] == $_SESSION['password']) //判断输入的词和cookie的值相同输出die
        die ('Flag: '.$flag);
    else
        print '<p>Wrong guess.</p>';
}
mt_srand((microtime() ^ rand(1, 10000)) % rand(1, 10000) + rand(1, 10000));
?>
```

- 1. http://127.0.0.1/Php_Bug/08.php?password=
- 2. 清空 cookies 的值


### 7.urldecode二次编码绕过

```php
<?php
if(eregi("hackerDJ",$_GET[id])) { //保证去掉大小写一样
  echo("<p>not allowed!</p>");
  exit();
}

$_GET[id] = urldecode($_GET[id]);
if($_GET[id] == "hackerDJ") //解码后再次解码然后保证两个值相同
{
  echo "<p>Access granted!</p>";
  echo "<p>flag: *****************} </p>";
}
?>
```
  h的URL编码为：%68，二次编码为%2568，绕过。


### 8. X-Forwarded-For绕过指定IP地址

```php
<?php
function GetIP(){
if(!empty($_SERVER["HTTP_CLIENT_IP"]))
    $cip = $_SERVER["HTTP_CLIENT_IP"];
else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
    $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
else if(!empty($_SERVER["REMOTE_ADDR"]))
    $cip = $_SERVER["REMOTE_ADDR"];
else
    $cip = "0.0.0.0";
return $cip;
}

$GetIPs = GetIP();
if ($GetIPs=="1.1.1.1"){
echo "Great! Key is *********";
}
else{
echo "错误！你的IP不在访问列表之内！";
}
?>
```

HTTP头添加X-Forwarded-For:1.1.1.1


### 9.md5加密相等绕过

```php
<?php

$md51 = md5('QNKCDZO');
$a = @$_GET['a'];
$md52 = @md5($a);
if(isset($a)){
if ($a != 'QNKCDZO' && $md51 == $md52) {
    echo "nctf{*****************}";
} else {
    echo "false!!!";
}}
else{echo "please input a";}

?>
```



PHP 探测任意网站密码明文/加密手段办法： md5('240610708') == md5('QNKCDZO')
  5
```php
var_dump(md5('240610708') == md5('QNKCDZO'));
var_dump(md5('aabg7XSs') == md5('aabC9RqS'));
var_dump(sha1('aaroZmOk') == sha1('aaK1STfY'));
var_dump(sha1('aaO8zKZF') == sha1('aa3OFF9m'));
var_dump('0010e2' == '1e3');
var_dump('0x1234Ab' == '1193131');
var_dump('0xABCdef' == ' 0xABCdef');

```








### 10.intval函数四舍五入

浮点数精度忽略
```
if ($req["number"] != intval($req["number"]))
```
在小数小于某个值（10^-16）以后，再比较的时候就分不清大小了。 输入number = 1.00000000000000010, 右边变成1.0, 而左与右比较会相等





