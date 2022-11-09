import { useState } from 'react';
import MenuIcon from '../icons/MenuIcon';

export default function Menu({ handleLogOut }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='relative'>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className='text-blue-500 border border-blue-400 rounded p-2'
      >
        <MenuIcon />
      </button>

      {showMenu && (
        <div className='absolute right-0 -bottom-14 bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100'>
          <button onClick={handleLogOut} className='whitespace-nowrap'>Log out</button>
        </div>
      )}
    </div>
  );
}
