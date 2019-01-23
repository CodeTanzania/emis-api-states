import React from 'react';
import { cleanup, render } from 'react-testing-library';
import {
  closeActivityForm,
  closeAlertForm,
  closePlanForm,
  Connect,
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
  StoreProvider,
} from '../src/index';

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
    expect(typeof Connect).toBe('function');
  });

  it('should expose StoreProvider as a function', () => {
    expect(typeof StoreProvider).toBe('function');
  });
});

describe('Component Connect', () => {
  afterEach(cleanup);

  // eslint-disable-next-line
  const TestComponent = ({ alerts, total, page }) => (
    <div>
      <p data-testid="alerts-count">{typeof alerts}</p>
      <p data-testid="alerts-total">{total}</p>
      <p data-testid="alerts-page">{page}</p>
    </div>
  );

  it('should render component with states using object accessor', () => {
    const ConnectedComponent = Connect(TestComponent, {
      alerts: 'alerts.list',
      total: 'alerts.total',
      page: 'alerts.page',
    });

    const { getByTestId } = render(
      <StoreProvider>
        <ConnectedComponent />
      </StoreProvider>
    );

    expect(getByTestId('alerts-count').textContent).toBe('object');
    expect(getByTestId('alerts-total').textContent).toBe('0');
    expect(getByTestId('alerts-page').textContent).toBe('1');
  });

  it('should render component with states using functional accessor', () => {
    const ConnectedComponent = Connect(TestComponent, state => ({
      alerts: state.alerts.list,
      total: state.alerts.total,
      page: state.alerts.page,
    }));

    const { getByTestId } = render(
      <StoreProvider>
        <ConnectedComponent />
      </StoreProvider>
    );

    expect(getByTestId('alerts-count').textContent).toBe('object');
    expect(getByTestId('alerts-total').textContent).toBe('0');
    expect(getByTestId('alerts-page').textContent).toBe('1');
  });

  it('should not subscribe to store when accessor is undefined', () => {
    const ConnectedComponent = Connect(TestComponent);

    const { getByTestId } = render(
      <StoreProvider>
        <ConnectedComponent />
      </StoreProvider>
    );

    expect(getByTestId('alerts-count').textContent).toBe('undefined');
    expect(getByTestId('alerts-total').textContent).toBe('');
    expect(getByTestId('alerts-page').textContent).toBe('');
  });
});
