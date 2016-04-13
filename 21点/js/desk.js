window.onload = function(){		
		var J = 10,Q = 10,K = 10,A = 11;
		//数组用于计数
		var array = [
			A,2,3,4,5,6,7,8,9,10,J,Q,K,A,2,3,4,5,6,7,8,9,10,J,Q,K,A,2,3,4,5,6,7,8,9,10,J,Q,K,A,2,3,4,5,6,7,8,9,10,J,Q,K
		];
		var flag = false;
		//一副牌
		var card =["img/club1.png","img/club2.png","img/club3.png","img/club4.png","img/club5.png","img/club6.png","img/club7.png",
				   "img/club8.png","img/club9.png","img/club10.png","img/club11.png","img/club12.png","img/club13.png",
				   "img/heart1.png","img/heart2.png","img/heart3.png","img/heart4.png","img/heart5.png","img/heart6.png","img/heart7.png",
				   "img/heart8.png","img/heart9.png","img/heart10.png","img/heart11.png","img/heart12.png","img/heart13.png",
				   "img/spade1.png","img/spade2.png","img/spade3.png","img/spade4.png","img/spade5.png","img/spade6.png","img/spade7.png",
				   "img/spade8.png","img/spade9.png","img/spade10.png","img/spade11.png","img/spade12.png","img/spade13.png",
				   "img/square1.png","img/square2.png","img/square3.png","img/square4.png","img/square5.png","img/square6.png","img/square7.png",
				   "img/square8.png","img/square9.png","img/square10.png","img/square11.png","img/square12.png","img/square13.png",
		];
		showHand();

		//绑定事件
		function showHand(){
			var btn1 = document.getElementById("btn1");
			var btn2 = document.getElementById("btn2");
			var btn3 = document.getElementById("btn3");
			var btn4 = document.getElementById("btn4");
			var btn5 = document.getElementById("btn5");
			var btn9 = document.getElementById("btn9");
			btn5.onclick=function(){fapai();xiaZhu();};
			btn1.onclick = function(){num(25);};
			btn2.onclick = function(){num(50);};
			btn3.onclick = function(){num(75);};
			btn4.onclick = function(){num(100);};			
			btn9.onclick=function(){restart();};
		}
		
		//开始发牌
		function fapai(){
			var card1 = "" , card2 = "";
			var zhuangJia = document.getElementsByClassName("zhuangjia")[0];
			var wanJia = document.getElementsByClassName("wanjia")[0];
			//var random = Math.round(Math.random()*(array.length-1));
			//card1 += "<div class='card' style='background:url("+card.splice(random,1)+")'>"+array.splice(random,1)+"</div>";
			card1 += randomCard();
			//random = Math.round(Math.random()*(array.length-1));
			card1 +=randomCard();
			wanJia.innerHTML = card1;
			//random = Math.round(Math.random()*(array.length-1));
			card2 += "<div class='card' style='background:url(img/caredback4.png)'></div>";
			//random = Math.round(Math.random()*(array.length-1));
			card2 += randomCard();
			zhuangJia.innerHTML = card2;
			
			insurance();
		}
		
		//随机发牌
		function randomCard(){
			var random = Math.round(Math.random()*(array.length-1));
			return  "<div class='card' style='background:url("+card.splice(random,1)+")' cardValue='"+array.splice(random,1)+"'></div>";
		}
		
		//玩家要牌
		function yaoPai(){
			var wanJia = document.getElementsByClassName("wanjia")[0];
			//var random = Math.round(Math.random()*(array.length-1));
			wanJia.innerHTML += randomCard();
		}
		
		//庄家拿牌
		function hosterYaoPai(){
			var zhuangJia = document.getElementsByClassName("zhuangjia")[0];
			//var random = Math.round(Math.random()*(array.length-1));
			zhuangJia.innerHTML += randomCard();
		}
		
		//点击下注后桌面的变化，以及出现的按钮的事件绑定
		function xiaZhu(){
			var desk = document.getElementsByClassName("desk")[0];
			desk.innerHTML += "<div class='choose'><button id='btn6'>要牌</button><button id='btn7'>防爆</button><button id='btn8' disabled='disabled'>重新洗牌</button></div>";
			//点击要牌后
			var btn6 = document.getElementById("btn6");
			btn6.addEventListener("click",function(){
				yaoPai();
				if(playerAdd()>21){
					faceChange("cry");
					btn6.disabled="disabled";
					btn7.disabled="disabled";
					btn8.disabled= false;	
					var moneyNow = document.getElementById("money_now");
					var moneyXiazhu = document.getElementById("money_xiazhu");						
					moneyXiazhu.innerHTML = 0;
					if(parseInt(moneyNow.innerHTML)<=0){
						alert("game over!");
						var btn9 = document.getElementById("btn9");
						btn9.onclick=function(){restart();};
						btn8.disabled="disabled";
					}else{
						result("你爆了！");
						flag = false;
					}
				}					
			});
			var btn7 = document.getElementById("btn7");
			btn7.addEventListener("click",function(){
				var zhuangJia = document.getElementsByClassName("zhuangjia")[0];
				var random = Math.round(Math.random()*(array.length-1));
				zhuangJia.childNodes[0].style.background = "url("+card.splice(random,1)+")";
				zhuangJia.childNodes[0].setAttribute("cardValue",array.splice(random,1));
				//庄家在小于18 的时候会看情况是否选择要牌
				while(hosterAdd()<playerAdd()&&hosterAdd()<18){
						hosterYaoPai();
					if(hosterAdd()>21){
						faceChange("hey");
						btn6.disabled="disabled";
						btn7.disabled="disabled";
						btn8.disabled= false;
						var moneyNow = document.getElementById("money_now");
						var moneyXiazhu = document.getElementById("money_xiazhu");
						if(blackJack("wanjia")){
							moneyNow.innerHTML = parseInt(moneyNow.innerHTML) +3*parseInt(moneyXiazhu.innerHTML);
							moneyXiazhu.innerHTML = 0;
						}else{moneyNow.innerHTML = parseInt(moneyNow.innerHTML) +2*parseInt(moneyXiazhu.innerHTML);
						moneyXiazhu.innerHTML = 0;
						}
						result("庄家爆了！你赢了！");
						return;
					}
				}
				if(hosterAdd()<playerAdd()){
					faceChange("hey");
					btn6.disabled="disabled";
					btn7.disabled="disabled";
					btn8.disabled= false;
					var moneyNow = document.getElementById("money_now");
					var moneyXiazhu = document.getElementById("money_xiazhu");
					if(blackJack("wanjia")){
						moneyNow.innerHTML = parseInt(moneyNow.innerHTML) +3*parseInt(moneyXiazhu.innerHTML);
						moneyXiazhu.innerHTML = 0;
					}else{moneyNow.innerHTML = parseInt(moneyNow.innerHTML) +2*parseInt(moneyXiazhu.innerHTML);
						moneyXiazhu.innerHTML = 0;
					}
					result("你比庄家大，你赢了！");
				}else if(hosterAdd()==playerAdd()){
					
					faceChange("angry");
					btn6.disabled="disabled";
					btn7.disabled="disabled";
					btn8.disabled= false;
					var moneyNow = document.getElementById("money_now");
					var moneyXiazhu = document.getElementById("money_xiazhu");
					moneyNow.innerHTML = parseInt(moneyNow.innerHTML) +parseInt(moneyXiazhu.innerHTML);
					moneyXiazhu.innerHTML = 0;
					result("平局！");
				}else if(flag&&blackJack("zhuangjia")){
					faceChange("hey");
					btn6.disabled="disabled";
					btn7.disabled="disabled";
					btn8.disabled= false;
					var moneyNow = document.getElementById("money_now");
					var moneyXiazhu = document.getElementById("money_xiazhu");
					moneyNow.innerHTML = parseInt(moneyNow.innerHTML) +parseInt(moneyXiazhu.innerHTML);
					moneyXiazhu.innerHTML = 0;
					result("买保险成功！不亏！");
					}else{
						faceChange("cry");
						btn6.disabled="disabled";
						btn7.disabled="disabled";
						btn8.disabled= false;
						var moneyNow = document.getElementById("money_now");
						var moneyXiazhu = document.getElementById("money_xiazhu");						
						moneyXiazhu.innerHTML = 0;
						if(parseInt(moneyNow.innerHTML)<=0){
							var btn9 = document.getElementById("btn9");
							btn9.onclick=function(){restart();};
							btn8.disabled="disabled";	
							result("你输了！");
							alert("game over!");
						}else{
							result("你输了！");
						}	
					}
		//					alert(playerAdd());
				
			});
			//绑定重新开始按钮
			var btn8 =document.getElementById("btn8");
			btn8.onclick=function(){
				goAhead();
			}
			insuranceConform();
		}
		
		//玩家计数累计
		function playerAdd(){				
			var sum =0;
			var wanJia = document.getElementsByClassName("wanjia")[0];
			var totle = wanJia.childNodes;
			for(var i=0;i<totle.length;i++){
				sum += parseInt(totle[i].getAttribute("cardValue"));
			}
			if(sum>21){
				for(var i=0;i<totle.length;i++){
					if(totle[i].getAttribute("cardValue")=="11"){
						totle[i].setAttribute("cardValue","1");
						sum -= 10;break;
					}
				}
			}
				return sum;
			
		}
		
		//买保险,25美金
		function insurance(){
			
			var zhuangJia =document.getElementsByClassName("zhuangjia")[0];
			var totle = zhuangJia.childNodes;
			var insurance = document.getElementById("insurance");
			
			var moneyNow = document.getElementById("money_now");
			var moneyXiazhu = document.getElementById("money_xiazhu");				
			if(totle[1].getAttribute("cardValue")=="11"&&parseInt(moneyNow.innerHTML)>=25){		
				insurance.style.display = "block";
			}
			
		}
		
		//是否买保险
		function insuranceConform(){
			var btn10 =document.getElementById("btn10");
			var btn11 =document.getElementById("btn11");
			var insurance = document.getElementById("insurance");
			btn10.onclick = function(){
				flag = true;
				num(25);
				insurance.style.display= "none";
			}
			btn11.onclick = function(){
				insurance.style.display= "none";
				return;
				
			}
		}
		
		//庄家计数累计
		function hosterAdd(){
			var sum = 0;
			var zhuangJia = document.getElementsByClassName("zhuangjia")[0];
			var totle = zhuangJia.childNodes;
			for(var i=0;i<totle.length;i++){
				sum += parseInt(totle[i].getAttribute("cardValue"));
			}
			if(sum>21){
				for(var i=0;i<totle.length;i++){
					if(totle[i].getAttribute("cardValue")=="11"){
						totle[i].setAttribute("cardValue","1");
						sum -= 10;break;
					}
				}
			}
			return sum;
		}
		
		//重新洗牌，再来一局
		function goAhead(){
			var zhuangJia = document.getElementsByClassName("zhuangjia")[0];
			var wanJia = document.getElementsByClassName("wanjia")[0];
			zhuangJia.innerHTML = "";
			wanJia.innerHTML = "";
			flag = false;
			card =["img/club1.png","img/club2.png","img/club3.png","img/club4.png","img/club5.png","img/club6.png","img/club7.png",
				   "img/club8.png","img/club9.png","img/club10.png","img/club11.png","img/club12.png","img/club13.png",
				   "img/heart1.png","img/heart2.png","img/heart3.png","img/heart4.png","img/heart5.png","img/heart6.png","img/heart7.png",
				   "img/heart8.png","img/heart9.png","img/heart10.png","img/heart11.png","img/heart12.png","img/heart13.png",
				   "img/spade1.png","img/spade2.png","img/spade3.png","img/spade4.png","img/spade5.png","img/spade6.png","img/spade7.png",
				   "img/spade8.png","img/spade9.png","img/spade10.png","img/spade11.png","img/spade12.png","img/spade13.png",
				   "img/square1.png","img/square2.png","img/square3.png","img/square4.png","img/square5.png","img/square6.png","img/square7.png",
				   "img/square8.png","img/square9.png","img/square10.png","img/square11.png","img/square12.png","img/square13.png",
				];
			array = [
						A,2,3,4,5,6,7,8,9,10,J,Q,K,A,2,3,4,5,6,7,8,9,10,J,Q,K,A,2,3,4,5,6,7,8,9,10,J,Q,K,A,2,3,4,5,6,7,8,9,10,J,Q,K
					];
			faceChange("face2");
			var choose = document.getElementsByClassName("choose")[0];
			choose.parentNode.removeChild(choose);
		    showHand();
		    result("");
			
		}
		
		//表情变化
		function faceChange(appearance){
			var face = document.getElementById("img");
			face.style.background="";
			face.style.background = "url(img/"+appearance+".gif)";
		}
		
		//下注的金额
		function num(num){
				var moneyNow = document.getElementById("money_now");
				var moneyXiazhu = document.getElementById("money_xiazhu");
				if(moneyNow.innerHTML<num) return;
				moneyNow.innerHTML -= num ;
				moneyXiazhu.innerHTML = num+parseInt(moneyXiazhu.innerHTML);			
		}
		
		//重新开始
		function restart(){
			window.location.reload();
		}
		
		//谁是黑杰克？
		function blackJack(person){
			var sum =0;
			var someone = document.getElementsByClassName(person)[0];
			var totle = someone.childNodes;
			for(var i=0;i<totle.length;i++){
				sum += parseInt(totle[i].getAttribute("cardValue"));
			}
			if(sum==21&&totle.length==2){
				return true;
			}else{
				return false;
			}
		}
		
		//显示结果
		function result(alert){
			var result = document.getElementById("result");
			result.innerHTML = alert;
		}
}