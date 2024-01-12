'use client'

import { useState } from 'react'

import Icon from '@/components/SiteIcon'

import 'styles/markdown.css'

type CodeBlockProps = {
  children: React.ReactNode
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(extractText(children as React.ReactElement))

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const language = (children as any).props['data-language'] || 'unknown'

  return (
    <pre className="relative mx-auto rounded-md bg-neutral">
      <div className="row px-4 py-2 flex justify-end items-center bg-slate-600 rounded-t-md" data-language={language}>
        <span className="text-white select-none">{language}</span>

        <button className="ml-4 flex items-center" onClick={() => copy()}>
          {isCopied ? (
            <Icon className="w-4 h-4 text-success" name="success" />
          ) : (
            <Icon className="w-4 h-4 text-white" name="copy" />
          )}
        </button>
      </div>
      {children}
    </pre>
  )
}

/**
 * Extracts the text from a ReactElement
 */
const extractText = (element: React.ReactElement | string): string => {
  // If the element is a string, return it
  if (typeof element === 'string') {
    return element
  }

  // If the element is a ReactElement, check if it has children
  // If the children is a single string, return it
  if (typeof element.props.children === 'string') {
    return element.props.children
  }

  // If the children is an array, map over it and extract the text
  if (Array.isArray(element.props.children)) {
    return (element.props.children as (React.ReactElement | string)[]).map(child => extractText(child)).join('')
  }

  // If the children is an object (ReactElement), extract the text from it recursively
  if (typeof element.props.children === 'object') {
    return extractText(element.props.children)
  }

  return ''
}
