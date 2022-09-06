<?php
	//跨域请求设置，通用可以复制
    header('Content-Type: application/json;charset=utf-8');	
    header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
    header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
    header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
    header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); 
	header('Access-Control-Allow-Credentials: true');
	// Content-Type	application/json; charset=utf-8
	
	//设置允许自定义请求头的字段
	//返回请求的数据
	$conn=mysql_connect('127.0.0.1','root','@wzq770814') or die('database connected failed');
	mysql_select_db("shop",$conn)or die("database do not exist");
	mysql_query("set names utf8");
	$sql="select * from focus";
	$result=mysql_query($sql);
	$arr=array();
	while($row=mysql_fetch_assoc($result))
	{
		$arr[]=$row;
	}
	$arrfinal['result']=$arr;
	//$arr=array('name'=>'wzqget','age'=>241);
	echo json_encode($arrfinal);
	//echo $arr;
?>