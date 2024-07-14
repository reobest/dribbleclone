import React from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import Image from 'next/image';
type MenuType = {
  title: string;
  state: string;
  filters: string[];
  setstate: (value:string) => void;
}
const CustomMenu = ({ title, state, filters,setstate }: MenuType) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative mt-[30px]">
      <div className=' w-[350px] sm:w-[400px] md:w-[600px] flex flex-col items-start'>
      <label htmlFor={title} className="tracking-wide w-full mt-6 font-semibold">{title}</label>
        <Menu as="div" className="self-start relative mt-6">
          <div>
            <MenuButton className="flexCenter custom_menu-btn">
              {state || 'Category'}
              <Image
                src="/arrow-down.svg"
                width={10}
                height={5}
                alt="arrow down"
              />
            </MenuButton>
          </div>
          <MenuItems className="flexStart custom_menu-items">
            {filters.map((tag) => (
              <MenuItem key={tag}>
                <button
                  type="button"
                  value={tag}
                  className="custom_menu-item"
                 onClick={(e) => setstate(e.currentTarget.value)}
                >
                  {tag}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}

export default CustomMenu