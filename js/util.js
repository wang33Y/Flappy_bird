var util = {
    extend:function (o1,o2) {
        for (var key in o2){
            if(o2.hasOwnProperty(key)){
                o1[key] = o2[key];
            }
        }
    },

 // function{util}加载图片资源
    loadImage:function(imgUrl, fn) {

        //存储图片资源
        var imgObj = {};
        var tempImg;
        //记录已经加载的图片数量
        var loaded = 0;
        //统计要加载的图片数量
        var imgLength = 0;

        //遍历所有url，动态创建image
        for(var key in imgUrl){
            imgLength++;
            tempImg = new Image();
            tempImg.onload = function(){
                loaded++;
                if(loaded >= imgLength){
                    fn(imgObj);
                }
            };
            tempImg.src = imgUrl[key];

            imgObj[key] = tempImg;

        }
    }
}
