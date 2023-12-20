export default function Home() {
  return (
    <>
      {Array.from({ length: 100 }, (item, index) => (
        <h2 key={index} className={`${(index === 0 || index === 99) && 'text-red-500'}`}>
          Hello World
        </h2>
      ))}
    </>
  )
}
