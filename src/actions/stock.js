import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const stakeholderActions = generateExposedActions('stock', actions, dispatch);

export const {
  clearStocksFilter,
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
  searchStocks,
  setStockSchema,
  sortStocks,
} = stakeholderActions;
