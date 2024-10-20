var gaul = ee.FeatureCollection("FAO/GAUL/2015/level2");
var alaska_roi = gaul.filter(ee.Filter.eq('ADM1_NAME','Alaska'));
Map.addLayer(alaska_roi);

var minLat = 51.214183;
var maxLat = 71.336926;
var increment = (maxLat - minLat)/10;

var minLong = -168;
var maxLong = -141;

var bands = ee.List([]);

for (var i=0; i < 10; i++) {
  var startLat = minLat + i*increment;
  var endLat = startLat + increment;
  
  print(startLat);
  print(endLat);
  
  var band = ee.Feature(ee.Geometry.Polygon([[
    [minLong, maxLat],
    [minLong, minLat],
    [maxLong, minLat],
    [maxLong, maxLat]
    ]]));
  
  // band = band.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
  
  bands = bands.add(band)
}

var firstBand = ee.Feature(bands.get(0)).geometry();

if (firstBand.type() == 'GeometryCollection') {
  firstBand = firstBand.flatten();
}

var band1 = ee.Geometry.Polygon([[[minLong, 53.2264573 ], [minLong, 51.214183], [maxLong, 51.214183], [maxLong, 53.2264573]]]);
band1 = band1.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band2 = ee.Geometry.Polygon([[[minLong, 55.2387316], [minLong, 53.2264573], [maxLong, 53.2264573], [maxLong, 55.2387316]]]);
band2 = band2.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band3 = ee.Geometry.Polygon([[[minLong, 57.3510059], [minLong, 55.2387316], [maxLong, 55.2387316], [maxLong, 57.2510059]]]);
band3 = band3.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band4 = ee.Geometry.Polygon([[[minLong, 59.2632802], [minLong, 57.3510059], [maxLong, 57.3510059], [maxLong, 59.2632802]]]);
band4 = band4.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band5 = ee.Geometry.Polygon([[[minLong, 61.2755545], [minLong, 59.2632802], [maxLong, 59.2632802], [maxLong, 61.2755545]]]);
band5 = band5.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band6 = ee.Geometry.Polygon([[[minLong, 63.2878288], [minLong, 61.2755545], [maxLong, 61.2755545], [maxLong, 63.2878288]]]);
band6 = band6.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band7 = ee.Geometry.Polygon([[[minLong, 65.3001031], [minLong, 63.2878288], [maxLong, 63.2878288], [maxLong, 65.3001031]]]);
band7 = band7.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band8 = ee.Geometry.Polygon([[[minLong, 67.3123774], [minLong, 65.3001031], [maxLong, 65.3001031], [maxLong, 67.3123774]]]);
band8 = band8.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band9 = ee.Geometry.Polygon([[[minLong, 69.3246517], [minLong, 67.3123774], [maxLong, 67.3123774], [maxLong, 69.3246517]]]);
band9 = band9.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));
var band10 = ee.Geometry.Polygon([[[minLong, 71.336926], [minLong, 69.3246517], [maxLong, 69.3246517], [maxLong, 71.336926]]]);
band10 = band10.intersection(alaska_roi.geometry(), ee.ErrorMargin(1));

// print(firstBand);

/*
Map.addLayer(band1, {color: '#FF00FF'}, 'First Band');
Map.addLayer(band2, {color: '#32CD32'}, 'Second Band');
Map.addLayer(band3, {color: '#40E0D0'}, 'Third Band');
Map.addLayer(band4, {color: '#FF69B4'}, 'Fourth Band');
Map.addLayer(band5, {color: '#7DF9FF'}, 'Fifth Band');
Map.addLayer(band6, {color: '#FFA500'}, 'Sixth Band');
Map.addLayer(band7, {color: '#00FF7F'}, 'Seventh Band');
Map.addLayer(band8, {color: '#C71585'}, 'Eigth Band');
Map.addLayer(band9, {color: '#1E90FF'}, 'Ninth Band');
Map.addLayer(band10, {color: '#DAA520'}, 'Tenth Band');
*/