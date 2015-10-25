<?php
session_start();
require_once("csvParser.php");

function genResult($in){

    $std_exercise=array(
        "male"=>35.6,
        "female"=>27,
    );
    $std_height=body($in['height']);

    if($in['weight']>$std_height['overweight']){
        $warn=$in['weight']."公斤的你超重囉";
    }
    else if($in['weight']<$std_height['normal']){
        $warn=$in['weight']."公斤的你太輕了";
    }else{
        $warn="恭喜，".$in['weight']."公斤的你體重很標準";
    }

    #default
    $result=array(
        'height' => "你身高".$in['height']."公分，正常體重應為".$std_height['normal']."公斤至".$std_height['overweight']."公斤，".$warn,
        'wine'=>"小酌無妨，別喝太多",
        'smoke'=>"哦~你不吸煙",
        'vegetable'=>"在台灣，只有不到9%的人能做到。而你是其中之一",
    );
    //exercise
    if($in['gender']==1){
        if($in['exercise']){
            $result['exercise']="恭喜你，你是那".$std_exercise['male']."%規律運動的男性之一。";
        }else{
            $result['exercise']="加油，努力成為".$std_exercise['male']."%規律運動的男性之一。";
        }
    }else if($in['gender']==2){
        if($in['exercise']){
            $result['exercise']="恭喜你，你是那".$std_exercise['female']."%規律運動的女性之一。";
        }else{
            $result['exercise']="加油，努力成為".$std_exercise['female']."%規律運動的女性之一。";
        }
    }
    switch($in['exercise']){
    case 0.5:
        $result['exercise'].="不過可以再動久一點";
        break;
    case 1:
        $result['exercise'].="每天一小時，運動多健康";
        break;
    case 1.5:
        $result['exercise'].="太神啦<(_ _)>";
        break;
    }

    if($in['vegetable']==0){
        $result['vegetable']="在台灣，有近91%的人每日蔬果量不足…而你是其中之一";
    }
    switch($in['sleep']){
    case 4:
        $result['sleep']="只睡四小時，請定期檢查肝還在不在";
        break;
    case 6:
        $result['sleep']="只睡六小時少少的，不過好像還可以";
        break;
    case 8:
        $result['sleep']="八小時左右，健康睡眠";
        break;
    case 10:
        $result['sleep']="十小時，睡飽飽";
        break;
    }

    echo json_encode($result);
}

$input_json = file_get_contents('php://input');
if($input_json){
    $obj = json_decode($input_json,true);
    $_SESSION['data']=$obj;
    echo "";
}else if(isset($_GET['result'])){
    if(isset($_SESSION['data'])){
        genResult($_SESSION['data']);
    }
}else{
    die();
}
?>
