import { PiletModalsApi } from 'piral-modals';
import { BehaviorSubject, Subject } from 'rxjs';
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
 * Note information for note added event.
 */
interface INoteAddedMessage {
  machineId: string;
  note: IMachineNote;
}

/**
 * Encapsulates functionality for working with machine notes.
 */
export class MachineNoteService {
  private static readonly MODAL_ID = 'machine_note';
  private static readonly STORAGE_ID = 'machine_notes';

  /**
   * Emits machine id when user adds a new note.
   */
  public readonly noteAdded: Subject<INoteAddedMessage>;

  constructor(private readonly api: PiletModalsApi) {
    api.registerModal(MachineNoteService.MODAL_ID, MachineNoteModal as any);
    this.noteAdded = new BehaviorSubject<INoteAddedMessage>({ machineId: '', note: { text: '', date: '' } });
  }

  /**
   * Retrieves all notes for given machine.
   */
  public getNotes(machineId: string): IMachineNote[] {
    const notesString = localStorage.getItem(MachineNoteService.STORAGE_ID);
    const notes: INoteStorage = notesString ? JSON.parse(notesString) : {};
    return notes[machineId] ? notes[machineId] : [];
  }

  /**
   * Adds a new note for a given machine.
   */
  public addNote(machineId: string): void {
    const close = this.api.showModal<INoteModalOptions>(MachineNoteService.MODAL_ID, {
      onClose: (text?: string) => {
        if (text) {
          const note = this.createNote(text);
          this.saveNote(machineId, note);
          this.noteAdded.next({machineId, note});
        }
        close();
      }
    })
  }

  /**
   * Creates a new note object.
   */
  private createNote(noteText: string): IMachineNote {
    const dateString = JSON.stringify(new Date());
    return { text: noteText, date: dateString };
  }

  /**
   * Saves the note in the local storage.
   */
  private saveNote(machineId: string, note: IMachineNote): void {
    const notesString = localStorage.getItem(MachineNoteService.STORAGE_ID);
    const notes: INoteStorage = notesString ? JSON.parse(notesString) : {};
    if (notes[machineId]) {
      notes[machineId].push(note);
    } else {
      notes[machineId] = [note];
    }
    localStorage.setItem(MachineNoteService.STORAGE_ID, JSON.stringify(notes));
  }
}
