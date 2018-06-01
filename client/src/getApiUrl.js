/*
   Choose between the full url or the proxy config in package.json
   (which avoids cors errors when running the client on localhost)
*/
function getApiUrl() {
    const isLocalHost = Boolean(
        window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );
    return isLocalHost ? '/api' : 'https://om-curriculum-dashboard-server.apps-np.homedepot.com/api';
}

export default getApiUrl;