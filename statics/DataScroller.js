
var DataScroller = function(config,canvas_dom,$canvas_container,$data_display){
            // 为config指定默认值
            config = config||{};
            config.long_count = config.long_count||10;
            config.min = config.min || 0;
            config.max = config.max || 100;
            config.pointer_left = config.pointer_left||0;
            config.to_go = config.canvas_width-config.container_width;
            var gap = config.gap_x;
            var context = canvas_dom.getContext('2d');
            var drwline = function(x,y,tx,ty,ctx){
                ctx.beginPath();
                context.strokeStyle= config["strokeclr"];
                ctx.moveTo(x, y);
                ctx.lineTo(tx,ty);
                ctx.stroke();
            }
            var strktxt = function(x,y,txt,ctx){
                ctx.fillStyle= config["strokeclr"];
                ctx.textAlign="center";
                ctx.font="10px Courier";
                ctx.fillText(txt,x,y);
            }
            canvas_dom.width = config.canvas_width;
            canvas_dom.height = config.canvas_height;
            //绘尺子和绘制数字坐标
            var drwCanvas = (function(){
                var count = 0;
                var max = Math.floor(config.to_go/gap)+1;
                while(count<=max){
                    var x = config.pointer_left+count*gap;
                    var y = config.canvas_height;
                    if(count%config.long_count===0){
                        //绘制长线
                        var ty = y-config.long_line;
                        strktxt(x,ty,config.min+(config.max-config.min)*(count/max),context);
                    }
                    else{
                        var ty = y-config.short_line;
                        //绘制短线
                    }
                    drwline(x,y,x,ty,context);

                    count++;
                }
            })();
            $canvas_container.css("overflowX","scroll")
            $canvas_container.scrollLeft(0);
            $canvas_container.scroll(function(event) {
                /* Act on the event */
                var percent = $(this).scrollLeft()/(config.to_go);
                var value = config.min + (config.max - config.min)*percent;
                $data_display.text(Math.floor(value));
            });
        }   