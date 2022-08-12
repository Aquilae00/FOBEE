import type {NextPage} from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const EsriMapWithNoSSR = dynamic(() => import('../components/esri-map'), {
        ssr: false,
    });
    return <EsriMapWithNoSSR />;
};

export default Home;
