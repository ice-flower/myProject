<?php
header("Content-Type:application/json");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];

require("init.php");

$sql="SELECT uid FROM log WHERE uname='$uname' and binary upwd='$upwd'";
$result=mysqli_query($conn,$sql);//查询到?行 0 1
$row=mysqli_fetch_row($result)[0];//?=成功  ?=失败
if($row==null){
    echo json_encode(["msg"=>"登录失败","code"=>0]);
}else{
    session_start();
    $_SESSION['uid']=$row;
    echo json_encode(["msg"=>"登录成功","code"=>1]);
}