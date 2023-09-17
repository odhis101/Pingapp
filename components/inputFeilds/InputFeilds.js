import React, { useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { styled } from "nativewind"

const inputFeilds = ({ title, textValue, textOnchange }) => {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <TextInput
      placeholder={title}
      textAlignVertical='center'
      className='bg-white shadow-lg w-full rounded-xl h-16 mb-4 px-6 '
      placeholderTextColor='#A9A9A9'
      value={textValue}
      onChangeText={textOnchange}
      secureTextEntry={title === "Password" ? hidePassword : false}
    />
  )
}

export default inputFeilds
