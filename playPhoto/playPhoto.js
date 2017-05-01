$(document).ready(function(){
	var length, 
	currentIndex = 0,
	started=false,		//是否开始轮播
	time=3000, 			//图片轮播时间间隔
	interval;
	length=$('.pic_unit').length;
	
	$('.pic_unit:not(:first)').hide();				 //将除第一张图片隐藏
	$('.num_unit:first').addClass('num_selected');   //将第一个方块激活属性
	$('.change_page').hide();  						 //隐藏两边的按钮

	$('.pic_unit, .behind, .front').hover(function(){
		stop();
		$('.change_page').show();
		},  function(){
		$('.change_page').hide();
			start();
		});                                          //鼠标悬停时,停止播放,鼠标移开时,开始轮播

	$('.num_unit').hover(function(){
		stop();
		var front_num =$('.num_unit').filter(".num_selected").index();
		currentIndex = $(this).index();
		/*
		alert("front_num is "+front_num);
		alert("currentIndex is "+currentIndex);
		*/											 //这两个参数的含义
		play(front_num,currentIndex);
	},function(){
		start(); 
	});
	
	$('.front').bind('click',function(){
		front();
	});
	
	$('.behind').bind('click',function(){
		behind();
	});
										
	function front(){								//向前面翻页
		//alert("length is "+length);				//测试查看length的数值
		var front_num=currentIndex;
		//alert("front_num is "+front_num );		//测试查看front_num的数值
		currentIndex = (--currentIndex+length)%length;
		//alert("currentIndex is "+currentIndex);	//测试查看currentIndex的数值
		play(front_num,currentIndex);
	}

	function behind(){								//向后翻页
		var front_num=currentIndex;
		currentIndex = ++currentIndex%length;
		play(front_num,currentIndex);
	}

	function play(front_num,currentIndex){			//从front_num页跳转到currentIndex页
		$('.pic_unit').eq(front_num).fadeOut(300).parent().children().eq(currentIndex).fadeIn(500);
		$('.num_unit').removeClass('num_selected');
		$('.num_unit').eq(currentIndex).addClass('num_selected');
		}

	function start(){
		if(!started){
			started= true;
			interval = setInterval(behind,time);
		}
	}

	function stop(){
		clearInterval(interval);
		started=false;
	}

	start();
	});
