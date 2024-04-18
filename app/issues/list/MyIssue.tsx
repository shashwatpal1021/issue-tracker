"use client"
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import React, { useState } from 'react'

const MyIssue = () => {
    const [issue, setIssue] = useState(false)
    const handleClick = async() => {
        setIssue(!issue)
    }
  return (
    <Button onClick={handleClick} >My Issue</Button>
  )
}

export default MyIssue