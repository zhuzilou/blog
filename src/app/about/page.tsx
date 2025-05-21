import ThanksTo from "@/components/ThanksTo"
export default function SiteAbout() {
  return (
    <div className="mx-auto mt-8 max-w-5xl py-5 sm:p-5 bg-base-100 rounded-lg">
      <h2 className="text-4xl text-orange-500">About</h2>
      <ThanksTo className="text-xl"/>
      <img src="https://ghchart.rshah.org/zhuzilou" alt="zhuzilou's Github chart" />
    </div>
  )
}
