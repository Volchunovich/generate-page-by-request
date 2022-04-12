import Layout from "../../components/Layout";
import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import {container} from "../../utils/ioc";
import {DataStore} from "../../stores/DataStore";

interface Props {
    id: string;
    errors: string;
}

const Network: FC<Props> = ({id, errors}) => {
    
    return (
        <Layout>
            <h1>{id}</h1>
        </Layout>
    )
}

export default Network;

export const getStaticPaths: GetStaticPaths = async () => {
    const store = container.get(DataStore);
    await store.fetchData();
    // Get the paths we want to pre-render based on users
    const paths = store.networks.map((network) => ({
        params: { id: network },
    }))
    
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const id = params?.id;
        // By returning { props: item }, the StaticPropsDetail component
        // will receive `item` as a prop at build time
        return { props: { id } }
    } catch (err: any) {
        return { props: { errors: err.message } }
    }
}
