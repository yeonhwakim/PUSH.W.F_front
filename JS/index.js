const domList = { 
  planForm: document.querySelector('#planForm'),  
  planList: document.querySelector('#planList'),    
  designList: document.querySelector('#designList'),    
  publishingList: document.querySelector('#publishingList'),    
  developmentList: document.querySelector('#developmentList'),    
  domList: ['plan', 'design', 'publishing'], 
  domNext: {
    plan: 'design', 
    design: 'publishing', 
    publishing: 'plan'
  },
  domName : {
    '디자인': 'design', 
    '퍼블리싱': 'publishing', 
    '개발': 'development'
  }
}

document.querySelector("#planForm").onsubmit = (e)  =>{
  e.preventDefault();
  addList(e.target, 'planList');
}

const addList = (formElement) => {   
    const type = getType(formElement); 
    const dataArray = getDataArray(formElement);    
    appendList(dataArray, type);  
}

const getType = (element) => { 
  return domList['domList'].filter(l => { 
    return ~element.id.indexOf(l) 
  })[0];
}

const getDataArray = (formElement) =>{ 
  const dataFields = [...formElement.querySelectorAll('.dataField')].reverse(); 
  const data = dataFields.map(dataField => { 
    const obj = {};
    const input = [...dataField.children];
    input.forEach(value => {
      obj[value.name] = value.value;
    })
    return obj;
  }); 
  return data;
}

const appendList = (dataArray, type) => {     
  dataArray.map(data => {
    const {list, next} = createList(data, domList[`${type}List`]);   
      domList[`${type}List`].prepend(list); 
      domList[`${next}List`].prepend(list.cloneNode(true));  
  })
}

const createList = (data, listElement) => {    
  const tr = document.createElement('tr');  
  const index = listElement.children.length + 1; 
  const type = getType(listElement)   
  
  tr.innerHTML = 
    `<td class="list check">`+
      `<input onchange="putCheckedData(this, '${type}')" class="checkList" type="checkbox" data-no="${index}" data-date="${data.date}" data-version="${data.version}" data-writer="${data.writer}" data-pages="${data.pages}" data-text="${data.text}" data-classification="${data.classification}">`+
    `</td>`+
    `<td class="list no">${index}</td>`+
    `<td class="list date">${data.date}</td>`+
    `<td class="list file">${data.file}</td>`+
    `<td class="list version">${data.version}</td>`+
    `<td class="list writer">${data.writer}</td>`+
    `<td class="list pages">${data.pages}</td>`+
    `<td class="list text">${data.text}</td>`+ 
    `<td class="list classification ${data.classification !== '디자인' ? 'off' :''}"></td>`+
    `<td class="list classification ${data.classification === '개발' ? 'off' :''}""></td>`+
    `<td class="list classification"></td>`
 
  return {
    list: tr , 
    next: domList.domName[data.classification]
  };               
}