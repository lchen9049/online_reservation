import Api from '@/services/Api'


// api -> axios -> send data to the same route at backend
export default {
    register(credentials) {
        return Api().post('register', credentials)
    },
    confirmReservation(credentials) {
        return Api().post('confirmReservation', credentials)
    },
    addTemp(credentials) {
        return Api().post('addTemp', credentials)
    }
}

// AuthenticationService.register({
//     email:
//     password
// })