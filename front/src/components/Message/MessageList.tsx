import { useQuery } from '@tanstack/react-query';
import { SearchNoteContent } from 'models/Note.interface';
import React from 'react'
import tw from 'tailwind-styled-components'

function MessageList() {
    //쪽지 APi 현재 작업중
    // const {data: messageList, error, isLoading} = useQuery({
    //     queryKey: 'messageList',
    //     queryFn: 
    // }
    // )
    const messageList: SearchNoteContent[] = [
        {
            id:1,
            writerId: "user1",
            receiverId: "user2",
            isRead: false,
        },
        {
            id:2,
            writerId: "user1",
            receiverId: "user2",
            isRead: false,
        },
        {
            id:3,
            writerId: "user1",
            receiverId: "user2",
            isRead: false,
        },
        {
            id:4,
            writerId: "user1",
            receiverId: "user2",
            isRead: false,
        },
        {
            id:5,
            writerId: "user1",
            receiverId: "user2",
            isRead: false,
        },
    ];
  return (
    <Wrapper>
        <Title>쪽지함</Title>
        <Content>
            뭔디
        </Content>
    </Wrapper>
  )
}

const Wrapper = tw.div`
min-h-96
min-w-96
bg-gradient-to-b
from-sky-950
to-indigo-950
rounded-md
p-10
text-indigo-50
flex
flex-col
space-y-5
`

const Title = tw.div`
text-2xl
font-bold
`
const Content = tw.div`
border
border-white
w-full
h-full
bg-indigo-50
bg-opacity-10
`
export default MessageList