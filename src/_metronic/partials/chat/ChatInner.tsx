/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import clsx from 'clsx'
import {
  toAbsoluteUrl,
  defaultMessages,
  defaultUserInfos,
  MessageModel,
  UserInfoModel,
  messageFromClient,
} from '../../helpers'
import { t } from 'i18next'

type Props = {
  isDrawer?: boolean
}

const bufferMessages = defaultMessages

const ChatInner: FC<Props> = ({isDrawer = false}) => {
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageModel[]>(bufferMessages)
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos)

  const sendMessage = () => {
    const newMessage: MessageModel = {
      user: 2,
      type: 'out',
      text: message,
      time: 'Just now',
    }

    bufferMessages.push(newMessage)
    setMessages(bufferMessages)
    toggleChatUpdateFlat(!chatUpdateFlag)
    setMessage('')
    setTimeout(() => {
      bufferMessages.push(messageFromClient)
      setMessages(() => bufferMessages)
      toggleChatUpdateFlat((flag) => !flag)
    }, 1000)
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <></>
  )
}

export {ChatInner}
