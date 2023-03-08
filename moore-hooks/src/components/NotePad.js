import React, { useReducer, useRef } from 'react';

function Notes() {
  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return [...state, { text: action.payload, visible: true }];
      case 'toggle':
        return state.map((note, index) =>
          index === action.payload ? { ...note, visible: !note.visible } : note
        );
      default:
        throw new Error();
    }
  }

  const inputRef = useRef(null);
  const [notes, dispatch] = useReducer(reducer, []);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      dispatch({ type: 'add', payload: inputRef.current.value });
      inputRef.current.value = '';
    }
  }

  function handleToggle(index) {
    dispatch({ type: 'toggle', payload: index });
  }

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} onKeyDown={handleKeyDown} /><br/>
      {notes.map((note, index) => (
        <div className='note'>
          <div>
            {note.visible ? note.text : 'Content is hidden'}
          </div>
          <button onClick={() => handleToggle(index)}>Toggle</button>
        </div>
      ))}
      <button onClick={handleScrollToTop}>Get back writing</button>
    </div>
  );
}

export default Notes;