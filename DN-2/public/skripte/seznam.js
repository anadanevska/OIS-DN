// Premakni film iz seznama (desni del) v košarico (levi del)
const premakniFilmIzSeznamaVKosarico = (
  id,
  naslov,
  jezik,
  ocena,
  trajanje,
  azuriraj
) => {
  if (azuriraj)
    $.get("/kosarica/" + id, (podatki) => {
      /* Dodaj izbran film v sejo */
    });

  // Dodaj film v desni seznam
  $("#kosarica").append(
    "<div id='" +
      id +
      "' class='film'> \
         <button type='button' class='btn btn-light btn-sm'> \
           <i class='fas fa-minus'></i> \
             <strong><span class='naslov'>" +
      naslov +
      "</span></strong> \
         <i class='fas fa-globe-europe'></i><span class='jezik'>" +
      jezik +
      "</span> \
        <i class='fas fa-signal'></i><span class='ocena'>" +
      ocena +
      "</ocena>\
        <i class='far fa-clock'></i><span class='trajanje'>" +
      trajanje +
      "</span> min \
          </button> \
          <input type='button' onclick='vecPodrobnostiFilma(" +
      id +
      ")' class='btn btn-info btn-sm' value='...'> \
        </div>"
  );

  // Dogodek ob kliku na film v košarici (na desnem seznamu)
  $("#kosarica #" + id + " button").click(function () {
    let film_kosarica = $(this);
    $.get("/kosarica/" + id, (podatki) => {
      /* Odstrani izbrano film iz seje */
      // Če je košarica prazna, onemogoči gumbe za pripravo računa
      if (!podatki || podatki.length == 0) {
        $("#racun_html").prop("disabled", true);
        $("#racun_xml").prop("disabled", true);
      }
    });
    // Izbriši film iz desnega seznama
    film_kosarica.parent().remove();
    // Pokaži film v levem seznamu
    $("#filmi #" + id).show();
  });

  // Skrij film v levem seznamu
  $("#filmi #" + id).hide();
  // Ker košarica ni prazna, omogoči gumbe za pripravo računa
  $("#racun_html").prop("disabled", false);
  $("#racun_xml").prop("disabled", false);
};

var povikani = [];
// Vrni več podrobnosti filmi
const vecPodrobnostiFilma = (id) => {
  $.get("/vec-o-filmu/" + id, (podatki) => {
    console.log("Dodaj podrobnosti o filmu.");
    
    var obstaja = false;
    var index = -1;
    for(var i = 0; i<povikani.length; i++){
      if(povikani[i] == id){
        obstaja = true;
        index = i;
      }
    }
    if(!obstaja){
      povikani.push(id);
      //add 
      document.getElementById("sporocilo").style.backgroundColor = "#ddf1fb";
      $("#sporocilo").append("<table style='margin: auto;' id='id:"+id+"'>" +
        "<th>Trajanje: </th>" +
        "<td> "+ podatki.trajanje + " min" +
        "<tr>" + 
        "<th>Žanri: </th>" +
        "<td> "+ podatki.zanri +"</tr><tr>"+
        "<th>Leto izdaje: </th>" +
        "<td> "+ podatki.datumIzdaje.split("-", 1) +
        "</tr></table>");
    }
    else{
      povikani.splice(index,1);
      //remove
      document.getElementById("id:"+id).remove();
    }
  });
};

$(document).ready(() => {
  // Posodobi podatke iz košarice na spletni strani
  $.get("/kosarica", (kosarica) => {
    kosarica.forEach((film) => {
      premakniFilmIzSeznamaVKosarico(
        film.stevilkaArtikla,
        film.opisArtikla.split(" (")[0],
        film.jezik,
        film.ocena,
        film.trajanje,
        false
      );
    });
  });

  // Klik na film v levem seznamu sproži
  // dodajanje filma v desni seznam (košarica)
  $("#filmi .film button").click(function () {
    let film = $(this);
    premakniFilmIzSeznamaVKosarico(
      film.parent().attr("id"),
      film.find(".naslov").text(),
      film.find(".jezik").text(),
      film.find(".ocena").text(),
      film.find(".trajanje").text(),
      true
    );
  });

  // Nariši graf
  $.get("/podroben-seznam-filmov", (seznam) => {
    var podatki_za_prikaz =[];
    for (var i = 0; i < seznam.length; i++) {
      podatki_za_prikaz.push({
        x: new Date(seznam[i].datumIzdaje),
        y: seznam[i].ocena,
        label: seznam[i].naslov + ", " + (((seznam[i].dobicek - seznam[i].stroski) > 0) ? "Dobiček " : "Izguba ") +
        ((seznam[i].dobicek - seznam[i].stroski > 1000000 ||
          seznam[i].dobicek - seznam[i].stroski < -1000000) ? 
          (Math.floor((seznam[i].dobicek - seznam[i].stroski)/ 1000000)+" milijonov") :
           (seznam[i].dobicek - seznam[i].stroski)) + " €"
      });
    }
    
    var i = Math.floor(Math.random()*seznam.length);
    while(seznam[i].dobicek == 0 && seznam[i].stroski ==0){
      i = Math.floor(Math.random()*seznam.length);
    }
    var ime = seznam[i].naslov;
    var dobicekAliIzguba = "Izguba";
    var razlika = seznam[i].dobicek - seznam[i].stroski;

    if(razlika > 0){
      dobicekAliIzguba = "Dobiček";
    }
    if(razlika > 1000000 || razlika < -1000000){
      razlika = Math.floor(razlika / 1000000);
      razlika += " milijonov"
    }
    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Najboljši filmi čez čas: ocene in donosnost",
        fontColor: "#400080",
      },
      subtitles: [
        {
          text: ime + ", " + dobicekAliIzguba + " " + razlika + " €",
          fontColor: "#009900",
        },
      ],
      data: [{
        type: "scatter",
        dataPoints: podatki_za_prikaz,
        markerType: "cross",
        markerSize: 8
        }]
    });
    chart.render();
  });

  // Klik na gumba za pripravo računov
  $("#racun_html").click(() => (window.location = "/izpisiRacun/html"));
  $("#racun_xml").click(() => (window.location = "/izpisiRacun/xml"));
});
