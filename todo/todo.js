var list=document.getElementById("list");

function eklee(){
  let yaz=document.getElementById("yaz").value; 
  let kat=document.getElementById("kat").value;
  yaz=yaz.trim();
  if(!yaz || !kat){
    alert("Lütfen görev ve kategoriyi boş bırakmayınız...");
  } 
  else{
    görevekle(yaz,kat);
  } 
  document.getElementById("yaz").value="";
  document.getElementById("kat").value="";
}

function görevekle(yazı,kate){
  let durum=false;
  $.ajax({
    url:"islem.php",
    method:"POST",
    data:{
      yaz:yazı,
      durum:durum,
      kat:kate,
      type:"ekle",
    },
  })  
  yazdirgorev();
}

function yazdirgorev(){
  $.ajax({
    url:"islem.php",
    method:"POST",
    data:{
      type:"göster",
    },
    success:function(response){
      $("#list").show();
      $("#list").html(response);
    },
  });
}

$(document).ready(function(){
  $(".sil").click(function(){
    var silinecek=$(this).attr('silid');
    var silli=$(this).parents('li')
    $.ajax({
      url:"islem.php",
      method:"POST",
      data:{
        type:"sil",
        id:silinecek,
      },
      success:function(response){
        if(response="silindi"){
          silli.hide(500);
        }
      },
    });
  })

  $(".görev").click(function(){
    var durum=$(this).attr('cizdurum');
    var id=$(this).attr('cizid');
    if(durum==0){
      durum=1;
    }
    else{
      durum=0;
    }
    $(this).toggleClass("checked");
    $.ajax({
      url:"islem.php",
      method:"POST",
      data:{
        type:"yap",
        durum:durum,
        id:id,
      }
    })
  })
  
  $("#güncelleme").click(function(e){
    e.preventDefault();
    console.log(id);
    let kat=document.getElementById("katim").value;
    let yaz=document.getElementById("yazım").value;
    var id=$(this).attr('gulid');
    if(yaz == null || yaz == ""){
      alert("Lütfen boş bırakmayın...");
    }
    else{
    alert(yaz);
    $.ajax({
      url:"islem.php",
      method:"POST",
      data:{
        type:"güncelle",
        yaz:yaz,
        kat:kat,
        id:id,
      },
      success:function(response){
        if(response="basarili"){
          $(".modal").hide(500);
          yazdirgorev();
        }
      }
    })
   }
  })

  $(".modal").click(function(e){
    if (e.target.className == "modal"){
      $(this).hide();
    }
  })

  $(".güncelle").click(function(){
    $(".modal").show();
    var id=$(this).attr('güncelid');
    let modal = $("#güncelleme");
    modal.attr("gulid",id);
    //window.open("güncel.html","","width=900,height=600");
    //let yaz=prompt("Lütfen güncel görevi girin..");
    //var yazı=yaz.trim();
    //let kateid=$(this).attr('kateid');
    //let kat=document.getElementById("katim").value;
    //yazı=yazı.trim();
    //console.log(id);
    //gun(e,id);
    /*if(yazı == null || yazı == ""){
      alert("Lütfen boş bırakmayın...");
    }
    else{
    alert(yazı);
    $.ajax({
      url:"islem.php",
      method:"POST",
      data:{
        type:"güncelle",
        yaz:yaz,
        kat:kat,
        id:id,
      }
    })
   }*/
  })

  $.ajax({
    url:"islem.php",
    method:"POST",
    data:{
      type:"bilgi",
    },
    success:function(response){
      $("#bilgi").show();
      $("#bilgi").html(response);
    }
  })

  $("#cikis").click(function(){
    $.ajax({
      url:"islem.php",
      method:"POST",
      data:{
        type:"cikis",
      },
      success:function(response){
      if(response="dogru"){
        alert("Başarıyla Çıkış Yaptınız..."); 
        window.location.href ="index.html";
      }
      else{
        alert("Çıkış Yaparken Bir Hatayla Karşılaşıldı...");
      }
      }
    })
   })
})

yazdirgorev();
