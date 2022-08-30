import SceneLayer from '@arcgis/core/layers/SceneLayer';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import React, {useEffect, useRef} from 'react';
import styles from '../styles/EsriMap.module.css';
import Search from '@arcgis/core/widgets/Search';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import locator from '@arcgis/core/rest/locator';
import Polygon from '@arcgis/core/geometry/Polygon';
import CustomContent from '@arcgis/core/popup/content/CustomContent';
import ReactDOMServer from 'react-dom/server';
import Popup from './popup';
import Extent from '@arcgis/core/geometry/Extent';
import Graphic from '@arcgis/core/Graphic';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import ClipLoader from 'react-spinners/ClipLoader';
import BeatLoader from 'react-spinners/BeatLoader';
const overpass = require('query-overpass');
const geojsonArea = require('@mapbox/geojson-area');

function EsriMap() {
    const mapDiv = useRef(null);
    const queryDiv = useRef(null);
    useEffect(() => {
        if (mapDiv.current) {
            /**
             * Initialize application
             */
            const map = new Map({
                basemap: 'dark-gray-vector',
                ground: 'world-elevation',
            });

            const view = new SceneView({
                map,
                container: mapDiv.current,
                viewingMode: 'global',
                camera: {
                    position: {x: -63.77153412, y: 20.75790715, z: 25512548.0},
                    heading: 0.0,
                    tilt: 0.1,
                },
                zoom: 15,
            });
            view.ui.add([queryDiv.current], 'bottom-left');
            const graphicsLayer = new GraphicsLayer();
            let sceneLayerView: __esri.SceneLayerView | null = null;

            const sketchLayer = new GraphicsLayer();

            let sketchGeometry = null;
            const sketchViewModel = new SketchViewModel({
                layer: sketchLayer,
                defaultUpdateOptions: {
                    tool: 'reshape',
                    toggleToolOnClick: false,
                },
                view: view,
                defaultCreateOptions: {hasZ: false},
            });

            sketchViewModel.on('create', (event) => {
                if (event.state === 'complete') {
                    sketchGeometry = event.graphic.geometry;
                    selectFeatures(event.graphic.geometry);
                }
            });

            const search = new Search({
                //Add Search widget
                view: view,
            });
            view.ui.add(search, 'top-right');
            let sceneLayer = new SceneLayer({
                url: 'https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer',

                outFields: ['*'],
            });

            sceneLayer.when(() => {
                view.whenLayerView(sceneLayer).then((layerView) => (sceneLayerView = layerView));
            });
            sceneLayer.capabilities.query.supportsQueryGeometry = true;
            sceneLayer.capabilities.query.supportsGeometryProperties = true;
            let highlightSelect;
            view.popup.autoOpenEnabled = false;
            view.on('click', (event) => {
                const lat = Math.round(event.mapPoint?.latitude * 1000) / 1000;
                const lon = Math.round(event.mapPoint?.longitude * 1000) / 1000;

                view.hitTest(event).then((response) => {
                    const firstLayer = response.results[0];
                    console.log(firstLayer);

                    if (firstLayer?.type === 'graphic') {
                        if (highlightSelect) {
                            highlightSelect.remove();
                        }
                        const attributes = firstLayer?.graphic?.attributes;
                        highlightSelect = sceneLayerView?.highlight(attributes['ObjectID']);
                        // const point = view.toMap(event);
                        // const queryExtent = sceneLayerView
                        //     ?.queryFeatures({
                        //         objectIds: [attributes['ObjectID']],
                        //         returnGeometry: true,
                        //         outFields: ['*'],
                        //     })
                        //     .then((extent) => {
                        //         console.log(extent.queryGeometry);
                        //     });

                        const spinner = ReactDOMServer.renderToStaticMarkup(
                            <div className='flex w-full justify-center items-center opacity-80'>
                                <BeatLoader color='#44f905' />
                            </div>
                        );
                        view.popup.open({
                            location: event.mapPoint,
                            content: spinner,
                        });
                        const osmid = attributes['OSMID'];

                        const response = overpass(
                            `[out:json][timeout:25];
                    way(${osmid});
                    out geom;`,
                            (a, b) => {
                                console.log('a');
                                console.log(a);
                                console.log('b');
                                console.log(b);
                                console.log(b.features[0].geometry.coordinates[0]);

                                const area = geojsonArea.geometry(b.features[0].geometry);
                                view.popup.close();
                                const popup = ReactDOMServer.renderToString(
                                    <Popup
                                        data={{
                                            osmid: attributes['OSMID'],
                                            height: attributes['height'],
                                            area,
                                        }}
                                    />
                                );
                                view.popup.open({
                                    location: event.mapPoint,
                                    title: 'reeee',
                                    content: popup,
                                });
                            }
                        );
                    }
                });
            });

            view.popup.watch('visible', (bool) => bool || highlightSelect?.remove());

            const selectFeatures = (geometry: __esri.Geometry) => {
                if (!sceneLayerView) return;
                const query = {
                    geometry: geometry,
                    outFields: ['*'],
                };
                sceneLayerView?.queryFeatures(query).then((results) => {
                    console.log(results);
                });
            };

            map.addMany([graphicsLayer, sceneLayer]);
        }
    }, []);

    return (
        <>
            <div className={styles.mapDiv} ref={mapDiv} style={{height: '100vh'}}></div>
            <div ref={queryDiv}>
                <b>Query by geometry</b>
                <br />
                <button
                    class='esri-widget--button esri-icon-map-pin geometry-button'
                    id='point-geometry-button'
                    value='point'
                    title='Query by point'
                ></button>
            </div>
        </>
    );
}

export default EsriMap;
