import {
  closeActivityForm,
  closeAlertForm,
  closePlanForm,
  connect,
  getActivities,
  getActivity,
  getAlert,
  getAlerts,
  getPlan,
  getPlans,
  openActivityForm,
  openAlertForm,
  openPlanForm,
  postActivity,
  postAlert,
  postPlan,
  putActivity,
  putAlert,
  putPlan,
  selectActivity,
  selectAlert,
  selectPlan,
  setActivitySchema,
  setAlertSchema,
  setPlanSchema,
} from '../index';

describe('Library Index', () => {
  it('should expose actions from resources', () => {
    expect(typeof selectPlan).toBe('function');
    expect(typeof getPlans).toBe('function');
    expect(typeof getPlan).toBe('function');
    expect(typeof postPlan).toBe('function');
    expect(typeof putPlan).toBe('function');
    expect(typeof setPlanSchema).toBe('function');
    expect(typeof openPlanForm).toBe('function');
    expect(typeof closePlanForm).toBe('function');

    expect(typeof selectActivity).toBe('function');
    expect(typeof getActivities).toBe('function');
    expect(typeof getActivity).toBe('function');
    expect(typeof postActivity).toBe('function');
    expect(typeof putActivity).toBe('function');
    expect(typeof setActivitySchema).toBe('function');
    expect(typeof openActivityForm).toBe('function');
    expect(typeof closeActivityForm).toBe('function');

    expect(typeof selectAlert).toBe('function');
    expect(typeof getAlerts).toBe('function');
    expect(typeof getAlert).toBe('function');
    expect(typeof postAlert).toBe('function');
    expect(typeof putAlert).toBe('function');
    expect(typeof setAlertSchema).toBe('function');
    expect(typeof openAlertForm).toBe('function');
    expect(typeof closeAlertForm).toBe('function');
  });

  it('should expose connect function', () => {
    expect(typeof connect).toBe('function');
  });
});
