const $ = (() => (names) => {
  let element = null;
  const nameArr = names.split(' ');

  nameArr.forEach((elementName) => {
    const nameIdentifier = elementName.substring(1, 0);
    const elName = elementName.substring(1, elementName.length);

    if (nameIdentifier === '.') {
      element = getClassList(elName);
    }
    
    if (nameIdentifier === '#') {
      element = getIdElement(elName);
    }
  });
  
  return element;
})();

const getClassList = (className, parent = document) => {
  element = parent.getElementsByClassName(className);
  return element;
}

const getIdElement = (id, parent = document) => {
  element = parent.getElementById(id);
  return element;
}