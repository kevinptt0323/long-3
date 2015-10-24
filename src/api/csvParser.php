<?php
function body($tall="170"){
    #成人健康體重標準
    # query key: tall=?
    # response: {"tall":"170","normal":"53.5","overweight":"69.4","obesity":"78"}
    #
    $csv_url="http://www.hpa.gov.tw/BHPNet/Web/Service/FileCount.aspx?file=ThemeDocFile&TopicFile=201111011003513050&TopicFilename=成人健康體重標準.csv";
    $csv= file_get_contents($csv_url);
    $array = array_map("str_getcsv", explode("\n", $csv));
    $array=array_slice($array,1,47);

    foreach($array as $item){
        if($item[0]==$tall){
            $q_arr=array(
                "tall"=>$item[0],
                "normal"=>$item[1],
                "overweight"=>$item[2],
                "obesity"=>$item[3],
            );
        }
    }

    /*
    $q_arr=[
        ["name"=>"Too Thin","data"=>array(
            array(
                "real"=>intval($array[0][1]),
                "range"=>intval($array[0][1]),
            )
        )],
        ["name"=>"Normal","data"=>array(
            array(
                "real"=>intval($array[0][2]),
                "range"=>$array[0][2]-$array[0][1],
            )
        )],
        ["name"=>"Obesity","data"=>array(
            array(
                "real"=>intval($array[0][3]),
                "range"=>$array[0][3]-$array[0][2],
            )
        )],
    ];
    for($i=1;$i<count($array);$i++){
        array_push($q_arr[0]['data'],array(
            "real"=>intval($array[$i][1]),
            "range"=>intval($array[$i][1]),
        )
    );
        array_push($q_arr[1]['data'],array(
            "real"=>intval($array[$i][2]),
            "range"=>$array[$i][2]-$array[$i][1],
        )
    );
        array_push($q_arr[2]['data'],array(
            "real"=>intval($array[$i][3]),
            "range"=>$array[$i][3]-$array[$i][2],
        )
    );
    }
     */

    return($q_arr);
}

function vegetable($age="20"){
    #a歷年18歲以上民眾每日攝取三蔬二果比率的人口比率
    # query key: age=?
    # response: array(3) { ["male"]=> string(4) "8.07" ["female"]=> string(5) "15.92" ["total"]=> string(5) "12.09" }
    # unit %
    #
    $csv_url="http://data.hpa.gov.tw/dataset/8e5b64bc-d6a1-4904-af9d-29fddeeef7af/resource/eec5fa24-93b8-423a-80bd-7b0b486c883a/download/aged18andovereating3servingvegetablesand2servingfruitperdaybyage.csv";
    $csv= file_get_contents($csv_url);

    $arr=array_slice(str_getcsv($csv,"\n"),9);

    if($age >=18 && $age <=24){
        $target=$arr[0];
    }
    else if($age >=25 && $age <=34){
        $target=$arr[1];
    }
    else if($age >=35 && $age <=44){
        $target=$arr[2];
    }
    else if($age >=45 && $age <=54){
        $target=$arr[3];
    }
    else if($age >=55 && $age <=64){
        $target=$arr[4];
    }
    else if($age >=65){
        $target=$arr[5];
    }

    $tmp=(explode(",",$target));
    #array(6) { [0]=> string(5) "18-24" [1]=> string(2) ""1" [2]=> string(4) "327"" [3]=> string(4) "7.41" [4]=> string(4) "9.64" [5]=> string(4) "8.48" }
    $query_arr=array(
        "male"=>$tmp[3],
        "female"=>$tmp[4],
        "total"=>$tmp[5],
    );
    echo json_encode($query_arr);
}

function regular_exer($gender="male"){
    #歷年13歲以上國人規律運動率
    # query key: male=?
    # response: { ["samples"]=> string(6) "25,098" ["percentage"]=> string(4) "35.6" }
    # unit %
    #
    $csv_url="http://data.hpa.gov.tw/dataset/3b095c6e-9118-4d01-a4d9-608bdc805862/resource/868ed205-c724-420d-8047-c44b6062ef40/download/regularexerciserateofpopulationaged13andoverbyyears.csv";
    $csv= file_get_contents($csv_url);

    $str=str_getcsv($csv,"\n")[11];
    $item=str_getcsv($str,",",'"');
    $result=array("samples"=>$item[1]);
    if($gender=="male"){
        $result["percentage"]=$item[2];
    }
    else if($gender=="female"){
        $result["percentage"]=$item[3];
    }
    echo json_encode($result);

}

body();

?>
