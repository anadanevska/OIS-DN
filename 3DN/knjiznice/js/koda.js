var baza = 'anadanevska';
var baseUrl = 'https://teaching.lavbic.net/api/OIS/baza/' + baza + '/podatki/';

var klikNaGumb = 0;
var zdaj = [];
var clicked = false;

//Generiranje podatkov ob klika gumba
function generirajVsePodatke(){
  if(klikNaGumb == 0){
   for(var i = 1; i < 4; i++){
      generirajPodatke(i);
    }
    klikNaGumb++;
    alert("The patients have been successfully generated.");
    console.log("Successfully generated.")
    }
}

//Generira random ID
function id() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
function generirajPodatke(stPacienta) {
  ehrID = id();
  console.log(ehrID);
  // TODO: Potrebno implementirati
  var st = (stPacienta % 3) + 1;
  var pacient;

  //normalen zdrav pacient, ki je cepljen
  if(st === 1){
    pacient = {
      "ime": "Lili",
      "priimek": "Holmes",
      "datumRojstva": "04.11.1999",
      "problems": "no health issues.",
      "Covid-19-now" : "doesn't have Covid now",
      "Covid-19-before" : "hasn't had Covid before",
      "vaccinated" : "vaccinated",
      "meritve": [{
        "vreme": "2021-02-10T07:32Z",
        "telesnaTemperatura": 36.5,
        "procentKisVKrvi": 97,
      },
      {
        "vreme": "2021-02-13T09:25Z",
        "telesnaTemperatura": 36.9,
        "procentKisVKrvi": 98,
      },
      {
        "vreme": "2021-02-15T17:10Z",
        "telesnaTemperatura": 37.6,
        "procentKisVKrvi": 100,
      },
      {
        "vreme": "2021-02-21T11:17Z",
        "telesnaTemperatura": 37.3,
        "procentKisVKrvi": 99,
      },
      {
        "vreme": "2021-03-01T19:13Z",
        "telesnaTemperatura": 37.3,
        "procentKisVKrvi": 97,
      }]
    };
  } 
  //pacient, ki je oku^zen z Covid-19 in ima visoka telesna temperatura
  else if(st === 2){
    pacient = {
      "ime": "Stephen",
      "priimek": "Raynolds",
      "datumRojstva": "22.02.1984",
      "problems": "high temperature.",
      "Covid-19-now" : "has Covid now",
      "Covid-19-before" : "hasn't had Covid before",
      "vaccinated" : "not vaccinated",
      "meritve": [{
        "vreme": "2021-04-10T10:10Z",
        "telesnaTemperatura": 37.5,
        "procentKisVKrvi": 96,
      },
      {
        "vreme": "2021-04-11T15:27Z",
        "telesnaTemperatura": 38.5,
        "procentKisVKrvi": 98,
      },
      {
        "vreme": "2021-04-13T16:14Z",
        "telesnaTemperatura": 38.2,
        "procentKisVKrvi": 97,
      },
      {
        "vreme": "2021-04-14T19:21Z",
        "telesnaTemperatura": 37.6,
        "procentKisVKrvi": 95,
      },
      {
        "vreme": "2021-04-15T09:20Z",
        "telesnaTemperatura": 36.8,
        "procentKisVKrvi": 97,
      }]
    };
  }
  //Pacient, ki je ^ze prele^zal Covid-19 in ima problemi z dihanjem
  else if(st === 3){
    pacient = {
      "ime": "Elizabeth",
      "priimek": "Rhodes",
      "datumRojstva": "28.11.1956",
      "problems": "problems with breathing.",
      "Covid-19-now" : "doesn't have Covid now",
      "Covid-19-before" : "had Covid recently",
      "vaccinated" : "not vaccinated",
      "meritve": [{
        "vreme": "2021-03-13T15:20Z",
        "telesnaTemperatura": 36.5,
        "procentKisVKrvi": 93,
      },
      {
        "vreme": "2021-03-25T19:17Z",
        "telesnaTemperatura": 36.2,
        "procentKisVKrvi": 91,
      },
      {
        "vreme": "2021-03-28T22:52Z",
        "telesnaTemperatura": 37.0,
        "procentKisVKrvi": 92,
      },
      {
        "vreme": "2021-04-03T08:53Z",
        "telesnaTemperatura": 36.3,
        "procentKisVKrvi": 95,
      },
      {
        "vreme": "2021-04-09T09:09Z",
        "telesnaTemperatura": 36.7,
        "procentKisVKrvi": 94,
      }]
    };
  }
   if(klikNaGumb==0){
  $.ajax({
    url: baseUrl + "azuriraj?kljuc=" + ehrID,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(pacient),
    success: $("#izberiPacient").append("<option value='" + 
    ehrID + "'>" + pacient.ime + " " + pacient.priimek + " (" +pacient["Covid-19-now"]+", "+pacient["Covid-19-before"]+", "+pacient.vaccinated+")</option>"),
    error: () => console.log("There was an error")
  });
  }
  return ehrID;
}


