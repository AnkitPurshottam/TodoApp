import { useState } from 'react';
import ChevronDown from '../icons/ChevronDown';
import ChevronUp from '../icons/ChevronUp';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';

export default function TodoListItem({ todo, editTodo, deleteTodo, index }) {
  const [isHovering, setIsHovering] = useState(false);
  const [showMore, setShowMore] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='mt-5 pt-4 first:pt-0 last:mb-4'
    >
      <h4 className={`text-xl text-gray-700 font-medium ${!showMore && 'truncate'}`}>
        {todo.title}
      </h4>

      <p className={`text-gray-600 ${!showMore && 'line-clamp-2'}`}>{todo.desc}</p>

      <p className={`float-right px-2 mt-1 -mb-2 flex ${!isHovering && 'hidden'}`}>
        <button onClick={() => deleteTodo(index, todo.sno)} className='text-red-400'>
          <DeleteIcon />
        </button>

        <span className='mx-3 text-gray-400'>|</span>

        <button onClick={() => editTodo(todo, index)} className='text-blue-400'>
          <EditIcon />
        </button>

        <span className='mx-3 text-gray-400'>|</span>

        <button onClick={() => setShowMore(!showMore)} className='text-gray-600'>
          {showMore ? <ChevronUp /> : <ChevronDown />}
        </button>
      </p>
    </div>
  );
}
