import {
    serealizeSend
} from "../functions/adjustSend.js";
import { localhost } from "./config.js"

class Events {
    constructor(myId, search, data) {
        this.myId = myId,
            this.search = search,
            this.data = data
    }

    async listEvents(calendario = false) {
        console.log(calendario);
        if (this.myId == '') {
            //todos
            if (this.search == '') {
                const response = await fetch(localhost+'BackEnd/api/Event/listAllEvents', {
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
            if (calendario) {
                if (this.search == '') {
                    const response = await fetch(localhost+'BackEnd/api/Calendary/listAllEventsCalendary/' + this.myId, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        }
                    });
                    var ret = await response.text();
                    return JSON.parse(ret);

                } else {
                    //pesquisa calendario
                }
            } else {
                if (this.search == '') {
                    const response = await fetch(localhost+'BackEnd/api/Event/listAllEvents/' + this.myId, {
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
    }

    async getUniqueEvent() {
        const convertSearchUnique = parseInt(this.search);
        if (typeof convertSearchUnique === 'number') {
            const response = await fetch(localhost+'BackEnd/api/Event/getUniqueEvent/' + convertSearchUnique, {
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
            const response = await fetch(localhost+'BackEnd/api/Event/createEvent', {
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
            const response = await fetch(localhost+'BackEnd/api/Event/deleteEvent/' + convertSearchUnique, {
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
            const response = await fetch(localhost+'BackEnd/api/Event/updateEvent', {
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

    async participate() {
        if (this.data != null && this.myId != null) {
            const response = await fetch(localhost+'BackEnd/api/Calendary/participate', {
                method: "POST",
                body: JSON.stringify({
                    "myId": this.myId,
                    "eventId": this.data
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

    async cancelParticipate() {
        const convertSearchUnique = parseInt(this.search);
        if (typeof convertSearchUnique === 'number' && this.myId != '') {
            const response = await fetch(localhost+'BackEnd/api/Calendary/cancelParticipate/'+convertSearchUnique, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            var ret = await response.text();
            return JSON.parse(ret);
        }
    }
}

export {
    Events
}