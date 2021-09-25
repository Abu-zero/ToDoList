$(document).ready(function(){
    $("#ekle1").click(function(e){
    var kuladı=$('#kul').val();
    var kulsif=$('#sif').val();
    kuladı=kuladı.trim();
    kulsif=kulsif.trim();
    if(kuladı=="" || kulsif==""){
      alert("Lütfen bilgileri doldurun...");
    }
    else{
      e.preventDefault();
      $.ajax({
        url:"islem.php",
        method:"POST",
        data:{
          type:"kayıt",
          kuladı:kuladı,
          kulsif:kulsif,
        },
        success:function(response){
          if(response=="basarili"){
            alert("KAYIT BAŞARIYLA ALINDI");
            document.getElementById("kul").value="";
            document.getElementById("sif").value="";
          }
          else{
           alert("BU KULLANICI ADI KULLANILIYOR");
          }
        },
      });
    }
  })

  $("#giris2").click(function(e){
    var kuladı=$('#kul2').val();
    var kulsif=$('#sif2').val();
    kuladı=kuladı.trim();
    kulsif=kulsif.trim();
    if(kuladı=="" || kulsif==""){
      alert("Lütfen bilgileri doldurun...");
    }
    else{
      e.preventDefault();
      $.ajax({
        url:"islem.php",
        method:"POST",
        data:{
          type:"giris",
          kuladı:kuladı,
          kulsif:kulsif,
        },
        success:function(response){
          if(response=="dogru"){
            alert("Başarıyla Giriş Yaptınız..."); 
            window.location.href ="main.html";
          }
          else{
            alert("Lütfen Doğru Bilgileri Giriniz...");
          }

        }
      })
    }
  })
})