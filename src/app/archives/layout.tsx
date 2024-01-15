import SiteArchiveNavbar from '@/layout/SiteArchiveNavbar'

export default function SiteArchivesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-100 max-w-5xl mx-auto my-8 py-10 rounded-md">
      <SiteArchiveNavbar />
      {children}
    </div>
  )
}
