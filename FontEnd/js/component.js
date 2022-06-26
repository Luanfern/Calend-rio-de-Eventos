class Component{
    constructor(tag, arqHtml, arqCss){
        this.tag = tag,
        this.arqHtml = arqHtml,
        this.arqCss = arqCss
    }

    async fileContent() {
        const responseHtml = await fetch(this.arqHtml);
        var contentHtml = await responseHtml.text();

        const responseCss = await fetch(this.arqCss);
        var contentCss = await responseCss.text();

        console.log(this.arqHtml);

        var ret = {
            "tag": this.tag,
            "contentHtml": contentHtml,
            "contentCss": contentCss
        }
        return ret;
    }
}

export {Component}