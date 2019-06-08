import React from 'react';
import { cleanup, render } from '@testing-library/react';
import * as lib from '../src/index';

describe('Library Index', () => {
  it('should expose actions from resources', () => {
    expect(typeof lib.clearActivityFilters).toBe('function');
    expect(typeof lib.clearActivitiesSort).toBe('function');
    expect(typeof lib.closeActivityForm).toBe('function');
    expect(typeof lib.deleteActivity).toBe('function');
    expect(typeof lib.filterActivities).toBe('function');
    expect(typeof lib.getActivities).toBe('function');
    expect(typeof lib.getActivity).toBe('function');
    expect(typeof lib.selectActivity).toBe('function');
    expect(typeof lib.openActivityForm).toBe('function');
    expect(typeof lib.paginateActivities).toBe('function');
    expect(typeof lib.postActivity).toBe('function');
    expect(typeof lib.putActivity).toBe('function');
    expect(typeof lib.refreshActivities).toBe('function');
    expect(typeof lib.searchActivities).toBe('function');
    expect(typeof lib.setActivitySchema).toBe('function');
    expect(typeof lib.sortActivities).toBe('function');

    expect(typeof lib.clearAdjustmentFilters).toBe('function');
    expect(typeof lib.clearAdjustmentsSort).toBe('function');
    expect(typeof lib.closeAdjustmentForm).toBe('function');
    expect(typeof lib.deleteAdjustment).toBe('function');
    expect(typeof lib.filterAdjustments).toBe('function');
    expect(typeof lib.getAdjustments).toBe('function');
    expect(typeof lib.getAdjustment).toBe('function');
    expect(typeof lib.selectAdjustment).toBe('function');
    expect(typeof lib.openAdjustmentForm).toBe('function');
    expect(typeof lib.paginateAdjustments).toBe('function');
    expect(typeof lib.postAdjustment).toBe('function');
    expect(typeof lib.putAdjustment).toBe('function');
    expect(typeof lib.refreshAdjustments).toBe('function');
    expect(typeof lib.searchAdjustments).toBe('function');
    expect(typeof lib.setAdjustmentSchema).toBe('function');
    expect(typeof lib.sortAdjustments).toBe('function');

    expect(typeof lib.clearAgencyFilters).toBe('function');
    expect(typeof lib.clearAgenciesSort).toBe('function');
    expect(typeof lib.closeAgencyForm).toBe('function');
    expect(typeof lib.deleteAgency).toBe('function');
    expect(typeof lib.filterAgencies).toBe('function');
    expect(typeof lib.getAgencies).toBe('function');
    expect(typeof lib.getAgency).toBe('function');
    expect(typeof lib.selectAgency).toBe('function');
    expect(typeof lib.openAgencyForm).toBe('function');
    expect(typeof lib.paginateAgencies).toBe('function');
    expect(typeof lib.postAgency).toBe('function');
    expect(typeof lib.putAgency).toBe('function');
    expect(typeof lib.refreshAgencies).toBe('function');
    expect(typeof lib.searchAgencies).toBe('function');
    expect(typeof lib.setAgencySchema).toBe('function');
    expect(typeof lib.sortAgencies).toBe('function');

    expect(typeof lib.clearAlertFilters).toBe('function');
    expect(typeof lib.clearAlertsSort).toBe('function');
    expect(typeof lib.closeAlertForm).toBe('function');
    expect(typeof lib.deleteAlert).toBe('function');
    expect(typeof lib.filterAlerts).toBe('function');
    expect(typeof lib.getAlerts).toBe('function');
    expect(typeof lib.getAlert).toBe('function');
    expect(typeof lib.selectAlert).toBe('function');
    expect(typeof lib.openAlertForm).toBe('function');
    expect(typeof lib.paginateAlerts).toBe('function');
    expect(typeof lib.postAlert).toBe('function');
    expect(typeof lib.putAlert).toBe('function');
    expect(typeof lib.refreshAlerts).toBe('function');
    expect(typeof lib.searchAlerts).toBe('function');
    expect(typeof lib.setAlertSchema).toBe('function');
    expect(typeof lib.sortAlerts).toBe('function');

    expect(typeof lib.clearAlertSourceFilters).toBe('function');
    expect(typeof lib.clearAlertSourcesSort).toBe('function');
    expect(typeof lib.closeAlertSourceForm).toBe('function');
    expect(typeof lib.deleteAlertSource).toBe('function');
    expect(typeof lib.filterAlertSources).toBe('function');
    expect(typeof lib.getAlertSources).toBe('function');
    expect(typeof lib.getAlertSource).toBe('function');
    expect(typeof lib.selectAlertSource).toBe('function');
    expect(typeof lib.openAlertSourceForm).toBe('function');
    expect(typeof lib.paginateAlertSources).toBe('function');
    expect(typeof lib.postAlertSource).toBe('function');
    expect(typeof lib.putAlertSource).toBe('function');
    expect(typeof lib.refreshAlertSources).toBe('function');
    expect(typeof lib.searchAlertSources).toBe('function');
    expect(typeof lib.setAlertSourceSchema).toBe('function');
    expect(typeof lib.sortAlertSources).toBe('function');

    expect(typeof lib.clearAssessmentFilters).toBe('function');
    expect(typeof lib.clearAssessmentsSort).toBe('function');
    expect(typeof lib.closeAssessmentForm).toBe('function');
    expect(typeof lib.deleteAssessment).toBe('function');
    expect(typeof lib.filterAssessments).toBe('function');
    expect(typeof lib.getAssessments).toBe('function');
    expect(typeof lib.getAssessment).toBe('function');
    expect(typeof lib.selectAssessment).toBe('function');
    expect(typeof lib.openAssessmentForm).toBe('function');
    expect(typeof lib.paginateAssessments).toBe('function');
    expect(typeof lib.postAssessment).toBe('function');
    expect(typeof lib.putAssessment).toBe('function');
    expect(typeof lib.refreshAssessments).toBe('function');
    expect(typeof lib.searchAssessments).toBe('function');
    expect(typeof lib.setAssessmentSchema).toBe('function');
    expect(typeof lib.sortAssessments).toBe('function');

    expect(typeof lib.clearDistrictFilters).toBe('function');
    expect(typeof lib.clearDistrictsSort).toBe('function');
    expect(typeof lib.closeDistrictForm).toBe('function');
    expect(typeof lib.deleteDistrict).toBe('function');
    expect(typeof lib.filterDistricts).toBe('function');
    expect(typeof lib.getDistricts).toBe('function');
    expect(typeof lib.getDistrict).toBe('function');
    expect(typeof lib.selectDistrict).toBe('function');
    expect(typeof lib.openDistrictForm).toBe('function');
    expect(typeof lib.paginateDistricts).toBe('function');
    expect(typeof lib.postDistrict).toBe('function');
    expect(typeof lib.putDistrict).toBe('function');
    expect(typeof lib.refreshDistricts).toBe('function');
    expect(typeof lib.searchDistricts).toBe('function');
    expect(typeof lib.setDistrictSchema).toBe('function');
    expect(typeof lib.sortDistricts).toBe('function');

    expect(typeof lib.clearPlanFilters).toBe('function');
    expect(typeof lib.clearPlansSort).toBe('function');
    expect(typeof lib.closePlanForm).toBe('function');
    expect(typeof lib.deletePlan).toBe('function');
    expect(typeof lib.filterPlans).toBe('function');
    expect(typeof lib.getPlans).toBe('function');
    expect(typeof lib.getPlan).toBe('function');
    expect(typeof lib.selectPlan).toBe('function');
    expect(typeof lib.openPlanForm).toBe('function');
    expect(typeof lib.paginatePlans).toBe('function');
    expect(typeof lib.postPlan).toBe('function');
    expect(typeof lib.putPlan).toBe('function');
    expect(typeof lib.refreshPlans).toBe('function');
    expect(typeof lib.searchPlans).toBe('function');
    expect(typeof lib.setPlanSchema).toBe('function');
    expect(typeof lib.sortPlans).toBe('function');

    expect(typeof lib.clearFeatureFilters).toBe('function');
    expect(typeof lib.clearFeaturesSort).toBe('function');
    expect(typeof lib.closeFeatureForm).toBe('function');
    expect(typeof lib.deleteFeature).toBe('function');
    expect(typeof lib.filterFeatures).toBe('function');
    expect(typeof lib.getFeatures).toBe('function');
    expect(typeof lib.getFeature).toBe('function');
    expect(typeof lib.selectFeature).toBe('function');
    expect(typeof lib.openFeatureForm).toBe('function');
    expect(typeof lib.paginateFeatures).toBe('function');
    expect(typeof lib.postFeature).toBe('function');
    expect(typeof lib.putFeature).toBe('function');
    expect(typeof lib.refreshFeatures).toBe('function');
    expect(typeof lib.searchFeatures).toBe('function');
    expect(typeof lib.setFeatureSchema).toBe('function');
    expect(typeof lib.sortFeatures).toBe('function');

    expect(typeof lib.clearFocalPersonFilters).toBe('function');
    expect(typeof lib.clearFocalPeopleSort).toBe('function');
    expect(typeof lib.closeFocalPersonForm).toBe('function');
    expect(typeof lib.deleteFocalPerson).toBe('function');
    expect(typeof lib.filterFocalPeople).toBe('function');
    expect(typeof lib.getFocalPeople).toBe('function');
    expect(typeof lib.getFocalPerson).toBe('function');
    expect(typeof lib.selectFocalPerson).toBe('function');
    expect(typeof lib.openFocalPersonForm).toBe('function');
    expect(typeof lib.paginateFocalPeople).toBe('function');
    expect(typeof lib.postFocalPerson).toBe('function');
    expect(typeof lib.putFocalPerson).toBe('function');
    expect(typeof lib.refreshFocalPeople).toBe('function');
    expect(typeof lib.searchFocalPeople).toBe('function');
    expect(typeof lib.setFocalPersonSchema).toBe('function');
    expect(typeof lib.sortFocalPeople).toBe('function');

    expect(typeof lib.clearIncidentFilters).toBe('function');
    expect(typeof lib.clearIncidentsSort).toBe('function');
    expect(typeof lib.closeIncidentForm).toBe('function');
    expect(typeof lib.deleteIncident).toBe('function');
    expect(typeof lib.filterIncidents).toBe('function');
    expect(typeof lib.getIncidents).toBe('function');
    expect(typeof lib.getIncident).toBe('function');
    expect(typeof lib.selectIncident).toBe('function');
    expect(typeof lib.openIncidentForm).toBe('function');
    expect(typeof lib.paginateIncidents).toBe('function');
    expect(typeof lib.postIncident).toBe('function');
    expect(typeof lib.putIncident).toBe('function');
    expect(typeof lib.refreshIncidents).toBe('function');
    expect(typeof lib.searchIncidents).toBe('function');
    expect(typeof lib.setIncidentSchema).toBe('function');
    expect(typeof lib.sortIncidents).toBe('function');

    expect(typeof lib.clearIncidentTypeFilters).toBe('function');
    expect(typeof lib.clearIncidentTypesSort).toBe('function');
    expect(typeof lib.closeIncidentTypeForm).toBe('function');
    expect(typeof lib.deleteIncidentType).toBe('function');
    expect(typeof lib.filterIncidentTypes).toBe('function');
    expect(typeof lib.getIncidentTypes).toBe('function');
    expect(typeof lib.getIncidentType).toBe('function');
    expect(typeof lib.selectIncidentType).toBe('function');
    expect(typeof lib.openIncidentTypeForm).toBe('function');
    expect(typeof lib.paginateIncidentTypes).toBe('function');
    expect(typeof lib.postIncidentType).toBe('function');
    expect(typeof lib.putIncidentType).toBe('function');
    expect(typeof lib.refreshIncidentTypes).toBe('function');
    expect(typeof lib.searchIncidentTypes).toBe('function');
    expect(typeof lib.setIncidentTypeSchema).toBe('function');
    expect(typeof lib.sortIncidentTypes).toBe('function');

    expect(typeof lib.clearIndicatorFilters).toBe('function');
    expect(typeof lib.clearIndicatorsSort).toBe('function');
    expect(typeof lib.closeIndicatorForm).toBe('function');
    expect(typeof lib.deleteIndicator).toBe('function');
    expect(typeof lib.filterIndicators).toBe('function');
    expect(typeof lib.getIndicators).toBe('function');
    expect(typeof lib.getIndicator).toBe('function');
    expect(typeof lib.selectIndicator).toBe('function');
    expect(typeof lib.openIndicatorForm).toBe('function');
    expect(typeof lib.paginateIndicators).toBe('function');
    expect(typeof lib.postIndicator).toBe('function');
    expect(typeof lib.putIndicator).toBe('function');
    expect(typeof lib.refreshIndicators).toBe('function');
    expect(typeof lib.searchIndicators).toBe('function');
    expect(typeof lib.setIndicatorSchema).toBe('function');
    expect(typeof lib.sortIndicators).toBe('function');

    expect(typeof lib.clearItemFilters).toBe('function');
    expect(typeof lib.clearItemsSort).toBe('function');
    expect(typeof lib.closeItemForm).toBe('function');
    expect(typeof lib.deleteItem).toBe('function');
    expect(typeof lib.filterItems).toBe('function');
    expect(typeof lib.getItems).toBe('function');
    expect(typeof lib.getItem).toBe('function');
    expect(typeof lib.selectItem).toBe('function');
    expect(typeof lib.openItemForm).toBe('function');
    expect(typeof lib.paginateItems).toBe('function');
    expect(typeof lib.postItem).toBe('function');
    expect(typeof lib.putItem).toBe('function');
    expect(typeof lib.refreshItems).toBe('function');
    expect(typeof lib.searchItems).toBe('function');
    expect(typeof lib.setItemSchema).toBe('function');
    expect(typeof lib.sortItems).toBe('function');

    expect(typeof lib.clearItemCategoryFilters).toBe('function');
    expect(typeof lib.clearItemCategoriesSort).toBe('function');
    expect(typeof lib.closeItemCategoryForm).toBe('function');
    expect(typeof lib.deleteItemCategory).toBe('function');
    expect(typeof lib.filterItemCategories).toBe('function');
    expect(typeof lib.getItemCategories).toBe('function');
    expect(typeof lib.getItemCategory).toBe('function');
    expect(typeof lib.selectItemCategory).toBe('function');
    expect(typeof lib.openItemCategoryForm).toBe('function');
    expect(typeof lib.paginateItemCategories).toBe('function');
    expect(typeof lib.postItemCategory).toBe('function');
    expect(typeof lib.putItemCategory).toBe('function');
    expect(typeof lib.refreshItemCategories).toBe('function');
    expect(typeof lib.searchItemCategories).toBe('function');
    expect(typeof lib.setItemCategorySchema).toBe('function');
    expect(typeof lib.sortItemCategories).toBe('function');

    expect(typeof lib.clearItemFilters).toBe('function');
    expect(typeof lib.clearItemsSort).toBe('function');
    expect(typeof lib.closeItemForm).toBe('function');
    expect(typeof lib.deleteItem).toBe('function');
    expect(typeof lib.filterItems).toBe('function');
    expect(typeof lib.getItems).toBe('function');
    expect(typeof lib.getItem).toBe('function');
    expect(typeof lib.selectItem).toBe('function');
    expect(typeof lib.openItemForm).toBe('function');
    expect(typeof lib.paginateItems).toBe('function');
    expect(typeof lib.postItem).toBe('function');
    expect(typeof lib.putItem).toBe('function');
    expect(typeof lib.refreshItems).toBe('function');
    expect(typeof lib.searchItems).toBe('function');
    expect(typeof lib.setItemSchema).toBe('function');
    expect(typeof lib.sortItems).toBe('function');

    expect(typeof lib.clearProcedureFilters).toBe('function');
    expect(typeof lib.clearProceduresSort).toBe('function');
    expect(typeof lib.closeProcedureForm).toBe('function');
    expect(typeof lib.deleteProcedure).toBe('function');
    expect(typeof lib.filterProcedures).toBe('function');
    expect(typeof lib.getProcedures).toBe('function');
    expect(typeof lib.getProcedure).toBe('function');
    expect(typeof lib.selectProcedure).toBe('function');
    expect(typeof lib.openProcedureForm).toBe('function');
    expect(typeof lib.paginateProcedures).toBe('function');
    expect(typeof lib.postProcedure).toBe('function');
    expect(typeof lib.putProcedure).toBe('function');
    expect(typeof lib.refreshProcedures).toBe('function');
    expect(typeof lib.searchProcedures).toBe('function');
    expect(typeof lib.setProcedureSchema).toBe('function');
    expect(typeof lib.sortProcedures).toBe('function');

    expect(typeof lib.clearQuestionFilters).toBe('function');
    expect(typeof lib.clearQuestionsSort).toBe('function');
    expect(typeof lib.closeQuestionForm).toBe('function');
    expect(typeof lib.deleteQuestion).toBe('function');
    expect(typeof lib.filterQuestions).toBe('function');
    expect(typeof lib.getQuestions).toBe('function');
    expect(typeof lib.getQuestion).toBe('function');
    expect(typeof lib.selectQuestion).toBe('function');
    expect(typeof lib.openQuestionForm).toBe('function');
    expect(typeof lib.paginateQuestions).toBe('function');
    expect(typeof lib.postQuestion).toBe('function');
    expect(typeof lib.putQuestion).toBe('function');
    expect(typeof lib.refreshQuestions).toBe('function');
    expect(typeof lib.searchQuestions).toBe('function');
    expect(typeof lib.setQuestionSchema).toBe('function');
    expect(typeof lib.sortQuestions).toBe('function');

    expect(typeof lib.clearQuestionnaireFilters).toBe('function');
    expect(typeof lib.clearQuestionnairesSort).toBe('function');
    expect(typeof lib.closeQuestionnaireForm).toBe('function');
    expect(typeof lib.deleteQuestionnaire).toBe('function');
    expect(typeof lib.filterQuestionnaires).toBe('function');
    expect(typeof lib.getQuestionnaires).toBe('function');
    expect(typeof lib.getQuestionnaire).toBe('function');
    expect(typeof lib.selectQuestionnaire).toBe('function');
    expect(typeof lib.openQuestionnaireForm).toBe('function');
    expect(typeof lib.paginateQuestionnaires).toBe('function');
    expect(typeof lib.postQuestionnaire).toBe('function');
    expect(typeof lib.putQuestionnaire).toBe('function');
    expect(typeof lib.refreshQuestionnaires).toBe('function');
    expect(typeof lib.searchQuestionnaires).toBe('function');
    expect(typeof lib.setQuestionnaireSchema).toBe('function');
    expect(typeof lib.sortQuestionnaires).toBe('function');

    expect(typeof lib.clearRegionFilters).toBe('function');
    expect(typeof lib.clearRegionsSort).toBe('function');
    expect(typeof lib.closeRegionForm).toBe('function');
    expect(typeof lib.deleteRegion).toBe('function');
    expect(typeof lib.filterRegions).toBe('function');
    expect(typeof lib.getRegions).toBe('function');
    expect(typeof lib.getRegion).toBe('function');
    expect(typeof lib.selectRegion).toBe('function');
    expect(typeof lib.openRegionForm).toBe('function');
    expect(typeof lib.paginateRegions).toBe('function');
    expect(typeof lib.postRegion).toBe('function');
    expect(typeof lib.putRegion).toBe('function');
    expect(typeof lib.refreshRegions).toBe('function');
    expect(typeof lib.searchRegions).toBe('function');
    expect(typeof lib.setRegionSchema).toBe('function');
    expect(typeof lib.sortRegions).toBe('function');

    expect(typeof lib.clearResourceFilters).toBe('function');
    expect(typeof lib.clearResourcesSort).toBe('function');
    expect(typeof lib.closeResourceForm).toBe('function');
    expect(typeof lib.deleteResource).toBe('function');
    expect(typeof lib.filterResources).toBe('function');
    expect(typeof lib.getResources).toBe('function');
    expect(typeof lib.getResource).toBe('function');
    expect(typeof lib.selectResource).toBe('function');
    expect(typeof lib.openResourceForm).toBe('function');
    expect(typeof lib.paginateResources).toBe('function');
    expect(typeof lib.postResource).toBe('function');
    expect(typeof lib.putResource).toBe('function');
    expect(typeof lib.refreshResources).toBe('function');
    expect(typeof lib.searchResources).toBe('function');
    expect(typeof lib.setResourceSchema).toBe('function');
    expect(typeof lib.sortResources).toBe('function');

    expect(typeof lib.clearRoleFilters).toBe('function');
    expect(typeof lib.clearRolesSort).toBe('function');
    expect(typeof lib.closeRoleForm).toBe('function');
    expect(typeof lib.deleteRole).toBe('function');
    expect(typeof lib.filterRoles).toBe('function');
    expect(typeof lib.getRoles).toBe('function');
    expect(typeof lib.getRole).toBe('function');
    expect(typeof lib.selectRole).toBe('function');
    expect(typeof lib.openRoleForm).toBe('function');
    expect(typeof lib.paginateRoles).toBe('function');
    expect(typeof lib.postRole).toBe('function');
    expect(typeof lib.putRole).toBe('function');
    expect(typeof lib.refreshRoles).toBe('function');
    expect(typeof lib.searchRoles).toBe('function');
    expect(typeof lib.setRoleSchema).toBe('function');
    expect(typeof lib.sortRoles).toBe('function');

    expect(typeof lib.clearWarehouseFilters).toBe('function');
    expect(typeof lib.clearWarehousesSort).toBe('function');
    expect(typeof lib.closeWarehouseForm).toBe('function');
    expect(typeof lib.deleteWarehouse).toBe('function');
    expect(typeof lib.filterWarehouses).toBe('function');
    expect(typeof lib.getWarehouses).toBe('function');
    expect(typeof lib.getWarehouse).toBe('function');
    expect(typeof lib.selectWarehouse).toBe('function');
    expect(typeof lib.openWarehouseForm).toBe('function');
    expect(typeof lib.paginateWarehouses).toBe('function');
    expect(typeof lib.postWarehouse).toBe('function');
    expect(typeof lib.putWarehouse).toBe('function');
    expect(typeof lib.refreshWarehouses).toBe('function');
    expect(typeof lib.searchWarehouses).toBe('function');
    expect(typeof lib.setWarehouseSchema).toBe('function');
    expect(typeof lib.sortWarehouses).toBe('function');

    expect(typeof lib.signin).toBe('function');
    expect(typeof lib.signout).toBe('function');
  });

  it('should expose connect function', () => {
    expect(typeof lib.Connect).toBe('function');
  });

  it('should expose StoreProvider as a function', () => {
    expect(typeof lib.StoreProvider).toBe('function');
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
    const ConnectedComponent = lib.Connect(TestComponent, {
      alerts: 'alerts.list',
      total: 'alerts.total',
      page: 'alerts.page',
    });
    const { StoreProvider } = lib;

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
    const ConnectedComponent = lib.Connect(TestComponent, state => ({
      alerts: state.alerts.list,
      total: state.alerts.total,
      page: state.alerts.page,
    }));

    const { StoreProvider } = lib;

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
    const ConnectedComponent = lib.Connect(TestComponent);

    const { StoreProvider } = lib;

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
