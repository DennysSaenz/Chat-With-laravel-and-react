import {Outlet, redirect, useLoaderData} from 'react-router-dom'

import ContactList from '../components/ContactList'
import {AuthContext} from '../context/auth.context'
import ky from '../utils/ky'
import ChannelList from '../components/ChannelList'

export async function loader() {
  try {
    const user = await ky.get('user').json()
    const users = await ky.get('users').json()
    const channels = await ky.get('channels').json()

    return {
      user,
      users: users.filter((_user) => _user.id !== user.id),
      channels,
    }
  } catch (err) {
    if (err.response.status === 401) {
      return redirect('/login')
    }
  }
}

export default function App() {
  const {user, users, channels} = useLoaderData()
  const all = useLoaderData()
  // console.log("IM ALL",all)

  function handleLogout() {
    localStorage.removeItem('token')

    window.location.reload()
  }

  return (
    <AuthContext.Provider value={user}>
      <div className="flex h-screen">
        <div className="flex w-[320px] flex-col border border-gray-100">
          <h2 className="flex h-12 items-center justify-center border-b border-gray-100 text-xl font-semibold">
            Channels
          </h2>
          {/* <ContactList users={users} /> */}
          <ChannelList channels={channels} />
          <button
            className="flex w-full items-center justify-center p-4"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="flex h-12 items-center justify-center border-b border-gray-100 text-xl font-semibold">
            Messages
          </h2>
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  )
}
