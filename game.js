
var focused = true;
var before = new Date();
var stats = {
	money: 20,
	income: 0,
	debt: 0,
	manual: 1,
	income_multiplier: 1
};
var shop = new Array();
var textplace = {
	title: "",
	text: ""
};

function ExponentialPriceGrowth(YAASSS,rate){YAASSS.cost=Math.round(YAASSS.basecost*Math.exp((rate||0.1)*YAASSS.owned))}
function ManualMoneyMaking(YAASSS,name,mpc){
	if(YAASSS.owned == 1){
		YAASSS.descrbutton={button:document.createElement("div")};
		YAASSS.descrbutton.button.style.WebkitUserSelect = "none";
		YAASSS.descrbutton.button.style.MozUserSelect = "none";
		YAASSS.descrbutton.button.style.KhtmlUserSelect = "none";
		YAASSS.descrbutton.button.style.MsUserSelect = "none";
		YAASSS.descrbutton.button.style.cursor = "default";
		YAASSS.descrbutton.button.style.border = "2px solid #000000";
		YAASSS.descrbutton.button.style.background = "#ffffff";
		YAASSS.descrbutton.button.style.width = "200px";
		YAASSS.descrbutton.button.style.height = "40px";
		YAASSS.descrbutton.button.style.textAlign = "center";
		YAASSS.descrbutton.button.style.display = "table-cell";
		YAASSS.descrbutton.button.style.verticalAlign = "middle";
		YAASSS.descrbutton.button.onclick = function(){stats.money += stats.manual*mpc};
		YAASSS.descrbutton.button.onmousemove = function(){YAASSS.descrbutton.button.style.background="#c0c0c0";};
		YAASSS.descrbutton.button.onmouseout = function(){YAASSS.descrbutton.button.style.background="#ffffff";};
		YAASSS.descrbutton.button.appendChild(document.createTextNode(name));
	}
}
function UnlockShopItems(names){
	var i;
	for (i=0;i<names.length;i++){
		shop[names[i]].button.style.display = "table-cell";
		shop[names[i]].br.style.display = "inline";
		shop[names[i]].active = true;
	}
}
function DisappearStoreItem(YAASSS){
	YAASSS.owned=0;YAASSS.active=false;YAASSS.button.style.display='none';YAASSS.br.style.display='none';
}
function MultiplyItemDPS(name,multiplier){
	stats.income += shop[name].income*shop[name].owned*(multiplier-1);
	shop[name].income *= multiplier;
}
function ChangeItemName(YAASSS,name){
	YAASSS.name = name;
	YAASSS.button.innerHTML = name;
}

function changeText(title,text,cost,pincome,owned,descrbutton) {
	document.getElementById("TextPlaceThingTitle").innerHTML='';
	document.getElementById("TextPlaceThingText").innerHTML='';
	document.getElementById("TextPlaceThingTitle").appendChild(document.createTextNode(title));
	document.getElementById("TextPlaceThingText").appendChild(document.createTextNode(text));
	if(cost){
		document.getElementById("TextPlaceThingText").appendChild(document.createElement("br"));
		document.getElementById("TextPlaceThingText").appendChild(document.createElement("br"));
		document.getElementById("TextPlaceThingText").appendChild(document.createTextNode('Cost: '+cost+''));
		if(pincome){
			document.getElementById("TextPlaceThingText").appendChild(document.createElement("br"));
			document.getElementById("TextPlaceThingText").appendChild(document.createTextNode('Income: '+pincome+''));
		}
		if(owned){
			document.getElementById("TextPlaceThingText").appendChild(document.createElement("br"));
			document.getElementById("TextPlaceThingText").appendChild(document.createTextNode('Amount: '+owned+''));
		}
		if(descrbutton){
			document.getElementById("TextPlaceThingText").appendChild(document.createElement("br"));
			document.getElementById("TextPlaceThingText").appendChild(document.createElement("br"));
			document.getElementById("TextPlaceThingText").appendChild(document.createElement("br"));
			document.getElementById("TextPlaceThingText").appendChild(descrbutton.button);
		}
	}
}

function createShopItem(namo,type,text,descr,cost,pincome,action,unlock,locked) {
	var name = namo || shop.length;
	shop[name] = {
		id: name,
		button: document.createElement("div"),
		type: type,
		name: text,
		description: descr,
		descrbutton: null,
		basecost: cost,
		cost: cost,
		income: pincome,
		owned: 0,
		action: action || function(){},
		active: true,
		br: document.createElement('br'),
	};
	shop[name]["button"].style.WebkitUserSelect = "none";
	shop[name]["button"].style.MozUserSelect = "none";
	shop[name]["button"].style.KhtmlUserSelect = "none";
	shop[name]["button"].style.MsUserSelect = "none";
	shop[name]["button"].style.cursor = "default";
	shop[name]["button"].style.border = "2px solid #000000";
	shop[name]["button"].style.background = "#ffffff";
	shop[name]["button"].style.width = "200px";
	shop[name]["button"].style.height = "40px";
	shop[name]["button"].style.textAlign = "center";
	shop[name]["button"].style.display = "table-cell";
	shop[name]["button"].style.verticalAlign = "middle";
	shop[name]["button"].onclick = function(){if(shop[name].active){if(stats.money>=shop[name].cost){stats.money -= shop[name].cost;stats.income += shop[name].income;shop[name].owned++;shop[name].action(shop[name]);shop[name].button.onmousemove();if(unlock && shop[name].owned<=1){UnlockShopItems(unlock);}};}};
	shop[name]["button"].onmousemove = function(){changeText(shop[name].name,shop[name].description,shop[name].cost,shop[name].income,shop[name].owned,shop[name].descrbutton);if(shop[name].active){shop[name]["button"].style.background="#c0c0c0";}else{shop[name]["button"].style.background="#dadada";}};
	shop[name]["button"].onmouseout = function(){/*changeText(textplace.title,textplace.text);*/if(shop[name].active){shop[name]["button"].style.background="#ffffff";}else{shop[name]["button"].style.background="#dadada";}};
	shop[name]["button"].appendChild(document.createTextNode(shop[name].name));
	if (locked) {shop[name].br.style.display = 'none';shop[name].button.style.display = 'none';shop[name].active = false;}
	document.getElementById(type).appendChild(shop[name]["button"]);
	document.getElementById(type).appendChild(shop[name].br);
}

