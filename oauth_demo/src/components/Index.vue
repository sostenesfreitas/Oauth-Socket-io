<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Oauth + Socket.io
      </q-toolbar-title>
      <button type="button" class="negative" @click="logout()" >Logout</button>
    </div>
    <div class="layout-view">
      <button type="button" class="push primary" @click="login()" v-if="!user.id">Logar</button>
      <div class="" v-if="user.id">
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
    </div>
  </div>
</div>
<div slot="footer" class="footer bg-dark">
  <input @keyup.enter="send(message)" class="full-width" type="text" v-model="message" placeholder="Digite aqui...">
</div>
  </q-layout>
</template>

<script>
var user = {
  name: '',
  email: '',
  id: '',
  avatar: ''
}
var r = []
import { Toast, LocalStorage } from 'quasar'
export default {
  data () {
    return {
      user,
      r,
      test: 'test',
      message: null,
      messages: []
    }
  },
  created () {
    this.loginCache()
    this.$options.sockets.listenForMessage = (message) => {
      this.messages.push(message)
    }
  },
  methods: {
    /* eslint-disable */
    login () {
      OAuth.initialize('d2q_PuwdtbOe4JoXgMVOUCM-BKI')
      OAuth.popup('google')
      .done(function(result) {
        result.me().done(function(data) {
          Toast.create('logado')
          r.push(data)
          user.name = data.name
          user.email = data.email
          user.id = data.id
          user.avatar = data.avatar
          LocalStorage.set('id', user.id)
          LocalStorage.set('avatar', user.avatar)
          LocalStorage.set('name', user.name)
        })
      })
      .fail(function (err) {
        if (err) {
          console.log(err.stack)
        }
      })
    },
    loginCache () {
      user.id = LocalStorage.get.item('id')
      user.avatar = LocalStorage.get.item('avatar')
      user.name = LocalStorage.get.item('name')
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
    },
    logout: () => {
      LocalStorage.remove('id')
      LocalStorage.remove('avatar')
      LocalStorage.remove('name')
      window.location.reload()
    }
  }
}
</script>

<style lang="styl">
.hello
  width: 100%
  padding 4%
</style>
