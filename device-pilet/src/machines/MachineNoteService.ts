import { PiletModalsApi } from 'piral-modals';
import {MachineNoteModal} from './MachineNoteUi';

export interface INoteModalOptions {
  onClose: (text: string) => void
}

/**
 * Encapsulates functionality for working with machine notes.
 */
export class MachineNoteService {
  private static readonly MODAL_ID = 'machine_note';

  constructor(private readonly api: PiletModalsApi) {
    api.registerModal(MachineNoteService.MODAL_ID, MachineNoteModal);
  }

  public addNote(machineId: string): void {
    this.api.showModal<INoteModalOptions>(MachineNoteService.MODAL_ID, {
      onClose: (text: string) => {
        this.saveNote(machineId, text);
      }
    })
    alert(`Adding note for machine: ${machineId}`);
  }

  /**
   * Saves the note in the local storage.
   */
  private saveNote(machineId: string, noteText: string): void {
    console.error(`Saving note... ${machineId} ${noteText}`);
  }
}
