
export const useToken = () => {

    const token = JSON.parse(localStorage.getItem("token")) || null
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    return headers
}  