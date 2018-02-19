<?php
/**
 * Created by PhpStorm.
 * User: ucv
 * Date: 19.02.2018
 * Time: 20:48
 */


$response['success'] = false;

if(isset($_GET['location']) && $_GET['location'] != ''){
    $location = $_GET['location'];

    $response['success'] = true;
}else{
    return $response;
}
$base_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';

$url=$base_url.$location.'&radius=500&type=restaurant&key=AIzaSyDv0QDQpHVav-cWx0oKdHxp0vuYnyJ_oco';

//die($location);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$data = curl_exec($ch);
curl_close($ch);










$response['data'] = json_decode($data);

echo json_encode($response);