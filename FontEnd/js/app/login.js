class Login {

    constructor(data) {
        this.data = data
    }

    async loginAction() {
        console.log(this.data);
        const response = await fetch('http://localhost/TokenLab-projeto/BackEnd/', {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });
        var ret = await response.text();
        var sts = response.status;

        return {
            "status": sts,
            "return": JSON.parse(ret)
        };
    }
}

export {
    Login
}