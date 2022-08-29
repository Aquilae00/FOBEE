import * as ReactDOMServer from 'react-dom/server';
export default function test(): JSX.Element {
    const test = ReactDOMServer.renderToStaticMarkup(<div className='text-lg'>test</div>);
    console.log(test);
    return <div className='text-lg'>test</div>;
}
