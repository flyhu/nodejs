//判断双胆
function ifdxsd(argument,ball){   
	var ball=parseInt(ball)
	var result=''
	switch (argument) {
		case 'dx':
			ball>5?result="大":result="小"
			break;
		case 'sd':
			ball%2==0?result="双":result="单"
			break;
	}
	return result
}

//构造大小双胆新对象
function dxsd_array(argument){
	
	var dxsd_list={}
	$.each(data, function(key, list){	

	  var balls={'ball1':[],'ball2':[],'ball3':[],'ball4':[],'ball5':[],'ball6':[],'ball7':[],'ball8':[],'ball9':[],'ball10':[]} //1-10名
	  dxsd_list[key]=balls

	  $.each(list, function(index,item){
		$.each(item.result, function(i,result){
			var num='ball'+i.substr(1) //取名次
			var dxsd_ball = ifdxsd(argument,result) 
			dxsd_list[key][num].push(dxsd_ball)
		})

	  })
	})
	return dxsd_list 
 }



var fliter_list=[]
function fliter(balls,augument,startindex,endindex,position){
	var strings=balls
	//开始、结束索引，位置记录，规则
	var start=startindex,end=endindex,pos=position,reg=augument 

	if(strings.indexOf(reg, pos)>-1){    //开始检索
		if(pos===0) {   //首次检索修规则
			fliter_list=[]
			strings.indexOf(augument.slice(1,3), pos)==0?start=strings.indexOf(augument.slice(1,3), pos):start=strings.indexOf(reg, pos)
		} else {			                    		
			start=strings.indexOf(reg, pos)
		}  
		pos=start+1 
		               	     //索引下移，开始尾部截取定位                         
		var array=[]	

		if(strings.indexOf(reg, pos)<0){            //末次尾部检索修规则
			if(reg.slice(0,2)==strings.slice(-2)){            
       		var result=strings.slice(start) 
		    array.push(result)
		    fliter_list.push(array)
		    return
	   	    }
		}
		else{  
			end=strings.indexOf(reg, pos)  //尾部定位截取索引	
					
		    var result=strings.slice(start,end+3) //截取存组
		    array.push(result)
		    fliter_list.push(array)
		    fliter(strings,reg,start,end,end)   //再调用

		}
	}

	return fliter_list
}
