import { PiletModalsApi } from 'piral-modals';
import { MachineNoteModal } from './MachineNoteUi';

export interface INoteModalOptions {
  onClose: (text?: string) => void
}

/**
 * The machine note content.
 */
export interface IMachineNote {

  /**
   * The note text.
   */
  text: string;

  /**
   * JSON-serialized timestamp.
   */
  date: string;
}

/**
 * Simple keep dictionary with notes: machine_id -> note array.
 */
interface INoteStorage {
  [index: string]: IMachineNote[];
}

/**
 * Encapsulates functionality for working with machine notes.
 */
export class MachineNoteService {
  private static readonly MODAL_ID = 'machine_note';
  private static readonly STORAGE_ID = 'machine_notes';

  constructor(private readonly api: PiletModalsApi) {
    api.registerModal(MachineNoteService.MODAL_ID, MachineNoteModal);
  }

  public getNotes(machineId: string): IMachineNote[] {
    const notesString = localStorage.getItem(MachineNoteService.STORAGE_ID);
    const notes: INoteStorage = notesString ? JSON.parse(notesString) : {};
    return notes[machineId] ? notes[machineId] : [];
  }

  public addNote(machineId: string): void {
    const close = this.api.showModal<INoteModalOptions>(MachineNoteService.MODAL_ID, {
      onClose: (text?: string) => {
        if (text) {
          this.saveNote(machineId, text);
        }
        close();
      }
    })
  }

  /**
   * Saves the note in the local storage.
   */
  private saveNote(machineId: string, noteText: string): void {
    const notesString = localStorage.getItem(MachineNoteService.STORAGE_ID);
    const notes: INoteStorage = notesString ? JSON.parse(notesString) : {};
    const dateString = JSON.stringify(new Date());
    if (notes[machineId]) {
      notes[machineId].push({ text: noteText, date: dateString });
    } else {
      notes[machineId] = [{ text: noteText, date: dateString }];
    }
    localStorage.setItem(MachineNoteService.STORAGE_ID, JSON.stringify(notes));
  }
}
