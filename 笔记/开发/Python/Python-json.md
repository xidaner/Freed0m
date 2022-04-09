# Python - JSON

![](img/2077.gif)

- [学习来源-Python JSON](https://www.runoob.com/python/python-json.html)
- [学习来源-Python中的Json模块详解](https://www.cnblogs.com/itelephant/p/9849298.html)
- [学习来源-json语法规则](https://blog.csdn.net/kongsuhongbaby/article/details/84729547)

> JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式，易于人阅读和编写。


使用 JSON 函数需要导入 json 库：`import json`。

|函数	|描述|
|-|-|
|json.dumps	|将 Python 对象编码成 JSON |字符串
|json.loads	|将已编码的 JSON 字符串解码|为 Python 对象


### json.dumps

常见语法：
```py
json.dumps(obj, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=None, separators=None, encoding="utf-8", default=None, sort_keys=False, **kw)
```


1. 将对象编码成 JSON 格式字符串。
```py
import json
data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]
data2 = json.dumps(data)
print(data2)

'''
输出结果
[{"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}]
'''
```

此时将数据输出成方便人阅读的JSON格式数据。


2. 使用参数让 JSON 数据`格式化输出`

```py
import json
data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]
data2 = json.dumps(data, sort_keys=True, indent=4, separators=(',', ': '))
print(data2)

'''
输出结果
[
    {
        "a": 1,
        "b": 2,
        "c": 3,
        "d": 4,
        "e": 5
    }
]
'''
```

### 解析格式化输出函数

#### sort_keys

将json 字符串有序输出

在python3 中 `sort_keys` 已经变成默认值，这里使用python2举例。

```py
# python2
import json
data_dict = {"key1": "value1", "key2": "value2", "key3": "value3"}
json1 = json.dumps(data_dict, sort_keys=True)
json2 = json.dumps(data_dict)
print(json1)
print(json2)

'''
输出结果：
{"key1": "value1", "key2": "value2", "key3": "value3"}
{"key3": "value3", "key2": "value2", "key1": "value1"}
'''
```

通过输出的结果很容易看出，`sort_keys` 函数使得输出json后对key和value进行`0~9、a~z`的顺序排序


#### indent

`Indent` 参数表示缩进的意思，它可以使输出的 JSON 看起来更`加整齐好看，可读性更强`

```py
import json
data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]
data2 = json.dumps(data, indent=4) # 缩进4格
print(data2)

'''
输出结果
[
    {
        "a": 1,
        "c": 3,
        "b": 2,
        "e": 5,
        "d": 4
    }
]

'''
```

#### separators

`separators` 含义为分隔符，默认为 `(',',':')`它表示`key之间用“,”隔开，key和value之间用“:”隔开`.


```py
import json
data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]
data2 = json.dumps(data, indent=4, separators=('¿', '‽'))
print(data2)

'''
输出结果
[
    {
        "a"‽1¿
        "b"‽2¿
        "c"‽3¿
        "d"‽4¿
        "e"‽5
    }
]
'''
```

#### shipkeys

`shipkeys`可以跳过那些非string对象的key的处理，就是不处理。

示例：
```py
import json
data= [ { 'a':'A', 'b':(2, 4), 'c':3.0,(1,2):'D tuple'} ]
print (json.dumps(data,skipkeys=True))
print(u"设置skipkeys 参数")
'''
输出结果
[{"a": "A", "b": [2, 4], "c": 3.0}]
'''
```


### ensure_ascii

默认是True，表示使用 `ascii码` 进行编码。如果设置为False，就会以 `Unicode进行编码`。

```py
import json
print (json.dumps('卢本伟牛逼'))
print (json.dumps('LBWNB',ensure_ascii=False))

'''
输出结果
"\u5362\u672c\u4f1f\u725b\u903c"
"LBWNB"
'''
```




|Python3|JSON|
|-|-|
|dict	|object
|list| tuple	array
|str|unicode	string
|int |long, float	number
|True	|true
|False|	false
|None	|null



### json.loads()

`json.loads` 用于`解码 JSON 数据`。该函数返回 Python 字段的数据类型。

```py
json.loads(s[, encoding[, cls[, object_hook[, parse_float[, parse_int[, parse_constant[, object_pairs_hook[, **kw]]]]]]]])
```

将数据返回为json 格式数据

```py
import json

jsonData = '[{"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}]';
text = json.loads(jsonData)
print(text)

'''
输出结果
[{'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}]
'''
```

将内容返回为 `json` 格式输出


|JSON	 |Python
|-|-|
|object	 |dict
|array	 |list
|string	 |unicode
|number  |(int)	int, long
|number  |(real)	float
|true	 |True
|false	 |False
|null	 |None

**第三方库：Demjson**

> Demjson 是 python 的第三方模块库，可用于编码和解码 JSON 数据，包含了 JSONLint 的格式化及校验功能。

Github 地址：https://github.com/dmeranda/demjson

官方地址：http://deron.meranda.us/python/demjson/

**环境配置**

使用 Demjson 编码或解码 JSON 数据前，先需要安装 Demjson 模块。

```bash
tar -xvzf demjson-2.2.3.tar.gz
cd demjson-2.2.3
python setup.py install
```

#### Demjson JSON 函数

使用起来非常简单

|函数|作用|
|-|-|
|encode|将 Python 对象编码成 JSON 字符串|
|decode|将已编码的 JSON 字符串解码为 Python 对象|

**Encode**

Python encode() 函数用于将 Python 对象编码成 JSON 字符串。

```py
import demjson
data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]
json = demjson.encode(data)
print(json)

'''
输出结果

[{"a":1,"b":2,"c":3,"d":4,"e":5}]
'''
```

**Decode**

Python 可以使用 demjson.decode() 函数解码 JSON 数据。该函数返回 Python 字段的数据类型。

```py
demjson.decode(self, txt)
```


```py
#!/usr/bin/python
import demjson

json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';

text = demjson.decode(json)
print(text)

'''
输出结果
{'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
'''
```





