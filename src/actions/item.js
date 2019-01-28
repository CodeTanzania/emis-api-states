import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const itemActions = generateExposedActions('item', actions, dispatch);

export const {
  clearItemsFilter,
  clearItemsSort,
  closeItemForm,
  filterItems,
  getItems,
  getItem,
  selectItem,
  openItemForm,
  paginateItems,
  postItem,
  putItem,
  refreshItems,
  searchItems,
  setItemSchema,
  sortItems,
} = itemActions;
