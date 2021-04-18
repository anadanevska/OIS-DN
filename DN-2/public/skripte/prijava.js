$(document).ready(() => {
  $("#FirstName").keyup(() => {
    console.log("Preveri ime nove stranke.");
    var name = document.getElementById("FirstName").value;
    var validen = false;

    var regex = /^[A-Za-zŠšĐđČčĆćŽž-]{2,14}$/;
    if(name.match(regex)){
    	validen = true;
    }
    if(validen){
      if(document.querySelector("#Country").classList.contains("dovoljeno")){
        document.getElementById("Register").disabled = false;
      }
      document.querySelector("#FirstNameSt").classList.remove("fa-times");
      document.getElementById("FirstNameSt").classList.add("fa-check");
      document.getElementById("FirstName").classList.add("dovoljeno");
    }else{
      document.querySelector("#FirstNameSt").classList.add("fa-times");
      document.getElementById("FirstName").classList.remove("dovoljeno");
      document.getElementById("Register").disabled = true;
    }
  });

  $("#Country").keyup(() => {
    console.log("Preveri državo nove stranke.");

    var drzava = document.getElementById("Country").value;
    drzava = drzava.toLowerCase();
    var stevilo = 0;
    var najdena = false;

    $.get("stranke_po_drzavah", function(drzave) {
      for(var i =0; i < drzave.length; i++) {
        if(drzava.toLowerCase() === drzave[i].drzava.toLowerCase() && drzava != "" && (drzava.length >= 3) ){
          stevilo = drzave[i].stUporabnikov;
          document.getElementById("obstojeceStrankeId").innerHTML = stevilo;

          najdena = true;
          
          if(drzave[i].stUporabnikov < 5){
            imaNad5 = false;
            if(document.querySelector("#FirstName").classList.contains("dovoljeno")){
              document.getElementById("Register").disabled = false;
            }
            document.querySelector("#cStatus").classList.remove("fa-times");
            document.getElementById("cStatus").classList.add("fa-check");
            document.getElementById("Country").classList.add("dovoljeno");
            break;
          }else{
            document.querySelector("#cStatus").classList.add("fa-times");
            document.getElementById("Country").classList.remove("dovoljeno");
            document.getElementById("Register").disabled = true;
            break;
          }
        }
        if(!najdena && drzava != "" && (drzava.length >= 3)){
          if(document.querySelector("#FirstName").classList.contains("dovoljeno")){
            document.getElementById("Register").disabled = false;
          }
          document.querySelector("#cStatus").classList.remove("fa-times");
          document.getElementById("cStatus").classList.add("fa-check");
          document.getElementById("Country").classList.add("dovoljeno");
          document.getElementById("obstojeceStrankeId").innerHTML = 0;
        }else{
          document.querySelector("#cStatus").classList.add("fa-times");
            document.getElementById("Country").classList.remove("dovoljeno");
            document.getElementById("Register").disabled = true;
            document.getElementById("obstojeceStrankeId").innerHTML = 0;
        }
      }
    });
  });

  // Poslušalec ob kliku z miško na izbran račun
  $("select#seznamRacunov").change(function (e) {
    let izbranRacunId = $(this).val();
    $.get("/jeziki-racuna/" + izbranRacunId, (racunJeziki) => {
      $("#jezikiRacuna").html(racunJeziki);
    });
  });
});


