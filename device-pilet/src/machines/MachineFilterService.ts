import { BehaviorSubject } from 'rxjs';
import { SearchOptions, SearchResultType, PiletSearchApi } from 'piral-search';
import { PiletApi } from 'sample-piral';
import { IMachineInfo } from './Machine.interfaces';

/**
 * Responsible for interop with Piral search API in order to filter a machine list.
 */
export class MachineFilterService {

  /**
   * Emits when user filters the machine list.
   */
  public readonly queryChange: BehaviorSubject<string>;

  constructor() {
    this.queryChange = new BehaviorSubject<string>('');
  }

  /**
   * Registration with pilet API
   */
  public register(searchApi: PiletSearchApi): void {
    searchApi.registerSearchProvider(
      (options: SearchOptions, api: PiletApi) => this.search(options, api)
    );
  }

  /**
   * Filter the machine list according to the current search query
   */
  public filterMachines(machines: IMachineInfo[]): IMachineInfo[] {
    if (this.queryChange.value) {
      const n = parseInt(this.queryChange.value);
      return machines.slice(0, n);
    } else {
      return machines;
    }
  }


  private search(options: SearchOptions, api: PiletApi): Promise<SearchResultType | Array<SearchResultType>> {
    this.queryChange.next(options.query);
    // We do not output any search result. Just trigger the filter change.
    return Promise.resolve([]);
  }

}
