const googles = require('googleapis')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
const plus = google.people('v1')
const clientid = "207239541678-8bp3avd2f7qkg2ajd3fgnth8cbf8e976.apps.googleusercontent.com"
const clientsecret = 'vRfTPuXvOR9LOLVsJo5rNaVJ'
const redirecturl = 'http://localhost:8080/Home'
function getOAuthclient() {
    return new OAuth2(clientid,clientsecret,redirecturl)
}
function getAuthurl() {
    const oauth2client = getOAuthclient()
    const scopes = ['https://www.googleapis.com/auth/plus.me']
    var url = oauth2client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: scopes,
        // Optional property that passes state parameters to redirect URI
        state: { foo: 'bar' }
    });
    return url;
}
exports.getAuthurl = getAuthurl
exports.getOAuthclient = getOAuthclient
exports.plus = plus