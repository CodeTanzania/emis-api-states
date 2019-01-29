import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const stakeholderActions = generateExposedActions('stock', actions, dispatch);

export const {
  clearStockFilters,
  clearStocksSort,
  closeStockForm,
  filterStocks,
  getStocks,
  getStock,
  selectStock,
  openStockForm,
  paginateStocks,
  postStock,
  putStock,
  refreshStocks,
  searchStocks,
  setStockSchema,
  sortStocks,
} = stakeholderActions;
