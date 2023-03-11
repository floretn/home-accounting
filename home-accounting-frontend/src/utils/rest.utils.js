
export async function getRequest(url, token) {
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "Access-Control-Allow-Origin": "localhost:8081"
        },
        method: 'GET',
    })
    return await resp.json()
}

export async function postRequest() {
}

export function putRequest() {

}
