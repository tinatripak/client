import React from 'react'
import {MdDelete} from 'react-icons/md';
import {RiEditCircleLine} from 'react-icons/ri';

const TypesOfPhotography = () => {
  return (
    <div className='admin-panel'>
      <div className="types">
        <div>
          <img src="" alt="type" />
          <div>
            <p>Portrait photography</p>
            <div>
              <RiEditCircleLine/>
              <MdDelete/>
            </div>
          </div>
        </div>

        <div>
          <img src="" alt="type" />
          <div>
            <p>Wedding photography</p>
            <div>
              <RiEditCircleLine/>
              <MdDelete/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypesOfPhotography