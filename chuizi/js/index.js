// 轮播图
$(()=>{//$()=>$(document).ready():DOM元素加载完成之后
    function lunbo() {
        let urlLeft = $(".logo ul"),// 找到元素，改变left
            count = 0,// 记录第一张图片
            imgLen = 1220,// 每个图片的长度
            imgSum = 2,// 一共几张图
            state = 1,//按钮是否可以被单击，1：可以   0：禁用
            TIME = 3000;// 定时器秒数

        function leftOnce() {
            state = 0;
            count++;
            urlLeft.animate({"left": "-" + count * imgLen + "px"}, 1000, function () {
                if (count >= imgSum) {
                    urlLeft.css("left", "0px");
                    count = 0;
                }
                state = 1;
            });
        }

        function rightOnce() {
            state = 0;
            if (count == 0) {
                count = imgSum;
                urlLeft.css("left", "-" + count * imgLen + "px");
            }
            count--;
            urlLeft.animate({"left": "-" + count * imgLen + "px"}, 1000, function () {
                state = 1;
            });
        }

        let timer = setInterval(leftOnce, TIME);//默认向左轮播


        //  鼠标移入移除的动做

        urlLeft.on("mouseenter", "li", function () {//  当鼠标移入时停止定时器
            clearInterval(timer);
        });
        urlLeft.on("mouseleave", "li", function () {//  当鼠标移出时，定时器重新开始

            timer = setInterval(leftOnce, TIME);
        });

        //  点击左移动，向左滑动1下

        $(".leftBtn").on("click", function () {
            if (state == 1) {
                clearInterval(timer)
                rightOnce();
                timer = setInterval(leftOnce, TIME);
            }
        });

        $(".rightBtn").on("click", function () {
            if (state == 1) {
                clearInterval(timer)
                leftOnce();
                timer = setInterval(leftOnce, TIME);
            }
        });
        //  点击右移动，向左滑动1下
        /*$(".rightBtn").on("click",function(){
            if(count==imgSum){
                
            }else{
                count++;
                urlLeft.animate({"left":"-"+count*imgLen+"px"},1000);
            }
        });*/
        /*
            $(".leftBtn").on("click",function(){
                if(state1){
                    clearInterval(timer);
                    rightOnce();
                    timer=setInterval(rightOnce,TIME)
                }
            });
            //  点击右移动，向左滑动1下
            $(".rightBtn").on("click",function(){
                clearInterval(timer);
                leftOnce();
                timer=setInterval(rightOnce,TIME)
            });
        */
    }

    //固定导航
    function fixedNav(){
        let nav=$(".fixed");
        $(document).scroll(function(){
            if($(this).scrollTop()>200){
                nav.css("display","block");
            }else{
                nav.css("display","none");
            }
        });
    }


    //所有行为执行
    lunbo();
    fixedNav();
});