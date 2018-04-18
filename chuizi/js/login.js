$(()=>{
    // 用户名
    let valiTip=$(".uname_err"),
        loginBtn=$(".btn>input[type=button]"),
        autoBtn=$(".auto"),
        state1=0,//按钮是否被禁用
        state2=0,
        uname=localStorage.getItem("uname"),
        upwd=localStorage.getItem("upwd"),
        isAuto=parseInt(localStorage.getItem("isAuto"));
    
    autoBtn.click(
        function(){
            if($(this).prop("checked")){
                localStorage.setItem("isAuto",1);
            }else{
                localStorage.setItem("isAuto",0);
            }
        }
    );
    if(isAuto&&uname&&upwd){
        login(uname, upwd);
    }
    $("#ipt_uname").blur(function(){
        let value=$(this).val(),
            unameReg=/(^[0-9a-zA-Z_]{1,}@[0-9a-z]{1,}.[a-zA-Z]{1,}$)|(^1[3,4,5,6,7,8,9][0-9]{9}$)/;
        if(!unameReg.test(value)){
            valiTip
                .removeClass("hidden")
                .parent()
                .addClass("danger");
            state1=0;
        }else{
            valiTip
                .addClass("hidden")
                .parent()
                .removeClass("danger");
            state1=1;
        }
        canLogin();
    }).keydown(()=>{
        valiTip.addClass("hidden");
    });
    // 密码
    let upwdTip=$(".upwd_err");
    $("#ipt_upwd").blur(function(){
        let value=$(this).val(),
            upwdReg=/^[0-9a-zA-Z_]{6,12}$/;
        if(!upwdReg.test(value)){//不符合时候
            upwdTip
                .removeClass("hidden")
                .parent()
                .addClass("danger");
            state2=0;
        }else{//符合
            upwdTip
                .addClass("hidden")
                .parent()
                .removeClass("danger");
            state2=1;
        }
        canLogin();
    }).keydown(()=>{
        valiTip.addClass("hidden");
    });
    //禁用按钮的功能
    function canLogin(){
        if(state1==1&&state2==1){//如果都符合要求就登录
            loginBtn.attr("disable",false)
                .removeClass("no")
                .addClass("ok");
        }else{
            loginBtn.attr("disable",true)
                .removeClass("ok")
                .addClass("no");
        }
    }
    // 登录发送请求
    loginBtn.click(function(){
        canLogin();
        let uname=$("#ipt_uname").val(),
            upwd=$("#ipt_upwd").val();
        login(uname, upwd);
    });
    
    function login(uname, upwd){
        $.ajax({
            url:"data/log.php",
            type:"get",
            dataType:"json",
            data:{
                uname,
                upwd
            }
        }).then((data)=>{
            if(data.code===1){
                localStorage.setItem("uname",uname);
                localStorage.setItem("upwd",upwd);
                location.href="aindex.html";
            }
        });
    }
});