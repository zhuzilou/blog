'use client'

import Icon from '@/components/SiteIcon'

function ToggleSearchShow() {
  return (
    <>
      <button
        className="ml-1 sm:ml-4 p-1 rounded-md w-8 h-8 flex justify-center items-center"
        onClick={() => (document.getElementById('my_modal_1') as any).showModal()}
      >
        <Icon name="search" className={`w-4 h-4`}></Icon>
      </button>
    </>
  )
}

export default ToggleSearchShow
