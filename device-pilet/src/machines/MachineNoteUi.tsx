import * as React from 'react';
import { PiletModalsApi } from 'piral-modals';
import { INoteModalOptions } from './MachineNoteService';

interface IProps {
  options: INoteModalOptions;
}

export const MachineNoteModal: React.FC<IProps> = (props) => (
  <div>
    This is machine note modal.
  <button onClick={() => {
      console.error(JSON.stringify(props));
      props.options.onClose('SOME SAVED DATA');
    }}>
      Close
  </button>
  </div>
);

