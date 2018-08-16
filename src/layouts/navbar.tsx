import React, { SFC, ReactNode } from 'react'

type Props = {
  children: ReactNode
 }

export const Page: SFC<Props> = ({ children }) => {
  return (
    <div>
      { children }
      <div>i am navbar.</div>
    </div>
  )
}

export default Page
