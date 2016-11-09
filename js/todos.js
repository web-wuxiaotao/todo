$(document).ready(function(){
	var nav=$(".con .header .left .nav");
	var add=$(".con .header .new");
	var ul=$(".todolist");
	var found=$(".found");
	var input=$("input");
	var com=$(".found .com")
	var off=$(".found .off")
	var side=$(".sidenav")
	var todos=[];
	var startPos;
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos)
		render()
	}
	add.on("click",function(){
		found.addClass("found-trans")
	})
	off.on("click",function(){
		found.removeClass("found-trans")
		input.val("")
	})
	com.on("click",function(){
		found.removeClass("found-trans")
		var v=$.trim(input.val());
		if(!v){
			return;
		}
		var fullTime
		var time=new Date()
		var nowTime
		var nowHour
		var nowFen
		nowTime=time.toLocaleDateString()
		nowHour=time.getHours()
		nowFen=time.getMinutes()
		fullTime=nowTime+' '+nowHour+':'+nowFen	
		var todo={
			name:v,
			date:fullTime,
			state:0
		}
		todos.push(todo);
		localStorage.todos=JSON.stringify(todos)
		$("<li class='li'><div class='complete'><i></i></div><div class='content'>"+ v +"</div><div class='date'>"+ fullTime +"</div><div class='delete'><img src='img/7.png'/></div></li>").appendTo(ul)
		input.val("")
	})
	ul.on("click",".delete",function(){
		var li=$(this).closest(".li")
		var index=li.index()
		todos.splice(index,1)
		localStorage.todos=JSON.stringify(todos);
		li.addClass("ani-delete")
		li.queue(function(){                   //.delay(800)
			$(this).remove().dequeue()
		})
	})
	var del=$(".del")
	var newtodos=[];
	del.on("touchend",function(){
		for(var i=0;i<todos.length;i++){
			if(todos[i].state!=1){
				newtodos.push(todos[i])
			}
		}
		todos=newtodos
		localStorage.todos=JSON.stringify(todos)
		ul.find(".done").each(function(i){
			$(this).queue(function(){                      //.delay(i*80)
				$(this).addClass("ani-delete").dequeue()
			})
		})
		//var d = 800+ul.find(".done").length*80
		ul.find(".done").queue(function(){                 //.delay(d)
			ul.find(".done").remove()
			$(this).dequeue()
		})
	})
		
	ul.on("touchstart",".li",function(e){
		startPos=e.originalEvent.changedTouches[0].clientX;
	})
	ul.on("touchend",".li",function(e){
		var p=e.originalEvent.changedTouches[0].clientX;
		if(p - startPos > 50){
			$(this).addClass("done")
			todos[$(this).index()].state=1;
			localStorage.todos=JSON.stringify(todos)
		}
		if(p - startPos < -50){
			$(this).removeClass("done")
			todos[$(this).index()].state=0;
			localStorage.todos=JSON.stringify(todos)
		}
	})
	function render(){
		for(var i=0;i<todos.length;i++){
			var c=(todos[i].state)?"done":""
			$("<li class='"+ c +" li'><div class='complete'><i>&#xe601;</i></div><div class='content'>"+ todos[i].name +"</div><div class='date'>"+ todos[i].date +"</div><div class='delete'><img src='img/7.png'/></div></li>").appendTo(ul)
			input.val("")
		}
	}
	nav.on("click",function(){
		$(".mask").show()
		side.addClass("active")
	})
	side.on("touchstart",function(e){
		startPos=e.originalEvent.changedTouches[0].clientX;
	})
	side.on("touchend",function(e){
		var p=e.originalEvent.changedTouches[0].clientX;
		if(p - startPos < -10){
			side.removeClass("active")
			$(".mask").hide()
		}
	})
	var lis=$("#ul li")
	lis.on("touchend",function(){
		lis.removeClass("show")
		$(this).addClass("show")
		side.removeClass("active")
		$(".mask").hide()
		ul.find(".li").show()
		var text;
		var role=$(this).attr("data-role")
		if(role==="com"){
			text=$(this).find("span").text()
			ul.find(".li:not(.done)").hide()
			$(".state ").html("")
			$(".state").append(text)
		}else if(role==="all"){
			ul.find(".li").show()
			text=$(this).find("span").text()
			$(".state ").html("")
			$(".state").append(text)
		}else if(role==="rem"){
			text=$(this).find("span").text()
			ul.find(".li.done").hide()
			$(".state ").html("")
			$(".state").append(text)
		}
	})
})


















