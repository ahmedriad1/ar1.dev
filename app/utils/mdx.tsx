import * as mdxBundler from 'mdx-bundler/client'
import { useMemo } from 'react'
import Image from '~/components/Image'
import MdxViewer from '~/components/MdxViewer'
import { isBrowser } from './other'

const mdxComponents = {
  BlogImage: Image,
}

interface UseMdxComponentOptions {
  code?: string
  html: string
}

function getMdxComponent({ html, code }: UseMdxComponentOptions) {
  const Component = code ? mdxBundler.getMDXComponent(code) : null

  return Component
    ? function CodeView({
        componentProps: { components, ...rest } = {},
        ...props
      }: Parameters<typeof MdxViewer>['0'] & {
        componentProps?: Parameters<typeof Component>['0']
      }) {
        return (
          <MdxViewer {...props}>
            <Component
              // @ts-expect-error the types are wrong here
              components={{ ...mdxComponents, ...components }}
              {...rest}
            />
          </MdxViewer>
        )
      }
    : function HtmlViewer(props: Parameters<typeof MdxViewer>['0']) {
        return (
          <MdxViewer dangerouslySetInnerHTML={{ __html: html }} {...props} />
        )
      }
}

export const useMdxComponent = ({ html, code }: UseMdxComponentOptions) => {
  const broswer = isBrowser()
  return useMemo(() => {
    if (!code) return getMdxComponent({ code: undefined, html })

    // there is code
    if (broswer) return getMdxComponent({ code, html })

    return null
  }, [code, html])
}
