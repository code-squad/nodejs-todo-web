const Index = class {
  constructor() {

  }

  createElement(elName, classNameArr, attObj, innerHtml) {
    const element = document.createElement(elName);
    if (classNameArr !== null) {
      classNameArr.forEach(name => {
        element.classList.add(name);
      })
    }

    Object.keys(attObj).forEach((key) => {
      element.setAttribute(key, attObj[key]);
    })

    if (innerHtml !== null) {
      element.innerHTML = innerHtml;
    }
    return element;
  }

  

}