function gameStart() {
	window.onfocus = function(){focused=true;};
	window.onblur = function(){focused=false;};
	setInterval(function(){document.getElementById("money").innerHTML='Money: '+Math.floor(stats.money)+'';document.getElementById("income").innerHTML='Income (per second): '+(Math.round(stats.income*stats.income_multiplier*100)/100)+'';document.getElementById("debts").innerHTML='Liabilities: '+Math.ceil(stats.debt)+'';stats.money+=stats.income*0.001*(new Date().getTime()-before.getTime())*stats.income_multiplier;before = new Date();}, 50);
	createShopItem(1,"business","Lemonade Stand","Everyone knows that this is where ALL entrepreneurs start off.",20,0,function(a){ExponentialPriceGrowth(a);ManualMoneyMaking(a,"Sell Lemonade",1);a.income=0.2;},[2,3]);
	createShopItem(2,"business","Cookie Stand","Too bad you have no idea how to bake. Your foreign grandma can help, but you're going to have to pay for her passport.",160,2,function(a){ExponentialPriceGrowth(a);},[18,19],true);
	createShopItem(3,"business","Business License","You're going to need one of these to start a REAL business.",100,0,DisappearStoreItem,[4],true);
	createShopItem(4,"business","Ice Cream Cart","The kids are gonna love you.",2000,15,ExponentialPriceGrowth,[5,20],true);
	createShopItem(5,"business","Hot Dog Trailer","Don't worry. It's a pretty small job.",16000,80,ExponentialPriceGrowth,[6],true);
	createShopItem(6,"business","Retail Store","A small store.",80000,300,ExponentialPriceGrowth,[7],true);
	createShopItem(7,"business","Supermarket","People will come pouring in. At least you hope so.",800000,2000,ExponentialPriceGrowth,[8],true);
	createShopItem(8,"business","Fast Food Franchise","People want to use your successful fast food business model, so let them use it! For a price, of course.",4000000,15000,ExponentialPriceGrowth,[9],true);
	createShopItem(9,"business","Chemical Company","This is definitely going to pump toxic chemicals into the atmosphere. But it's also going to pump money into your pocket.",100000000,200000,function(a){ExponentialPriceGrowth(a);ChangeItemName(a,"Industrial Complex");},[10],true);
	createShopItem(10,"business","Banking Firm","",1000000000,800000,function(a){ExponentialPriceGrowth(a);ChangeItemName(a,"Bank");},[11],true);
	createShopItem(11,"business","Oil Company","You found some oil in Saudi Arabia. Get drilling!",20000000000,10000000,function(a){ExponentialPriceGrowth(a);ChangeItemName(a,"Oil Well");},[6],true);
	createShopItem(12,"politics","Vote","Have a say in your government!",0,0,DisappearStoreItem);
	createShopItem(13,"politics","Attend a Community Meeting","Noone really knows you yet.",0,0,DisappearStoreItem,[14]);
	createShopItem(14,"politics","Run for Mayor","Start small.",20000,0,function(a){if(Math.random()>(1/Math.sqrt(a.owned+1))){UnlockShopItems([15]);DisappearStoreItem(a);}else{ExponentialPriceGrowth(a);}},null,true);
	createShopItem(15,"politics","Join a Political Party","A nice party to support you.",0,0,DisappearStoreItem,[16],true);
	createShopItem(16,"politics","Run for Senate","You won't win.",10000000,100,function(a){if(Math.random()>(2/Math.sqrt(a.owned+4))){UnlockShopItems([17]);DisappearStoreItem(a);}else{ExponentialPriceGrowth(a);}},null,true);
	createShopItem(17,"politics","Run for President","You won't win.",1000000000,10000,function(a){if(Math.random()>(3/Math.sqrt(a.owned+9))){UnlockShopItems([17]);DisappearStoreItem(a);}else{ExponentialPriceGrowth(a);}},null,true);
	createShopItem(18,"campaign","Cookie Variety","Not everyone likes chocolate chips. These new cookies are sure to double your audience.",500,0,function(a){MultiplyItemDPS(2,2);DisappearStoreItem(a);},null,true);
	createShopItem(19,"campaign","Popularity","With your recent sales, the town is starting to figure out that you exist. More people will want to try your lemonade. Manual sales make twice as much money.",200,0,function(a){stats.manual*=2;DisappearStoreItem(a);},null,true);
	createShopItem(20,"campaign","Dubstep Ice Cream","Ice cream is cool again! Teens become part of your audience and doubles your ice cream sales.",2000,0,function(a){MultiplyItemDPS(4,2);DisappearStoreItem(a);},null,true);
}
