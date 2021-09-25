<?php 
require_once('connect.php');
ob_start();
session_start();

switch($_POST['type']){
    case 'ekle':
        $yaz=$_POST['yaz'];
        $durum=$_POST['durum'];
        $kat=$_POST['kat'];
        $stmt=$baglan->prepare("INSERT INTO todo (yazi,durum,kulid,kat) VALUES (?,?,?,?)");
        $stmt->bind_param('sbis', $yaz, $durum, $_SESSION["kullanid"], $kat);
        $stmt->execute();
        break;
    case 'göster':
        $result=$baglan->prepare("SELECT * FROM todo WHERE kulid=?");
        $result->bind_param("i",$_SESSION["kullanid"]);
        $result->execute();
        $sonuc=$result->get_result();
        $response=$sonuc->fetch_all(MYSQLI_ASSOC);
        echo '<li><label>Görevler</label><label id="kati">Kategori</label></li>';
        foreach($response as $key=>$value){
            $sor=$value['durum'];
            if($sor==1){
                echo '<li cizdurum="'.$value['durum'].'" cizid="'.$value['id'].'" class="görev checked">'.$value['yazi'].'<button silid="'.$value['id'].'"class="glyphicon glyphicon-remove sil">'.'</button>'.'<button güncelid="'.$value['id'].'"class="glyphicon glyphicon-ok güncelle">'.'</button>'.'<label class="kate">'.$value['kat'].'</label>'.'</li>';
            }
            else if($sor==0){
                echo '<li cizdurum="'.$value['durum'].'" cizid="'.$value['id'].'" class="görev">'.$value['yazi'].'<button silid="'.$value['id'].'"class="glyphicon glyphicon-remove sil">'.'</button>'.'<button güncelid="'.$value['id'].'"class="glyphicon glyphicon-ok güncelle">'.'</button>'.'<label class="kate">'.$value['kat'].'</label>'.'</li>';
            }
        }
        break;
    case 'sil':
        $id=$_POST['id'];
        $stmt=$baglan->prepare("DELETE FROM todo WHERE id=?");
        $stmt->bind_param('i',$id);
        $sorgu=$stmt->execute();
        if($sorgu){
            echo "silindi";
        }
        break;
    case 'yap':
        $durum=$_POST['durum'];
        $id=$_POST['id'];
        $stmt=$baglan->prepare("UPDATE todo SET durum=? WHERE id=?");
        $stmt->bind_param('ii',$durum,$id);
        $sorgu=$stmt->execute();
        break;
    case 'güncelle':
        $id=$_POST['id'];
        $yaz=$_POST['yaz'];
        $kat=$_POST['kat'];
        $stmt=$baglan->prepare("UPDATE todo SET yazi=? , kat=? WHERE id=?");
        $stmt->bind_param('ssi',$yaz,$kat,$id);
        $sorgu=$stmt->execute();
        if($sorgu){
            echo "basarili";
           }
        break;
    case 'kayıt':
        $kuladı=$_POST['kuladı'];
        $kulsif=$_POST['kulsif'];
        $result=$baglan->query("SELECT * FROM kulkayit",MYSQLI_USE_RESULT);
        $response=$result->fetch_all(MYSQLI_ASSOC);
        foreach($response as $key=>$value){
            $kullanadı=$value['kuladı']; 
        }
        if($kullanadı==$kuladı){
            echo "yanlis";
        }
        else{
            $stmt=$baglan->prepare("INSERT INTO kulkayit (kuladı,kulsif) VALUES (?,?)");
            $stmt->bind_param("ss",$kuladı,$kulsif);
            $sorgu=$stmt->execute();
            if($sorgu){
             echo "basarili";
            }
        }
        break;
    case 'giris':
        $kuladı=$_POST['kuladı'];
        $kulsif=$_POST['kulsif'];
        $result=$baglan->prepare("SELECT * FROM kulkayit WHERE kuladı=? AND kulsif=?");
        $result->bind_param("ss",$kuladı,$kulsif);
        $result->execute();
        $sonuc=$result->get_result();
        $sorgu=$sonuc->num_rows;
        if($sorgu>0){
            echo "dogru";
            $kul=$sonuc->fetch_assoc();
            $_SESSION["kullanid"]=$kul['kulid'];
            $_SESSION["kullanad"]=$kul['kuladı'];
        }
        else{
            echo "yanlis";
        }
        break;
    case 'cikis':
        $_SESSION["kullanid"]=0;
        echo "dogru";
        break;
    case 'bilgi':
        echo "[".$_SESSION["kullanad"]."]";
        break;
        
        //$result->execute();
}
//mysqli_close($baglan);
?>