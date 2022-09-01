import SceneLayer from "@arcgis/core/layers/SceneLayer";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/EsriMap.module.css";
import Search from "@arcgis/core/widgets/Search";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import * as locator from "@arcgis/core/rest/locator";
import Polygon from "@arcgis/core/geometry/Polygon";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import ReactDOMServer from "react-dom/server";
import Popup from "./popup";
import Extent from "@arcgis/core/geometry/Extent";
import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import * as ReactDOM from "react-dom/client";
const overpass = require("query-overpass");
const geojsonArea = require("@mapbox/geojson-area");

function EsriMap() {
    const mapDiv = useRef(null);
    const queryDiv = useRef(null);
    const [area, setArea] = useState<number | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [isFetching, setIsFetching] = useState<boolean | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        if (mapDiv.current) {
            /**
             * Initialize application
             */
            const map = new Map({
                basemap: "dark-gray-vector",
                ground: "world-elevation",
            });

            const view = new SceneView({
                map,
                container: mapDiv.current,
                viewingMode: "global",
                camera: {
                    position: { x: -63.77153412, y: 20.75790715, z: 25512548.0 },
                    heading: 0.0,
                    tilt: 0.1,
                },
                zoom: 15,
            });
            view.ui.add([queryDiv.current], "bottom-left");
            const graphicsLayer = new GraphicsLayer();
            let sceneLayerView: __esri.SceneLayerView | null = null;

            const sketchLayer = new GraphicsLayer();

            let sketchGeometry = null;
            const sketchViewModel = new SketchViewModel({
                layer: sketchLayer,
                defaultUpdateOptions: {
                    tool: "reshape",
                    toggleToolOnClick: false,
                },
                view: view,
                defaultCreateOptions: { hasZ: false },
            });

            const search = new Search({
                //Add Search widget
                view: view,
            });
            view.ui.add(search, "top-right");
            let sceneLayer = new SceneLayer({
                url: "https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer",

                outFields: ["*"],
            });

            sceneLayer.when(() => {
                view.whenLayerView(sceneLayer).then((layerView) => (sceneLayerView = layerView));
            });
            sceneLayer.capabilities.query.supportsQueryGeometry = true;
            sceneLayer.capabilities.query.supportsGeometryProperties = true;
            let highlightSelect: any;
            view.popup.autoOpenEnabled = false;
            view.popup.spinnerEnabled = true;
            view.on("click", (event) => {
                view.hitTest(event).then((response) => {
                    const firstLayer = response.results[0];
                    console.log(firstLayer);

                    if (firstLayer?.type === "graphic") {
                        if (highlightSelect) {
                            highlightSelect.remove();
                        }
                        setIsFetching(true);
                        setIsOpen(true);
                        const attributes = firstLayer?.graphic?.attributes;
                        highlightSelect = sceneLayerView?.highlight(attributes["ObjectID"]);

                        const osmid = attributes["OSMID"];
                        setHeight(attributes["height"]);
                        try {
                            const response = overpass(
                                `[out:json][timeout:25];
                        way(${osmid});
                        out geom;`,
                                (a: any, b: any) => {
                                    try {
                                        const area = geojsonArea.geometry(b.features[0].geometry);
                                        setArea(area);

                                        const serviceUrl =
                                            "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";
                                        locator
                                            .locationToAddress(serviceUrl, {
                                                location: event.mapPoint,
                                            })
                                            .then((response) => {
                                                const address = response.address;
                                                setAddress(address);
                                                setIsFetching(false);
                                            });
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }
                            );
                        } catch (err) {
                            console.log(err);
                            setIsFetching(false);
                        }

                        // view.popup.promises = [getContent];
                        view.popup.location = event.mapPoint;
                        // view.popup.watch("visible", (bool) => bool || highlightSelect?.remove());
                    }
                });
            });
            map.addMany([graphicsLayer, sceneLayer]);
        }
    }, []);

    return (
        <>
            <div className={styles.mapDiv} ref={mapDiv} style={{ height: "100vh" }}></div>

            <div
                ref={queryDiv}
                className="bg-black bg-opacity-60 p-md rounded-md max-w-[500px] max-h-[100vh] overflow-y-auto"
            >
                {isOpen && isFetching !== null && (
                    <>
                        {isFetching ? (
                            <ClipLoader size={200} color="#5a77d3" />
                        ) : (
                            <Popup
                                data={{
                                    osmid: 1,
                                    height: height ?? 0,
                                    area: area ?? 0,
                                    location: address ?? "",
                                }}
                                onClose={() => setIsOpen(false)}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default EsriMap;
