export default function Loading() {
  return (
    <div className="mx-auto sm:my-5 max-w-5xl py-5 sm:p-5 bg-base-100 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-4 w-6"></div>
        <div className="skeleton h-4 w-1/4"></div>
      </div>

      <div className="mt-6 skeleton h-96"></div>
    </div>
  )
}
