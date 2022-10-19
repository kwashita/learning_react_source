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

function render(element, container){
    //创建父元素
    const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);

    //赋予属性
    // console.log(element.props["style"]);
    Object.keys(element.props).filter(item=>item!=="children").forEach(item => {         dom[item] = element.props[item]
    });
    
   


    //递归渲染子元素
    element.props.children.forEach(item=>render(item, dom))


    //追加到父节点
    container.append(dom);
}

let app = createElement(
    "h1", 
    {style: "background: skyblue", id: "box"}, 
    "Hello world",
    createElement("a", {style: "color: yellow", href: "http://baidu.com"}, "Bai du"), 

);

render(app, document.getElementById("root"));
