/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var key;
var data;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var aqiCity = document.getElementById("aqi-city-input");
	var aqiValue = document.getElementById("aqi-value-input");
	key = aqiCity.value.trim();
	data = aqiValue.value.trim();
	var keyReg = /[^\u4e00-\u9fa5a-zA-Z]/;
 	var dataReg = /[^0-9]/;
	var flag = true;
	if(key ==""){
		alert("请输入城市名称！");
		flag = false;
		aqiCity.focus();
	}
	if(data==""){
		alert("请输入指数！");
		flag = false;
		aqiValue.focus();
	}
	if(keyReg.test(key)){
		alert("城市名称只能为英文字母或者中文！");
		aqiCity.focus();
		flag = false;
	}
	if(dataReg.test(data)){
		alert("空气指数只能为数字！");
		aqiValue.focus();
		flag = false;
	}
	if(flag){
		aqiData[key]=data;
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTable = document.getElementById("aqi-table");
	var aqiText = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var item in aqiData){
		aqiText += "<tr><td>"+item+"</td><td>"+aqiData[item]+"</td><td><button>删除</button></td></tr>";
	}
	aqiTable.innerHTML = aqiText;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
	var aqiTable = document.getElementById("aqi-table");
  // do sth.对于evnt这个对象怎么用不是很清楚！！！
  aqiTable.onclick=function(evnt){
	  evnt=evnt||window.event;
	  var target=evnt.srcElement||evnt.target;
	  if(target.tagName.toLowerCase()==="button"){
	  	aqiTable.deleteRow(target.parentNode.parentNode.rowIndex);
	  	delete aqiData[target.parentNode.parentNode.childNodes[0].innerHTML];
	  }
	  
  }
  
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var addBtn = document.getElementById("add-btn");
	addBtn.onclick=function(){
		addBtnHandle();
	};
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	delBtnHandle();
}

window.onload = function(){
	init();	
}
