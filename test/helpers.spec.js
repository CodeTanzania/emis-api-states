import { camelize, getNormalizeResourceName } from '../src/helpers';

describe('helpers', () => {
  describe('getNormalizeResourceName', () => {
    it('should generate singular name when pluralizeLast is undefined', () => {
      expect(getNormalizeResourceName('plan')).toBe('Plan');
      expect(getNormalizeResourceName('activity')).toBe('Activity');
      expect(getNormalizeResourceName('incidentType')).toBe('IncidentType');
    });

    it('should generate singular name when pluralizeLast is false', () => {
      expect(getNormalizeResourceName('plan', false)).toBe('Plan');
      expect(getNormalizeResourceName('activity', false)).toBe('Activity');
    });

    it('should generate plural name when pluralizeLast is set to true', () => {
      expect(getNormalizeResourceName('plan', true)).toBe('Plans');
      expect(getNormalizeResourceName('incidentType', true)).toBe(
        'IncidentTypes'
      );
    });
  });

  describe('camelize', () => {
    it('should generate camelCase word', () => {
      expect(camelize(['plan'])).toBe('plan');
      expect(camelize('get', 'activity')).toBe('getActivity');
      expect(camelize('get', 'incidentType')).toBe('getIncidentType');
    });
  });
});
