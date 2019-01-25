import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const warehouseActions = generateExposedActions('warehouse', actions, dispatch);

export const {
  getWarehouses,
  getWarehouse,
  selectWarehouse,
  closeWarehouseForm,
  openWarehouseForm,
  postWarehouse,
  putWarehouse,
  setWarehouseSchema,
} = warehouseActions;
