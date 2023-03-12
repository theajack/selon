## selon-view 属性

### 0. 如何使用

开始使用BQL

这一节介绍BQL的基本使用方法，主要是如何把BQL嵌入到您的html文件中。BQL主要功能是把单值，JSON，JSON数组类型的变量绑定到html元素上，支持双向绑定，动态刷新，以及以类SQL的方式对他们进行操作。具体的属性设置将在下面的章节介绍到。

`以html元素属性的方式使用。`

```html
<div s-bind="string" s-init="'test'">
	<!--s-init 的值是String 或者 Number-->
	<div>单值类型：<input type="text" value="{{string}}" /></div>
	<div>带js语法：<input type="text" value="{{(string=='test')?1:0}}" /></div>
</div><br/> 
JSON单值类型：
<div s-bind="user" s-init="{nickname:'theajack',pw:'1111'}">
	<!--s-init 的值是Object-->
	<div>昵称：{{user.nickname}}</div>
	<div>密码：{{user.pw}}</div>
</div> <br/>
JSON数组类型：
<div s-loop="users" s-init="getArray()">
	<!--s-init 的值也可以是全局变量或方法-->
	<div>昵称：{{each.nickname}}</div>
	<div>密码：{{each.pw}}</div>
</div> 
<script>
	function getArray(){
		return [{nickname:"name1",pw:"p1"},
			{nickname:"name2",pw:"p2"}];
	} 
</script>
```


### 1. s-bind

绑定BQL元素

接下来的章节会介绍BQL UI元素的所有属性。
s-bind是一个可选的属性(但与s-loop而这之前必选其一)，以将<span class='red'>单值数据</span>(JSON,String,Number,Boolean等)和html元素进行绑定，生成一个全局的BQL元素，变量名就是s-bind属性值。

`s-bind="name"。`

```html
<div s-bind="string" s-init="'test'">
	<!--s-init 的值是String 或者 Number-->
	<div>单值类型：<input type="text" value="{{string}}" /></div>
	<div>带js语法：<input type="text" value="{{(string=='test')?1:0}}" /></div>
</div><br/> 
JSON单值类型：
<div s-bind="user" s-init="{nickname:'theajack',pw:'1111'}">
	<!--s-init 的值是Object-->
	<div>昵称：{{user.nickname}}</div>
	<div>密码：{{user.pw}}</div>
</div>
<script>
</script>
```


### 2. s-loop

绑定BQL元素

s-loop是一个可选的属性(但与s-bind而这之前必选其一)，以将<span class='red'>JSON数组</span>(JSON,String,Number,Boolean等)和html元素进行绑定，生成一个全局的BQL元素，变量名就是s-loop属性值。

`s-loop="name"。`

```html
JSON数组类型：
<div s-loop="users" s-init='[{nickname:"name1",pw:"p1"},{nickname:"name2",pw:"p2"}]'>
	<!--s-init 的值也可以是全局变量或方法-->
	<div>索引：{{$index}}</div><!--$index 指代元素的位置；$index=$i-->
	<div>昵称：{{each.nickname}}</div>
	<div>密码：{{each.pw}}</div>
</div> 
<script>
</script>
```


### 3. s-init

绑定BQL元素

可选属性，初始化BQL元素的数据。未经初始化数据的BQL元素不可以使用，或者使用代码初始化数据，下一节会介绍到。值可以是JSON数组、JSON、String、Number等。值的格式遵循js语法，也支持全部变量或方法。

`s-init=value。`

```html
直接赋值：
<div s-bind="user" s-init="{nickname:'theajack',pw:'1111'}">
	<div>昵称：{{user.nickname}}</div>
	<div>密码：{{user.pw}}</div>
</div> <br/>
全局变量或方法：
<div s-loop="users" s-init="getArray()">
	<div>昵称：{{each.nickname}}</div>
	<div>密码：{{each.pw}}</div>
</div> 
<script>
	function getArray(){
		return [{nickname:"name1",pw:"p1"},
			{nickname:"name2",pw:"p2"}];
	} 
</script>
```


### 4. s-bind|s-loop;s-init

组合写法

s-bind或者s-loop可以与s-init组合起来写在一个属性里面。详情使用见实例。

`s-bind='name;data' 或 s-loop='name;data'`

```html
s-bind与s-init组合写法：
<div s-bind="user;{nickname:'theajack',pw:'1111'}">
	<div>昵称：{{user.nickname}}</div>
	<div>密码：{{user.pw}}</div>
</div> <br/>
s-loop与s-init组合写法：
<div s-loop="users;getArray()">
	<div>昵称：{{each.nickname}}</div>
	<div>密码：{{each.pw}}</div>
</div> 
<script>
	function getArray(){
		return [{nickname:"name1",pw:"p1"},
			{nickname:"name2",pw:"p2"}];
	} 
</script>
```


