import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='py-10' >
      <div className=' max-w-[1200px] mx-auto'>
        <div className='border-b border-b-[#ddd] flex justify-center mb-7' >
            <Link className="mt-0 mb-4 ml-4 mr-4 text-[16px]" >facebook</Link>
            <Link className="mt-0 mb-4 ml-4 mr-4 text-[16px]" >twitter</Link>
            <Link className="mt-0 mb-4 ml-4 mr-4 text-[16px]" >instagram</Link>
            <Link className="mt-0 mb-4 ml-4 mr-4 text-[16px]" >Linkedin</Link>
            <Link className="mt-0 mb-4 ml-4 mr-4 text-[16px]" >google</Link>
            <Link className="mt-0 mb-4 ml-4 mr-4 text-[16px]" >youtube</Link>
        </div>
        <div className="grid lg:grid-cols-4">
            <div>
                <div>E-Commerce</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eaque error modi ad commodi? Quibusdam modi earum consectetur, ea doloremque, magnam quod id numquam in dolor, perspiciatis suscipit excepturi provident beatae ducimus aspernatur eum explicabo. </div>
            </div>

            <div>Box 2</div>
            <div>Box 3</div>
            <div>Box 4</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
