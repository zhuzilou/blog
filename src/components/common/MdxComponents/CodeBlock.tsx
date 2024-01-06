'use client'

import { useState } from 'react'
import { Highlight } from 'prism-react-renderer'

import Icon from '@/components/common/SiteIcon'

export const CodeBlock = (props: { codeBlock: string; language: string }) => {
  const [isCopy, setIsCopy] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(props.codeBlock)
    setIsCopy(true)

    setTimeout(() => {
      setIsCopy(false)
    }, 1500)
  }

  const language = props?.language?.slice(9)

  return (
    <Highlight code={props.codeBlock} language={language || 'tsx'}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="my-2 py-3 bg-[#1e1e1e] rounded-md">
          <div className="px-4 flex justify-end items-center" data-language={language}>
            {language && <span className="text-xs text-white select-none">{language}</span>}

            <button className="ml-4" onClick={() => copyCode()}>
              {isCopy ? (
                <Icon className="w-4 h-4 text-success" name="success" />
              ) : (
                <Icon className="w-4 h-4 text-white" name="copy" />
              )}
            </button>
          </div>

          <pre className="overflow-x-auto" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <>
                  <span className="inline-block mr-4 w-8 text-center text-gray-500 select-none">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </>
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}
