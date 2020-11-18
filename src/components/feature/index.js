import React from 'react'
import {Container,Title,Subtitle} from './styles/feature'

export default function Feature({children,...restProps}) {
  return (
    <Container {...restProps}>
      {children}
    </Container>
  )
}

Feature.Title = function FeatureTitle({...restProps,children}){
  <Title {...restProps}>
    {children}
  </Title>
}
Feature.Subtitle = function FeatureSubtitle({...restProps,children}){
  <Subtitle {...restProps}>
    {children}
  </Subtitle>
}


