import styled from '@emotion/styled'
import React from 'react'
import tw from 'twin.macro'

type ContainerProps = {
  className?: string
}

const ContainerStyled = styled.div<ContainerProps>`${tw`mx-auto desktop:px-0 mobile:px-6`}`

const Container: React.FC<ContainerProps> = (props) => {
  const className = ['desktop:container',props.className].join(" ")
  return (
    <ContainerStyled className={className}>
      {props.children}
    </ContainerStyled>
  )
}
export default Container