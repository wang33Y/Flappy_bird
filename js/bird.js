(function (w) {
    function Bird(ctx,img,widthFrame,heightFrame,x,y) {
        this.ctx = ctx;
        this.img = img;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.x = x;
        this.y = y;

        //一个小鸟的宽和高
        this.width = this.img.width/this.widthFrame;
        this.height = this.img.height/this.heightFrame;

        this.currentFrame = 0;
        this.speed = 2;
        this.speedPlus = 0.05;

        //调用事件
        this._bind();
    }

    Bird.prototype = {
        constructor:Bird,
        //绘制鸟
        draw:function () {


            var baseRadian = Math.PI / 180 *10;
            var maxRadian = Math.PI / 180 * 45;

            var rotateRadian = baseRadian * this.speed;

            rotateRadian = rotateRadian >= maxRadian ? maxRadian : rotateRadian;

            this.ctx.save();

            //旋转
            this.ctx.translate(this.x+this.width/2,this.y+this.height/2);
            this.ctx.rotate(rotateRadian);

            this.ctx.drawImage(this.img,
                this.width*this.currentFrame,0,this.width,this.height,
                -this.width/2,-this.height/2,this.width,this.height);

            this.ctx.restore();
        },

        //计算下一帧绘制时的数据
        update:function () {
            this.currentFrame = ++this.currentFrame >= this.widthFrame ? 0 : this.currentFrame;
            this.y += this.speed;
            this.speed += this.speedPlus;
        },

        //绑定事件
        _bind:function () {
            var self = this;
            this.ctx.canvas.addEventListener('click',function () {
                self.speed = -1.5;
            });
        }
    }

    //用来储存已经创建好的鸟实例对象
    var bird = null;

    w.getBird = function (ctx,img,widthFrame,heightFrame,x,y) {
        if(!bird){
            bird = new Bird(ctx,img,widthFrame,heightFrame,x,y);
        }
        return bird;
    }
}(window));