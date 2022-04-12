import React, {FC, Fragment} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {observer} from "mobx-react";
import {useStore} from "../utils/ioc";
import {DataStore} from "../stores/DataStore";

type Props = {
    title?: string
}

const Layout: FC<Props> = observer(({ children, title = 'This is the default title' }) => {
    const store = useStore(DataStore);
    
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
                <nav>
                    <Link href="/">
                        Home
                    </Link>{' | '}
                    <Link href="/about">
                        About
                    </Link>{' | '}
                    <Link href="/users">
                        Users List
                    </Link>{' | '}
                    <Link href="/api/users">Users API</Link>
                    {' | '}
                    {store.networks.map((network, index) => (
                        <Fragment key={network + index}>
                            <Link href={`/networks/${network}`}>
                                <a>{network}</a>
                            </Link>{' | '}
                        </Fragment>
                    ))}
                </nav>
            </header>
            {children}
            <footer>
                <hr />
                <span>I'm here to stay (Footer)</span>
            </footer>
        </div>
    )
})

export default Layout
