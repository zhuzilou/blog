import SiteTags from '@/components/SiteTags'

export default function SiteTagsPage() {
  return (
    <div className="my-8 mx-auto max-w-5xl">
      <h2 className="py-8 text-xl font-bold text-center bg-base-100 rounded-lg">标签</h2>
      <div className="mt-8 py-2 px-8 bg-base-100 rounded-lg">
        <SiteTags />
      </div>
    </div>
  )
}
