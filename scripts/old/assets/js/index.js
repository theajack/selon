J.ready(function(){
  //user.init("aaa")
  //users.init([{nickname:1,pw:1},{nickname:2,pw:2},{nickname:3,pw:3}])
});
var testArr;
var testObj;
var testStr;
J.ready(function(){
  testArr=new JQL([{
    nickname:"a",
    pw:"p1",
    age:10,
    birth:"2010-01-02"
  },{
    nickname:"aaaa",
    pw:"p2",
    age:12,
    birth:"2010-01-03"
  },{
    nickname:"a",
    pw:"p1",
    age:10,
    birth:"2010-01-02"
  },{
    nickname:"aa",
    pw:"p3",
    age:9,
    birth:"2010-01-01"
  },{
    nickname:"aaaa",
    pw:"p1",
    age:10,
    birth:"2010-01-02"
  },{
    nickname:"aaaaaa",
    pw:"p1",
    age:13,
    birth:"2010-01-05"
  }]);
  
  testObj=Jql({
    nickname:"aaaaaa",
    pw:"p1",
    age:13,
    birth:"2010-01-05"
  });
  testStr=Jql("test");
});
function test(){
  return [{
    nickname:"a1",
    pw:"p1",
    age:10,
    birth:"2010-01-02"
  },{
    nickname:"a2",
    pw:"p2",
    age:11,
    birth:"2010-01-03"
  },{
    nickname:"a3",
    pw:"p4",
    age:10,
    birth:"2010-01-02"
  },{
    nickname:"a4",
    pw:"p4",
    age:10,
    birth:"2010-01-01"
  },{
    nickname:"a5",
    pw:"p6",
    age:10,
    birth:"2010-01-02"
  },{
    nickname:"a6",
    pw:"p6",
    age:10,
    birth:"2010-01-05"
  }]
}





