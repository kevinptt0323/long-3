<?php
session_start();
require_once("csvParser.php");

function genResult($in){

    $std_exercise=array(
        "male"=>35.6,
        "female"=>27,
    );
    $std_height=body($in['height']);
    $score=array();

    if($in['weight']>$std_height['overweight']){
        $warn=$in['weight']."公斤的你超重囉";
        $score['weight']=60;
    }
    else if($in['weight']<$std_height['normal']){
        $warn=$in['weight']."公斤的你太輕了";
        $score['weight']=60;
    }else{
        $score['weight']=100;
        $warn="恭喜，".$in['weight']."公斤的你體重很標準";
    }

    #default
    $result=array(
        'height' => "你身高".$in['height']."公分，正常體重應為".$std_height['normal']."公斤至".$std_height['overweight']."公斤，".$warn,
        'wine'=>"恭喜您，一年低於3.3公升的適度飲酒可以促進身體健康，促進血液循環，有益血管健康。酒精具有擴張血管、降血壓的作用，喝酒臉會微微發紅，便是微血管擴張、血液循環變好的證明。",
        'smoke'=>"您沒有吸菸，是健康的典範",
        'vegetable'=>"在台灣，只有不到9%的人能做到。而你是其中之一",
    );
    //exercise
    if($in['gender']==1){
        if($in['exercise']){
            $result['exercise']="恭喜，你是那".$std_exercise['male']."%規律運動的男性之一。";
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

    switch($in['wine']){
    case 1:
        $score['wine']=90;
        break;
    case 2:
        $score['wine']=90;
        break;
    case 3:
        $score['wine']=90;
        break;
    case 4:
        $result['wine'].="喝太多";
        $score['wine']=30;
        break;
    case 5:
        $result['wine'].="喝太多";
        $score['wine']=30;
        break;
    }

    switch($in['exercise']){
    case 0.5:
        $result['exercise'].="不過可以再動久一點";
        $score['exercise']=60;
        break;
    case 1:
        $result['exercise'].="每天一小時，運動多健康";
        $score['exercise']=80;
        break;
    case 1.5:
        $result['exercise'].="太神啦<(_ _)>";
        $score['exercise']=100;
        break;
    }

    if($in['vegetable']==0){
        $result['vegetable']="在台灣，有近91%的人每日蔬果量不足…而你是其中之一";
        $score['vegetable']=90;
    }else{
        $score['vegetable']=60;
    }

    if($in['smoke']){
        $result['smoke']="很不幸的，您是其中一位，還是少抽一點";
        $score['smoke']=60;
    }else{
        $score['smoke']=90;
    }

    switch($in['sleep']){
    case 4:
        $result['sleep']="4小時，睡眠時數過少！長期睡眠時數過少將導致記憶力下降，注意力不集中，精神渙散，煩躁等等。趕快改變作息，讓自己多睡一點。";
        $score['sleep']=50;
        break;
    case 6:
        $result['sleep']="6小時，睡眠時數過少！長期睡眠時數過少將導致記憶力下降，注意力不集中，精神渙散，煩躁等等。趕快改變作息，讓自己多睡一點。";
        $score['sleep']=70;
        break;
    case 8:
        $result['sleep']="恭喜您，您的睡眠時數正常！睡眠正常可以增加記憶力，讓頭腦變清晰，注意力會更集中，要保持下去唷！";
        $score['sleep']=100;
        break;
    case 10:
        $result['sleep']="10小時以上，有點睡過多囉！根據數據，最好的睡眠時間為8小時，長期睡眠過多將提高患抑鬱症風險，也會讓您變懶，最後造成智力下降。 ";
        $score['sleep']=80;
        break;
    }

    if($in['Bvac']){
        $result['Bvac']="可以提醒朋友們要記得補打";
    }else{
        $result['Bvac']="小時候打的抗體通常在十年後會無效，要記得補打哦";
    }

    $sum=0;
    foreach($score as $s){
        $sum+=$s;
    }
    $score['avg']=$sum/6;

    $respond['msg']=$result;
    $respond['score']=$score;

    echo json_encode($respond);
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
