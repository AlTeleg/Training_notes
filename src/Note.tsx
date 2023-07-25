import { MouseEventHandler } from 'react';
import close from './img/close.png'
import edit from './img/edit.png'

export type Training = {
  date: string;
  range: number;
};


export type NoteProps = {
  training: Training,
  onEdit?: MouseEventHandler,
  onDelete?: MouseEventHandler

};

export default function Note ({training, onEdit, onDelete}: NoteProps): JSX.Element {

  return (
    <div className='note'>
        <p className='note-info'>{training.date}</p>
        <p className='note-info'>{training.range}</p>
        <div className='note_actions'>
          <img onClick={onEdit} className='note-edit' src={edit} alt="edit" />
          <img onClick={onDelete} className='note-delete' src={close} alt="close" />
        </div>
    </div>
  )
}
