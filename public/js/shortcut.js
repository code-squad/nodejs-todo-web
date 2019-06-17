const $ = (() => (names, parentElement = document) => {
  let element = null;
  const nameArr = names.split(' ');

  nameArr.forEach((elementName) => {
    const nameIdentifier = elementName.substring(1, 0);
    const elName = elementName.substring(1, elementName.length);

    if (nameIdentifier === '.') {
      element = getClassList(elName, parentElement);
    }
    
    if (nameIdentifier === '#') {
      element = getIdElement(elName, parentElement);
    }
  });
  
  return element;
})();

const getClassList = (className, parentElement = document) => {
  return parentElement.getElementsByClassName(className);
}

const getIdElement = (id, parentElement = document) => {
  return parentElement.getElementById(id);
}