//vrne populacija
var getPopulation = function(drzava){
  var populacija = 0;
  for(var i = 0; i<DATA.length; i++){
    if(drzava == DATA[i]["country"]){
      populacija = DATA[i]["population"];
      return populacija;
    }
  }
  return -1;
};

var kalkulacija = function(zemja, podatoci){
 
  var drzava = $("#drzavi :selected").attr('name');
  var vkupno = 0;
  var seznam = [];

  var today =new Date();
      var aWeekBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);

      var year = today.getFullYear();
      var year1 = aWeekBefore.getFullYear();
      var month = today.getMonth();
      var month1 = aWeekBefore.getMonth();
      var day = today.getDay();
      var day1 = aWeekBefore.getDay();

      var date = year+'-'+(month)+'-'+day;
      console.log(date);
       
      $.getJSON("https://api.covid19api.com/total/country/"+drzava+"?from="+year1+"-"+month1+"-"+day1+
      "T00:00:00Z&to="+year+"-"+ month+"-"+day+"T00:00:00Z",
       function(podatoci) {
         seznam = podatoci;
         if(seznam[0] == undefined || seznam ==[] || !seznam){
          $("#nasvet").html("<div class='panel-heading' style='background-color: lightgoldenrodyellow;'>\
          <h5 style='text-align:center;'>There is not enough information on this country. Please try another one.\
          </h5></div>");
         }
         else{
           //kalkuliranje na procent
          vkupno = seznam[podatoci.length - 1]["Active"];
          var populacija = getPopulation(drzava);
          if(populacija != -1)  {var procent = (vkupno / populacija ) * 100;
            procent = procent.toFixed(2);}
          else var procent = "not available";

          //checkboxes
          if(document.querySelector('#now:checked')) {
            //sovet
            $("#nasvet").html("<div class='panel-heading' style='background-color: lightgoldenrodyellow;'>\
         <h5 style='text-align:center; font-weight: bold;'>Travel Advise</h5>\
          </div> <div class='panel-body'>Since you are infected with Covid-19, you can not travel. Please wait until \
          your Covid-19 test is negative.<div id='procent'></div></div>");
          }
          else if(document.querySelector('#before:checked')) {
            //sovet
            $("#nasvet").html("<div class='panel-heading' style='background-color: lightgoldenrodyellow;'>\
         <h5 style='text-align:center; font-weight: bold;'>Travel Advise</h5>\
          </div> <div class='panel-body'>Some countries may let you pass the border with the previous positive test\
          <div id='procent'></div></div>");
            //nasvet sprema stevilo aktivnih okzb
            if(populacija == -1){
              $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +".</p>");
            }
          else if(Math.round(procent) <= 1){
           $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +"%.</p>\
            <p>Although travelling overall is not recommended, "+drzava+" has low enough numbers. You <strong>would be able to</strong>\
            travel to "+drzava+". </p>");
          }
          else {
            $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +"%.</p>\
            <p><strong>Travelling to "+drzava+" is not recommended.</strong> The probability of infection is high.</p>");
          }
          }
          else if(document.querySelector('#vaccine:checked')){
            //sovet
            $("#nasvet").html("<div class='panel-heading' style='background-color: lightgoldenrodyellow;'>\
         <h5 style='text-align:center; font-weight: bold;'>Travel Advise</h5>\
          </div> <div class='panel-body'>Seen as you have been vaccinated you are free \
          to travel to "+drzava+".<div id='procent'></div></div>");
          //nasvet sprema stevilo aktivnih okzb
          if(populacija == -1){
            $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +".</p>");
          }
          
          else {
            $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +"%.</p>\
            <p>Although travelling overall is not recommended, you <strong>would be able to</strong>\
            travel to "+drzava+". </p>");
          }
          }
         else{
          //sovet
          $("#nasvet").html("<div class='panel-heading' style='background-color: lightgoldenrodyellow;'>\
          <h5 style='text-align:center; font-weight: bold;'>Travel Advise</h5>\
           </div> <div class='panel-body'>Since you have not been vaccinated, nor had the disease \
           before, there are some risks for you.<div id='procent'></div></div>");
           //nasvet sprema stevilo aktivnih okzb
           if(populacija == -1){
            $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +".</p>");
          }
          else if(Math.round(procent) <= 1){
           $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +"%.</p>\
           <p>Although travelling overall is not recommended, "+drzava+" has low enough numbers. You <strong>would be able to</strong>\
            travel to "+drzava+". </p>");
          }
          else {
            $("#procent").html("<p></p><p>The percentage of active cases per population is "+procent +"%.</p>\
            <p><strong>Travelling to "+drzava+" is not recommended.</strong> The probability of infection is high.</p>");
          }
         }
        }
       }).fail( () => $("#nasvet").html("<h5>There was an error while fetching the data. Please try again!</h5>"));
       
       //safety measures
       $("#safety").html("<div class='panel-heading' style='background-color: lightgoldenrodyellow;'>\
       <h5 style='text-align:center; font-weight: bold;'>Safety measures:</h5>\
       </div> <div class='panel-body'><h4>To prevent infection and to slow transmission of COVID-19, do the following:</h4>\
       <ul><li><strong>Wash your hands</strong> regularly with soap and water, or clean them with alcohol-based hand rub.</li>\
      <li>Maintain at least <strong>1 metre distance </strong>between you and people coughing or sneezing.</li>\
      <li>Cover your mouth and nose when coughing or sneezing.</li>\
       <li>Stay home if you feel unwell.</li>\
       <li><strong>Wear a mask </strong>when in a crowd.</li>\</ul></div>")
       //warning
      $("#warning").html("<div class='panel-heading' style='background-color: #ffb0b0;'>\
      <h5 style='text-align:center; font-weight: bold;'>Some countries may ask for a negative \
      Covid-19 PCR test or a quarantine for you to be able to cross their borders!</h5></div>");
}

