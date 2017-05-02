/* eslint-disable */
var user = {
  name: '',
  email: '',
  id: '',
  avatar: ''
}

var login = () => {
  OAuth.initialize('d2q_PuwdtbOe4JoXgMVOUCM-BKI')
  OAuth.popup('google')
  .done(function(result) {
    result.me().done(function(data) {
      user.name = data.name
      user.email = data.email
      user.id = data.id
      user.avatar = data.avatar
    })
  })
  .fail(function (err) {
    if (err) {
      console.log(err.stack)
    }
  })
}

var getUser = () => {
  return user
}
export default {
  login,
  getUser
}
