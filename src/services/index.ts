// src/services/api.js
import { ofetch } from 'ofetch';

import { api, createAuthenticatedApi } from './api';
import { createUserService } from './userService';
import { createWalletService } from './walletService';
import { createEnergyService } from './energyService';
import { createStakingService } from './stakingService';
import { networkService } from './networkService';

export {
    api,
    createAuthenticatedApi,
    createUserService,
    createWalletService,
    createEnergyService,
    createStakingService,
    networkService,
};
