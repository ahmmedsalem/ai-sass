import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

type Props = {}

export const BotAvatar = (props: Props) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className='p-1' src="/next.svg" />
    </Avatar>
  )
}