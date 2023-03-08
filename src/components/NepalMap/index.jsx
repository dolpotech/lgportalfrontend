import React, { useEffect } from "react";
import L from "leaflet";
import provinceData from "../../assets/geoJson/districts.json";
import dang from "../../assets/geoJson/local/dang.json";
import arghakanchi from "../../assets/geoJson/local/arghakanchi.json";
import bardiya from "../../assets/geoJson/local/bardiya.json";
import gulmi from "../../assets/geoJson/local/gulmi.json";
import kapilbastu from "../../assets/geoJson/local/kapilbastu.json";
import palpa from "../../assets/geoJson/local/palpa.json";
import pyuthan from "../../assets/geoJson/local/pyuthan.json";
import rolpa from "../../assets/geoJson/local/rolpa.json";
import rupandehi from "../../assets/geoJson/local/rupandehi.json";
import rukum from "../../assets/geoJson/local/rukum.json";
import nawalparasi from "../../assets/geoJson/local/nawalparasi.json";
import banke from "../../assets/geoJson/local/banke.json";
import { useStateValue } from "../../utils/StateProvider";
import "leaflet/dist/leaflet.css";

function NepalMap(props) {
  const [{ size, isAuthenticated, user, role, lgIds }, dispatch] =
    useStateValue();

  var provinceMap, provinceGeoJson, stateGeoJson;
  /**
   **  Initialize map
   **/

  useEffect(() => {
    provinceMap = L.map("map", {
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
      zoomControl: true,
      dragging: true,
      minZoom: 8.4,
      maxZoom: 11,
    }).setView([28.1049, 82.714], 10);

    /**
     **  GeoJSON data
     **/
    provinceGeoJson = L.geoJson(provinceData, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(provinceMap);

    var bound = provinceGeoJson.getBounds();
    provinceMap.fitBounds(bound);

    /**
     *  Functions for map
     **/
    function style(feature) {
      return {
        weight: 2,
        opacity: 1,
        color: "#fff",
        dashArray: "1",
        fillOpacity: 0.7,
        dashArray: "6, 2",
        fillColor: getProvinceColor(feature.properties.districtid),
      };
    }

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 2,
        color: "black",
        dashArray: "",
        fillOpacity: 0.7,
        fillColor: "#fff",
        dashArray: "6, 2",
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function getProvinceColor(province) {
      switch (province) {
        case 510:
          return "#98c1d9";
          break;
        case 505:
          return "#e0fbfc";
          break;
        case 512:
          return "#B2FFFF";
          break;
        case 504:
          return " #AFEEEE";
          break;
        case 509:
          return "#B0E0E6";
          break;
        case 506:
          return "#ADD8E6";
          break;
        case 503:
          return "#6CA0DC";
          break;
        case 502:
          return "#4682B4";
          break;
        case 508:
          return "#4B9CD3";
          break;
        case 501:
          return "#4F97A3";
          break;
        case 507:
          return "#73C2FB";
          break;
        case 511:
          return "skyblue";
          break;
        default:
          return "skyblue";
          break;
      }
    }

    function resetHighlight(e) {
      provinceGeoJson.resetStyle(e.target);
      // info.update();
    }

    function zoomToProvince(e) {
      var json,
        district_number = e.target.feature.properties.districtid;

      provinceMap.fitBounds(e.target.getBounds());

      if (stateGeoJson != undefined) {
        stateGeoJson.clearLayers();
      }

      switch (district_number) {
        case 510:
          json = dang;
          break;
        case 505:
          json = arghakanchi;
          break;
        case 512:
          json = bardiya;
          break;
        case 504:
          json = gulmi;
          break;
        case 509:
          json = kapilbastu;
          break;
        case 506:
          json = palpa;
          break;
        case 503:
          json = pyuthan;
          break;
        case 502:
          json = rolpa;
          break;
        case 508:
          json = rupandehi;
          break;
        case 501:
          json = rukum;
          break;
        case 507:
          json = nawalparasi;
          break;
        case 511:
          json = banke;
          break;
        default:
          json = "";
          break;
      }
      // provinceMap.removeLayer(stateGeoJson);

      stateGeoJson = L.geoJson(json, {
        style: style,
        onEachFeature: onEachFeature,
        click: function (layer) {
          layer
            .bindPopup(e.target.feature.properties.NAME, {
              permanent: true,
              direction: "center",
            })
            .openPopup();
        },
      }).addTo(provinceMap);
      dispatch({
        type: "SET_LGID",
        item: district_number,
      });
      dispatch({
        type: "SET_LG_ID",
        item: "",
      });
      // provinceMap.removeLayer(stateGeoJson);
      if (e.target.feature.properties.F_ID) {
        stateGeoJson.eachLayer(function (layer) {
          var popup = L.popup();
          layer
            .bindTooltip(layer.feature.properties.NAME, {
              permanent: true,
              direction: "center",
              className: "label-map",
            })
            .openTooltip();
          layer.on("click", function (e) {
            dispatch({
              type: "SET_LG_ID",
              item: e.target.feature.properties.F_ID,
            });
            popup = L.popup()
              .setLatLng(e.latlng)
              .setContent(e.target.feature.properties.NAME)
              .openOn(provinceMap);
          });
          dispatch({
            type: "SET_LGID",
            item: e.target.feature.properties.districtid,
          });
        });
      } else {
        stateGeoJson.eachLayer(function (layer) {
          layer
            .bindTooltip(layer.feature.properties.NAME, {
              permanent: true,
              direction: "center",
              className: "label-map",
            })
            .openTooltip();
        });
      }
    }
    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToProvince,
      });
      layer
        .bindTooltip(layer.feature.properties.DISTRICTS, {
          permanent: true,
          direction: "center",
          className: "label-map",
        })
        .openTooltip();
    }
  }, []);

  return (
    <div>
      <div className="h-[26rem] shadow-md mb-8" id="map"></div>
    </div>
  );
}

export default NepalMap;
