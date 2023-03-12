
## selon-view 查询语句

### 0. .run()

执行整个查询语句

执行整个查询语句。这个方法意味着查询语句终结，返回查询结果。也可以在最后一个方法后面加上一个 true 来执行。例：user.select('*').run()和。user.select('*',true)。<span class='red'>注：该方法只有s-loop类型的BQL对象才有。</span>

`参数:null;返回值:data`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="测试" onclick="testRun()" />
<div id="show"></div>
<script>
var data=[{name:"name1",pw:"p1"},
		{name:"name2",pw:"p2"}];
function testRun(){
	var result=users.select("*").run();
	//与 user.select("*",true) 等价
	J.id("show").txt(J.toString(result));
}
</script>
```


### 1. .select()

查询语句

查询数据中每个元素的指定属性，并组成一个新的数据（数据可以是数组，对象或其他单值类型）。<span class='red'>若只希望对满足某特点要求的数据生效，需要与where方法共同使用，后面章节会介绍到。</span>

`参数:String(属性),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
	<div>年龄：{{each.age}}</div>
</div>
<input type="button" value="选取全部" onclick="testAll()" />
<input type="button" value="选取单个属性" onclick="testSingle()" />
<input type="button" value="选取多个属性" onclick="testMany()" />
<div id="show"></div>
<script>
var data=[{name:"name1",pw:"p1",age:21},
		{name:"name2",pw:"p2",age:22}];
