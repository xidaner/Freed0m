# Python - 字典与进阶

- [学习来源](https://www.bilibili.com/video/BV1o4411M71o?p=1)

### 字典的应用场景
   当存在多个数据时，例如：'a','aa','aaa'。并且在程序的处理后，列表发生了变化。在不改变查找语句的情况下还能找到对应数据。

在字典中,数据是以键值对的形式出现的，字典数据和数据顺序没有直接关系，字典不支持使用下标，后期无论数据如何变化，只需要按照对应的键的名字查找对应的数据即可。


### 创建字典的语法

- 字典的特点:
  - 符号为`大括号`
  - 数据为`键值对`形式出现
  - 各个键值对之间使用逗号隔开

**语法**
```py
# 有数据的字典
dict1 = {'aa':'a','bb':'b','cc':'c'}

# 空字典 --1
dict2 = {}

# 空字典 --2
dict3 = dict()
```

### 对于字典的常见操作

- **增加数据**

    写法：`字典序列[key] = 值`
    > 注意：如果key存在`则修改这个key对应的值`；如果key不存在则`新增此键值对`。

    **示例**
    ```py

    dict1['dd'] = 'd'
    print(dict1)    # {'aa': 'aaa', 'bb': 'b', 'cc': 'c', 'dd': 'd'}
    ```
    > 字典为可变数据类型。

- **删除数据**
    写法： `del()/del`:删除字典或删除字典中指定键值对
   ```py
    dict1 = {'aa':'a','bb':'b','cc':'c'}
    del dict1['aa']
    print(dict1) # {'bb': 'b', 'cc': 'c'}
   ```

   - `clear()`:清空字典
   ```py
    dict1 = {'aa':'a','bb':'b','cc':'c'}
    dict1.clear()
    print(dict1)    # {}
   ```

- **修改数据**
    写法：`字典序列[key] = 值`
    ```py
    dict1 = {'aa':'a','bb':'b','cc':'c'}
    dict1['aa'] = 'aaa'
    print(dict1)    # {'aa': 'aaa', 'bb': 'b', 'cc': 'c'}
    ```

- **查找数据**
    - 使用 `Key` 值查找
      写法：`dickt1['键值']`
        ```py
        dict1 = {'aa':'a','bb':'b','cc':'c'}
        print(dict1['aa']) # a

        print(dict1['dd']) # 报错
        ```
        > 如果查找当前存在的Key值则返回对应的值；否则则报错。

    - **get()**
        语法：
        `字典序列.get(key,默认值)`
        > 注意：如果当前查找的key`不存在则返回第二个参数`(默认值)，如果省略第二个参数，则返回None。

        **示例**
        ```py
        dict1 = {'aa':'a','bb':'b','cc':'c'}
        print(dict1.get('aa'))  # a
        print(dict1.get('dd'),'d')  # None d
        print(dict1.get('dd'))  # None
        ```

    - **values()**
        返回字典中的所有value，返回可迭代数据。
        语法：`字典序列.values()`
        示例
        ```py
        dict1 = {'aa':'a','bb':'b','cc':'c'}
        print(dict1.values()) # dict_values(['a', 'b', 'c'])
        ```

    - **items**
      查找字典中所有的键值对
      语法：`字典序列.items()`
        ```py
        dict1 = {'aa':'a','bb':'b','cc':'c'}
        print(dict1.items())   # dict_items([('aa', 'a'), ('bb', 'b'), ('cc', 'c')])
        ```


