<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { ref, inject } from "vue";

const center = ref([57, 12]);
const projection = ref("EPSG:900913");
const zoom = ref(6);
const rotation = ref(0);

const currentCenter = ref(center.value);
const currentZoom = ref(zoom.value);
const currentRotation = ref(rotation.value);
const currentResolution = ref(0);

const url = ref("http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png");
const layerName = ref("seamark");
const matrixSet = ref("GoogleMapsCompatible");
const format = ref("image/png");
const styleName = ref("default");
const attribution = ref(
  'Tiles © <a href="https://map.openseamap.org/">OpenSeaMap</a>',
);

const otmurl = ref("https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png")
const otmattribution =  ref(
  'Tiles © <a href="https://wiki.openstreetmap.org/wiki/OpenTopoMap#Usage">OpenTopoMap</a>',
);

const martinUrl = "http://0.0.0.0:8090/ais2018/{z}/{x}/{y}"

const olformat = inject("ol-format");
const mvtFormat = new olformat.MVT();


 
function resolutionChanged(event) {
  currentResolution.value = event.target.getResolution();
  currentZoom.value = event.target.getZoom();
}
function centerChanged(event) {
  currentCenter.value = event.target.getCenter();
}
function rotationChanged(event) {
  currentRotation.value = event.target.getRotation();
}


</script>

<template>

  <ol-map 
  class="ol-map"
  :loadTilesWhileAnimating="true"
  :loadTilesWhileInteracting="true"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
      @change:center="centerChanged"
      @change:resolution="resolutionChanged"
      @change:rotation="rotationChanged"
    />

    <ol-layerswitcherimage-control />

    <ol-tile-layer  ref="osmLayer" title="OSM" >
      <ol-source-osm />
    </ol-tile-layer>

    <ol-tile-layer  ref="otmLayer" title="OTM" >
      <ol-source-xyz
        :attributions="otmattribution"
        :url="otmurl"
        :format="format"
      ></ol-source-xyz>
    </ol-tile-layer>

    <ol-tile-layer 
    :opacity="0.7"
    ref="seaMapLayer"
    title="seamap"
    >
      <ol-source-xyz
        :attributions="attribution"
        :url="url"
        :matrixSet="matrixSet"
        :format="format"
        :layer="layerName"
        :styles="styleName"
      ></ol-source-xyz>
    </ol-tile-layer>

    <ol-vector-tile-layer>
      <ol-source-vector-tile :url="martinUrl" :format="mvtFormat">
      </ol-source-vector-tile>
    </ol-vector-tile-layer>



    <ol-rotate-control></ol-rotate-control>
    <ol-interaction-link />
  </ol-map>

  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  <!-- <RouterView /> -->

</template>

<style scoped>


.ol-map {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
/* .ol-map-loading:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin-top: -40px;
  margin-left: -40px;
  border-radius: 50%;
  border: 5px solid rgba(180, 180, 180, 0.6);
  border-top-color: var(--vp-c-brand-1);
  animation: spinner 0.6s linear infinite;
}  */

 @keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

</style>