function testAll(){
	var result=users.select("*",true);
	J.id("show").txt(J.toString(result));
}
function testSingle(){
	var result=users.select("name",true);
	J.id("show").txt(J.toString(result));
}
function testMany(){
	var result=users.select("name,age",true);
	J.id("show").txt(J.toString(result));
}
</script>
```


### 2. .select(name)

对列名起别名

对查询结果起别名。查询结果的属性名会被别名代替。

`参数:String(属性 别名),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>
</div>
<input type="button" value="单个别名" onclick="singleTest()" />
<input type="button" value="多个别名" onclick="manyTest()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:10,sex:"男"},
			{name:"n2",age:12,sex:"男"},
			{name:"n3",age:20,sex:"女"},
			{name:"n4",age:22,sex:"女"}];
	function singleTest(){
		var result=users.select("name 昵称,age",true);
		J.id("show").txt(J.toString(result));
	}
	function manyTest(){
		var result=users.select("name 昵称,age 年龄",true);
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 3. .select(distinct)

对查询结果去重

对查询结果去重。若是有多个属性，则多个属性都相同的才会被去掉。

`参数:String(属性),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="distinct 去重单个属性" onclick="testDist()" />
<input type="button" value="distinct 去多多个属性" onclick="testDistMany()" />
<div id="show"></div>
<script>
var data=[{name:"name1",pw:"p"},
		{name:"name2",pw:"p"},
		{name:"name3",pw:"p3"},
		{name:"name3",pw:"p3"},];
function testDist(){
	var result=users.select("distinct pw",true);
	J.id("show").txt(J.toString(result));
}
function testDistMany(){
	var result=users.select("distinct pw,name",true);
	J.id("show").txt(J.toString(result));
}
</script>
```


### 4. .select()|func

使用聚合函数

对数据使用聚合函数。聚合函数包含count,count(distinct ),sum,avg,min,max,first,last。没有与groupBy共同使用时select仅能包含一个带有聚合函数的属性，不能包含其他属性。

`参数:String(func(属性)),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>
</div>
<input type="button" value="计行数" onclick="countTest()" />
<input type="button" value="计总和" onclick="sumTest()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:10,sex:"男"},
			{name:"n2",age:12,sex:"男"},
			{name:"n3",age:20,sex:"女"},
			{name:"n4",age:22,sex:"女"}];
	function countTest(){
		var result=users.select("count(*)",true);
		J.id("show").txt(J.toString(result));
	}
	function sumTest(){
		var result=users.select("sum(age) 总和",true);//也可以设置别名
		J.id("show").txt(J.toString(result));
		//更多聚合函数请读者自己尝试
	}
</script>
```


### 5. .update()

更新属性的值

以字符串的方式更新（修改）数据中的属性的值。缺点是值类型会被转换成字符串。若原数据不是字符串类型，则会破坏原数据类型。

`参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
	<div>年龄：{{each.age}}</div>
</div>
<input type="button" value="update 单个属性" onclick="updateSingle()" />
<input type="button" value="update 多个属性" onclick="updateMany()" />
<script>
var data=[{name:"name1",pw:"p1",age:21},
		{name:"name2",pw:"p2",age:22},
		{name:"name3",pw:"p3",age:23}];
function updateSingle(){
	users.update("pw","same pw",true);
}
function updateMany(){
	users.update("name,age","same name,same age",true);
}
</script>
```


### 6. .update(JSON)

更新属性的值

以JSON格式更新（修改）数据中的属性的值。解决了上一节只能是字符串的缺点。只可以是任意类型且不会破坏原数据类型。

`参数:JSON,[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
	<div>年龄：{{each.age}}</div>
</div>
<input type="button" value="JSON update" onclick="updateWithJson()" />
<script>
var data=[{name:"name1",pw:"p1",age:21},
		{name:"name2",pw:"p2",age:22},
		{name:"name3",pw:"p3",age:23}];
function updateWithJson(){
	users.update({
		name:"same name",
		age:20//不会破坏原数据类型
	},true);
}
</script>
```


### 7. .add()

添加属性

以字符串形式添加属性。不能添加已有的属性否则会报错

`参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
	<div>年龄：{{each.age}}</div>
	<div>性别：{{each.sex}}</div>
</div>
<input type="button" value="添加单个属性" onclick="addSingle()" />
<input type="button" value="添加多个属性" onclick="addMany()" />
<script>
var data=[{name:"name1"},
		{name:"name2"}];
function addSingle(){
	users.add("pw","same pw",true);
}
function addMany(){
	users.add("age,sex","20,男",true);
}
</script>
```


### 8. .add(JSON)

Add Validation

以JSON格式添加属性。不能添加已有的属性否则会报错

`参数:JSON,[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
	<div>年龄：{{each.age}}</div>
	<div>性别：{{each.sex}}</div>
</div>
<input type="button" value="JSON 格式添加属性" onclick="addWithJson()" />
<script>
var data=[{name:"name1"},
		{name:"name2"}];
function addWithJson(){
	users.add({
		pw:"same pw",
		age:20,
		sex:"女"
	},true);
}
</script>
```


### 9. .remove()

移除属性

移除元素的属性。

`参数:String(属性),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
	<div>年龄：{{each.age}}</div>
	<div>性别：{{each.sex}}</div>
</div>
<input type="button" value="移除单个属性" onclick="removeSingleAttr()" />
<input type="button" value="移除多个属性" onclick="removeManyAttr()" />
<script>
	var data=[{name:"name1",pw:"p1",age:21,sex:"男"},
			{name:"name2",pw:"p2",age:22,sex:"女"}];
	function removeSingleAttr(){
		users.remove("pw",true);
	}
	function removeManyAttr(){
		users.remove("age,sex",true);
	}
</script>
```


### 10. .insert()

插入元素

以字符串形式插入元素。该方法只对s-loop类型的BQL对象有效

`参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="插入单个元素" onclick="insertSingle()" />
<input type="button" value="插入多个元素" onclick="insertMany()" />
<input type="button" value="有共同属性时插入多个元素" onclick="insertManyComm()" />
<script>
	var data=[{name:"name1",pw:"p1"},
			{name:"name2",pw:"p2"}];
	function insertSingle(){
		users.insert("name,pw","new name,new pw",true);
	}
	function insertMany(){
		users.insert("name,pw","new name1;new name2,new pw1;new pw2",true);
	}
	function insertManyComm(){
		users.insert("name,pw","name common,new pw1;new pw2",true);
	}
</script>
```


### 11. .insert(JSON)

插入元素

插入JSON或JSON数组。该方法只对s-loop类型的BQL对象有效

`参数:JSON|JSON Array,[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="插入单个元素" onclick="insertSingle()" />
<input type="button" value="插入多个元素" onclick="insertMany()" />
<script>
	var data=[{name:"name1",pw:"p1"},
			{name:"name2",pw:"p2"}];
	function insertSingle(){
		users.insert({
			name:"new name",
			pw:"new pw"
		},true);
	}
	function insertMany(){
		users.insert([{
			name:"new name1",
			pw:"new pw1"
		},{
			name:"new name2",
			pw:"new pw2"
		}],true);
	}
</script>
```


### 12. .insert(index)

指定位置插入

在指定位置处插入元素。该方法只对s-loop类型的BQL对象有效

`参数:(JSON|JSON Array)|(String,String),[int],[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="以字符串形式在第二个位置插入" onclick="insertStr()" />
<input type="button" value="以JSON形式在第二个位置插入" onclick="insertJson()" />
<script>
	var data=[{name:"name1",pw:"p1"},
			{name:"name2",pw:"p2"}];
	function insertStr(){
		users.insert("name,pw","new,new1;new2",1,true);//索引是从0开始
	}
	function insertJson(){
		users.insert({
			name:"new name1",
			pw:"new pw1"
		},1,true);
	}
</script>
```


### 13. .delete()

删除元素

删除元素。如要删除满足特定要求元素，请与where方法同时使用。该方法只对s-loop类型的BQL对象有效

`参数:[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="删除" onclick="deleteTest()" />
<script>
	var data=[{name:"name1",pw:"p1"},
			{name:"name2",pw:"p2"}];
	function deleteTest(){
		users.delete(true);
		//若需要删除某个特点元素，请与where语句同时使用
	}
</script>
```


### 14. .delete(index)

指定位置删除

指定位置删除。如要删除满足特定要求元素，请与where方法同时使用。该方法只对s-loop类型的BQL对象有效

`参数:[int],[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="删除第一个元素" onclick="deleteTest()" />
<script>
	var data=[{name:"name1",pw:"p1"},
			{name:"name2",pw:"p2"}];
	function deleteTest(){
		users.delete(0,true);//删除第一个元素
	}
</script>
```


### 15. .where()

条件判断

以String形式对其他语句(含select、update、add、remove、delete、groupBy、orderBy)做一个条件删选，不满足条件的元素不会执行其他语句。对于多个条件，他们之间只满足and关系。若要使要其他，请参考.where(exp)。该方法只对s-loop类型的BQL对象有效

`参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="单个条件" onclick="whereTest()" />
<input type="button" value="多个条件" onclick="whereManyTest()" />
<div id="show"></div>
<script>
	var data=[{name:"same name",pw:"p1"},
			{name:"same name",pw:"p2"},
			{name:"name3",pw:"p3"}];
	function whereTest(){
		var result=users.select("*").where("name","same name",true);
		J.id("show").txt(J.toString(result));
	}
	function whereManyTest(){
		var result=users.select("*").where("name,pw","same name,p1",true);//多个条件之间是and的关系
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 16. .where(JSON)

条件判断

以JSON对其他语句做一个条件删选。效果与上一节类似。对于多个条件，他们之间只满足and关系。若要使要其他，请参考.where(exp)。

`参数:JSON,[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="JSON格式条件" onclick="whereTest()" />
<div id="show"></div>
<script>
	var data=[{name:"same name",pw:"p1"},
			{name:"same name",pw:"p2"},
			{name:"name3",pw:"p3"}];
	function whereTest(){
		var result=users.select("*").where({
			name:"same name",
			pw:"p1"
		},true);
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 17. .where(exp)

条件判断

以js布尔表达式形式对其他语句做一个条件删选。效果与上一节类似。对于多个条件，您可以自定义他们之间的与或非关系，遵循js语法。

`参数:String(布尔表达式),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>密码：{{each.pw}}</div>
</div>
<input type="button" value="普通布尔表达式" onclick="whereTest()" />
<input type="button" value="带有index" onclick="whereIndexTest()" />
<input type="button" value="index与其他条件" onclick="whereIndexAndOtherTest()" />
<div id="show"></div>
<script>
	var data=[{name:"same name",pw:"p1",age:11,marry:true},
			{name:"same name",pw:"p2",age:12,marry:false},
			{name:"name3",pw:"p3",age:13,marry:false}];
	function whereTest(){
		//尝试按照js语法编写你自己的布尔表达式
		//如 "age>=12" "marry" "!marry"等，或将他们使用 && ||组合使用
		var result=users.select("name,age").where("name=='same name'",true);
		J.id("show").txt(J.toString(result));
	}
	function whereIndexTest(){
		var result=users.select("name,age").where("$index==0",true);
		//选择第一条数据
		J.id("show").txt(J.toString(result));
	}
	function whereIndexAndOtherTest(){
		var result=users.select("name,age").where("$i>0&&name=='same name'",true);
		//第一条数据被过滤 ,注：$i 与 $index 等价
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 18. .groupBy()

对数据分组

对数据进行分组，参数只能是单个属性，可以单独使用，返回一个二维数组。但通常与聚合函数一起使用，详情请参考下一节。可以与where语句同时使用。

`参数:String(单个属性),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}</div>
	<div>年龄：{{each.age}}</div>
</div>
<input type="button" value="只是用groupBy" onclick="groupByTest()" />
<input type="button" value="与where同时使用" onclick="groupByWhereTest()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:10},
			{name:"n2",age:10},
			{name:"n3",age:20},
			{name:"n4",age:20}];
	function groupByTest(){
		var result=users.groupBy("age",true);
		J.id("show").txt(J.toString(result));
	}
	function groupByWhereTest(){
		var result=users.groupBy("age").where("name!='n2'",true);
		//groupBy 和 where 先后顺序可以调换
		//也可以与select语句同时使用
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 19. .groupBy()|func

使用聚合函数

对数据进行分组并对分组使用聚合函数。聚合函数包含count,count(distinct ),sum,avg,min,max,first,last。

`参数:String(属性),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>
</div>
<input type="button" value="单独使用聚合函数" onclick="funcTest()" />
<input type="button" value="与groupBy同时使用" onclick="groupByFuncTest()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:10,sex:"男"},
			{name:"n2",age:12,sex:"男"},
			{name:"n3",age:20,sex:"女"},
			{name:"n4",age:22,sex:"女"}];
	function funcTest(){
		var result=users.select("count(age)",true);
		J.id("show").txt(J.toString(result));
	}
	function groupByFuncTest(){
		var result=users.select("count(age),sex").groupBy("sex",true);
		//由于篇幅有限，请读者自行使用一下 count,sum,avg,min,max,first,last,count(distinct) 函数
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 20. .orderBy()

对数据排序

根据某属性对BQL数据进行排序，返回排序结果，默认是升序。排序不会影响原数据。

`参数:String(单个属性),[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>
</div>
<input type="button" value="按年龄以默认顺序排序" onclick="orderByTest()" />
<input type="button" value="与select一起使用" onclick="orderByWithSelect()" />
<input type="button" value="与groupBy一起使用" onclick="orderByWithGroup()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:14,sex:"男"},
			{name:"n2",age:12,sex:"男"},
			{name:"n3",age:20,sex:"女"},
			{name:"n4",age:16,sex:"女"}];
	function orderByTest(){
		var result=users.orderBy("age",true);
		J.id("show").txt(J.toString(result));
	}
	function orderByWithSelect(){
		var result=users.select("name").orderBy("age",true);
		J.id("show").txt(J.toString(result));
	}
	function orderByWithGroup(){
		var result=users.select("name").groupBy("sex").orderBy("age",true);
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 21. .orderBy(order)

对数据排序

根据某属性对BQL数据进行排序，返回排序结果。您可以选择升序或是排序。次序类型不区分大小写。

`参数:String(单个属性),[String(desc|asc)],[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}</div>
</div>
<input type="button" value="按年龄以降序排序" onclick="orderByTest()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:14},
			{name:"n2",age:12},
			{name:"n3",age:20},
			{name:"n4",age:16}];
	function orderByTest(){
		var result=users.orderBy("age","desc",true);
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 22. .orderBy(type)

对数据排序

根据某属性对BQL数据进行排序，返回排序结果。您可以选择属性值的类型。值类型区分大小写，有以下几种类型(data,length,headLetter,Number),其中Number是缺省值。

`参数:String(单个属性),[String(desc|asc)],[String],[Boolean(run)];返回值:data|BQL`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；身高：{{each.height}}；生日：{{each.birth}}</div>
</div>
<input type="button" value="按生日升序" onclick="orderByDateTest()" />
<input type="button" value="按字符串长度升序" onclick="orderByLengthTest()" />
<input type="button" value="按首字母降序" onclick="orderByHeadTest()" />
<input type="button" value="按身高降序" onclick="orderByNumberTest()" />
<div id="show"></div>
<script>
	var data=[{name:"aaa",height:170,birth:"1994-03-01"},
			{name:"dd",height:180,birth:"1994-02-01"},
			{name:"ccccc",height:176,birth:"1994/08/01"},
			{name:"bbbbbb",height:177,birth:"1994/07/01"}]; 
	function orderByDateTest(){
		var result=users.orderBy("birth","date",true);
		J.id("show").txt(J.toString(result));
	}
	function orderByLengthTest(){
		var result=users.orderBy("name","length",true);
		J.id("show").txt(J.toString(result));
	}
	function orderByHeadTest(){
		var result=users.orderBy("name","desc","headLetter",true);
		J.id("show").txt(J.toString(result));
	}
	function orderByNumberTest(){
		var result=users.orderBy("height","desc","number",true);
		//number 是缺省值，不需要添加这个属性也可以
		J.id("show").txt(J.toString(result));
	}
</script>
```


### 23. .set()

设置新数据

设置新数据。设置的是克隆版本，被设置数据的改变不会影响BQL数据。被设置数据的类型必须与原数据一样，不然会引发异常。

`参数:data;返回值:data`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}</div>
</div>
<input type="button" value="设置新数据" onclick="setTest()" />
<script>
	var data=[{name:"n1",age:14},
			{name:"n2",age:12}];
	function setTest(){
		var newdata=[{name:"new1",age:12},
			{name:"new2",age:12},
			{name:"new3",age:12}];
		users.set(newdata);
		//以下是为了证明设置的是newdata的克隆版本，newdata数据改变不会影响BQL
		newdata[0].name="change";
		users.refresh();
	}
</script>
```


### 24. .get()

获取克隆数据

获取的是BQL数据的克隆版本，它的数据改变不会影响BQL。

`返回值:data`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}</div>
</div>
<input type="button" value="获取数据" onclick="getTest()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:14},
			{name:"n2",age:12}];
	function getTest(){
		var data=users.get();
		//以下是为了证明获取的是BQL数据的克隆版本，它的数据改变不会影响BQL
		data[0].name="change";
		users.refresh();
		J.id("show").txt(J.toString(data));
	}
</script>
```


### 25. .data()

获取原数据

获取的是BQL数据原版，它的数据改变会影响BQL

`返回值:data`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}</div>
</div>
<input type="button" value="使用BQL数据" onclick="dataTest()" />
<div id="show"></div>
<script>
	var data=[{name:"n1",age:14},
			{name:"n2",age:12}];
	function dataTest(){
		var data=users.data();
		//以下是为了证明获取的是BQL数据原版，它的数据改变会影响BQL
		data[0].name="change";
		users.refresh();
		J.id("show").txt(J.toString(data));
	}
</script>
```


### 26. .clear()

清空数据

清空BQL对象的数据。s-loop类型数据被设置为[],s-bind设置为{}或null

`返回值:data`

```html
<div s-loop="users" s-init="data">
	<div>昵称：{{each.name}}；年龄：{{each.age}}</div>
</div>
<input type="button" value="清空BQL数据" onclick="clearTest()" />
<script>
	var data=[{name:"n1",age:14},
			{name:"n2",age:12}];
	function clearTest(){
		users.clear();
	}
</script>
```


### 27. .init()

绑定BQL元素

使用代码初始化数据。未经初始化的BQL元素不可使用。这一节与上一章的 .init() 内容一模一样。放在这里只是为了强调它是BQL的方法

`对象:BQL;参数:data;返回值:与参数相同;`

```html
<div s-bind="user">
	<div>昵称：{{user.nickname}}</div>
	<div>密码：{{user.pw}}</div>
</div>
<input type="button" onclick="init()" value="初始化user"/>
<script>
	function init(){
		user.init({nickname:"name1",pw:"p1"});
	}
</script>
```

