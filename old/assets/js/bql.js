/*<style>
  [b-bind]{
    display:none;
  }
  [b-loop]{
    display:none;
  }
</style>*/

//添加了 在b-loop$index
//${}$
// b-bind="name;data"

/* $each $eachIndex $ei  d{js表达式}d f{return的js语句}f
$(variable){ 
}$*/

//一般元素的b-callback

(function(){
  J.ready(function(){
    BQL.init();
  });
  var _bind="b-bind",//单值
    _loop="b-loop",//数组
    _update="b-update",//input值改变 是否更新数据 默认为false oninput 更新数据
    _refresh="b-refresh",//onchange 刷新页面
    _callback="b-callback",//onchange 刷新页面 的回调函数
    _init="b-init",//初始值 默认为null
    _each="b-each",//下文中引用的变量名 默认为each
    _each_def="each",
    _s="{{",
    _e="}}",
    _bind_str=_s+"bind"+_e,
    _reg=new RegExp("("+_s+")((.|\\n)*?)("+_e+")","g"),
    _fun_reg=new RegExp("(\\$(.*?){)((.|\\n)*?)(}\\$)","g"),
    _all_reg=new RegExp("("+_s+")((.|\\n)*?)("+_e+")|(\\$(.*?){)((.|\\n)*?)(}\\$)","g"),
    _undefined="无",
    _index="b-index",//哪一个数据
    _attr="b-attr";//那一个属性
  function _funsResult(get,data,i){
    var result=[];
    get.funs().each(function(item){
      var res=J.checkArg(item(data,i,i),_undefined);
      result.append(res);
    });
    var str=get.str().replaceAll(_bind_str,result);
    if(i!=undefined){
      str=str.replaceAll(_index+'="i"',_index+"="+i);
    }
    return str;
  }

  function _bqlRefresh(get,run){
    var obj=get.obj();
    if(run===true&&obj.run!=undefined){
      obj.run();
    }
    var html="";
    var d=obj.get();
    if(d==null){
      html=get.str().replaceAll(_bind_str,"undefined");
    }else{
      if(get.loop()){
        if(d!=null&&d.constructor==Array){
          d.each(function(dataItem,i){
            html+=_funsResult(get,dataItem,i);
          });
        }
      }else{
        html=_funsResult(get,d);
      }
    }
    var element=get.element();
    element.html(html);
    _bqlInitEvent(element,get.single());
    return d;
  }
  function _bqlInitEvent(element,single){
    var refresh=element.attr(_refresh);
    if(element.attr(_update)=="true"){
      ["input","textarea"].each(function(tag){
        element.findTag(tag).each(function(item){
          if(item.hasAttr(_attr)){
            var name;
            if(single===true){
              var a=item.attr(_attr);
              item.removeAttr(_attr);
              name=element.attr(_bind);
              item.on("input",function(){
                if(this.attr("type")=="number"){
                  (new Function(name+".data()"+a+"="+this.val()+";"))();
                }else{
                  (new Function(name+".data()"+a+"='"+this.val()+"';"))();
                }
              },true);
            }else if(single==false){
              var i=item.attr(_index);
              var a=item.attr(_attr);
              item.removeAttr(_index);
              item.removeAttr(_attr);
              name=element.attr(_loop);
              item.on("input",function(){
                if(this.attr("type")=="number"){
                  (new Function(name+".data()["+i+"]"+a+"="+this.val()+";"))();
                }else{
                  (new Function(name+".data()["+i+"]"+a+"='"+this.val()+"';"))();//"+name+".run();
                }
              },true);
            }else{
              name=element.attr(_bind);
              item.removeAttr(_attr);
              item.on("input",function(){
                if(this.attr("type")=="number"){
                  (new Function(name+".set("+this.val()+",false);"))();
                }else{
                  (new Function(name+".set('"+this.val()+"',false);"))();
                }
              },true);
            }
            if(refresh=="true"){
              item.on("change",function(){
                (new Function(name+".refresh();"))();
              },true);
            }
          }
        });
      });
    }
  }
  function _bqlInit(get,set){
    var str=get.str();
    var element=get.element();
    var funs=new Array();
    if(get.loop()){
      set.varName((element.hasAttr(_each))?element.attr(_each):_each_def);
    }
    if(_all_reg.test(str)){
      str.match(_all_reg).each(function(item){
        var content="";
        if(item.has("${")||item.has("$(")){
          if(item.substring(0,2)=="${"){
            content="(function()"+item.substring(1,item.length-1).trim()+")()";
          }else{
            //content="(function()"+item.substring(1,item.length-1).trim()+")()";
            var vname=item.substring(2,item.indexOf(")"));
            var html=item.substring(item.indexOf("{")+1,item.length-2);
            html=html.replaceAll("'","\\'");
            if(html.has("d{")){
              html=html.replaceAll("d{","'+(").replaceAll("}d",")+'").replaceAll("\n","");
            }
            if(html.has("f{")){
              html=html.replaceAll("f{","'+(function(window){").replaceAll("}f","})()+'").replaceAll("\n","");
            }
            content="(function(window){var _r='';"+
              vname+".each(function($each,$eachIndex){\
                var $ei=$eachIndex;\
                _r+='"+html+"';\
              });return _r;})()";//拼接方式有待改进 以解决单双引号问题
          }
        }else{
          content=item.substring(_s.length,item.length-_e.length).trim();
        }
        funs.append(new Function(get.varName(),"$index","$i","return "+content));
      });
      set.str(str.replaceAll(_all_reg,_bind_str));
      set.funs(funs);
    }
    element.empty();
    if(element.hasAttr(_init)){
      this.init((new Function("return "+element.attr(_init)))());
    }
    if(element.css("display")=="none"){
      element.css("display","block");
    }
  }
  function _bqlCheckRefresh(){
    if(_checkArg.apply(null,arguments)){
      return this.run();
    }
    return this;
  }
  function _bqlCheckResRefresh(get,res,args){
    if(_checkArg.apply(null,args)){
      if(get.needRefresh()){
        this.run();
      }
      return res;
    }
    return this;
  }
  function _checkArg(){
    if(arguments.length==1){
      return (arguments[0]===true);
    }else{
      for(var i=0;i<arguments.length;i++){
        if(arguments[i]===true){
          return true;
        }
      }
      return false;
    }
  }
  //
  function _bqlInitHtml(element,loop){//为oninput 给input (value) textArea (里面的内容)
    if(element.attr(_update)=="true"){
      ["input","textarea"].each(function(tag){
        var items=element.findTag(tag);
        if(items!=undefined){
          items.each(function(item){
            var val;
            if(tag=="input"){
              val=item.attr("value").trim();
            }else{
              val=item.html().trim();
            }
            item.attr("value",val);
            var arr=val.match(_reg);
            if(arr!=null){
              if(arr[0]==val){//只允许 value="{{item.attr}}"
                var attr=arr[0].substring(arr[0].indexOf("."),arr[0].length-_e.length);
                item.attr(_attr,attr);
                if(loop){
                  item.attr(_index,"i");
                }
              }
            }
          });
        };
      });
    }
    return element.html();
  };
  function _bqlCheckBindInit(obj,loop){
    var type="";
    if(loop===true){
      type=_loop;
    }else{
      type=_bind;
    }
    var name=obj.attr(type);
    if(name.has(";")){
      obj.attr(type,name.split(";")[0]);
      obj.attr(_init,name.split(";")[1]);
    }
  }
  ;BQL=function(obj,loop){
    var _varName=obj.attr(_bind);//loop 的话 是each
    var _obj=null;
    var _str=_bqlInitHtml(obj,loop);
    var _element=obj;
    var _bql_callback=null;
    if(_element.attr(_callback)!=""){
      _bql_callback=new Function("obj","data",_element.attr(_callback));
    }
    var _loop=loop;
    var _single=null;
    var _funs=new Array();
    var _need_refresh=false;
    var get={
      varName:function(){
        return _varName;
      },element:function(){
        return _element;
      },obj:function(){
        return _obj;
      },str:function(){
        return _str;
      },loop:function(){
        return _loop;
      },funs:function(){
        return _funs;
      },single:function(){
        return _single;
      },needRefresh:function(){
        return _need_refresh;
      }
    };
    var set={
      varName:function(val){
        _varName=val;
      },element:function(val){
        _element=val;
      },obj:function(val){
        _obj=val;
      },str:function(val){
        _str=val;
      },loop:function(val){
        _loop=val;
      },funs:function(val){
        _funs=val;
      }
    };
    
    this.run=function(){
      var res;
      if(_single===false){
        res=_obj.run();
      }else{
        res=_obj.get();
      }
      if(_need_refresh){
        this.refresh();
        _need_refresh=false;
      }
      return res;
    };
    this.refresh=function(){
      _bqlRefresh(get);
      if(_bql_callback!=undefined){
        _bql_callback.call(_element,_element,_obj.get());
      }
    };
    this.init=function(data){
      _need_refresh=true;
      if(data==undefined){
        data=[];
      }
      _obj=Jql(data);
      if(data.constructor==Object){
        this.add=function(attr,value){
          _obj.add(attr,value);
          _need_refresh=true;
          return this.run();
        };
        this.remove=function(attr){
          _obj.remove(attr);
          _need_refresh=true;
          return this.run();
        };
        this.select=function(attr){
          return _obj.select(attr);
        };
        this.update=function(attr,value){
          _obj.update(attr,value);
          _need_refresh=true;
          return this.run();
        };
        _single=true;
      }else if(data.constructor==Array){
        this.add=function(attr,value,run){
          _obj.add(attr,value,run);
          _need_refresh=true;
          return _bqlCheckRefresh.call(this,value,run);
        };
        this.remove=function(attr,run){
          _obj.remove(attr,run);
          _need_refresh=true;
          return _bqlCheckRefresh.call(this,attr,run);
        };
        this.update=function(attr,value,run){
          _obj.update(attr,value,run);
          _need_refresh=true;
          return _bqlCheckRefresh.call(this,value,run);
        };
        this.delete=function(index,run){
          _obj.delete(index,run);
          _need_refresh=true;
          return _bqlCheckRefresh.call(this,index,run);
        };
        this.insert=function(attr,value,index,run){
          _obj.insert(attr,value,index,run);
          _need_refresh=true;
          return _bqlCheckRefresh.call(this,value,index,run);
        };
        this.select=function(attr,run){
          return _bqlCheckResRefresh.call(this,get,_obj.select(attr,run),[attr,run]);
        };
        this.where=function(attr,value,run){
          return _bqlCheckResRefresh.call(this,get,_obj.where(attr,value,run),[value,run]);
        };
        this.orderBy=function(attr,order,type,run){
          return _bqlCheckResRefresh.call(this,get,_obj.orderBy(attr,order,type,run),[order,type,run]);
        };
        this.groupBy=function(attr,run){
          return _bqlCheckResRefresh.call(this,get,_obj.groupBy(attr,run),[run]);
        };
        _single=false;
      }
      this.set=function(data,ref){
        _obj.set(data);
        if(ref==undefined||ref===true){
          _need_refresh=true;
          this.run();
        }
        return data;
      };
      this.get=function(){
        return _obj.get();
      };
      this.data=function(){
        return _obj.data();
      };
      this.clear=function(){
        _obj.clear();
        _need_refresh=true;
        this.run();
        return null;
      };
      _need_refresh=true;//初始化
      this.run();
      
      _element.findAttr(_callback).each(function(item){
        var fun=new Function(item.attr(_callback));
        fun.call(item);
      });
      
      return this.get();
    };
    _bqlInit.call(this,get,set);
  };
  BQL.init=function(element,data){
    if(element==undefined){
      var list=J.attr(_bind);
      list.each(function(item){
        _bqlCheckBindInit(item);
        (new Function("obj","window."+item.attr(_bind)+"=new BQL(obj)"))(item);
      });
      var lista=J.attr(_loop);
      lista.each(function(item){
        _bqlCheckBindInit(item,true);
        (new Function("obj","window."+item.attr(_loop)+"=new BQL(obj,true)"))(item);
      });
    }else{
      var bool="";
      var attr="";
      if(element.hasAttr(_bind)){
        _bqlCheckBindInit(element);
        attr=element.attr(_bind);
      }else if(element.hasAttr(_loop)){
        _bqlCheckBindInit(element,true);
        attr=element.attr(_loop);
        bool=",true";
      }else{
        throw new Error("对象没有b-bind或b-loop属性，不可初始化");
      }
      (new Function("obj","window."+attr+"=new BQL(obj"+bool+")"))(element);
      if(!element.hasAttr(_init)){
        if(data!=undefined){
          (new Function("d",attr+".init(d)"))(data);
        }
      }
      return window[attr];
    }
  };
  
  //JQL
  var TYPE={
    update:"update",
    select:"select",
    delete:"delete",
    insert:"insert",
    add:"add",
    remove:"remove",
    clear:"clear",
    groupBy:"groupBy",
    desc:"desc",
    asc:"asc",
    all:"*"
  };
  var FUN={
    sum:"sum",
    count:"count",
    avg:"avg",
    distinct:"distinct",
    first:"first",
    last:"last",
    max:"max",
    min:"min"
  };
  function _checkString(arg){
    if(arg.constructor==String){
      return arg.split(",");
    }
    return arg
  }
  function _jqlSetAttrAndValue(data,set){
    var attra=[];
    var valuea=[];
    for(var attr in data){
      attra.push(attr);
      valuea.push(data[attr]);
    }
    set.attr(attra);
    set.value(valuea);
  }function _jqlSelect(get,set,arg,run){
    if(arg==undefined||arg.constructor==Boolean){
      if(run===true||arg===true){
        return _jqlCheckReturn(get.data(),get);
      }
      arg=TYPE.all;
    }
    if(get.canQuery()){
      set.type(TYPE.select);
      set.attr(_checkString(arg));
      return _jqlCheckRun.call(this,run);
    }
    return this;
  };
  function _jqlUpdate(get,set,data,value,run){
    return _addAndUpdateCom.call(this,get,set,data,value,run,TYPE.update);
  };
  function _jqlAdd(get,set,data,value,run){
    return _addAndUpdateCom.call(this,get,set,data,value,run,TYPE.add);
  }
  function _addAndUpdateCom(get,set,data,value,run,type){
    if(get.canQuery()){
      set.type(type);
      if(data.constructor==Object){
        _jqlSetAttrAndValue(data,set);
        run=value;
      }else{
        set.attr(_checkString(data));
        set.value(_checkString(value));
      }
      return _jqlCheckRun.call(this,value,run);
    }
    return this;
  }
  function _jqlRemove(get,set,arg,run){
    set.type(TYPE.remove);
    if(arg!=undefined&&arg.constructor!=Boolean){
      set.attr(_checkString(arg));
      return _jqlCheckRun.call(this,run);
    }else {
      set.attr(TYPE.all);
      if(arg.constructor==Boolean){
        return _jqlCheckRun.call(this,run);
      }
    }
    return this;
  }
  function _jqlDelete(get,set,index,run){
    set.type(TYPE.delete);
    if(index!=undefined&&index.constructor==Number){
      set.index(index);
      return _jqlCheckRun.call(this,run);
    }
    return _jqlCheckRun.call(this,index);
  }
  function _jqlInsert(get,set,a1,a2,a3,a4){//(arg,value,i,run)
    set.type(TYPE.insert);
    if(a1.constructor==Object||a1.constructor==Array){
      set.attr(a1);
      if(a2!=undefined){
        if(a2.constructor==Number){
          set.index(a2);
          return _jqlCheckRun.call(this,a3);
        }else{
          return _jqlCheckRun.call(this,a2);
        }
      }
    }else{
      set.attr(_checkString(a1));
      set.value(_checkString(a2));
      if(a3!=undefined){
        if(a3.constructor==Number){
          set.index(a3);
          return _jqlCheckRun.call(this,a4);
        }else{
          return _jqlCheckRun.call(this,a3);
        }
      }
    }
    return this;
  }
  function _jqlSetCondAttrAndValue(data,set){
    var attra=[];
    var valuea=[];
    for(var attr in data){
      attra.push(attr);
      valuea.push(data[attr]);
    }
    set.condAttr(attra);
    set.condValue(valuea);
  }
  
  function _jqlWhere(get,set,attr,value,run){
    if(get.type()===""&&get.groupAttr===""){
      _throw("where:使用where之前必须使用select、update、add、remove、insert、delete、groupBy方法之一");
    }else{
      if(attr.constructor==Object){
        _jqlSetCondAttrAndValue(attr,set);
        run=value;
      }else{
        if(value!=undefined&&value.constructor==String){
          set.condAttr(_checkString(attr));
          set.condValue(_checkString(value));
        }else{//复杂模式 bool表达式
          set.condAttr(attr);
          run=value;
        }
      }
      set.cond(true);
      return _jqlCheckRun.call(this,value,run);
    }
  }
  function _jqlCheckWhere(index,get,realI){
    if(get.cond()){
      var data=get.data()[index];
      var attr=get.condAttr();
      if(get.condValue().length>0){
        for(var i=0;i<attr.length;i++){
          if(data[attr[i]]!=get.condValue()[i]){
            return false;
          }
        }
      }else{//bool表达式
        var attrs=_getObjectAttr(data);
        eval("var "+attrs);
        var $index=index;
        var $i=index;
        if(realI!=undefined){
          $index=realI;
        }
        for(var i=0;i<attrs.length;i++){
          if(attr.has(attrs[i])){
            var item=data[attrs[i]];
            if(item==undefined){
              _throw("where:"+attrs[i]+"属性不存在");
            }else{
              eval(attrs[i]+"="+J.toString(item));
            }
          }
        }
        return eval(attr);
      }
    }
    return true;
  }
  function _getObjectAttr(obj){
    var arr=[];
    for(attr in obj){
      arr.push(attr);
    }
    return arr;
  }
  
  function _jqlGroupBy(get,set,attr,run){
    if(attr==undefined||attr.constructor!=String){
      _throw("groupBy属性参数必须非空且为字符串");
    }else{
      set.groupAttr(attr);
      return _jqlCheckRun.call(this,run);
    }
  };
  function _throw(str){
    str=J.checkArg(str,"未知异常");
    throw new Error(str);
  }
  function _jqlOrderBy(get,set,attr,order,orderType,run){
    if(attr==undefined||attr.constructor!=String){
      _throw("orderBy属性参数必须非空且为字符串");
    }else{
      set.orderAttr(attr);
      if(order!=undefined){
        if(order.constructor==String){
          order=order.toLowerCase();
          if(order=="desc"||order=="asc"){
            set.order(order);
            if(orderType!=undefined&&orderType.constructor==String){
              set.orderType(orderType);
            }
          }else{
            set.orderType(order);
          }
          return _jqlCheckRun.call(this,order,orderType,run);
        }
        return _jqlCheckRun.call(this,order);
      }
      return this;
    }
  };
  function _getRunGroupBySelect(obj,sel,as){
    if(sel){
      if(as[0]==TYPE.all||as[0]==""||as.length==0){
        return obj;
      }
      var d={};
      if(as!=TYPE.all&&as.length>0){
        as.each(function(a){
          d[a]=obj[a];
        });
      }
      return d;
    }
    return obj;
  }
  function _checkSelectAttr(attr){
    for(var i=0;i<attr.length;i++){
      if(attr[i].has("(")){
        return false;
      }
    }
    return true;
  }
  function _jqlCheckReturn(res,get){
    if(get.single()){
      return J.clone(res[0]);
    }
    return J.clone(res);
  }
  function _checkRunOrderBy(get,res){
    var attr=get.orderAttr();
    if(attr!=""){
      if(get.order()=="desc"){
        res.sortByAttr(attr,get.orderType(),false);
      }else{
        res.sortByAttr(attr,get.orderType());
      }
    }
    return res;
  }
  
  function _checkRunGroupBy(get,data){
    //avg count count(DISTINCT ) first last max min 
    //实现函数
    var attr=get.groupAttr();
    var as=get.attr();
    var gres=[];
    var vs=[];
    var norSel=_checkSelectAttr(as);
    if(attr!=""){
      data.each(function(item){
        if(item.hasOwnProperty(attr)){
          var index=vs.index(item[attr]);
          if(index==-1){
            vs.push(item[attr]);
            gres.push([_getRunGroupBySelect(item,norSel,as)]);
          }else{
            gres[index].push(_getRunGroupBySelect(item,norSel,as));
          }
        }else{
          _throw("groupBy：元素中没有"+attr+"属性");
        }
      });
      if(!norSel){//含有聚集函数
        var funs=get.groupFuns();
        if(funs.length>0){
          var funRes=[];
          gres.each(function(items){
            var newobj={};
            var names=[];
            funs.each(function(fun){
              if(fun.fun==undefined){
                if(fun.attr!=attr){
                  _throw(fun.attr+" 没有groupBy");
                }else{
                  newobj[attr]=items[0][attr];
                }
              }else{
                if(fun.name==TYPE.all){
                  if(fun.fun!=FUN.count){
                    _throw("* 不能用于"+fun.fun+"方法");
                  }
                  fun.name=FUN.count;
                }
                if(!names.has(fun.name)){
                  names.push(fun.name);
                }else{
                  _throw(fun.name+"列名不能相同");
                }
                if(fun.name==fun.attr){
                  fun.name=fun.fun;
                }
                newobj[fun.name]=_checkGroupFunc(fun,items);
              }
            });
            
            funRes.push(newobj);
          });
          return funRes;
        }
      }
      return gres;
    }else{
      _throw("groupBy属性参数必须非空且为字符串");
    }
  }
  function _checkGroupFunc(fun,items){
    switch(fun.fun){
      case FUN.sum:{
        return _getGroupAttrArr(items,fun.attr).sum();
      };break;
      case FUN.count:{
        if(fun.attr.has(FUN.distinct+" ")){//count(distinct name)
          var attr=fun.attr.split(" ")[1];
          var arr=[];
          items.each(function(item){
            if(!arr.has(item[attr])){
              arr.push(item[attr]);
            }
          });
          return arr.length;
        }else{
          return items.length;
        }
      };break;
      case FUN.avg:{
        return _getGroupAttrArr(items,fun.attr).avg();
      };break;
      case FUN.first:{
        return items.first()[fun.attr];
      };break;
      case FUN.last:{
        return items.last()[fun.attr];
      };break;
      case FUN.max:{
        return _getGroupAttrArr(items,fun.attr).max();
      };break;
      case FUN.min:{
        return _getGroupAttrArr(items,fun.attr).min();
      };break;
      default:{
        return items[0][fun.attr];
      };break;
    }
  }
  function _getGroupAttrArr(arr,attr){
    var res=[];
    arr.each(function(item){
      res.push(item[attr]);
    });
    return res;
  }
  function _geneGroupFuns(attr){
    if(attr.timeOf(" ")>2){
      _throw("参数错误：select 参数空格不能多于2个");
    }else{
      var res={};
      if(attr.has("(")&&attr.has(")")){
        var arr=attr.split(")");
        if(arr[1]!=""){
          res.name=arr[1].substring(1);
        }
        attr=arr[0];
        arr=attr.split("(");
        res.attr=arr[1].toLowerCase();
        if(arr[1].has(" ")){
          arr[1]=arr[1].split(" ")[1];
        }
        if(!res.hasOwnProperty("name")){
          res.name=arr[1];
        }
        res.fun=arr[0].toLowerCase();
      }else{
        if(attr.has(" ")){
          res.name=attr.split(" ")[1];
          res.attr=attr.split(" ")[0];
        }else{
          res.attr=res.name=attr;
        }
      }
      return res;
    }
  }
  function _selectCount(get,attr,data){
    if(attr.length>1){
      _throw("使用count函数时select最多只能选择一列");
    }
    var obj=_geneGroupFuns(attr[0]);
    var sum=0;
    var result;
    if(get.cond()===true){
      result=[];
      for(var i=0;i<data.length;i++){
        if(_jqlCheckWhere(i,get)){
          result.push(data[i]);
        }
      }
    }else{
      result=data;
    }
    if(obj.attr.has(FUN.distinct)){
      var at=obj.attr.split(" ")[1];
      var vs=[];
      result.each(function(item){
        if(!vs.has(item[at])){
          vs.push(item[at]);
          sum++;
        }
      });
    }else{
      if(obj.attr!=TYPE.all&&obj.attr!=""&&!result[0].hasOwnProperty(obj.attr)){
        _throw("select:"+obj.attr+"属性不存在");
      }
      sum=result.length;
    }
    if(obj.name==TYPE.all||obj.name==""||obj.name==obj.attr){
      obj.name=FUN.count;
    }
    var r={};
    r[obj.name]=sum;
    return r;
  }
  function _jqlFuncWithoutGroup(get){
    var fun=_geneGroupFuns(get.attr()[0]);
    if(fun.name==fun.attr||fun.name=="*"){//默认别名是函数名
      fun.name=fun.fun;
    }
    if(fun.attr.has(" ")&&fun.attr.split(" ")[1]==fun.name){//distinct
      fun.name=fun.fun;
    }
    var newobj={};
    newobj[fun.name]=_checkGroupFunc(fun,get.data());
    return newobj;
  }
  function _jqlRun(get,set){
    var data=get.data();
    var attr=get.attr();
    var value=get.value();
    var cond=get.cond();
    switch(get.type()){
      case TYPE.select:{
        var result=[];
        var dist=false;
        var distArr=[];
        var sum=0;
        var nror=false;//needRemoveOrderAttr  为了完成orderBy的order属性不在select属性里
        if(get.groupAttr()==""){//没使用groupBy
          if(attr.length==1&&attr[0].has("(")){//有使用聚合函数
            result= _jqlFuncWithoutGroup(get);
          }else{
            if(get.orderAttr()!=""&&!attr.has(get.orderAttr())){
              attr.push(get.orderAttr());
              nror=true;
            }
            for(var i=0;i<data.length;i++){
              if(_jqlCheckWhere(i,get)){
                var r={};
                if(attr==TYPE.all){
                  r=J.clone(data[i]);
                  result.push(r);
                }else{
                  if(attr[0].has(FUN.count)){//count 函数
                    result=_selectCount(get,attr,data);
                    break;
                  }else{
                    attr.each(function(a,j){
                      var name=a;//别名
                      if(a.has(FUN.count)){
                        _throw("使用count函数时select最多只能选择一列");
                      }
                      if(a.has(" ")){//别名
                        var arr=a.split(" ");
                        if(arr.length>3){
                          _throw("select参数格式错误");
                        }else if(arr.length==3){
                          if(arr[0]!=FUN.distinct||j!=0){
                            _throw("distinct必须放在第一个参数前");
                          }
                          dist=true;
                          name=arr[2];
                          a=arr[1];
                        }else{
                          if(arr[0]==FUN.distinct){
                            if(j!=0){
                              _throw("distinct必须放在第一个参数前");
                            }
                            dist=true;
                            name=a=arr[1];
                          }else{
                            name=arr[1];
                            a=arr[0];
                          }
                        }
                      }
                      if(a in data[i]){
                        if(name in r){
                          _throw("select:["+name+"]列名不能重复");
                        }
                        r[name]=data[i][a];
                      }else{
                        if(a.has("(")){//没有groupBy的聚合函数
                          _throw("select:没有与groupBy配合使用的聚合函数,一次只允许使用一个");
                        }else{
                          _throw("select参数错误,对象不包含"+a+"属性");
                        }
                      }
                    });
                    
                    if(dist){
                      var str=J.toString(r);
                      if(!distArr.has(str)){
                        distArr.push(str);
                        result.push(r);
                      }
                    }else{
                      result.push(r);
                    }
                  }
                }
              }
            }
            _checkRunOrderBy(get,result);//对select结果order
            if(nror){
              result=Jql(result).remove(get.orderAttr(),true);
            }
          }
        }else{//使用groupBy
          if(get.cond()==true){//与where共用
            for(var i=0;i<data.length;i++){
              if(_jqlCheckWhere(i,get)){
                result.push(J.clone(data[i]));
              }
            }
          }else{
            result=J.clone(data);
          }
          var funs=[];
          attr.each(function(a){
            if(a.has(FUN.distinct)){
              _throw("groupBy与distinct不能共用");
            }
            funs.push(_geneGroupFuns(a));
          });
          
          if(funs.length>0){
            set.groupFuns(funs);
          }
          result=_checkRunOrderBy(get,result);
          result=_checkRunGroupBy(get,result);
        }
        _jqlReset(set);
        return _jqlCheckReturn(result,get);
      };break;
      
      case TYPE.update:{
        for(var i=0;i<data.length;i++){
          if(_jqlCheckWhere(i,get)){
            attr.each(function(item,j){
              if(data[i].hasOwnProperty(item)){
                data[i][item]=value[j];
              }else{
                _throw("属性不存在，若要添加新属性，请使用add方法");
              }
            });
          }
        }
        _jqlReset(set);
        return _jqlCheckReturn(data,get);
      };break;
      
      case TYPE.add:{
        for(var i=0;i<data.length;i++){
          if(_jqlCheckWhere(i,get)){
            attr.each(function(item,j){
              if(!data[i].hasOwnProperty(item)){
                data[i][item]=value[j]
              }else{
                _throw("属性已存在，若要更新属性，请使用update方法");
              }
            });
          }
        }
        _jqlReset(set);
        return _jqlCheckReturn(data,get);
      };break;
      
      case TYPE.remove:{
        for(var i=0;i<data.length;i++){
          if(_jqlCheckWhere(i,get)){
            if(attr==TYPE.all){
              data[i]={};
            }else{
              for(var j=0;j<attr.length;j++){
                delete data[i][attr[j]];
              }
            }
          }
        }
        _jqlReset(set);
        return _jqlCheckReturn(data,get);
      };break;
      
      case TYPE.insert:{
        var obj=_jqlGeneInsertData(attr,value);
        if(get.index()>=0){
          if(get.index()>=data.length){//若index超过长度，设置成最后一位
            set.index(data.length-1);
          }
          if(obj.constructor==Array){
            data.insertArray(obj,get.index());
          }else{
            data.insert(obj,get.index());
          }
        }else{
          if(obj.constructor==Array){
            data.appendArray(obj);
          }else{
            data.append(obj);
          }
        }
        _jqlReset(set);
        return J.clone(data);
      };break;
      
      case TYPE.delete:{
        if(get.index()>=0){
          if(_jqlCheckWhere(get.index(),get)){
            data.removeByIndex(get.index());
          }
        }else{
          var realI=0;
          for(var i=0;i<data.length;i++){
            if(_jqlCheckWhere(i,get,realI)){
              data.removeByIndex(i);
              i--;
            }
            realI++;
          }
        }
        _jqlReset(set);
        return J.clone(data);
      };break;
      
      default:{
        var res;
        if(get.cond()===true){
          res=[];
          for(var i=0;i<data.length;i++){
            if(_jqlCheckWhere(i,get)){
              res.push(J.clone(data[i]));
            }
          }
        }else{
          res=J.clone(data);
        }
        if(get.orderAttr()!=""){//没有sele的order
          res = _checkRunOrderBy(get,res);
        }
        if(get.groupAttr()!=""){//没有sele的group
          res = _checkRunGroupBy(get,res);
        }
        _jqlReset(set);
        return res;
      };break;
    }
  }
  function _jqlGeneInsertData(attr,value){
    if(attr.constructor==Object||attr.constructor==Array&&attr[0].constructor==Object){
        return attr;
    }else{
      var n=0;
      for(var i=0;i<value.length;i++){
        if(value[i].has(";")){
          n=value[i].timeOf(";")+1;
          break;
        }
      }
      if(n==0){
        var obj={};
        for(var i=0;i<attr.length;i++){
          obj[attr[i]]=value[i];
        }
        return obj;
      }else{
        var values=[];
        for(var i=0;i<value.length;i++){
          if(value[i].has(";")){
            values.push(value[i].split(";"));
          }else{
            var arr=[];
            for(var j=0;j<n;j++){
              arr.push(value[i]);
            }
            values.push(arr);
          }
        }
        var arr=[];
        for(var i=0;i<n;i++){
          var obj={};
          for(var j=0;j<attr.length;j++){
            obj[attr[j]]=values[j][i];
          }
          arr.push(obj);
        }
        return arr;
      }
    }
  };
  
  function _jqlInitData(data,set){
    if(data!=null){
      if(data.constructor!=Object&&data.constructor!=Array){
        set.canQuery(false);
      }
    }
  }
  function _jqlCheckRun(){
    if(_checkArg.apply(null,arguments)&&this.run!=undefined){
      return this.run();
    }
    return this;
  }
  function _checkArg(){
    if(arguments.length==1){
      return (arguments[0]===true);
    }else{
      for(var i=0;i<arguments.length;i++){
        if(arguments[i]===true){
          return true;
        }
      }
      return false;
    }
  }
  function _jqlReset(set){
    set.attr([]);
    set.value([]);
    
    set.cond(false);
    set.condAttr([]);
    set.condValue([]);
    
    set.index(-1);
    
    set.sort("");
    set.type("");
    
    set.order("");
    set.orderAttr("");
    set.orderType("number");
    
    set.groupAttr("");
    set.groupFuns([]);
  };
  Jql=function(data){
    return new JQL(data);
  };
  JQL=function(data){
    var _canQuery=true;
    var _data;
    var _single=false;
    if(data.constructor==Object){
      _data=[data];
      _single=true;
    }else{
      _data=data;
    }
    
    var _attr=[];
    var _value=[];
    
    var _cond=false;
    var _cond_attr=[];
    var _cond_value=[];
    
    var _index=-1;
    
    var _sort="";
    var _type="";
    
    var _order="";
    var _order_attr="";
    var _order_type="number";
    
    var _group_attr="";
    var _group_funs=[];
    
    var set={
      canQuery:function(val){
        _canQuery=val;
      },data:function(val){
        _data = val;
      },attr:function(val){
        _attr =val;
      },value:function(val){
        _value =val;
      },cond:function(val){
        _cond =val;
      },condAttr:function(val){
        _cond_attr =val;
      },condValue:function(val){
        _cond_value =val;
      },index:function(val){
        _index =val;
      },sort:function(val){
        _sort =val;
      },type:function(val){
        _type =val;
      },order:function(val){
        _order =val;
      },orderAttr:function(val){
        _order_attr =val;
      },orderType:function(val){
        _order_type =val;
      },groupAttr:function(val){
        _group_attr =val;
      },groupFuns:function(val){
        _group_funs =val;
      }
    };
    var get={
      canQuery:function(){
        return _canQuery;
      },data:function(){
        return _data;
      },attr:function(){
        return _attr;
      },value:function(){
        return _value;
      },cond:function(){
        return _cond;
      },condAttr:function(){
        return _cond_attr;
      },condValue:function(){
        return _cond_value;
      },index:function(){
        return _index;
      },sort:function(){
        return _sort;
      },type:function(){
        return _type;
      },single:function(){
        return _single;
      },order:function(){
        return _order;
      },orderAttr:function(){
        return _order_attr;
      },orderType:function(){
        return _order_type;
      },groupAttr:function(){
        return _group_attr;
      },groupFuns:function(){
        return _group_funs;
      }
    };
    _jqlInitData(data,set);
    if(data.constructor==Object){
      this.add=function(attr,value){
        _jqlAdd.call(this,get,set,attr,value);
        return _jqlRun.call(this,get,set);
      };
      this.remove=function(attr){
        _jqlRemove.call(this,get,set,attr,true);
        return _jqlRun.call(this,get,set);
      };
      this.select=function(attr){
        _jqlSelect.call(this,get,set,attr,true);
        return _jqlRun.call(this,get,set);
      };
      this.update=function(attr,value){
        _jqlUpdate.call(this,get,set,attr,value,true);
        return _jqlRun.call(this,get,set);
      };
    }else if(data.constructor==Array){
      this.add=function(attr,value,run){
        return _jqlAdd.call(this,get,set,attr,value,run);
      };
      this.remove=function(attr,run){
        return _jqlRemove.call(this,get,set,attr,run);
      };
      this.insert=function(attr,value,index,run){
        return _jqlInsert.call(this,get,set,attr,value,index,run);
      };
      this.delete=function(index,run){
        return _jqlDelete.call(this,get,set,index,run);
      };
      this.select=function(attr,run){
        return _jqlSelect.call(this,get,set,attr,run);
      };
      this.update=function(attr,value,run){
        return _jqlUpdate.call(this,get,set,attr,value,run);
      };
      this.run=function(){
        return _jqlRun.call(this,get,set);
      };
      this.where=function(attr,value,run){
        return _jqlWhere.call(this,get,set,attr,value,run);
      };
      this.orderBy=function(attr,order,type,run){
        return _jqlOrderBy.call(this,get,set,attr,order,type,run);
      };
      this.groupBy=function(attr,run){
        return _jqlGroupBy.call(this,get,set,attr,run);
      };
    }
    this.set=function(data){
      var datac=J.clone(data);
      if(datac.constructor==Object){
        datac=[datac];
      }
      if(_data.constructor!=datac.constructor){
        _throw("数据类型不同，无法执行set");
      }else{
        _data=datac;
        return data;
      }
    };
    this.get=function(){
      if(_single){
        return J.clone(_data[0]);
      }
      return J.clone(_data);
    };
    this.data=function(){
      if(_single){
        return _data[0];
      }
      return _data;
    };
    this.clear=function(){
      if(_data.constructor==Array){
        _data=[];
      }else if(_data.constructor==Object){
        _data={};
      }else{
        _data=null;
      }
      return _data;
    }
  };
})();
var BQL,JQL,Jql;
