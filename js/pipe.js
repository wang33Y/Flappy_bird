(function (w) {
    function Pipe(ctx,imgDown,imgUp,space,landHeight,speed) {
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.space = space;
        this.landHeight = landHeight;
        this.speed = speed;

        //管道默认的宽高
        this.width = this.imgDown.width;
        this.height = this.imgDown.height;

        this.minHeight = 100;

        Pipe.len++;

        this.x = 300 + this.width * 3 * (Pipe.len - 1);
        this.y = 0;

        this._init();
    }

    Pipe.len = 0;

    util.extend(Pipe.prototype,{

        //初始化管道的坐标
        _init:function() {
            var maxHeight = this.ctx.canvas.height - this.landHeight - this.space - this.minHeight;

            //随机生成管道的高度在50到maxHeight之间
            var randomHeight = Math.random()*maxHeight;
            randomHeight = randomHeight < this.minHeight ? this.minHeight:randomHeight;

            //上管道
            this.downY= randomHeight - this.height;
            //下管道
            this.upY = randomHeight + this.space;
        },

        draw:function () {
            this.ctx.drawImage(this.imgDown,this.x,this.downY);
            this.ctx.drawImage(this.imgUp,this.x,this.upY);
            this._drawPath();
        },

        _drawPath:function(){
            this.ctx.rect(this.x,this.downY,this.width,this.height);
            this.ctx.rect(this.x,this.upY,this.width,this.height);
            this.ctx.stroke();
        },

        update:function () {
            this.x -= this.speed;
            //管道走出画布需要重新生成高度
            if(this.x <= -this.width){
                this._init();
                this.x += this.width * 3 * Pipe.len;
            }
        }
    });

    w.getPipe = function (ctx,imgDown,imgUp,space,landHeight,speed) {
        return new Pipe(ctx,imgDown,imgUp,space,landHeight,speed);
    }
}(window));