import axios from './axios';

export const getMenu = (param) => {
    axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}
export const getData = () => {
    return axios.request({
        url: '/home/getData',
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: "get",
        data: params
    })
}

export const createUser = (params) => {
    return axios.request({
        url: '/home/getData',
        method: "post",
        data: params
    })
}

