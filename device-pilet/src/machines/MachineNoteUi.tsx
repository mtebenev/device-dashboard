import * as React from 'react';
import { INoteModalOptions } from './MachineNoteService';

interface IProps {
  options: INoteModalOptions;
}

export class MachineNoteModal extends React.Component<IProps> {

  private readonly textInput: React.RefObject<HTMLTextAreaElement>;

  constructor(props: IProps) {
    super(props);
    this.textInput = React.createRef<HTMLTextAreaElement>()
  }
  public render(): React.ReactNode {
    return (
      <div className="note-modal">
        <textarea ref={this.textInput}>
        </textarea>
        <div className="modal-actions">
          <button onClick={() => {
            const noteText = this.textInput.current.value;
            this.props.options.onClose(noteText || undefined);
          }}>
            Save
        </button>
          <button onClick={() => {
            this.props.options.onClose();
          }}>
            Cancel
        </button>
        </div>
      </div>
    );
  }
}