### 5. .init()

绑定BQL元素

使用代码初始化数据。未经初始化的BQL元素不可使用。

`对象:BQL;参数:data;返回值:与参数相同;(data可以是JSON Array|JSON|String|Number|Boolean)`

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


### 6. BQL.init()

绑定BQL元素

BQL.init() 方法可将BQL UI元素生成BQL 元素。页面加载是会对全部BQL UI元素自动init，若是动态添加的需要手动init

`参数:[HTMLElement,data];返回值:[BQL];`

```html
<div id="parent">
</div>
<input type="button" onclick="add()" value="添加一个BQL UI元素"/>
<input type="button" onclick="init()" value="初始化user"/>
<input type="button" onclick="initSplit()" value="分步初始化user"/>
<input type="button" onclick="initAll()" value="初始化全部"/>
<input type="button" onclick="J.id('parent').empty()" value="重置"/>
<script>
	function add(){
		if(J.id("user")==undefined){
			var wrapper=J.new("div#user[s-bind=user]").append([
				J.new("div").txt("昵称：{{user.nickname}}"),
				J.new("div").txt("密码：{{user.pw}}")
			]);
			J.id("parent").append(wrapper);
		}else{
			J.show("已经添加过了,请先重置","warn");
		}
	}
	function init(){
		BQL.init(J.id("user"),{nickname:"name1",pw:"p1"});
	} 
	function initSplit(){
		BQL.init(J.id("user"));//生成BQL元素
		user.init({nickname:"name1",pw:"p1"});//对BQL元素初始化数据
	} 
	function initAll(){
		BQL.init();//将页面所有BQL UI元素生成BQL元素，这会重新生成已有的BQL元素
		user.init({nickname:"name1",pw:"p1"});//对BQL元素初始化数据
	} 
</script>
```


### 7. s-each

循环变量命名

可选属性，但是只能与s-loop同时使用。功能是为循环变量命名，缺省值是each。

`s-each="name"`

```html
缺省值：
<div s-loop="users" s-init="getArray()">
	<!--s-init 的值也可以是全局变量或方法-->
	<div>昵称：{{each.nickname}}</div>
	<div>密码：{{each.pw}}</div>
</div> <br/>
设置为user：
<div s-loop="users" s-each="user" s-init="getArray()">
	<!--s-init 的值也可以是全局变量或方法-->
	<div>昵称：{{user.nickname}}</div>
	<div>密码：{{user.pw}}</div>
</div> 
<script>
	function getArray(){
		return [{nickname:"name1",pw:"p1"},{nickname:"name2",pw:"p2"}];
	}
</script>
```


### 8. s-update 

是否更新BQL数据

可选属性，缺省值是false。是否在绑定了数据的input或textarea元素<span class='red'>oninput</span>时更新BQL数据。(要求:input 的value 或者textarea的html内容必须是纯粹的值，不可包含js语句，例如value='{{each.nickname}}' &lt;textarea>{{each.nickname}}&lt;/textarea>或value='{{name}}' &lt;textarea>{{name}}&lt;/textarea>))

`s-update="Boolean"`

```html
<div s-bind="user" s-update=true s-init="{nickname:'name',pw:'p'}">
	<div>昵称：<input type="text" value="{{user.nickname}}"/></div>
	<div>密码：<textarea>{{user.pw}}</textarea></div>
</div> 
<input type="button" value="查看数据" onclick="showData()"/>
<div id="show"></div> 
<script>
	function showData(){
		var data=user.get();
		J.id("show").txt(J.toString(data));
	}
</script>
```


### 9. s-refresh 

循环变量命名

可选属性，缺省值是false。是否在绑定了数据的input或textarea元素<span class='red'>onchange</span>是重新生成BQL元素，以致刷新该BQL UI元素里面其他绑定了该值的html元素。

`s-refresh="Boolean"`

```html
<div s-bind="user" s-refresh=true s-update=true s-init="{nickname:'name',pw:'p'}">
	<div>昵称：<input type="text" value="{{user.nickname}}"/></div>
	<div>昵称：{{user.nickname}}</div>
</div> 
输入完成以后点击其他地方以将焦点移开
<script>
</script>
```


### 10. s-callback 

刷新回调函数

可选属性；BQL UI元素刷新时的回调函数，可以是一段代码或是一个函数。回调参数:<br/>1.this(或obj)指代的是当前的html元素；<br/>2.data是BQL数据。

`s-each="name"`

