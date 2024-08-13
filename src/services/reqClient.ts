import Cookies from 'js-cookie';
import { baseUrl } from '../configs/constant.config';
export const getReq = async (endpoint: string, queries?: any) => {
    const token = Cookies.get('auth_token');
    const res = await fetch(baseUrl + endpoint+ (queries ? queries : ''), {
        headers:{
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    })

    return await res.json();
}

export const postReq = async (endpoint: string, body: any) => {
    const token = Cookies.get('auth_token');
    const res = await fetch(baseUrl + endpoint,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    })

    return res;
}

export const putReq = async (endpoint: string, body: any) => {
    const token = Cookies.get('auth_token');
    const res = await fetch(baseUrl + endpoint+ {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(body)
    })

    return await res.json();
}
export const patchReq = async (endpoint: string, body: any) => {
    const token = Cookies.get('auth_token');
    const res = await fetch(baseUrl + endpoint+ {
        headers:{
            'Authorization': `Bearer ${token}`
        },
        method: 'PATCH',
        body: JSON.stringify(body)
    })

    return await res.json();
}
export const deleteReq = async (endpoint: string, body: any,containFile: boolean = false) => {
    const token = Cookies.get('auth_token');
    const res = await fetch(baseUrl + endpoint+ {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: containFile ? body : JSON.stringify(body)
    })
    const data = await res.json();
    return data;
}