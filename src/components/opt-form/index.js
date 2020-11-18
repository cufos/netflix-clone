import React from 'react'
import {Container,Input,Button,Text,Break} from './styles/opt-form'

export default function OptForm({...restProps,children}) {
  return (
    <Container {...restProps}>
      {children}
    </Container>
  )
}

OptForm.Input = function OptFormInput({...restProps}){
  return(
    <Input {...restProps}/>
  )
}

OptForm.Button = function OptFormButton ({...restProps,children}){
  return (
    <Button {...restProps}>
      {children} <img src="/images/icons/chevron-right.png" alt="Icono"/>
    </Button>
  )
}

OptForm.Text = function OptFormText({...restProps,children}){
  return (
    <Text {...restProps}>
      {children}
    </Text>
  )
}

OptForm.Break = function OptFormBreak({...restProps}){
  return <Break {...restProps}/>
}