```html
值为js代码：<div s-bind="user1" s-callback="J.show(this.html())" s-refresh=true s-update=true s-init="{nickname:'name1',pw:'p1'}">
	<div>昵称：<input type="text" value="{{user1.nickname}}"/></div>
	<div>昵称：{{user1.nickname}}</div>
</div> </br>
值为函数：<div s-bind="user2" s-callback="refreshCall(this,data)" s-refresh=true s-update=true s-init="{nickname:'name2',pw:'p2'}">
	<div>昵称：<input type="text" value="{{user2.nickname}}"/></div>
	<div>昵称：{{user2.nickname}}</div>
</div>
输入完成以后点击其他地方以将焦点移开
<script>
function refreshCall(obj,data){ 
	var text=obj.html()+J.toString(data);
	J.show(text);
}
</script>
```


### 11. {{...}} 

js表达式

双重大括号的写法使用js表达式，将表达式的值绑定到语句所在位置。也可以是三元表达式。前面的章节已经有很多实例了

`{{js表达式}}`

```html
s-bind：
<div s-bind="user" s-init="{nickname:'theajack',pw:'1111'}">
	<!--s-init 的值是Object-->
	<div>昵称：{{user.nickname}}</div>
	<div>密码：{{user.pw}}</div>
</div> <br/>
s-loop：
<div s-loop="users" s-init="getArray()">
	<!--s-init 的值也可以是全局变量或方法-->
	<div>昵称：{{each.nickname}}</div>
	<div>密码：{{each.pw}}</div>
</div> 
<script>
	function getArray(){
		return [{nickname:"name1",pw:"p1"},
			{nickname:"name2",pw:"p2"}];
	} 
</script>
```


### 12. ${...}$ 

含return的js语句

双重大括号的写法仅限于使用js表达式，如果有更复杂的逻辑就无能为力了。使用${}$的语法可以将js代码嵌入到html页面，然后将该代码的返回值绑定到该语句所在的位置。

`${含return语句的js代码}$`

```html
<div s-bind="user" s-init="{nickname:'theajack',pw:'1111'}">
	<div>是否是theajack：${
				if(user.nickname=="theajack"){
					return "是";
				}else{
					return "不是";
				}
			}$</div>
	<div>密码：${return user.pw;}$</div>
</div>
<script>
</script>
```


### 13. $(data){...}$ 

循环语句

需要对绑定数据的属性在做循环就是用这个方法，循环的值是$each而不是each。比如一本书，对章做了循环，章里的节还要做循环。当然这个语法也可以使用${}$语法来模拟实现。里面的代码用d{}d里写js表达式，用f{}f里写含return的js语句。详情见例子

`$(data){html与js代码}$`

```html
JSON数组类型：
<div s-loop="users" s-init='[{nickname:"name1",brothers:["b1","b2"]},{nickname:"name2",brothers:["b11","b22"]}]'>
	<div>昵称：{{each.nickname}}</div>
	<div>
			$(each.brothers){
				<div>索引：d{$eachIndex}d</div>
				<div>名字：d{$each}d</div>
				<div>是不是叫b1：f{
					if($each=="b1"){
						return "是";
					}else{
						return "不是";
					}
				}f</div>
			}$
	</div><br/><!--d{}d里写js表达式，f{}f里写含return的js语句-->
</div> 
<script>
</script>
```


### 14. d{...}d 

$(){}里的js表达式

在$(data){}的循环结构里的js表达式需要用d{}d这个语法，双重大括号不行。上一节已经有实例了

`d{js表达式}d`

```html
<div s-loop="users" s-init='[{nickname:"name1",brothers:["b1","b2"]},{nickname:"name2",brothers:["b11","b22"]}]'>
	<div>
			$(each.brothers){
				<div>索引：d{$eachIndex}d</div>
				<div>名字：d{$each}d</div>
			}$
	</div><br/><!--d{}d里写js表达式，f{}f里写含return的js语句-->
</div> 
<script>
</script>
```


### 15. f{...}f 

$(){}里的含return的js语句

在$(data){}的循环结构里的含return的js语句(也就是函数)需要用f{}f这个语法，${}$不行。上上一节已经有实例了

`f{含return的js语句}f`

```html
<div s-loop="users" s-init='[{nickname:"name1",brothers:["b1","b2"]},{nickname:"name2",brothers:["b11","b22"]}]'>
	<div>
			$(each.brothers){
				<div>第d{$ei}d个兄弟d是不是叫b1：
				f{
					if($each=="b1"){
						return "是";
					}else{
						return "不是";
					}
				}f</div>
			}$
	</div><br/><!--d{}d里写js表达式，f{}f里写含return的js语句-->
</div> 
<script>
</script>
```

