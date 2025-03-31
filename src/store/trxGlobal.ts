import {defineStore} from "pinia";
import {networkService} from "../services";


export const useTrxGlobal = defineStore('trxGlobal', {
    state: () => ({
        trxGlobal: {
            "trx_price": "0",
            "energy_per_trx": "0",
            "total_staked_trx": 0
        },
    }),
    actions: {
        initTrxGlobal() {
            networkService.getTronNetworkStats().then((response: any) => {
                this.setTrxGlobal(response)
            })
        },
        setTrxGlobal(trxGlobal: any) {
            this.trxGlobal = trxGlobal
        },
        getTrxGlobal() {

        }
    }
})
