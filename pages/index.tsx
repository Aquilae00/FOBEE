import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import esriConfig from "@arcgis/core/config";

esriConfig.apiKey = 'AAPK9cb0c8ad6cfb41878dafc445f3a1a2eeNNaN9xKtCmpNGbG9U4SKIswc6T8_DSU5UPB78KOVgWvYGHsCulZZEQVUGRJPrBwB';
const Home: NextPage = () => {
    const EsriMapWithNoSSR = dynamic(() => import("../components/esri-map"), {
        ssr: false,
    });
    return <EsriMapWithNoSSR />;
};

export default Home;
