$(document).ready(() => {
  $("#prijavaOdjavaGumb").click(() => {
    let idIzbraneStranke = $("#seznamStrank").val();

    var ime = document.getElementById("prijavaOdjavaGumb").value;
    if(idIzbraneStranke == null && ime == "Prijava stranke "){
      alert("Za prijavo je potrebno izbrati stranko!");
      window.location = "/prijava"
    }
    else{
      window.location = idIzbraneStranke
      ? "/prijavaOdjava/" + idIzbraneStranke
      : "/prijavaOdjava/brezStranke";
    }
  });
});
