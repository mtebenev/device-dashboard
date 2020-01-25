import { PiletFeedsApi, FeedConnector, FeedConnectorOptions } from 'piral-feeds';
import { IMachineNote, MachineNoteService } from './MachineNoteService';

/**
 * Feed connector factory for machine notes.
 */
export function withMachineNotesConnector(
  pilet: PiletFeedsApi,
  noteService: MachineNoteService,
  machineId: string
): FeedConnector<IMachineNote[]> {

  const options: FeedConnectorOptions<IMachineNote[], IMachineNote> = {
    initialize: () => {
      const notes = noteService.getNotes(machineId);
      return Promise.resolve(notes);
    },
    connect: (callback: (value: IMachineNote) => void) => {
      const subscription = noteService.noteAdded.subscribe(msg => {
        if (msg.machineId === machineId) {
          callback(msg.note);
        }
      })
      return () => {
        subscription.unsubscribe();
      }
    },
    update: (currentData, updatedItem) => {
      return [...currentData, updatedItem];
    }
  }

  const result = pilet.createConnector(options);
  return result;
}
