import {defineStore} from "pinia";
import {createEnergyService} from "../services";


export const useEnergyGlobal = defineStore('energyGlobal', {
    state: () => ({
        energyGlobal: {
            "cost_per_hour": 0,
            "cost_per_day": 0,
            "cost_per_week": 0,
            "buyback_cost": 0,
            "tron_cost_per_hour": 0,
            "tron_cost_per_day": 0,
            "tron_cost_per_week": 0
        },
    }),
    actions: {
        initEnergyGlobal() {
            createEnergyService().getEnergyPricing().then((response: any) => {
                this.setEnergyGlobal(response[0])
            })
        },
        setEnergyGlobal(energyGlobal: any) {
            this.energyGlobal = energyGlobal
        },
    }
})
