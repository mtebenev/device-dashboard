import { PiletSearchApi, SearchProvider, SearchSettings, SearchOptions } from 'piral-search';
import { MachineFilterService } from "./MachineFilterService";
import { IMachineInfo } from './Machine.interfaces';


describe('MachineFilterService', () => {

  const testSet1: Array<Partial<IMachineInfo>> = [
    { id: 'm1', machine_type: 'car', status: 'error' },
    { id: 'm2', machine_type: 'car', status: 'super' },
    { id: 'm3', machine_type: 'car', status: 'norm' },
    { id: 'm4', machine_type: 'bus', status: 'error' },
    { id: 'm5', machine_type: 'bus', status: 'super' },
    { id: 'm6', machine_type: 'bus', status: 'norm' },
  ]

  test('Should return all machines when no filter', () => {
    const filterService = new MachineFilterService();

    const machines: Array<Partial<IMachineInfo>> = [
      { id: 'm1' },
      { id: 'm2' },
      { id: 'm3' },
    ]

    const filtered = filterService.filterMachines(machines as IMachineInfo[]);
    expect(filtered).toEqual(machines);
  });

  test('Should filter by type', () => {
    const filterService = new MachineFilterService();
    const mockSearchApi: Partial<PiletSearchApi> = {
      registerSearchProvider: (provider: SearchProvider | string) => {
        (provider as SearchProvider)({query: 'car'} as SearchOptions, undefined)
      }
    }
    filterService.register(mockSearchApi as PiletSearchApi);

    const filtered = filterService.filterMachines(testSet1 as IMachineInfo[])
      .map(m => m.id);

    expect(filtered).toEqual(['m1', 'm2', 'm3']);
  });

  test('Should filter by status', () => {
    const filterService = new MachineFilterService();
    // Filter by 'no' which will include all 'norm' statuses
    const mockSearchApi: Partial<PiletSearchApi> = {
      registerSearchProvider: (provider: SearchProvider | string) => {
        (provider as SearchProvider)({query: 'no'} as SearchOptions, undefined)
      }
    }
    filterService.register(mockSearchApi as PiletSearchApi);

    const filtered = filterService.filterMachines(testSet1 as IMachineInfo[])
      .map(m => m.id);

    expect(filtered).toEqual(['m3', 'm6']);
  });
});
