<?php 
require_once('connect.php');

$result=$baglan->query("SELECT * FROM todo",MYSQLI_USE_RESULT);
foreach($result as $value){
    echo '<li class="görev">'.$value['yazi'].'<button class="glyphicon glyphicon-remove sil" onclick="`sil(event,${todox.id})`">'.'</li>';
}



?>