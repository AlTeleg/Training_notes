import React, { useState } from "react";
import Note, { Training } from "./Note";

export default function TrainingNotesController(): JSX.Element {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [date, setDate] = useState(new Date().toString())
  const [range, setRange] = useState(0)

  const inputDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setDate(event.target.value)
    }
  }

  const inputRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setRange(parseInt(event.target.value, 10))
    }
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let training = trainings.find(training => training.date === new Date(date).toLocaleDateString())
    if (training) {
      let index = trainings.indexOf(training)
      trainings[index].range += range
      setTrainings(trainings => [...trainings])
    }
    else {
      trainings.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
      if (date)
      setTrainings(prevState =>[...prevState, {date: new Date(date).toLocaleDateString(), range: range}])
    }
    setRange(0);
    console.log(new Date(new Date().toLocaleDateString()).toLocaleDateString())
  }

  const editNote = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    let stringDate = event.currentTarget.parentElement?.parentElement?.firstChild?.textContent!
    let stringRange = event.currentTarget.parentElement?.parentElement?.children[1].textContent!
    setDate(stringDate)
    setRange(Number(stringRange))
  }

  const deleteNote = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    let stringDate = event.currentTarget.parentElement?.parentElement?.firstChild?.textContent
    let index = trainings.indexOf(trainings.find(training => training.date === stringDate)!)
    trainings.splice(index, 1).sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
    event.currentTarget.parentElement?.parentElement?.remove()
    setTrainings(trainings)
  }

  return (
    <div className='notes-div'>   
      <form className='input-form' onSubmit={submitForm}>
        <fieldset>
          <legend>Дата (ДД.ММ.ГГ.)</legend>
          <input type="date" name='dateInput' onChange={inputDateChange} value={date}/>
        </fieldset>
        <fieldset>
          <legend>Пройдено км</legend>
          <input type="text" name='rangeInput' onChange={inputRangeChange} value={range}/>
        </fieldset>
        <button className="form-button">ОК</button>
      </form>
      <div className='output-div'>
        <div className='notes-titles'>
          <h3>Дата (ДД.ММ.ГГ.)</h3>
          <h3>Пройдено км</h3>
          <h3>Действия</h3>
        </div>
        <div className='note-list'>
          {trainings
          .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
          .map((t, id) =>
            <Note training={t} onEdit={editNote} onDelete={deleteNote} key={id} />,
          )}
        </div>
      </div>
    </div>
  )
}
