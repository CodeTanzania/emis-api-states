import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const warehouseActions = generateExposedActions('warehouse', actions, dispatch);

export const {
  clearWarehousesFilter,
  clearWarehousesSort,
  closeWarehouseForm,
  filterWarehouses,
  getWarehouses,
  getWarehouse,
  selectWarehouse,
  openWarehouseForm,
  paginateWarehouses,
  postWarehouse,
  putWarehouse,
  searchWarehouses,
  setWarehouseSchema,
  sortWarehouses,
} = warehouseActions;
