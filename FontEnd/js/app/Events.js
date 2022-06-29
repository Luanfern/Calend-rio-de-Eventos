import {serealizeSend} from "../functions/adjustSend.js";


class Events {
    constructor(myId, search, data) {
        this.myId = myId,
            this.search = search,
            this.data = data
    }

    async listEvents() {

        if (this.myId == '') {
            //todos
            if (this.search == '') {
                const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/api/Event/listAllEvents', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                });
                var ret = await response.text();
                return JSON.parse(ret);
            } else {
                //pesquisa todos
            }
        } else {
            //meus
            if (this.search == '') {
                const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/api/Event/listAllEvents/' + this.myId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                });
                var ret = await response.text();
                return JSON.parse(ret);
            } else {
                //pesquisa meus
            }
        }
    }

    async getUniqueEvent() {
        const convertSearchUnique = parseInt(this.search);
        if (typeof convertSearchUnique === 'number') {
            const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/api/Event/getUniqueEvent/' + convertSearchUnique, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            var ret = await response.text();
            return JSON.parse(ret);
        }
    }

    async createEvent() {
        if (this.data != null && this.myId != null) {
            const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/api/Event/createEvent', {
                method: "POST",
                body: JSON.stringify({
                    "idAuthor": this.myId,
                    "data": serealizeSend(this.data)
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            var ret = await response.text();
            console.log(ret);
            return JSON.parse(ret);
        }
    }

    async deleteEvent() {
        const convertSearchUnique = parseInt(this.search);
        if (typeof convertSearchUnique === 'number' && this.myId != '') {
            const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/api/Event/deleteEvent/' + convertSearchUnique, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            var ret = await response.text();
            return JSON.parse(ret);
        }
    }

    async updateEvent() {
        if (this.data != null && this.myId != null) {
            const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/api/Event/updateEvent', {
                method: "POST",
                body: JSON.stringify(serealizeSend(this.data)),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            var ret = await response.text();
            console.log(JSON.parse(ret));
            return JSON.parse(ret);
        }
    }
}

export {
    Events
}