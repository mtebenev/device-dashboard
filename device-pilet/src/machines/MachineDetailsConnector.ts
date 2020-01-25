import { PiletFeedsApi, FeedConnector, FeedConnectorOptions } from 'piral-feeds';
import { api, IRestResponse } from '../RestApi';
import { IMachineDetails } from './Machine.interfaces';

/**
 * Feed connector factory for machine details.
 * @param pilet The API instance.
 * @param machineId The machine ID to filter. undefined to not filter machines.
 */
export function withMachineDetailsConnector(pilet: PiletFeedsApi, machineId: string): FeedConnector<IMachineDetails> {
  const result = pilet.createConnector(() =>
    api<IRestResponse<IMachineDetails>>(`https://machinestream.herokuapp.com/api/v1/machines/${machineId}`)
      .then(r => {
        return r.data;
      })
  );
  return result;
}
