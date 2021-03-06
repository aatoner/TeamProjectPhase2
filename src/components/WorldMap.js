const coffeeData = require('./coffee.json');

function createImportExportMap() {
    //Create an array of data objects from 2017, as this chart will only be displaying data for that year.     
    var array2017 = [];
    for (i = 0; i < coffeeData.length; i++) {
        if (coffeeData[i].Market_Year == 2017) {
          array2017.push(coffeeData[i]);
        }
    }; 
    
    /*Charting library doesn't support the European Union region, so each country 
      in the EU will be set to have a net import/export value equal to that of the 
      EU for visualization purposes.*/
    //Remove European Element object from the array since we will adding the countries individually.
    for(i = 0; i < array2017.length; i++){
      if(array2017[i].Country == 'European Union'){
        array2017.splice(i, i + 1);
        i = array2017.length;
      }
    };
    const EU_COUNTRY_LIST = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 
      'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 
      'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 
      'Sweden', 'United Kingdom'];
    const EU_NET_IMPORT = -29325;
    //Create empty dataset for the charting tool
    var importExportData = [];
    var importExportDataEntry = [];
    //Add country label and bean import/export value for each country in the 2017 array
    for (i = 0; i < array2017.length; i++) {
      importExportDataEntry.push(array2017[i].Country);
      var netImportExport = array2017[i].Bean_Export - array2017[i].Bean_Import;
      importExportDataEntry.push(netImportExport);
      importExportData.push(importExportDataEntry);
      importExportDataEntry = [];
    }
    //Add European Union countries and import value to the dataset
    for(i = 0; i < EU_COUNTRY_LIST.length; i++){
      importExportData.push([EU_COUNTRY_LIST[i], EU_NET_IMPORT]);
    }
    console.log(importExportData);
    google.charts.load('current', {
      'packages':['geochart'],
      'mapsApiKey': 'AIzaSyAEVMVGU3NbH2rlJS4oOtFBKOioQc1KvUU'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
  
    function drawRegionsMap() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Country');
      data.addColumn('number', 'Net Export (Negative Number for Net Importers');
      data.addRows(importExportData);
    
      var options = {
        colorAxis: {colors: ['rgb(153,0,0)', 'White', 'rgb(68, 108, 20)']},
        datalessRegionColor: 'Gray',
      };
  
      var chart = new google.visualization.GeoChart(document.getElementById('importExportMap'));
  
      chart.draw(data, options);
    }
  }
createImportExportMap();
  