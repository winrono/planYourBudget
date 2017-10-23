import * as constants from "../constants/constants"

export default async function fetchApi(path, requestInfo, isTokenRequired = true) {

    return new Promise((resolve, reject) => {
        try {

            if (!requestInfo.headers) {
                requestInfo.headers = {}
            }

            requestInfo.headers['Content-Type'] = 'application/json'

            if (isTokenRequired) {
                requestInfo.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem(constants.tokenSessionKey)
            }

            fetch(constants.WEBAPI_URL + path, requestInfo).then((response) => {
                if (response.status === 401) {
                    window.location.pathname = "/"
                }
                resolve(response)
            })
        } catch (e) {
            reject()
        }
    })
}