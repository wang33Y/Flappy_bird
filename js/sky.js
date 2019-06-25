(function (w) {
    var cvs = document.getElementById('cvs');
    var ctx = cvs.getContext('2d');

    function Sky(ctx,img,speed) {
        this.ctx = ctx;
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
        this.speed = speed || 2;

        //创建一个实例，length自增
        Sky.len++;

        //根据背景的数量 动态计算起始的x轴坐标
        this.x = this.width*(Sky.len - 1);
        this.y = 0;
    }

    // sky实例默认的数量
    Sky.len = 0;
    //给原型扩充方法
    Sky.prototype = {
        constructor:Sky,

        //绘制背景
        draw:function () {
            this.ctx.drawImage(this.img,this.x,this.y);
        },

        update:function () {
            this.x -= this.speed;
            if(this.x <= -this.width){
                this.x += this.width*Sky.len;
            }
        }

    };

    //工厂模式
    w.getSky = function (ctx,img,speed) {
        return new Sky(ctx,img,speed);
    };
}(window));