//current in country
var currentlyInCountry = function(zemja, podatoci) {
  var drzava = $("#drzavi :selected").attr('name');
  var bool = false;
    for(var i = 0; i < podatoci["Countries"].length; i++) {
      if(podatoci["Countries"][i].Slug == zemja) {
        
        bool = true;
      $("#total").html("<h5>To this day, there have been  <strong>" + podatoci["Countries"][i]["TotalConfirmed"] + 
      "</strong> registered cases in " + drzava + ".</h5>");
      $("#active").html("<h5>The number of new confirmed cases is: <strong>"+ podatoci["Countries"][i]["NewConfirmed"] +
      "</strong> cases.</h5>");
      $("#dead").html("<h5>To this day <strong>"+podatoci["Countries"][i]["TotalDeaths"]+ 
      "</strong> people have died in "+ drzava + ".</h5>");
       }
    }
    if(!bool && zemja != '-') {
      $("#total").html("There is not enough information");
      $("#active").html("There is not enough information");
      $("#dead").html("There is not enough information");
       } 
};

// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var izberiPacient = function(pacientId) {
  document.getElementById("prv").className = "panel panel-info";
    document.getElementById("vtor").className = "panel panel-info";

  $.getJSON(baseUrl + "vrni/" + pacientId + "|" + "meritve", function(data) {

    $.getJSON(baseUrl + "vrni/" + pacientId, function(data) {
      $("#podatki").html(data.ime + " " + data.priimek +" ("+data.datumRojstva+").<p>This patient has "+data.problems+"</p>");
    }).fail(function() {$("#podatki").html("The patient is not in the base.");})

    let temp = [];
    let oxy = [];
    for(var i = 0; i < data.length; i++) {
      var datum = new Date(data[i].vreme);
      var date = datum.getDate() + '-' + months[datum.getMonth()];
      var temper = data[i].telesnaTemperatura;
      var O2 = data[i].procentKisVKrvi;
      temp[i] = {label : date, y : temper};
      oxy[i] = {label : date, y : O2};
    }
    var chart = new CanvasJS.Chart("first", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "Blood Oxygen Levels"
      },
      axisY: {
        title: "%"
      },
      data: [{     
        showInLegend: true,
        legendText: "Anything under 94% is critical.",   
        type: "line",
            indexLabelFontSize: 16,
        dataPoints: oxy
      }]
    });
    chart.render();

    var chart = new CanvasJS.Chart("second", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
        text: "Temperature"
      },
      axisY: {
        title: "°C"
      },
      data: [{        
        type: "column",  
        showInLegend: true, 
        legendText: "Anyting over 37.8°C is considered high",
        dataPoints: temp
      }]
    });
    chart.render();
});
}

