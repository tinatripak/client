import React from 'react'
import {RiEditCircleLine} from 'react-icons/ri';
import {MdDelete} from 'react-icons/md';

const Photography = () => {
  return (
    <div className='admin-panel'>
      <div className="photography">
        <div>
          <img src="" alt="photo" />
          <div>
            <p>Kristina</p>
            <RiEditCircleLine/>
            <MdDelete/>
          </div>
          <p>Portrait photography</p>
        </div>

        <div>
          <img src="" alt="photo" />
          <div>
            <p>Olga</p>
            <RiEditCircleLine/>
            <MdDelete/>
          </div>
          <p>Portrait photography</p>
        </div>
      </div>
    </div>
  )
}

export default Photography