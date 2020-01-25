import { PiletFeedsApi, FeedConnector, FeedConnectorOptions } from 'piral-feeds';
import { IMachineInfo } from './Machine.interfaces';
import { api, IRestResponse } from '../RestApi';


/**
 * Feed connector factory for machines.
 */
export function withMachinesConnector(pilet: PiletFeedsApi): FeedConnector<IMachineInfo[]> {
  const result = pilet.createConnector(() =>
    api<IRestResponse<IMachineInfo[]>>('https://machinestream.herokuapp.com/api/v1/machines')
      .then(r => {
        return r.data;
      })
  );
  return result;
}
