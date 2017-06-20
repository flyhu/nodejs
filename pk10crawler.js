var fs = require('fs');
var request = require('request');
var async = require('async');
var cheerio = require('cheerio');

var days = 10
var results = {}
var datelist=[]

function getdate(days){
	for(var i=0;i<days;i++){
		var d=new Date()
		d.setDate(d.getDate()-i);
		var day=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		datelist.push(day)
	}
	datelist.reverse()
}

function crawl(datelist){

//async.eachSeries异步操作		
async.eachSeries(datelist, function(day, callback) {
	var options = {
	    url: 'http://www.lecai.com/lottery/draw/list/557?d='+day,
	    headers: {
	        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
	    }
	}

	console.log('正在抓取' + day + '的数据...')

	request(options, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	      $ = cheerio.load(body);
	      var result = [];

//页面信息抓取
	      var trs = $("#draw_list tbody tr");
	      trs.each(function(){                    
	                    var tr = $(this);
	                    var balls = tr.find(".ball_1");
	                    var ball = {}; 
	                    for(var j=0;j<balls.length;j++){
	                    		ball['m'+(j+1)] = balls.eq(j).text().trim()
	                    }
	                    var list = {
	                    	No:tr.children(".td2").text().trim(),
	                    	result:ball
	                    }
	                    result.push(list);                        
	        })

	     results[day] = result 

//保存文件
		fs.writeFile('./pk10.json', JSON.stringify(results)
			,function (err) {
		        if (err) throw err;
		        console.log('写入完成');
		})
			    }
			  callback(error, results);  
			})


	
}, function(err) {
if (err) return console.error(err.stack)})

}

getdate(days)
crawl(datelist)
		