$(document).ready(function () {
//generiraj vse dr^zave
$.getJSON("https://api.covid19api.com/countries", function(data) {
    data.sort((a, b) => a.Country.localeCompare(b.Country));
    $("#drzavi").append("<option value='-' name='-'>Choose a country</option>");
    for(var i = 0; i < data.length; i++) {
      $("#drzavi").append("<option value='" + data[i].Slug + "' name='" + data[i].Country + "'>" + data[i].Country + "</option>");
    }
  });

  //Vnesvanje na EHRid
  $("#EHRInput").keyup(function() {
    var id = $("#EHRInput").val();
    if(id.length == 36) {
      $.getJSON(baseUrl + "vrni/" + id, function(data) {
        $("#podatki").html(data.ime + " " + data.priimek +" ("+data.datumRojstva+").<p>This patient has "+data.problems+"</p>");
        if(data) izberiPacient(id);
      }).fail(function() {$("#podatki").html("The patient is not in the base.");})
    }
    else{
      $("#podatki").html("The patient is not in the base.");
    }
  });
 //biranje EhrID
 $('#izberiPacient').on('click', function(){
  $("#podatki").html("");
  var id = $("#izberiPacient").val();
  izberiPacient(id);
  $("#EHRInput").val(id);
});

  //countries
  $.getJSON("https://api.covid19api.com/summary", function(podatoci) {
    zdaj = podatoci;
  }).fail( () => $("#justInCase").html("There was an error while fetching the data. Please try again!"))
  
  //proveruvanje dali e se uneseno i generiranje nasvet
  $("#generirajNasvet").on('click', function() { 
    var id = $("#EHRInput").val();
    var drzava = $("#drzavi").val();

    var preveri = id == undefined || !id || id == "";
    var preveri1 = drzava == undefined || !drzava || drzava == "" | drzava == "-";

    if(preveri) id = $("#izberiPacient").val();

    preveri = id == undefined || !id || id == "";

    if(document.getElementById("podatki").innerHTML == "The patient is not in the base."){
      preveri = true;
    }
    if(preveri) alert("Please choose a patient!");
    if(preveri1) alert("Please choose a country!");
    if(!preveri && !preveri1) kalkulacija(zemja, zdaj);
  });

  $("#drzavi").on("click",function() { 
    var zemja = $("#drzavi").val();
    if($("#drzavi").val() != "-") {
      currentlyInCountry(zemja, zdaj);
    }
  });
});
