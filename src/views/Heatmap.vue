<template>
  <v-content>
    <v-container fluid>
      <h1>Mapa</h1>
      <div id="map"></div>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable */
import { Deck } from '@deck.gl/core';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

export default {
  data() {
    return {
      reports: {}
    };
  },
  name: 'Heatmap',
  mounted() {
    console.log('Heatmap component mounted');
    const mapElement = document.getElementById('map');
    this.getReports();
    this.runMap();
  },
  methods: {
    runMap() {
      this.loadScript().then(() => {
        this.getReports().then(res => {
          const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -22.423945, lng: -45.45235 },
            zoom: 15,
            styles: stylesArray
          });
          const overlay = new DeckOverlay({
            layers: [
              new ScatterplotLayer({
                id: 'scatter',
                data: res,
                opacity: 0.8,
                filled: true,
                radiusMinPixels: 10,
                radiusMaxPixels: 15,
                getPosition: d => [
                  parseFloat(d.location.longitude),
                  parseFloat(d.location.latitude)
                ],
                getFillColor(d) {
                  switch (d.reportType) {
                    case 'Infração de Trânsito':
                      return [255, 0, 0, 100];
                      break;
                    case 'Iluminação Pública':
                      return [0, 204, 102, 100];
                      break;
                    case 'Outros':
                      return [102, 102, 255, 100];
                      break;
                    case 'Manutenção de Ruas':
                      return [255, 0, 127, 100];
                      break;
                  }
                },

                pickable: true,
                onHover: ({ object, x, y }) => {
                  const el = document.getElementById('tooltip');
                  if (object) {
                    const { description, reportType } = object;
                    el.innerHTML = `<p style="color:black">Tipo: ${reportType}</p style="color:black">`;
                    el.style.display = 'block';
                    el.style.opacity = 0.9;
                    el.style.left = x + 'px';
                    el.style.top = y + 'px';
                  } else {
                    el.style.display = 'none';
                  }
                }
              })
              /*new HeatmapLayer({
                id: 'heat',
                data: res,
                getPosition: d => [
                  parseFloat(d.location.longitude),
                  parseFloat(d.location.latitude)
                ],
                getWeight: 0.1,
                radiusPixels: 20
              })*/
            ]
          });

          overlay.setMap(map);
        });
      });
    },
    isMyScriptLoaded(url) {
      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length; i--; ) {
        if (scripts[i].src == url) return true;
      }
      return false;
    },
    loadScript() {
      var url =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDA7GXBfQApDSidh1UoMiMO1N4j2f6TUDk';
      var verify = this.isMyScriptLoaded(url);
      if (!verify) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        const head = document.querySelector('head');
        head.appendChild(script);
        return new Promise(resolve => {
          script.onload = resolve;
        });
      } else {
        return new Promise(resolve => {
          resolve('loaded');
        });
      }
    },
    getReports() {
      return new Promise((resolve, reject) => {
        var page_url = 'http://18.224.34.157:3000/reports';
        fetch(page_url)
          .then(res => res.json())
          .then(res => {
            this.reports = res;
            resolve(res);
          });
      });
    }
  }
};

var stylesArray = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  }
];
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
#tooltip {
  position: absolute;
  background: white;
  margin: 10px;
  padding: 10px;
}
</style>
