import SiteArchiveNavbar from '@/layout/SiteArchiveNavbar'

export default function SiteArchivesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-100 max-w-5xl mx-auto my-8 py-6 px-0 sm:px-8 rounded-md">
      <SiteArchiveNavbar />
      {children}
    </div>
  )
}
