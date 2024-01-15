export default function SiteArchivesPosts() {
  return (
    <div className="flex mt-8">
      <div className="w-1/4 pr-8">
        <ul className="space-y-4">
          <li className="text-orange-500 font-bold dark:text-orange-300">2024</li>
          <li className="dark:text-gray-300">2023</li>
          <li className="dark:text-gray-300">2022</li>
          <li className="dark:text-gray-300">2021</li>
          <li className="dark:text-gray-300">2020</li>
        </ul>
      </div>
      <div className="w-3/4">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">前端开发：实战</h2>
            <p className="text-gray-600 dark:text-gray-400">2024年1月</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">前端开发：基础</h2>
            <p className="text-gray-600 dark:text-gray-400">2024年1月</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">前端学习</h2>
            <p className="text-gray-600 dark:text-gray-400">2023年12月</p>
          </div>
        </div>
      </div>
    </div>
  )
}
