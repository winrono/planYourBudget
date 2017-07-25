export default async function fetchApi(url, requestInfo, isTokenRequired = true) {

    return new Promise((resolve, reject) => {
        try {

            if (!requestInfo.headers) {
                requestInfo.headers = {}
            }

            requestInfo.headers['Content-Type'] = 'application/json'

            if (isTokenRequired) {
                requestInfo.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('budgetAppToken')
            }

            fetch(url, requestInfo).then((response) => {
                if (response.status === 401) {
                    window.location.pathname = "/"
                }
                resolve(response)
            })
        }
        catch (e) {
            reject()
        }
    })
}