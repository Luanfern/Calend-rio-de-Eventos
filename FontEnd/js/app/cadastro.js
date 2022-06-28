import {serealizeSend} from "../functions/adjustSend.js";

class Cadastro {

    constructor(data) {
        this.data = data
    }

    async cadastroAction() {
        const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/api/Cadastro/cadastroAction', {
            method: "POST",
            body: JSON.stringify(serealizeSend(this.data)),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });

        var ret = await response.text();

        console.log(ret);
        return {
            "return": JSON.parse(ret)
        };
    }
}

export {
    Cadastro
}