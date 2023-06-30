import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

export default new Echo({
  broadcaster: 'pusher',
  key: 'cb9c3f1a3c9759ffb752',
  cluster: 'us2',
  forceTLS: true,
})
