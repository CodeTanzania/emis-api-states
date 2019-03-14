import { camelize } from '../src/utils';

describe('helpers', () => {
  describe('camelize', () => {
    it('should generate camelCase word', () => {
      expect(camelize(['plan'])).toBe('plan');
      expect(camelize('get', 'activity')).toBe('getActivity');
      expect(camelize('get', 'incidentType')).toBe('getIncidentType');
    });
  });
});