# PDO

## 数据库查询语句中，直接查询获取数据

```php
<?php 
header('content-type:text/html;charset=utf-8');
try{
    $pdo=new PDO('mysql:host=localhost;dbname=test','root','root');
    $sql='select * from test_pdo where id=15';
    $stmt=$pdo->query($sql); //获取，进行数据库查询并且直接获取数据
    var_dump($stmt);
    echo '<hr/>';
    foreach($stmt as $row){
        print_r($row);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
```


