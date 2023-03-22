<!--
 * @Author: tackchen
 * @Date: 2022-08-03 21:24:33
 * @Description: Coding something
-->
# [Selon](https://www.github.com/theajack/selon)

<p>
    <a href="https://www.github.com/theajack/selon/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/theajack/selon?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/theajack/selon/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/theajack/selon?logo=github" alt="forks" />
    </a>
    <a href="https://www.npmjs.com/package/selon" target="_black">
        <img src="https://img.shields.io/npm/v/selon?logo=npm" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/selon" target="_black">
        <img src="https://img.shields.io/npm/dm/selon?color=%23ffca28&logo=npm" alt="downloads" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/selon" target="_black">
        <img src="https://data.jsdelivr.com/v1/package/npm/selon/badge" alt="jsdelivr" />
    </a>
    <a href="https://github.com/theajack/selon/issues"><img src="https://img.shields.io/github/issues-closed/theajack/selon.svg" alt="issue"></a>
</p>
<p>
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?&logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/selon/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/selon?color=%232DCE89&logo=github" alt="license" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/selon"><img src="https://img.shields.io/bundlephobia/minzip/selon.svg" alt="Size"></a>
    <a href="https://github.com/theajack/selon/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/selon.svg" alt="TopLang"></a>
    <a href="https://www.github.com/theajack/selon"><img src="https://img.shields.io/librariesio/dependent-repos/npm/selon.svg" alt="Dependent"></a>
    <a href="https://github.com/theajack/selon/blob/master/test/test-report.txt"><img src="https://img.shields.io/badge/test-passed-44BB44" alt="test"></a>
</p>

<h2>🚀 Select from Json: Json Query Language </h2>

