window.onload=function()
{
	var list=document.querySelector('#list');
	var x=document.querySelector("#x");
	var z=document.querySelector("#z");
	var button=document.querySelector("#bottom").querySelectorAll('button');
	var container=document.querySelector('#container');
	var index=1;
	var clock;
	var gap1=2000;


//平滑动画效果的实现
	function move(data)
	{
		var d=parseInt(list.style.left)+data;
		var all=400;
		var gap=10;
		var speed=data/(all/gap);
		function play(){
			if((speed<0&&parseInt(list.style.left)>d)
			 ||(speed>0&&parseInt(list.style.left)<d))
			{
				list.style.left=parseInt(list.style.left)+speed+'px';
				setTimeout(play,gap);
			}
			else
			{
				list.style.left=d+'px';
				if(d>-800)
				{
					list.style.left=-4000+'px';
				}
				if(d<-4000)
				{
					list.style.left=-800+'px';
				}
			}			
		}
		play();
	}


//小圆点样式改变
	var showbutton=function ()
	{
		for (var i = 0; i<button.length; i++) {
			if(button[i].className=="on"){
				button[i].className="";
				break;
			}
		}
		button[index-1].className="on";
	}

//左右键点击
	x.addEventListener("click",xonclick);
	z.addEventListener("click",zonclick);

	function zonclick(){
		if(index==1)
			{index=5;}
		else
			index-=1;	
		showbutton();
		move(800);
	}//左键点击功能
	function xonclick(){
		if(index==5)
			index=1;
		else
			index+=1;
		showbutton();
		move(-800);
	}//右键点击功能


//下面那排小圆点功能的实现
	for (var i = 0; i <button.length; i++) {
		button[i].addEventListener("click",function(e)
		{
			var id=e.target.id;
			var xs=-800*(id-index);
			move(xs);
			index=id;
			showbutton();
		});
	}

//自动播放部分
	function clock()
	{
		clock=setInterval(function(){
			xonclick();
		},gap1);
	}


	function clear()
	{
		clearInterval(clock);
	}

//光标覆上和移开
	container.addEventListener("mouseover",clear);
	container.addEventListener("mouseout",clock);
}