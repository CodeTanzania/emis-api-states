import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const itemActions = generateExposedActions('item', actions, dispatch);

export const {
  getItems,
  getItem,
  selectItem,
  closeItemForm,
  openItemForm,
  postItem,
  putItem,
  setItemSchema,
} = itemActions;