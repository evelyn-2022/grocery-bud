import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const getLocalStorage = () => {
    const data = localStorage.getItem('items');
    return data ? JSON.parse(data) : [];
  };

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(list));
  }, [list]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      showAlert(true, 'please enter an item', 'danger');
      return;
    }

    if (isEditing && name) {
      let newList = list.map(item => {
        if (item.id === editID) {
          return { ...item, title: name };
        }
        return item;
      });
      setList(newList);
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'value changed', 'success');
    } else {
      let newList = [
        ...list,
        { id: new Date().getTime().toString(), title: name },
      ];
      setList(newList);
      setName('');
      showAlert(true, 'item added to the list', 'success');
    }
  };

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const editItem = id => {
    setIsEditing(true);
    setEditID(id);
    let target = list.find(item => item.id === id);
    setName(target.title);
  };

  const deleteItem = id => {
    let newList = list.filter(item => item.id !== id);
    setList(newList);
    showAlert(true, 'item removed', 'danger');
  };

  return (
    <section className='section-center'>
      {/* Form */}
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <button className='submit-btn' type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {/* Grocery list */}
      {list.length > 0 && (
        <div className='grocery-container'>
          <List list={list} editItem={editItem} deleteItem={deleteItem} />
          <button
            className='clear-btn'
            onClick={() => {
              setList([]);
              showAlert(true, 'empty list', 'danger');
              localStorage.clear('items');
            }}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
