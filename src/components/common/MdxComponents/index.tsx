import { CodeBlock } from './CodeBlock'

export const mdxComponents = {
  pre: (props: any) => {
    const codeblock = (props.children.props.children as string).trim()
    const language = props.children.props.className

    return <CodeBlock codeBlock={codeblock} language={language} />
  },
  MyComponent: (props: { num: number }) => (
    <div className="border">
      <h2>Title</h2>
      <p>Hello World! {props.num}</p>
    </div>
  ),
}

export default mdxComponents
