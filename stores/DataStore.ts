import {enableStaticRendering} from "mobx-react";
import {makeAutoObservable, runInAction} from "mobx";
import {provide} from "../utils/ioc";

const isServer = typeof window === undefined;

enableStaticRendering(isServer);

interface Data {
    networks: string[];
}

@provide.singleton()
export class DataStore {
    networks: string[] = [];
    
    constructor() {
        makeAutoObservable(this);
        
        this.fetchData();
    }
    
    async fetchData() {
        const data = await asyncFetchRequest();
        
        runInAction(() => {
            this.networks = data.networks;
        })
    }
}

function asyncFetchRequest(): Promise<Data> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({networks: ['cosmos', 'kava', 'etherium']})
        }, 1000)
    })
}
