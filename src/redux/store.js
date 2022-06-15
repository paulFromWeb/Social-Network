import dialogsReducer from "./dialogsReducer";
let store = {
    rerender: "",
    _state: {
        messagesPage: {
            messages: [
                { id: 1, name: "Alex", message: "Hello,how are you?", time: 3, messageNumbers: 3 },
                { id: 2, name: "Martin", message: "Fantastic!", time: 5, messageNumbers: 21 },
                { id: 3, name: "Stiv", message: "Yeah,good!", time: 10, messageNumbers: 174 },
                { id: 4, name: "Max", message: "And you?", time: 26, messageNumbers: 53 },
                { id: 5, name: "Paul", message: "hey....", time: 31, messageNumbers: 33 },
                { id: 6, name: "Sandro", message: "I love you!", time: 40, messageNumbers: 12 },
            ],
            dialogs: [
                { message: "Hello,how are you?", class: "" },
                { message: "I love you!", class: "" },
                { message: "hey....", class: "" },
            ],
            newMessage: ""
        },
        homePage: {
            posts: [
                { name: "Alex", numbersLikes: 102, time: 2, numbersComments: 8 },
                { name: "Martin", numbersLikes: 93, time: 2, numbersComments: 21 },
                { name: "Stiv", numbersLikes: 132, time: 3, numbersComments: 174 },
                { name: "Max", numbersLikes: 24, time: 4, numbersComments: 53 },
                { name: "Paul", numbersLikes: 76, time: 5, numbersComments: 33 },
                { name: "Sandro", numbersLikes: 81, time: 5, numbersComments: 12 },
            ]
        }
    },
    getState() {

        return this._state
    },
    subscribe(observer) {
        this.rerender = observer;
    },

    dispatch(action) {
        this._state = dialogsReducer(this.getState(), action);
        this.rerender(this._state)
    }
}

window.store = store
export default store;