# Python - 递归

- [学习来源](https://www.bilibili.com/video/BV1o4411M71o?p=1)

<p align="center">
    <img src="http://p1.music.126.net/d2IB2I-8FcSOWN7xk1lwxA==/109951165274287603.jpg?param=130y130" width="25%">
</p>

<p align="center">👴 百变酒精</p>
<p align="center"><a href="https://music.163.com/#/song?id=1474404223"><font>《Centerfold》</font></a> </p>
<p align="center">专辑：百变酒精</p>
<p align="center">歌手：法老</p>


## 递归

**递归的应用场景**

递归是一种编程思想，应用场景:
  1. 在我们日常开发中，如果要遍历一个文件夹下面所有的文件，通常会使用递归来实现：
  2. 在后续的算法课程中，很多算法都离不开递归，例如：快速排序。

**递归的特点**
  - 函数的内部自己调用自己
  - 必须要有出口

#### 实例

应用：3以内数字累加和
- 代码：
```py
# 3+2+1
def sum_numbers(num):
    # 1.如果是1,则直接返回1 -- 出口
    if num == 1:
        return 1
    # 2 如果不是1，则重复执行累加并返回结果
    return num + sum_numbers(num-1)
Num = int(input('输入一个开始数字'))
sum_result = sum_numbers(Num)
# 输出结果为6
print(sum_result)
```
> 此时当输入数值大于 1000 时会报错

## lambda

### lambda 表达式

什么是 `lambda` ：为了简化代码
适配场景：如果一个函数有一个返回值，并且只有一句代码，则可以使用`lambda`简化。

`lambda` 语法:
```py
lambda 参数列表:表达式
```
> 注意
- lambda 表达式的参数可有可无，函数的参数在lambda 表达式中完全适用。
- lambda 表达式能接收任何数量的参数，但是只能返回一个表达式的值。

**实例**
> 使用函数和lambda 分别实现 打印 100
```py
# 需求 函数 返回值100
# 1.使用函数
def fn1():
    return 100

print(fn1())



# 2.使用lambda
print((lambda:100))
'''
发现打印出的是内存地址
<function <lambda> at 0x000001CA1FDA3D38>
'''
# 当我们调用返回值
fn2 = lambda:100
print(fn2())
# 发现返回为100
'''
100
'''
```

### **实例**

> 输入两个值，计算 a+b
- **函数实现**
    ```py
    int1 = input('a:')
    int2 = input('b:')
    def add(a, b):
        a = int(a)
        b = int(b)
        return a + b


    resout = add(int1, int2)
    print(resout)
    '''
    a:1
    b:1
    2
    '''
    ```

- **使用 lambda**
    ```py
    int1 = input('a:')
    int2 = input('b:')

    num = lambda a, b: int(a) + int(b)
    print(num(int1,int2))
    ```

#### lambda的参数形式

- **无参数**
    ```py
    fn1 = lambda:100
    print(fn1())
    ```

- **一个参数**
    ```py
    fn1 = lambda a: a
    print(fn1('hello world'))
    ```

- **默认参数**
    ```py
    int1 = input('a:')
    int2 = input('b:')

    fn1 = lambda a,b,c=100 : int(a) + int(b) +c # 此时c是默认参数 100
    print(fn1(int1,int2)) # 此时值为：int1 + int2 +100
    print(fn1(int1,int2,200)) # 此时值为：int1 + int2 +200
    ```

- **可变参数(不定长参数)**
    ```py
    int1 = input('a:')
    int2 = input('b:')

    fn1= lambda *args:args
    print(fn1(int1,int2))

    '''
    a:11
    b:22
    ('11', '22')
    '''
    ```

- **可变参数(kwargs)**
    ```py
    int1 = input('a:')
    int2 = input('b:')

    fn5 = lambda **kwargs:kwargs # 返回一个字典
    print(fn5(name = int1,age = int2))
    '''
    a:tom
    b:12
    {'name': 'tom', 'age': '12'}
    '''
    ```

## lambda 的应用

- 带判断的**lambda**
    > 输入两个数，判断两个数的大小
    ```py
    int1 = input('a:')
    int2 = input('b:')

    fn5 = lambda a,b:a if int(a) > int(b) else b
    print(fn5(int1,int2))
    ```
-  对 name key 对应的值进行升序排序
    ```py
        students = [
        {'name':'tom','age':'12'},
        {'name':'Rose','age':'24'},
        {'name':'Jack','age':'20'}
    ]

    # 对 name key 对应的值进行升序排序
    students.sort(key=lambda x: x['name'])
    print(students)
    ```

-  对 name key 对应的值进行降序排序
    ```py
        students = [
        {'name':'tom','age':'12'},
        {'name':'Rose','age':'24'},
        {'name':'Jack','age':'20'}
    ]

    # 对 name key 对应的值进行降序排序
    students.sort(key=lambda x: x['name'],reverse = True)
    print(students)
    ```

## 高阶函数
> 指将函数作为参数传入，这样的函数称为高阶函数，高阶函数是函数式编程的体现。函数式编程就是指这种抽象的编程范式。

实例：
将任意两个数字，按照指定要求整理数字后再进行求和计算。

- 实例一：
    ```py
    inta = int(input('a:'))
    intb = int(input('b:'))
    result = lambda a, b:abs(a)+abs(b) # abs() 函数返回数字的绝对值。
    print(result(inta,intb))

    '''
    运行结果：
    a:-3
    b:5
    8
    '''
    ```

- 实例二：
    ```py
    inta = int(input('a:'))
    intb = int(input('b:'))
    result = lambda a,b,f:f(a)+f(b)
    print(result(inta,intb,abs))

    '''
    运行结果：
    a:-3
    b:5
    8
    '''
    ```
    假如才此时，我们需要对inta 和intb进行四舍五入的运算，此时第一种方法只能重新定义一个函数或者重写函数。而第二个函数则直接修改传入的数值即可进行更改。

    > 两种写法对比后会发现，方法2的代码会更急简洁，函数灵活性更高。
函数式编程大量使用函数，减少了代码的重复，因此程序会比较短，开发速度较快。

### 内置高阶函数

#### map()

map(func,lst),将传入的函数变量 func 作用到lst 变量的每个元素中，并将结果组成新的列表(py2)/迭代器(py3)返回

需求：计算`list1`序列中各个数字的2次方。

```py
# 1. 准备列表数据
list1 = [1, 2, 3, 4, 5]
# 2. 准备2次方计算的函数
def func(x):
    return x**2
# 3.调用map
result = map(func, list1)
# 4.输出结果
print(result)
'''
此时输出的是迭代器：
<map object at 0x000001ED2C5A6648>
'''
# 需要将数据类型转换为列表
print(list(result))
'''
[1, 4, 9, 16, 25]
'''
```

#### reduce()

reduce(func,lst),其中 func 必须要有两个参数。每次 func 计算的结果继续和序列的下一个元素做累积计算。

> 注意：reduce() 传入的参数 func 必须接收 2个参数。

需求：计算 list1 序列中各个数字累计的和。

如果想要使用该函数，必须导入对应的库
```py
# 1. 准备列表数据并导入模块
list1 = [1, 2, 3, 4, 5]
import functools
# 2. 准备功能函数
def func(a,b):
    return a + b
# 3.调用reduse计算函数的累加和
result = functools.reduce(func,list1)
print(result) # 15

```
> 注意该函数为累计叠加的方法。


#### filter()

filter(func,lst) 函数用于过滤序列，过滤掉不符合条件的元素，返回一个filter 对象。如果要转换为列表，可以使用list()来转换。

```py
# 1. 准备列表数据
list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# 2. 准备功能函数
def func(x):
    return x % 2 == 0
# 对目标函数进行过滤
result = filter(func,list1)

print(result)
'''
<filter object at 0x000001D50F0A6788>
'''
print(list(result))
'''
[2, 4, 6, 8, 10]
'''
```

### 总结

- 递归
  - 函数内部自己调用自己
  - 必须有出口
- lambda
  - 语法
    ```py
    lambda 参数列表：表达式
    ```
  - lambda 的参数形式
    - 无参数
    ```py
    lambda:表达式
    ```
    - 一个参数
    ```py
    lambda 参数：表达式
    ```
    - 默认参数
    ```py
    lambda key = value:表达式
    ```
    - 不定长位置参数
    ```py
    lambda *args:表达式
    ```
    - 不定长关键字参数
    ```py
    lambda **kwargs: 表达式
    ```
- 高阶函数
  - map()
  - reduce()
  - filter()

## 文件操作

### 目录

 - 文件操作的作用
 - 文件的基本操作
   - 打开
   - 读写
   - 关闭
 - 文件备份
 - 文件和文件夹的操作

### 文件操作的作用

> 什么是文件?什么是文件操作

文件操作包含什么？打开、关闭、读写、复制等等

文件的操作的作用是什么？
读取内存，写入内存，备份内存...

> 文件的操作的作用就是 `把一些内容(数据)存储起来，方便程序下一次执行的时候直接使用，不必重新制作一份，省时省力。`

### 文件的基本操作

> 文件的操作步骤

- 打开文件
- 读写等操作
- 关闭文件

#### 打开文件

在python中，使用open 函数，`可以打开一个已经存在的文件，或者创建一个新文件`，语法如下：
```py
open(name,mode)

open('/root/1.txt','w')
```

- name:是要打开的目标文件名的字符串(可以包含文件所在的具体路径)。
- mode:设置打开文件的模式(访问模式)：写入，只读，追加等等。


体验文件操作

- 1. 打开

- 2. 读写操作

- 3. 关闭

```py
# 1. 打开文件
f = open('12.txt','w')
# 2. 读写操作
f.write('test')
# 3， 关闭文件
f.close()
```
> 如果是存在文件则写入，不存在会自动创建文件。此时会发现，文件中已经写入 test 字符。



#### 读取函数

- read()
```py
文件对象.read(num)
```
> num表示要从文件中读取的数据的长度(单位是X字节)，如果没有传入 num，那么就表示读取文件中的所有数据。

- readlines()

readlines 可以按照行的方式把整个文件中的内容进行一次读取，并且返回一个是列表，妻子每一行的数据为一个元素。

```py
# 1. 打开文件,对文件进行写入数据，并读取文件内容的操作。
f = open('1.txt','w')
# 2. 读写操作
f.write('test')
f.close()
f = open('1.txt')
content = f.readlines()
# 3， 关闭文件
f.close()
print(content)
```







