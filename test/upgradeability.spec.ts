import {expect} from 'chai';
import {makeSuite, TestEnv} from './helpers/make-suite';
import {ProtocolErrors, eContractid} from '../helpers/types';
import {deployGenericAToken, getAToken, deployContract, getContract} from '../helpers/contracts-helpers';
import {MockAToken} from '../types/MockAToken';
import { MockStableDebtToken } from '../types/MockStableDebtToken';
import { MockVariableDebtToken } from '../types/MockVariableDebtToken';

makeSuite('Upgradeability', (testEnv: TestEnv) => {
  const {INVALID_POOL_MANAGER_CALLER_MSG} = ProtocolErrors;
  let newATokenAddress: string;
  let newStableTokenAddress: string;
  let newVariableTokenAddress: string;


  before('deploying instances', async () => {
    const {dai, pool} = testEnv;
    const aTokenInstance = await deployContract<MockAToken>(eContractid.MockAToken, [
      pool.address,
      dai.address,
      'Aave Interest bearing DAI updated',
      'aDAI',
    ]);

    const stableDebtTokenInstance = await deployContract<MockStableDebtToken>(eContractid.MockStableDebtToken, [
      pool.address,
      dai.address,
      'Aave stable debt bearing DAI updated',
      'stableDebtDAI',
    ]);

    const variableDebtTokenInstance = await deployContract<MockVariableDebtToken>(eContractid.MockVariableDebtToken, [
      pool.address,
      dai.address,
      'Aave variable debt bearing DAI updated',
      'variableDebtDAI',
    ]);

    newATokenAddress = aTokenInstance.address;
    newVariableTokenAddress = variableDebtTokenInstance.address;
    newStableTokenAddress = stableDebtTokenInstance.address;

  });

  it('Tries to update the DAI Atoken implementation with a different address than the lendingPoolManager', async () => {
    const {dai, configurator, users} = testEnv;

    await expect(
      configurator.connect(users[1].signer).updateAToken(dai.address, newATokenAddress)
    ).to.be.revertedWith(INVALID_POOL_MANAGER_CALLER_MSG);
  });

  it('Upgrades the DAI Atoken implementation ', async () => {
    const {dai, configurator, aDai} = testEnv;

    const name = await (await getAToken(newATokenAddress)).name();

    await configurator.updateAToken(dai.address, newATokenAddress);

    const tokenName = await aDai.name();

    expect(tokenName).to.be.eq('Aave Interest bearing DAI updated', 'Invalid token name');
  });

  it('Tries to update the DAI Stable debt token implementation with a different address than the lendingPoolManager', async () => {
    const {dai, configurator, users} = testEnv;

    await expect(
      configurator.connect(users[1].signer).updateStableDebtToken(dai.address, newStableTokenAddress)
    ).to.be.revertedWith(INVALID_POOL_MANAGER_CALLER_MSG);
  });

  it('Upgrades the DAI stable debt token implementation ', async () => {
    const {dai, configurator, pool} = testEnv;

    const name = await (await getAToken(newATokenAddress)).name();

    await configurator.updateStableDebtToken(dai.address, newStableTokenAddress);

    const {stableDebtTokenAddress} = await pool.getReserveTokensAddresses(dai.address);

    const debtToken = await getContract<MockStableDebtToken>(eContractid.MockStableDebtToken, stableDebtTokenAddress);

    const tokenName = await debtToken.name();

    expect(tokenName).to.be.eq('Aave stable debt bearing DAI updated', 'Invalid token name');
  });

  it('Tries to update the DAI variable debt token implementation with a different address than the lendingPoolManager', async () => {
    const {dai, configurator, users} = testEnv;

    await expect(
      configurator.connect(users[1].signer).updateVariableDebtToken(dai.address, newVariableTokenAddress)
    ).to.be.revertedWith(INVALID_POOL_MANAGER_CALLER_MSG);
  });

  it('Upgrades the DAI variable debt token implementation ', async () => {
    const {dai, configurator, pool} = testEnv;

    const name = await (await getAToken(newATokenAddress)).name();

    await configurator.updateVariableDebtToken(dai.address, newVariableTokenAddress);

    const {variableDebtTokenAddress} = await pool.getReserveTokensAddresses(dai.address);

    const debtToken = await getContract<MockStableDebtToken>(eContractid.MockStableDebtToken, variableDebtTokenAddress);

    const tokenName = await debtToken.name();

    expect(tokenName).to.be.eq('Aave variable debt bearing DAI updated', 'Invalid token name');
  });

});