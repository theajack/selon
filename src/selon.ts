/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-09 22:30:00
 * @Description: Coding something
 */
import { IJson } from './type.d';
import { TYPE } from './enum';

interface ISelonScope {
  canQuery: boolean;
  data: IJson[];
  attr: string[];
  value: any[];
  cond: boolean;
  condAttr: string[];
  condValue: any[];
  index: number;
  sort: string;
  type: TYPE | '';
  single: boolean;
  order: 'desc' | 'asc' | '';
  orderAttr: string;
  orderType: string;
  groupAttr: string;
  groupFuns: (() => void)[];
}

export class JQL {
  private _: ISelonScope = {
    canQuery: false,
    data: [],
    attr: [],
    value: [],
    cond: false,
    condAttr: [],
    condValue: [],
    index: -1,
    sort: '',
    type: '',
    single: false,
    order: '',
    orderAttr: '',
    orderType: 'number',
    groupAttr: '',
    groupFuns: [],
  };

  constructor(data: IJson | IJson[]) {
    if (data instanceof Array) {
      this._.data = data;
    } else {
      this._.data = [data];
      this._.single = true;
    }
  }

  add(attr, value) {
    _jqlAdd.call(this, get, set, attr, value);
    return _jqlRun.call(this, get, set);
  }
  remove(attr) {
    _jqlRemove.call(this, get, set, attr, true);
    return _jqlRun.call(this, get, set);
  }
  select(attr) {
    _jqlSelect.call(this, get, set, attr, true);
    return _jqlRun.call(this, get, set);
  }
  update(attr, value) {
    _jqlUpdate.call(this, get, set, attr, value, true);
    return _jqlRun.call(this, get, set);
  }

  // 以下为array特有的
  insert(attr, value, index, run) {
    return _jqlInsert.call(this, get, set, attr, value, index, run);
  }
  delete(index, run) {
    return _jqlDelete.call(this, get, set, index, run);
  }
  run() {
    const _ = this._;
    const {data, attr, value, cond, type} = _;
    switch(type){
      case TYPE.select:{
        var result=[];
        var dist=false;
        var distArr=[];
        var sum=0;
        var nror=false;//needRemoveOrderAttr  为了完成orderBy的order属性不在select属性里
        if(_.groupAttr === ""){//没使用groupBy
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
  where(attr, value, run) {
    return _jqlWhere.call(this, get, set, attr, value, run);
  }
  orderBy(attr, order, type, run) {
    return _jqlOrderBy.call(this, get, set, attr, order, type, run);
  }
  groupBy(attr, run) {
    return _jqlGroupBy.call(this, get, set, attr, run);
  }
}
