import { PiletFeedsApi, FeedConnector, FeedConnectorOptions } from 'piral-feeds';
import { Socket } from 'phoenix';
import { IMachineEvent } from './Machine.interfaces';

/**
 * Feed connector factory for machine events.
 * @param pilet The API instance.
 * @param machineId The machine ID to filter. undefined to not filter machines.
 * @param limit Max events to keep. undefined to keep them all.
 */
export function withMachineEventsConnector(
  pilet: PiletFeedsApi,
  machineId?: string,
  limit?: number
): FeedConnector<IMachineEvent[]> {
  console.error(`withMachineEventsConnector: ${pilet}`);

  const mockEvents: IMachineEvent[] = [
    { timestamp: "2020-01-13T05:41:50.637392Z", status: "finished", machineId: '59d9f4b4-018f-43d8-92d0-c51de7d987e5' },
    { timestamp: "2019-11-06T21:53:45.112245Z", status: "running", machineId: '59d9f4b4-018f-43d8-92d0-c51de7d987e5' },
    { timestamp: "2019-10-24T21:45:09.906606Z", status: "finished", machineId: '59d9f4b4-018f-43d8-92d0-c51de7d987e5' },
    { timestamp: "2019-10-03T21:31:15.748327Z", status: "finished", machineId: '59d9f4b4-018f-43d8-92d0-c51de7d987e5' }
  ];

  const options: FeedConnectorOptions<IMachineEvent[], IMachineEvent> = {
    initialize: () => {
      return Promise.resolve(mockEvents);
    },
    connect: (callback: (value: IMachineEvent) => void) => {
      const ws = new WebSocket('ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0');
      ws.onopen = () => {
        ws.send('["1", "1", "events", "phx_join", {}]');
      };
      ws.onmessage = (evt) => {
        console.error(`GOT EVT: ${JSON.stringify(evt)}`);
      };
      ws.onerror = (evt) => {
        console.error(`GOT ERROR: ${JSON.stringify(evt)}`);
      }

      let i = 1;
      const intervalId = setInterval(() => {
        ws.send(`[null, "${i++}", "phoenix", "heartbeat", {}]`);
      }, 30000);

      return () => {
        ws.close();
        clearInterval(intervalId);
      }
    },
    update: (currentData, updatedItem) => {
      const newData = [...currentData, updatedItem];
      if (limit !== undefined && limit > 0 && newData.length > limit) {
        newData.shift();
      }
      return newData;
    }
  }

  const result = pilet.createConnector(options);
  return result;
}
