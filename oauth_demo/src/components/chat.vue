<template>
  <div class="hello">
        <!-- Message received from peer -->
        <div class="" v-for="m in messages">
          <div class="chat-other" v-if="!isUser(m.uid)">
            <div class="chat-user">
              <img :src="m.user">
            </div>
            <div class="chat-date">
              <timeago :auto-update="autoUpdate" :max-time="86400 * 365" :locale="en-US" class="timeago" :since="m.created - 60000"></timeago>
            </div>
            <div class="chat-message">
              <p>
                {{m.msg}}
              </p>
            </div>
          </div>
          <div class="chat-you" v-if="isUser(m.uid)">
            <div class="chat-user">
              <img :src="m.user">
            </div>
            <div class="chat-date">
              <timeago :auto-update="autoUpdate" :max-time="86400 * 365" :locale="en-US" class="timeago" :since="m.created - 60000"></timeago>
            </div>
            <div class="chat-message">
              <p>
                {{m.msg}}
              </p>
            </div>
          </div>
        </div>
        <div slot="footer" class="footer bg-dark">
          <input @keyup.enter="send(message)" class="full-width" type="text" v-model="message" placeholder="Digite aqui...">
        </div>
      </div>
</template>

<script>
import LocalStorage from 'quasar'
var user = {
  uid: LocalStorage.get.item('id'),
  avatar: LocalStorage.get.item('avatar'),
  name: LocalStorage.get.item('name')
}

export default {
  name: 'hello',
  data: () => {
    return {
      user,
      message: null,
      messages: []
    }
  },
  created: function () {
    this.$options.sockets.listenForMessage = (message) => {
      this.messages.push(message)
    }
  },
  methods: {
    handleScroll: (e, position) => {
      console.log(e.scrollHeight)
    },
    send: function (message) {
      let hora = new Date().getTime()
      var data = {
        created: hora,
        uid: user.uid,
        msg: message,
        user: user.avatar
      }
      this.$socket.emit('listenForMessage', data)
      this.message = ''
    },
    isUser: uid => {
      return user.uid === uid
    },
    hora: function () {
      var hour = new Date().getTime()
      return hour
    }
  }
}
</script>

<style lang="styl">
  .hello
    width: 100%
    padding 4%
</style>
