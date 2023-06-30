import {useEffect, useRef, useState} from 'react'
import {useLoaderData, useRevalidator} from 'react-router-dom'

import MessageForm from '../components/MessageForm'
import MessageList from '../components/MessageList'
import echo from '../utils/echo'
import ky from '../utils/ky'

export async function action({params, request}) {
  const formData = await request.formData()

  // console.log('DATAAA ', params)

  // console.log('DATAAA ', formData)

  await ky
    .post('messages', {
      json: {
        message: formData.get('message'),
        channel_id: params.roomId,
      },
    })
    .json()

  return {}
}

export async function loader({params}) {
  // console.log('Miauuuu', params)

  const messages = await ky.get(`messages/${params.roomId}`).json()

  // console.log('hellooooo', messages)
  return {
    messages,
  }
}
function isScrollAtBottom(element) {
  return (
    element.scrollHeight - element.clientHeight ===
    Math.floor(element.scrollTop)
  )
}

export default function Room() {
  const formRef = useRef(null)
  const listRef = useRef(null)
  const [shouldScrollBottom, setShouldScrollBottom] = useState(true)
  const [newNotification, setNewNotification] = useState(false)
  const {messages} = useLoaderData()
  // console.log('hellouuuuuu', messages)
  const revalidator = useRevalidator()
  // const [shouldScrollBottom, setShouldScrollBottom] = useState(true)
  useEffect(() => {
    const listener = echo
      .channel('messages')
      .listen('MessageCreated', function () {
        // console.log('a')
        console.log()
        if (!isScrollAtBottom(listRef.current)) {
          setNewNotification(true)
        }

        console.log(isScrollAtBottom(listRef.current))
        revalidator.revalidate()
      })

    console.log(isScrollAtBottom(listRef.current))

    formRef.current.reset()

    return () => listener.stopListening('MessageCreated')
  }, [revalidator])

  function scrollIsBottom() {
    console.log(isScrollAtBottom(listRef.current))
    if (isScrollAtBottom(listRef.current)) {
      setNewNotification(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4">
      {newNotification ? (
        <button className="flex h-8 w-full items-center justify-center bg-[#5bff8cb6] text-center">
          New messages
        </button>
      ) : (
        <></>
      )}
      <MessageList
        messages={messages}
        ref={listRef}
        onScroll={scrollIsBottom}
      />
      <MessageForm ref={formRef} />
    </div>
  )
}

// useEffect(() => {
//   const listener = echo.channel('messages').listen('MessageCreated', () => {
//     setShouldScrollBottom(true)
//     revalidator.revalidate()
//   })

//   if (shouldScrollBottom) {
//     listRef.current.scrollTo(0, listRef.current.scrollHeight)
//     setShouldScrollBottom(false)
//   }

//   return () => listener.stopListening('MessageCreated')
// }, [shouldScrollBottom, revalidator])

// const handleScroll = () => {
//   const scrollTop = listRef.current.scrollTop
//   const scrollHeight = listRef.current.scrollHeight
//   const clientHeight = listRef.current.clientHeight

//   const isAtBottom = scrollHeight - scrollTop === clientHeight

//   if (isAtBottom) {
//     setShouldScrollBottom(true)
//   }
// }
