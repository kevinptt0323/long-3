<?php
session_start();
require_once("csvParser.php");

function genResult($in){

    #default
    $std_height=body($in['height']);
    if($in['weight']>$std_height['normal']){
        $warn=$in['weight']."的你超重囉";
    }else $warn="恭喜你體重很標準";

    $result=array(
        'height' => "你身高".$in['height']."正常體重應為".$std_height['normal']."公斤至".$std_height['overweight']."公斤，".$warn,
        'wine'=>"每天".$in['wine']." 公升小酌無仿",
        'sleep'=>$in['sleep']."小時真是睡飽飽",
        'smoke'=>"恭喜你不吸煙",
    );
    if($in['wine']>3.3){
        $result['wine']="你喝".$in['wine']."公升/日好像有點多…";
    }
    if($in['sleep']<8.7){
        $result['wine']="每天只睡".$in['sleep']."小時太少了";
    }
    $_SESSION['result']=json_encode($result);
}

$input_json = file_get_contents('php://input');
if($input_json){
    $obj = json_decode($input_json,true);
    genResult($obj);
}else if(isset($_GET['result'])){
    echo $_SESSION['result'];
}else{
    die();
}
?>
