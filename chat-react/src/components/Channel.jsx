import {Link} from 'react-router-dom'

export default function Channel({channel}) {
  return (
    <div>
      <Link to={`/rooms/${channel.id}`}>{channel.channel_name}</Link>
    </div>
  )
}
