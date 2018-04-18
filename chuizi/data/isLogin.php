<?php
//header("Content-Type:application/json");
// 给前段 {"ok"=>1}  已经登录  {"ok"=>0} 未登录
/*$_SESSION*/
require_once("init.php");
session_start();
$uid=$_SESSION["uid"];
if($uid){
    $sql="SELECT uname FROM log where uid=$uid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result)[0];    
    echo json_encode(["ok"=>1,"uname"=>$row]);
}else{
    echo json_encode(["ok"=>0]);
}