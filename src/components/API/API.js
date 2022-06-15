import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "4a2182dd-def7-4b3d-a087-890ffd4a9249"
    }
})

export const usersAPI = {
    async getUsers(currentPage, pageSize) {
        return await instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    async getUsersFriends(pageNumber) {
        return await instance.get(`users?friend=true&page=${pageNumber}`)
            .then(response => response.data)
    },
    isFollow(userId) {
        return instance.get(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    setStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status }).then(response => response.data)
    },
    setUserData(data) {
        return instance.put(`profile`, data).then(response => {
            return response
        })
    },
    async getCity() {
        return await axios.get(`/cities`)
            .then(res => {
                return res.data
            })
    },
    setPhoto(image) {
        const formData = new FormData();
        formData.append("image", image)
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}
export const loginAPI = {
    auth() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email, password, rememberMe) {
        return instance.post(`auth/login`, { email, password, rememberMe }).then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    },
}
export const dialogsAPI = {
    getAllMessagesWithFriend(userId, pageNumber) {
        return instance.get(`dialogs/${userId}/messages?page=${pageNumber}&count=20`).then(response => response.data)
    },
    sendMessage(userId, message) {
        return instance.post(`dialogs/${userId}/messages`, { body: message }).then(response => {
            return response.data
        })
    },
    deleteMessage(messageId) {
        return instance.delete(`dialogs/messages/${messageId}`).then(response => response.data)
    },
    async getAllDialogs() {
        return await instance.get(`dialogs`).then(response => response.data)
    },
}
export const homeAPI = {
    async getImages() {
        return await axios.get('/posts').then(res => {
            return res.data
        })
    },
    async getMyPosts() {
        return await axios.get('/myPosts').then(res => {
            return res.data
        })
    },
    async getMyPostLink(image) {
        const formData = new FormData();
        formData.append("image", image)
        return await axios.post('https://api.imgbb.com/1/upload?key=54ae9af3e1c092253e1518f226883355', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            return res.data.data
        })
    },
    async sendMyPost(data) {
        return await axios.post('/myPosts', { data }, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }).then(res => {
            return res.data
        })
    },
    async deleteMyPost(id) {
        return await axios.delete(`/myPosts/${id}`).then(res => {
            return res.data
        })
    }
}