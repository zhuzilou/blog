import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

function NavigationButton({
  isNext,
  currentPageNum,
  totalPages,
}: {
  isNext: Boolean
  currentPageNum: number
  totalPages: number
}) {
  const buttonText = isNext ? 'Next' : 'Previous'
  const isDisabled = (isNext && currentPageNum === totalPages) || (!isNext && currentPageNum === 1)

  return (
    <div className="w-8">
      {isDisabled ? (
        <button disabled className="disabled:opacity-50">
          {buttonText}
        </button>
      ) : (
        <Link
          key={currentPageNum}
          href={`/page/${isNext ? currentPageNum + 1 : currentPageNum - 1}`}
          className="cursor-pointer"
        >
          {buttonText}
        </Link>
      )}
    </div>
  )
}

export default function SitePagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="mt-4 p-4 flex justify-between items-center bg-base-100 rounded-lg">
      <NavigationButton isNext={false} currentPageNum={currentPage} totalPages={totalPages} />

      <div>
        {currentPage} of {totalPages}
      </div>

      <NavigationButton isNext={true} currentPageNum={currentPage} totalPages={totalPages} />
    </div>
  )
}
