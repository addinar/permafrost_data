// LST

// change the date and bands accordingly
var dataset = ee.ImageCollection("MODIS/061/MOD11A1").filterDate('2005-01-01', '2005-12-31');

var thermal_bands = dataset.select('LST_Day_1km');

var lst = thermal_bands.median().reproject({
  crs: 'EPSG:4326',
  scale: 1000 
});

lst = lst.multiply(0.02).add(-273.15).rename('LST');

lst = lst.clip(band7);

var landSurfaceTemperatureVis = {
  min: 15,
  max: 35,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};

Map.addLayer(lst, landSurfaceTemperatureVis, 'Land Surface Temperature')

var alaska_lst_collection = thermal_bands.map(function(img){
  return img.multiply(0.02).add(-273.15).reproject({
      crs: 'EPSG:4326',
      scale: 1000
    }).copyProperties(img, ['system:time_start'])
})

var tsc = ui.Chart.image.series(
  {
    imageCollection: alaska_lst_collection,
    region: band7,
    reducer: ee.Reducer.mean(),
    scale: 1000,
    xProperty: 'system:time_start'
  }).setOptions({
    title: 'Alaska LST',
    vAxis: {title: 'LST_celsius'}
  })
  
  print(tsc)