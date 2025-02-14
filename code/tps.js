// TPS is Total Precipitation Sum

var era5_data = ee.ImageCollection("ECMWF/ERA5_LAND/DAILY_AGGR")
    .filterDate('2001-01-01', '2001-12-31')
    .select('total_precipitation_sum')
    .map(function(image) {
      return image.multiply(1000).copyProperties(image, ['system:time_start']);
    });
    
var total_precipitation_sum = ui.Chart.image.series({
  imageCollection: era5_data,
  region: band2,
  reducer: ee.Reducer.mean(),
  scale: 5000,
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Precipitation Band 1',
  vAxis: {
    title: 'Precipitation (mm/day)',
  },
  hAxis: {
    title: 'Date',
    format: 'MMM yyyy'
  }
});

print('Precipitation', total_precipitation_sum);