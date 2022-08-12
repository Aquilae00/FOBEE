import SceneLayer from '@arcgis/core/layers/SceneLayer';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import React, {useEffect, useRef} from 'react';
import styles from '../styles/EsriMap.module.css';
import Search from '@arcgis/core/widgets/Search';
function EsriMap() {
    const mapDiv = useRef(null);

    useEffect(() => {
        const deg = {long: 106.8299624943958, lat: -6.144743867916543};
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
            const search = new Search({
                //Add Search widget
                view: view,
            });
            view.ui.add(search, 'top-right');
            let layer = new SceneLayer({
                url: 'https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer',
            });

            map.addMany([layer]);
        }
    }, []);

    return <div className={styles.mapDiv} ref={mapDiv} style={{height: '100vh'}}></div>;
}

export default EsriMap;
