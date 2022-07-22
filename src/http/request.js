import 'whatwg-fetch';
let baseUrl = '/api'
//判断是否生产环境
if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://localhost:8080/api'
}

const useApi = ({url, params = {}, methods = 'POST'}) => {
    url = baseUrl + url;
    return fetch(url, {
        method: methods,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(res => {
            return res;

            // if (res.code === 0) {
            // } else {
            //     throw new Error(res.msg);
            // }
        }).catch(err => {
            console.log(err);
        })

}

export default useApi;