<?php
session_start();
require_once("csvParser.php");

function genResult($in){

    $std_height=body($in['height']);

    if($in['weight']>$std_height['overweight']){
        $warn=$in['weight']."公斤的你超重囉";
    }else $warn="恭喜你體重很標準";

    #default
    $result=array(
        'height' => "你身高".$in['height']."公分，正常體重應為".$std_height['normal']."公斤至".$std_height['overweight']."公斤，".$warn,
        'wine'=>"每年".$in['wine']." 公升小酌無仿",
        'sleep'=>$in['sleep']."小時真是睡飽飽",
        'smoke'=>"恭喜你不吸煙",
        'vegetable'=>"在台灣，只有不到9%的人能做到。而你是其中之一",
    );
    if($in['wine']>3.3){
        $result['wine']="你喝".$in['wine']."公升/日好像有點多…";
    }
    if($in['sleep']<8.7){
        $result['sleep']="每天只睡".$in['sleep']."小時太少了";
    }
    if($in['vegetable']==0){
        $result['vegetable']="在台灣，有近91%的人每日蔬果量不足…而你是其中之一";
    }

    echo json_encode($result);
}

$input_json = file_get_contents('php://input');
if($input_json){
    $obj = json_decode($input_json,true);
    $_SESSION['data']=$obj;
}else if(isset($_GET['result'])){
    if(isset($_SESSION['data'])){
        genResult($_SESSION['data']);
    }
}else{
    die();
}
?>
