'use client'

import { useEffect, useState } from 'react'

import Icon from '@/components/common/SiteIcon'

function ToggleMenuShow(props: { display: Boolean; toggleMenuShow: Function }) {
  const toggleMenuShow = () => {
    props.toggleMenuShow()
  }

  return (
    <>
      <button
        className="sm:hidden ml-1 sm:ml-4 p-1 rounded-md w-8 h-8 flex justify-center items-center text-slate-900 dark:text-slate-100"
        onClick={() => toggleMenuShow()}
      >
        <span className="sr-only">Toggle Menu Show</span>
        {!props.display ? (
          <Icon name="menu" className={`w-4 h-4`}></Icon>
        ) : (
          <Icon name="close" className={`w-4 h-4`}></Icon>
        )}
      </button>
    </>
  )
}

export default ToggleMenuShow
