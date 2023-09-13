// eslint-disable-next-line no-undef
mapboxgl.accessToken = 'pk.eyJ1IjoibGlzc2FnaHUiLCJhIjoiY2t1b2g3Z3ltMGVtMDJ3bWR2M2k4M2l2OCJ9.PviHQpficoBcUBvFo5Y9HA';

// eslint-disable-next-line no-undef
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [2.3364, 48.86091],
  zoom: 15.75,
});

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'One',
      geometry: {
        type: 'Point',
        coordinates: [2.3364, 48.86091],
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France',
      },
    },
    {
      type: 'Two',
      geometry: {
        type: 'Point',
        coordinates: [2.3333, 48.8602],
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France',
      },
    },
    {
      type: 'Three',
      geometry: {
        type: 'Point',
        coordinates: [2.3397, 48.8607],
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France',
      },
    },
    {
      type: 'Four',
      geometry: {
        type: 'Point',
        coordinates: [2.3330, 48.8619],
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France',
      },
    },
    {
      type: 'Five',
      geometry: {
        type: 'Point',
        coordinates: [2.3365, 48.8625],
      },
      properties: {
        title: 'Mapbox',
        description: 'Louvre, France',
      },
    },
  ],
};
// add markers to map
// eslint-disable-next-line no-restricted-syntax
for (const { geometry } of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  // new mapboxgl.Marker(el).setLngLat(geometry.coordinates).addTo(map);

  // eslint-disable-next-line no-undef
  new mapboxgl.Marker({
    color: '#757575',
  })
    .setLngLat(geometry.coordinates)
    .addTo(map);
}
// eslint-disable-next-line no-undef
new mapboxgl.Marker({
  color: '#171717',
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);
// eslint-disable-next-line no-undef
map.addControl(new mapboxgl.NavigationControl());
