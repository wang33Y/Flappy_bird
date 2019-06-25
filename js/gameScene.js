(function (w) {
    function Scene(ctx,imgObj) {
        this.ctx = ctx;
        this.imgObj = imgObj;

        //听众队列
        this.listeners = [];

        //该场景所需要的所有角色
        this.roles = [];
        this._initRoles();
    }

    Scene.prototype = {
        constructor : Scene,
        _initRoles:function () {

            //两个背景
            this.roles.push(getSky(ctx,this.imgObj.sky,3));
            this.roles.push(getSky(ctx,this.imgObj.sky,3));

            //管道6个
            for (var i=0;i<6;i++){
                this.roles.push(getPipe(ctx,this.imgObj.pipeDown,this.imgObj.pipeUp,150,this.imgObj.land.height,3));
            }

            //大地4个
            for (var i=0;i<4;i++){
                this.roles.push(getLand(ctx,this.imgObj.land,3));
            }

            //创建鸟
            this.roles.push(getBird(ctx,this.imgObj.bird,3,1,10,10));
        },

        //添加听众
        addListener:function(listener){
            this.listeners.push(listener);
        },

        //监听小鸟死亡
        triggerBirdOver:function(){
            this.listeners.forEach(function (liste) {
                liste();
            });
        },


        //让所有角色开始游戏
        draw:function () {

            //判断小鸟是否碰撞
            var bird = getBird();
            var birdCordX = bird.x +bird.width / 2;
            var birdCordY = bird.y + bird.height / 2;

            // 如果小鸟撞向管道，或者飞出天空，或者duang~duang~duang，那么游戏结束
            if(ctx.isPointInPath(birdCordX,birdCordY)
                || birdCordY < 0
                || birdCordY > (ctx.canvas.height - this.imgObj.land.height)) {

                //监听到了小鸟死亡
                this.triggerBirdOver();
            }else {
                ctx.beginPath();
                this.roles.forEach(function (role) {
                    role.draw();
                    role.update();
                });
            }
        }
    };

    //工厂
    w.getGameScene = function (ctx,imgObj) {
        return new Scene(ctx,imgObj);
    }

}(window));