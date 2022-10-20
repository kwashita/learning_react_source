function createELement(type, props, ...children){
    return {
        type,
        props: {
            ...props,
            children: children.map(item=>typeof item === "object" ? item : createTextElement(item))
        },

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

function render(element, container){
    const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);

    //render attributes
    Object.keys(element.props).filter(item=>item !== "children").forEach(item=> {
        dom[item] = element.props[item]
    })

    //render chidlren
    element.props.children.forEach(item=>render(item, dom))

    container.append(dom);
}



let App = createELement(
    "h1",
    {style: "background: skyblue"},
    "Morning",
    createELement(
        "a",
       { href: "http://baidu.com", style: "color: yellow"},
       "Baidu"
    ),
)

render(App, document.getElementById("root"))
console.log(App);