import {useEffect, useMemo, useState } from 'react';
import Menu from '../components/dashboard/Menu';
import TodoForm from '../components/dashboard/TodoForm';
import TodoList from '../components/dashboard/TodoList';
import AddDocIcon from '../components/icons/AddDocIcon';
import CloseIcon from '../components/icons/CloseIcon';
import SearchIcon from '../components/icons/SearchIcon';
import { API_URL } from '../config';

export default function Dashboard({ user, setUser }) {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({});
  const [searchText, setSearchText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

useEffect(() => {
    async function fetchMyTodos(){
      try{
      const response = await fetch(`${API_URL}/my-todos`, {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
        const data = await response.json();
        if(data.status ==='success')
            setTodos(data.data)
        else
           alert('Failed to fetch todos');
      }
      catch(e){
        console.log(e)
      }
    }  
    fetchMyTodos()
  }, [])
  
  function handleFormInput(key, value) {
    setForm({ ...form, [key]: value });
  }

  async function upsertTodo (e) {
    e.preventDefault();
    if(form.editing){
      try {  
        const response = await fetch(`${API_URL}/updateTask/${form.sno}`, {
          method:'PUT',
          body: JSON.stringify({
            title:form.title,
            desc:form.desc,
          }),
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Content-Type':'application/json'
          }
        })
          const data = await response.json();
          if(data.status ==='success')
            setTodos([data.data, ...todos]);      
          else
             alert('Failed to fetch todos');
        setForm({});
        setShowForm(false);
      } catch (e) {
        alert(e);
      }
    }
    else
    try {  
      const response = await fetch(`${API_URL}/addTask`, {
        method:'POST',
        body: JSON.stringify({
          title:form.title,
          desc:form.desc,
        }),
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
        const data = await response.json();
        if(data.status ==='success')
          setTodos([data.data, ...todos]);      
        else
           alert('Failed to fetch todos');
      setForm({});
      setShowForm(false);
    } catch (e) {
      alert(e);
    }
  }

  async function deleteTodo(index, sno) {
    try {
      const response = await fetch(`${API_URL}/deleteTask/${sno}`, {
        method:'DELETE',
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        }
      })
        const data = await response.json();
        if(data.status !=='success'){ 
          alert('Failed to delete Todo')
          }

      const todosCopy = [...todos];
      todosCopy.splice(index, 1); 
      setTodos(todosCopy);

    } catch (e) {
      alert(e);
    }
  }

  function editTodo(todo, index) {
    try {
      // deleteTodo(index);
      setForm({ ...todo, editing: true });
      setShowForm(true);
    } catch (e) {
      alert(e);
    }
  }

  function closeForm() {
    setShowForm(false);
    setForm({});
  }

  function closeSearch() {
    setShowSearch(false);
    setSearchText('');
  }

  function handleLogOut() {
    setUser(null);
    localStorage.clear();
  }

  const filteredTodos = useMemo(
    () =>
      todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchText) ||
          todo.description.toLowerCase().includes(searchText),
      ),
    [searchText, todos],
  );

  return (
    <div className='flex justify-center h-full p-4'>
      <div className='max-w-lg w-full'>
        <div className='mt-2 flex items-center gap-2'>
          <span className='capitalize text-3xl text-gray-600'>
            Hi, {user?.fname || 'user'}
          </span>

          <span className='grow' />

          <button
            onClick={() => setShowSearch(true)}
            className='text-blue-500 border border-blue-400 rounded p-2'
          >
            <SearchIcon />
          </button>
          <button
            onClick={() => setShowForm(true)}
            className='text-blue-500 border border-blue-400 rounded p-2'
          >
            <AddDocIcon />
          </button>

          <Menu handleLogOut={handleLogOut} />
        </div>

        {showForm && (
          <TodoForm
            form={form}
            handleFormInput={handleFormInput}
            upsertTodo={upsertTodo}
            closeForm={closeForm}
          />
        )}

        {showSearch && (
          <div className='flex gap-2 mt-2'>
            <span className='border border-blue-400 text-blue-500 px-3 py-1 rounded-lg w-full flex items-center'>
              <SearchIcon />
              <input
                onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                value={searchText}
                type='text'
                placeholder='Search Todos'
                className='w-full text-lg focus:outline-none text-gray-700 px-2'
                autoFocus
              />
            </span>

            <button
              onClick={closeSearch}
              className='p-2 border border-red-400 text-red-500 rounded-lg'
            >
              <CloseIcon />
            </button>
          </div>
        )}

        <TodoList todos={filteredTodos} editTodo={editTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}
