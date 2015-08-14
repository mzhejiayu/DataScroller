if(typeof define==="function"||typeof define ==="FUNCTION")
	define(function(require,exports,module){
		$ = require("jquery");

		var datascroller = function(config,canvas_dom,$canvas_container,$data_display){
            var canvas_config = config;
            var context = canvas_dom.getContext('2d');
            var drwline = function(x,y,tx,ty,ctx){

                ctx.beginPath();
                context.strokeStyle= canvas_config["strokeclr"];
                ctx.moveTo(x, y);
                ctx.lineTo(tx,ty);
                ctx.stroke();
            }
            var strktxt = function(x,y,txt,ctx){
                ctx.fillStyle= canvas_config["strokeclr"];
                ctx.textAlign="center";
                ctx.font="5px Courier";
                ctx.fillText(txt,x,y);
            }
            canvas_dom.width = canvas_config.canvas_width;
            canvas_dom.height = canvas_config.canvas_height;
            //绘尺子和绘制数字坐标
            var drwCanvas = (function(){
                var count = 0;//用来记绘制的次数（count个gap）
                var gap = canvas_config["gap-x"];
                //valuepg 每个gap跨越的值
                var valuepg = canvas_config.valuepg = Math.floor((canvas_config.max - canvas_config.min)/((canvas_config.canvas_width-canvas_config.window_width))*gap);
                //valuepp 每个px跨越的值
                canvas_config.valuepp = canvas_config.valuepg/gap;
                var rcount = 0;//真正开始绘制字的次数
                //绘制循环
                while(count*gap<=canvas_config["canvas_width"]){
                    //计算绘制坐标
                    var x = count*gap;
                    var y = canvas_config["canvas_height"];
                    var ty = y-(count%10==0?canvas_config.long_line:canvas_config.short_line);
                    //画线
                    if(count*gap>=canvas_config.window_width/2-10&&count*gap<=canvas_config.canvas_width-canvas_config.window_width/2){
                        drwline(x,y,x,ty,context);
                        if(count%10==0){
                            //绘制数字（没10次绘制一个数字）
                            strktxt(x,ty,canvas_config.min+rcount*valuepg,context);
                            //绘制以10个gap递增
                            rcount+=10;
                        }
                    }
                    count++;
                }
            })();
            $canvas_ontainer.scrollLeft(0);
            $canvas_container.scroll(function(event) {
                /* Act on the event */
                $data_display.text(Math.floor($(this).scrollLeft()*canvas_config.valuepp+canvas_config.min));
            });
        }   
        module.exports = datascroller;
	})