// NDVI

var landsat_data = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2").filterDate('2001-01-01', '2001-12-31').filterBounds(band2);

function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}

landsat_data = landsat_data.map(applyScaleFactors);

function cloudMask (image) {
  var cloud_shadow_bit_mask = (1 << 3);
  var clouds_bit_mask = (1 << 5);
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(cloud_shadow_bit_mask).eq(0).and(
  qa.bitwiseAnd(clouds_bit_mask).eq(0)
);
  return image.updateMask(mask);
}

landsat_data = landsat_data.map(cloudMask);

var ndvi = landsat_data.map(function(image) {
  return image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
});

Map.addLayer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');

var alaska_ndvi = ui.Chart.image.series(
  {
    imageCollection: ndvi,
    region: band2,
    reducer: ee.Reducer.mean(),
    scale: 1000,
    xProperty: 'system:time_start'
  }).setOptions({
    title: 'Alaska NDVI'
  })

  print(alaska_ndvi);
