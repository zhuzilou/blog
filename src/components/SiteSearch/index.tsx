'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { allPosts, Post } from 'contentlayer/generated'
import Icon from '../SiteIcon'

export default function SiteSearch() {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  useEffect(() => {
    if (keyword === '') setFilteredPosts([])
    else setFilteredPosts(allPosts.filter(post => post.title.toUpperCase().includes(keyword.toUpperCase())))
  }, [keyword])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleNavClick = (post: Post) => {
    ;(document.querySelector('#my_modal_1') as any).close()
    router.push(`/posts/${post.url}`)
  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="search something?"
              className="input input-bordered flex-1"
              onChange={onChange}
            />
            <button className="ml-4">
              <Icon name="close" className="w-4 h-4"></Icon>
            </button>
          </div>
        </form>

        <div className="mt-3 mr-8 h-[300px] overflow-y-auto">
          {filteredPosts.map(post => {
            const highlightedTitle = post.title.replace(
              new RegExp(keyword, 'gi'),
              `<span class="text-orange-500">${keyword}</span>`
            )

            return (
              <div
                className="mt-1 px-2 flex items-center h-[40px] dark:text-base-content cursor-default rounded hover:bg-orange-200 dark:hover:bg-warning hover:dark:text-warning-content group"
                key={post._id}
                onClick={() => handleNavClick(post)}
              >
                <Icon name="folder" className="w-4 h-4"></Icon>
                <h2 className="ml-2" dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
              </div>
            )
          })}
        </div>
      </div>
    </dialog>
  )
}