**[English](https://github.com/theajack/selon/blob/master/README.md) | [在线试用](https://theajack.github.io/jsbox?github=theajack.selon) | [留言板](https://theajack.github.io/message-board?app=selon)**

----

## 1. 快速使用

### 1.1 npm 引用

```
npm i selon
```

```js
import {selon} from 'selon';

selon([
    {name: 'user1', age: 15}, 
    {name: 'user2', age: 20}
]).select('name')
    .where('age<18')
    .run();
```

### 1.2 script属性配置

```html
<script selon-auto src='https://cdn.jsdelivr.net/npm/selon'></script>
```

或者通过版本引用:

```html
<!--使用指定版本-->
<script selon-auto src='https://cdn.jsdelivr.net/npm/selon@x.x.x'></script>
<!--使用最新版本-->
<script selon-auto src='https://cdn.jsdelivr.net/npm/selon@latest'></script>
```

## selon

用法请参考： [selon.d.ts](https://github.com/theajack/selon/blob/master/packages/selon/src/selon.d.ts)

### 0. .run()

执行整个查询语句

执行整个查询语句。这个方法意味着查询语句终结，返回查询结果。也可以在最后一个方法后面加上一个 true 来执行。例：user.select('*').run()和。user.select('*',true)。

注：该方法只对数据为数组的 selon 对象有效

`参数:null;返回值:data`

```js
var data=[{name:"name1",pw:"p1"},
		{name:"name2",pw:"p2"}];

var result=selon(data).select("*").run();
//与 user.select("*",true) 等价
```

### 1. .select()

查询语句

查询数据中每个元素的指定属性，并组成一个新的数据（数据可以是数组，对象或其他单值类型）。<span class='red'>若只希望对满足某特点要求的数据生效，需要与where方法共同使用，后面章节会介绍到。</span>

`参数:String(属性),[Boolean(run)];返回值:data|Selon`

```js
var data = [{name:"name1",pw:"p1",age:21},
		{name:"name2",pw:"p2",age:22}];
var users = selon(data);
var result=users.select("*",true);
var result1=users.select("name",true);
var result2=users.select("name,age",true);
```


### 2. .select(name)

对列名起别名

对查询结果起别名。查询结果的属性名会被别名代替。

`参数:String(属性 别名),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"n1",age:10,sex:"男"},
		{name:"n2",age:12,sex:"男"},
		{name:"n3",age:20,sex:"女"},
		{name:"n4",age:22,sex:"女"}];
var users = selon(data);
var result=users.select("name 昵称,age",true);
var result1=users.select("name 昵称,age 年龄",true);
```


### 3. .select(distinct)

对查询结果去重

对查询结果去重。若是有多个属性，则多个属性都相同的才会被去掉。

`参数:String(属性),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p"},
		{name:"name2",pw:"p"},
		{name:"name3",pw:"p3"},
		{name:"name3",pw:"p3"},];
var users = selon(data);
var result=users.select("distinct pw",true);
var result1=users.select("distinct pw,name",true);
```


### 4. .select()|func

使用聚合函数

对数据使用聚合函数。聚合函数包含count,count(distinct ),sum,avg,min,max,first,last。没有与groupBy共同使用时select仅能包含一个带有聚合函数的属性，不能包含其他属性。

`参数:String(func(属性)),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"n1",age:10,sex:"男"},
	{name:"n2",age:12,sex:"男"},
	{name:"n3",age:20,sex:"女"},
	{name:"n4",age:22,sex:"女"}];
var result=selon(data).select("count(*)",true);
var result1=selon(data).select("sum(age) 总和",true);//也可以设置别名
		//更多聚合函数请读者自己尝试
```


### 5. .update()

更新属性的值

以字符串的方式更新（修改）数据中的属性的值。缺点是值类型会被转换成字符串。若原数据不是字符串类型，则会破坏原数据类型。

`参数:String(属性),String(值),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1",age:21},
	{name:"name2",pw:"p2",age:22},
	{name:"name3",pw:"p3",age:23}];
selon(data).update("pw","same pw",true);
selon(data).update("name,age","same name,same age",true);
```


### 6. .update(JSON)

更新属性的值

以JSON格式更新（修改）数据中的属性的值。解决了上一节只能是字符串的缺点。只可以是任意类型且不会破坏原数据类型。

`参数:JSON,[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1",age:21},
		{name:"name2",pw:"p2",age:22},
		{name:"name3",pw:"p3",age:23}];
selon(data).update({
	name:"same name",
	age:20//不会破坏原数据类型
},true);
```


### 7. .add()

添加属性

以字符串形式添加属性。不能添加已有的属性否则会报错

`参数:String(属性),String(值),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1"},
		{name:"name2"}];
var users = selon(data);
users.add("pw","same pw",true);
users.add("age,sex","20,男",true);
```


### 8. .add(JSON)

Add Validation

以JSON格式添加属性。不能添加已有的属性否则会报错

`参数:JSON,[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1"},
		{name:"name2"}];
var users = selon(data);
users.add({
	pw:"same pw",
	age:20,
	sex:"女"
},true);
```


### 9. .remove()

移除属性

移除元素的属性。

`参数:String(属性),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1",age:21,sex:"男"},
	{name:"name2",pw:"p2",age:22,sex:"女"}];
var users = selon(data);
users.remove("pw",true);
users.remove("age,sex",true);
```


### 10. .insert()

插入元素

以字符串形式插入元素。该方法只对数据为数组的 selon 对象有效

`参数:String(属性),String(值),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.insert("name,pw","new name,new pw",true);
users.insert("name,pw","new name1;new name2,new pw1;new pw2",true);
users.insert("name,pw","name common,new pw1;new pw2",true);
```

### 11. .insert(JSON)

插入元素

插入JSON或JSON数组。该方法只对数据为数组的 selon 对象有效

`参数:JSON|JSON Array,[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.insert({
	name:"new name",
	pw:"new pw"
},true);
users.insert([{
	name:"new name1",
	pw:"new pw1"
},{
	name:"new name2",
	pw:"new pw2"
}],true);
```


### 12. .insert(index)

指定位置插入

在指定位置处插入元素。该方法只对数据为数组的 selon 对象有效

`参数:(JSON|JSON Array)|(String,String),[int],[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.insert("name,pw","new,new1;new2",1,true);//索引是从0开始
users.insert({
	name:"new name1",
	pw:"new pw1"
},1,true);
```


### 13. .delete()

删除元素

删除元素。如要删除满足特定要求元素，请与where方法同时使用。该方法只对数据为数组的 selon 对象有效

`参数:[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.delete(true);
//若需要删除某个特点元素，请与where语句同时使用
```


### 14. .delete(index)

指定位置删除

指定位置删除。如要删除满足特定要求元素，请与where方法同时使用。该方法只对数据为数组的 selon 对象有效

`参数:[int],[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.delete(0,true);//删除第一个元素
```


### 15. .where()

条件判断

以String形式对其他语句(含select、update、add、remove、delete、groupBy、orderBy)做一个条件删选，不满足条件的元素不会执行其他语句。对于多个条件，他们之间只满足and关系。若要使要其他，请参考.where(exp)。该方法只对数据为数组的 selon 对象有效

`参数:String(属性),String(值),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"same name",pw:"p1"},
	{name:"same name",pw:"p2"},
	{name:"name3",pw:"p3"}];
var users = selon(data);
var result=users.select("*").where("name","same name",true);
var result=users.select("*").where("name,pw","same name,p1",true);//多个条件之间是and的关系
```


### 16. .where(JSON)

条件判断

以JSON对其他语句做一个条件删选。效果与上一节类似。对于多个条件，他们之间只满足and关系。若要使要其他，请参考.where(exp)。

`参数:JSON,[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"same name",pw:"p1"},
	{name:"same name",pw:"p2"},
	{name:"name3",pw:"p3"}];
var users = selon(data);
var result=users.select("*").where({
	name:"same name",
	pw:"p1"
},true);
```


### 17. .where(exp)

条件判断

以js布尔表达式形式对其他语句做一个条件删选。效果与上一节类似。对于多个条件，您可以自定义他们之间的与或非关系，遵循js语法。

`参数:String(布尔表达式),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"same name",pw:"p1",age:11,marry:true},
	{name:"same name",pw:"p2",age:12,marry:false},
	{name:"name3",pw:"p3",age:13,marry:false}];
var users = selon(data);
//尝试按照js语法编写你自己的布尔表达式
//如 "age>=12" "marry" "!marry"等，或将他们使用 && ||组合使用
var result=users.select("name,age").where("name=='same name'",true);
var result=users.select("name,age").where("$index==0",true);
//选择第一条数据
var result=users.select("name,age").where("$i>0&&name=='same name'",true);
//第一条数据被过滤 ,注：$i 与 $index 等价
</script>
```


### 18. .groupBy()

对数据分组

对数据进行分组，参数只能是单个属性，可以单独使用，返回一个二维数组。但通常与聚合函数一起使用，详情请参考下一节。可以与where语句同时使用。

`参数:String(单个属性),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"n1",age:10},
	{name:"n2",age:10},
	{name:"n3",age:20},
	{name:"n4",age:20}];
var users = selon(data);
var result=users.groupBy("age",true);
var result=users.groupBy("age").where("name!='n2'",true);
//groupBy 和 where 先后顺序可以调换
//也可以与select语句同时使用
</script>
```

### 19. .groupBy()|func

使用聚合函数

对数据进行分组并对分组使用聚合函数。聚合函数包含count,count(distinct ),sum,avg,min,max,first,last。

`参数:String(属性),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"n1",age:10,sex:"男"},
	{name:"n2",age:12,sex:"男"},
	{name:"n3",age:20,sex:"女"},
	{name:"n4",age:22,sex:"女"}];
var users = selon(data);
var result=users.select("count(age)",true);
var result=users.select("count(age),sex").groupBy("sex",true);
//由于篇幅有限，请读者自行使用一下 count,sum,avg,min,max,first,last,count(distinct) 函数
</script>
```


### 20. .orderBy()

对数据排序

根据某属性对BQL数据进行排序，返回排序结果，默认是升序。排序不会影响原数据。

`参数:String(单个属性),[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"n1",age:14,sex:"男"},
	{name:"n2",age:12,sex:"男"},
	{name:"n3",age:20,sex:"女"},
	{name:"n4",age:16,sex:"女"}];
var users = selon(data);
var result=users.orderBy("age",true);
var result=users.select("name").orderBy("age",true);
var result=users.select("name").groupBy("sex").orderBy("age",true);
```


### 21. .orderBy(order)

对数据排序

根据某属性对BQL数据进行排序，返回排序结果。您可以选择升序或是排序。次序类型不区分大小写。

`参数:String(单个属性),[String(desc|asc)],[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12},
	{name:"n3",age:20},
	{name:"n4",age:16}];
var users = selon(data);
var result=users.orderBy("age","desc",true);
```


### 22. .orderBy(type)

对数据排序

根据某属性对BQL数据进行排序，返回排序结果。您可以选择属性值的类型。值类型区分大小写，有以下几种类型(data,length,headLetter,Number),其中Number是缺省值。

`参数:String(单个属性),[String(desc|asc)],[String],[Boolean(run)];返回值:data|Selon`

```js
var data=[{name:"aaa",height:170,birth:"1994-03-01"},
	{name:"dd",height:180,birth:"1994-02-01"},
	{name:"ccccc",height:176,birth:"1994/08/01"},
	{name:"bbbbbb",height:177,birth:"1994/07/01"}]; 
var users = selon(data);
var result=users.orderBy("birth","date",true);
var result=users.orderBy("name","length",true);
var result=users.orderBy("name","desc","headLetter",true);
var result=users.orderBy("height","desc","number",true);
//number 是缺省值，不需要添加这个属性也可以
```


### 23. .set()

设置新数据

设置新数据。设置的是克隆版本，被设置数据的改变不会影响BQL数据。被设置数据的类型必须与原数据一样，不然会引发异常。

`参数:data;返回值:data`

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
var newdata=[{name:"new1",age:12},
	{name:"new2",age:12},
	{name:"new3",age:12}];
users.set(newdata);
//以下是为了证明设置的是newdata的克隆版本，newdata数据改变不会影响BQL
```


### 24. .get()

获取克隆数据

获取的是BQL数据的克隆版本，它的数据改变不会影响BQL。

`返回值:data`

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
var data=users.get();
</script>
```


### 25. .data()

获取原数据

获取的是BQL数据原版，它的数据改变会影响BQL

`返回值:data`

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
function dataTest(){
var data=users.data();
```


### 26. .clear()

清空数据

清空BQL对象的数据。数组类型selon的data被设置为[],对象类型设置为{}或null

`返回值:data`

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
users.clear();
```

## [selon-view](https://github.com/theajack/selon/blob/master/scripts/docs/selon-view.md)

请参考 [selon-view.md](https://github.com/theajack/selon/blob/master/scripts/docs/selon-view.md)


## [selon-view query](https://github.com/theajack/selon/blob/master/scripts/docs/sv-attr.md)

请参考 [selon-view.md](https://github.com/theajack/selon/blob/master/scripts/docs/sv-attr.md)