import Icon from '@/components/common/SiteIcon'

export default function Home() {
  return (
    <>
      {Array.from({ length: 100 }, (item, index) => (
        <div key={index} className='flex items-center'>
          <h2 className={`${(index === 0 || index === 99) && 'text-red-500'}`}>Hello World</h2>
          <Icon name="link" className="ml-4 w-4 h-4 text-green-500"></Icon>
        </div>
      ))}
    </>
  )
}
