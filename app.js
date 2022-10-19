function createElement(type, props, ...children){

    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object'? child: createTextElement(child))
        }
    }
}

function createTextElement(text){
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

let h1 = createElement(
    "h1", 
    {title: "foo", name: 'Lucy'}, 
    createElement("a", null, "bar"), 
    createElement("b"),
    "Hello world"
);

console.log(h1);