export default function ThanksTo(props: { className: string}) {
  let className = props.className === '' ? 'text-xs' : props.className

    return (
    <div className={`${className}`}>
        <a href="https://www.084612.xyz" target="_blank">Source code copy from djdg626. </a>
        <a href="https://github.com/zhangwh754/djdg626.com" target="_blank">Visit His GitHub</a>
      </div>
    )
}