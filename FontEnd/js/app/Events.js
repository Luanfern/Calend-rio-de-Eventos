class Events{
    constructor(myId, search, data){
        this.myId = myId,
        this.search = search,
        this.data = data
    }

    listEvents(){
        if (this.search == '') {
            const ret = '{"return" : [{"id": 1, "title": "title1", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"27/06":"00:00 -- 00:00"}, {"28/06":"00:00 -- 00:00"}]}, {"id": 2, "title": "title1", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"27/06":"00:00 -- 00:00"}, {"28/06":"00:00 -- 00:00"}]}, {"id": 3, "title": "title3", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"27/06":"00:00 -- 00:00"}, {"28/06":"00:00 -- 00:00"}]}]}';
            return JSON.parse(ret);
        }else{
        }
    }

    getUniqueEvent(){
        const convertSearchUnique = parseInt(this.search);
        if (typeof convertSearchUnique === 'number') {
            const ret = '{"id": 1, "title": "title1", "description": "description1description1description1description1", "author": "authorName1", "datestimes": [{"day":"2022-06-27", "inicio":"00:00", "termino":"00:00"}, {"day":"2022-06-28", "inicio":"00:00", "termino":"00:00"}]}';
            return JSON.parse(ret);
        }
    }

    createEvent(){

    }

    deleteEvent(){

    }

    updateEvent(){
        
    }
}

export{Events}