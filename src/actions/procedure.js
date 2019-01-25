import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const procedureActions = generateExposedActions('procedure', actions, dispatch);

export const {
  getProcedures,
  getProcedure,
  selectProcedure,
  closeProcedureForm,
  openProcedureForm,
  postProcedure,
  putProcedure,
  setProcedureSchema,
} = procedureActions;