var detailText=[
  "Select and set HTML element expediently.",
  "Read and write value or text of a set of HTML element expediently.",
  "Convient validation of a set of HTML element.",
  "Some other frequently-used functions."
];
var searchResult=[];
J.ready(function(){
  tabIndent.render(J.id("apiCode"));
  J.lang("english");
  addApiDetails();
  //J.id("downloadArea").clk("J.id('downloadArea').select()");
  J.class("wechat-public").on({
    mouseover:"J.class('wechat-img').fadeIn()",
    mouseleave:"J.class('wechat-img').fadeOut()"
  });
  J.class("intro-item").clk("showIntroDetail(this)");
  //J.id("copyBtn").clk(copySourceCode);
  J.class("api-title").clk(function(e){
    showRipple(e,this);
    moveApiBar(this);
  });
  J.select("#apiDetail .close-btn").clk(hideApiDetail);
  J.select("#apiDetail .prev").clk("switchApiDetail(0)");
  J.select("#apiDetail .next").clk("switchApiDetail(1)");
  J.select(".api-item span").clk(function(){
    showApiDetail(this);
  });
  J.id("apiShowAllCodeBtn").clk(showAllCode).tip("Self-adapte code");
  J.id("apiHideAllCodeBtn").clk(hideAllCode).tip("Fixed height");
  
  //J.id("apiSearchResultList").on({
  //  mousewheel:redefineMouseWhell,
  //});
  //J.class("api-item").on("mousewheel",redefineMouseWhell);
  
  J.class("result-close-btn").clk(function(){this.parent().slideUp(null,"fast")});
  J.id("apiSearchInput").on("keydown",function(e){if(e.keyCode===13){J.id("apiSearchBtn").click()}});
  J.id("apiSearchBtn").clk(showApiSearch);
  checkWidth();
});
function showAllCode(){
  J.id("apiDetailWrapper").css("overflow","inherit");
  J.id("apiCodeView").css("height","auto");
  var h=J.id("apiCodeView").css("height");
  J.id("apiCode").css("height",h).attr("show-all","true").on("mousewheel","");
  J.id("showCode").parent().css("height",(parseInt(h.replace("px",""))+73)+"px");
  
}
function hideAllCode(clearShowAll){
  J.id("apiDetailWrapper").css("overflow","hidden");
  J.id("apiCodeView").css("height","337px");
  J.id("apiCode").css("height","337px").on("mousewheel",redefineMouseWhell);
  if(clearShowAll!=false){
    J.id("apiCode").removeAttr("show-all");
  }
  J.id("showCode").parent().css("height","410px");
}
function switchApiDetail(dirc){// 0:prev
  var arr=J.id("apiCode").attr("jet-api-index").split(" ");
  if(arr.length==1){//searchResult
    if(dirc==0){
      if(arr[0]>0){
        showApiDetailForSearchByIndex(parseInt(arr[0])-1);
      }else{
        J.show("Alerady the first one","warn")
      }
    }else{
      if(arr[0]<searchResult.length-1){
        showApiDetailForSearchByIndex(parseInt(arr[0])+1);
      }else{
        J.show("Alerady the last one","warn")
      }
    }
  }else{
    if(dirc==0){
      if(arr[1]>0){
        showApiDetailByIndex(arr[0],parseInt(arr[1])-1);
      }else{
        J.show("Alerady the first one","warn")
      }
    }else{
      if(arr[1]<apiData[arr[0]].length-1){
        showApiDetailByIndex(arr[0],parseInt(arr[1])+1);
      }else{
        J.show("Alerady the last one","warn")
      }
    }
  }
}
function showApiSearch(){
 var skey=J.id("apiSearchInput").val().toLowerCase();
  J.id("apiSearchResultList").empty();
  searchResult.empty();
  for(var key in apiData){
    apiData[key].each(function(d){
      if(d.title.toLowerCase().has(skey)){
        searchResult.append(d);
        var title;
        if(skey!=""){
          var start=d.title.toLowerCase().indexOf(skey);
          var end=start+skey.length;
          title=d.title.substring(0,start)+"<span class='search-key'>"+d.title.substring(start,end)+"</span>"+d.title.substring(end);
        }else{
          title=d.title;
        }
        var span=J.new("span").html(title).clk(function(){
          showApiDetailForSearch(this);
        });
        if(d.title.length>13){
          if(d.title.length<19){
            span.css({"font-size":"22px","padding-top":"25px"});
          }else{
            span.css({"font-size":"18px","padding-top":"29px"});
          }
        }
        J.id("apiSearchResultList").append(span);
      }
    });
  }
  J.id("resultNum").txt(searchResult.length);
  J.id("apiSearchResultWrapper").slideDown(null,"fast");
}
function redefineMouseWhell(e){
  e.preventDefault();
  this.scroll(e.deltaY,null,50);
}
function addApiDetails(){
  var list=J.id("apiBar").child();
  list.each(function(api){
    apiData[api.attr("jet-api")].each(function(data){
      var span=J.new("span").txt(data.title);
      if(data.title.length>13){
        if(data.title.length<19){
          span.css({"font-size":"22px","padding-top":"25px"});
        }else{
          span.css({"font-size":"18px","padding-top":"29px"});
        }
      }
      api.append(span);
    })
  })
}
window.onresize=function(){
  checkWidth();
}
function checkWidth(){
  
}
function showResult(needShow){
  if(needShow!=false){
    if(showResultBase()){
      J.show("submit success");
    }
  }else{
    if(J.id("apiCode").attr("jet-change")=="1"){
      showResultBase();
    }
  }
}
function showResultBase(){
  var obj=J.id("resultArea");
  if(obj!=null){
    var a=J.id("apiCode").val();
    if(a.has("<\/script>")){
      var script=a.substring(a.indexOf("<script"),a.indexOf("<\/script>")+9);
      var elems=a.replace(script,"");
      var newScript = J.new('script[type=text/javascript]').html(script.substring(script.indexOf(">")+1,(script.indexOf("<\/script>"))));
      obj.append(newScript).html(elems);
    }else{
      obj.html(a);
    }
    J.id("apiCode").attr("jet-change","0");
    if(a.has("jet-valid")){
      J.initValid(obj);
    }
    BQL.init();
    return true;
  }
  return false;
}
function showResultHtml(){
  var obj=J.id("resultArea");
  if(obj!=null){
    var a=J.id("apiCode").val();
    if(a.indexOf("<\/script>")!=-1){
      var script=a.substring(a.indexOf("<script"),a.indexOf("<\/script>")+9);
      var elems=a.replace(script,"");
      obj.html(elems);
    }else{
      obj.html(a);
    }
    BQL.init();
  }
}
function showIntroDetail(obj){
  var detail= J.id("introDetail");
  if(detail.attr("jet-index")=="-1"){
    var i=obj.index();
    detail.addClass("open");
    detail.attr("jet-index",i).child(1).txt(detailText[i]);
    detail.findClass("trangle").css("margin-left",(10+i*25)+"%");
  }else{
    if(obj.index()==detail.attr("jet-index")){
      detail.removeClass("open");
      detail.attr("jet-index","-1");
    }else{
      var i=obj.index();
      detail.findClass("trangle").css("margin-left",(10+i*25)+"%");
      detail.attr("jet-index",i).child(1).txt(detailText[i]);
    }
  }
}
function copySourceCode(){
  //J.id("downloadArea").copy();
  //J.show("copy success");
}
function showApi(i){
  J.scrollTo(J.id("apiPart").top(),function(){
    J.id("apiBarTitle").child(i).click();
    hideApiDetail();
  });
}
function showApiDetailForSearch(obj){
  showApiDetailForSearchByIndex(obj.index());
}
function showApiDetailForSearchByIndex(i){
  J.id("apiCode").attr("jet-api-index",i);
  checkSwitchBtnState(i,searchResult.length-1);
  showDetailBase(searchResult[i]);
}
function showApiDetail(obj){
  var api=obj.parent().attr("jet-api");
  var i=obj.index();
  showApiDetailByIndex(api,i);
}
function showApiDetailByIndex(api,i){
  J.id("apiCode").attr("jet-api-index",api+" "+i);
  checkSwitchBtnState(i,apiData[api].length-1);
  showDetailBase(apiData[api][i]);
}
function checkSwitchBtnState(i,b){
  if(i==0){
    J.select("#apiDetail .prev").addClass("disable");
  }else{
    J.select("#apiDetail .prev").removeClass("disable");
  }
  if(i==b){
     J.select("#apiDetail .next").addClass("disable");
  }else{
    J.select("#apiDetail .next").removeClass("disable");
  }
}
function showDetailBase(d){
  J.set("apiDetail",d,function(elem,text,name){
    if(name=="title"){
      if(text.length>19){
        elem.css({"font-size":"27px","padding-top":"29px"});
      }else if(text.length<13){
        elem.css({"font-size":"50px","padding-top":"0"});
      }else{
        elem.css({"font-size":"35px","padding-top":"25px"});
      }
    }
  },"api-part");
  geneApiViewCode();
  showResultBase();
  if(!d.test){
    J.id("resultArea").addClass("hide");
    J.class("result-cover").removeClass("hide");
  }else{
    J.id("resultArea").removeClass("hide");
    J.class("result-cover").addClass("hide");
  }
  J.id('apiDetail').addClass('show');
  if(J.id('apiCode').attr("show-all")=="true"){
    showAllCode();
  }
}
function hideApiDetail(){
  J.id('apiDetail').removeClass('show');
  if(J.id('apiCode').attr("show-all")=="true"){
    hideAllCode(false);
  }
}
function showRipple(e,obj){
  J.class("ripple").remove();
  var offset = obj.offset();
  var len=(offset.width>offset.height)?offset.width:offset.height;
  if(obj.hasClass("bg-dark")){
    obj.prepend(J.new("span").addClass("ripple r-white"));
  }else{
    obj.prepend(J.new("span").addClass("ripple r-black"));
  }
  var x = e.pageX - offset.left - len / 2;
  var y = e.pageY - offset.top - len / 2;
  J.class("ripple").css({
    "width": len+ 'px',
    "height": len+ 'px',
    "top": y + 'px',
    "left": x + 'px'
  }).addClass("rippleEffect");
}
function moveApiBar(obj){
  var i=obj.index();
  J.id("apiBar").css("left",(-100*i)+"%");
  J.select(".trangle.api").css({"margin-left":(14.5+i*33.3333)+"%","border-top-color":obj.css("background-color")});
}
