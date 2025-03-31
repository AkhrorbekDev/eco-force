import {defineStore} from "pinia";
import {createUserService} from "../services";


export const useUserGlobal = defineStore('userGlobal', {
    state: () => ({
        user: {
            tron_address: "",
            balance_trx: 0,
            balance_energy: 0,
            referral_code: '0',
            registration_date: '',
            energy:
                0,
            energy_24:
                0,
            staking_apr:
                0,
            total_staked_trx:
                0,
            trx_balance:
                0
        },
        loggedIn: false
    }),
    actions: {
        initUserGlobal() {
            createUserService().getUserDetails().then((response: any) => {
                this.setUser(response)
            })
        },
        setLoggedIn(loggedIn: boolean) {
            this.loggedIn = loggedIn
        },
        setUser(user: any) {
            this.user = user
        },
        getUser() {
            return this.user
        }
    }
})
