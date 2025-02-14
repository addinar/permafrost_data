// NDVI

var landsat_data = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2")
    .filterDate('2002-01-01', '2002-12-31')
    .filterBounds(band2);

function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}

function cloudMask(image) {
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(1 << 3).eq(0)
            .and(qa.bitwiseAnd(1 << 5).eq(0));
  return image.updateMask(mask);
}


function addNDVI(image) {
  var ndvi = image.normalizedDifference(['SR_B4', 'SR_B3'])
                 .rename('NDVI');
  return image.addBands(ndvi)
              .copyProperties(image, ['system:time_start']);
}

var processed_collection = landsat_data
    .map(applyScaleFactors)
    .map(cloudMask)
    .map(addNDVI);

var alaska_ndvi = ui.Chart.image.series({
    imageCollection: processed_collection.select('NDVI'),
    region: band2,
    reducer: ee.Reducer.mean(),
    scale: 2000,
    xProperty: 'system:time_start'
  }).setOptions({
    title: 'Alaska NDVI - Without Water Mask',
    vAxis: {
      title: 'NDVI',
      viewWindow: {min: -0.2, max: 1}
    },
    hAxis: {title: 'Date'}
  });

print('NDVI:', alaska_ndvi);