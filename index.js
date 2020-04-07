const domList = {
  planWrap: document.querySelector('#planWrap'),
  designWrap: document.querySelector('#designWrap'),
  publishingWrap: document.querySelector('#publishingWrap'),
  planForm: document.querySelector('#planForm'), 
  designForm: document.querySelector('#designForm'), 
  planTable: document.querySelector('#planTable'), 
  designTable: document.querySelector('#designTable'), 
  publishingTable: document.querySelector('#publishingTable'), 
  planIndex: document.querySelector('#planTable').children.length, 
  designIndex: document.querySelector('#designTable').children.length, 
  publishingIndex: document.querySelector('#publishingTable').children.length, 
  planHidden: document.querySelector('#planHidden'), 
  designHidden: document.querySelector('#designHidden'), 
  publishingHidden: document.querySelector('#publishingHidden'), 
  domList: ['plan', 'design', 'publishing'], 
  domNext: {
    plan: 'design', 
    design: 'publishing', 
    publishing: 'plan'
  }
}

planForm.onsubmit = (e)  =>{
  e.preventDefault();
  addList(e.target, 'planTable');
}

designForm.onsubmit = (e)  =>{
  e.preventDefault();
  addList(e.target, 'designTable');
}

const toggleList = (element) => {    
  domList[element].classList.toggle('on');
}

const addList = (ele) => {  
  if(!checktInput(ele)) {
    const type = domList['domList'].filter(l => {
      return !ele.id.indexOf(l) 
    })[0]
    const data = createObj(ele);   
    appendList(data, type);
    resetInput(ele);
    addInput(type); 
  }
}

const createObj = (ele) =>{ 
  const children = [...ele.querySelectorAll('.dataField')].reverse(); 
  const data = children.map(element => { 
    const obj = {} 
    const input = [...element.children]
    input.forEach(ele => {
      obj[ele.name] = ele.value;
    })
    return obj
  }); 
  return data;
}
 
const createList = (data, ele) => {   
  const tr = document.createElement('tr');  
  const index = ele.children.length + 1; 
  const type = domList['domList'].filter(l => {
    return !ele.id.indexOf(l) 
  })  
  tr.innerHTML=
  `<td class="list check">`+
    `<input onchange="putCheckedData(this, '${type}')" class="checkList" type="checkbox" data-no="${index}" data-date="${data.date}" data-version="${data.version}" data-writer="${data.writer}" data-pages="${data.pages}" data-text="${data.text}" data-classification="${data.classification}">`+
  `</td>`+
  `<td class="list no">${index}</td>`+
  `<td class="list date">${data.date}</td>`+
  `<td class="list version">${data.version}</td>`+
  `<td class="list writer">${data.writer}</td>`+
  `<td class="list pages">${data.pages}</td>`+
  `<td class="list text">${data.text}</td>`+
  `<td class="list classification">${data.classification}</td>`

  return tr                 
}

const appendList = (data, type) => {    
  data.map(d => {
    const list = createList(d, domList[`${type}Table`]);
    domList[`${type}Table`].prepend(list); 
  })
}

const resetInput = (ele) =>{    
  const children = [...ele.querySelectorAll('.dataField')]; 
  children.forEach(element => {  
    element.remove()
  });  
  return
}

const checktInput = (ele) =>{
  const children = [...ele.querySelector('.dataField').children];
  const trans = {date: '날짜', version: '버전', writer: '작성자', pages: '페이지', text: '내용', classification: '분류'}
  return children.some(element => {
    if(element.name !== 'no' && element.value === '') { 
      alert(`${trans[element.name]}를 입력해주세요.`);
    }
    return element.name !== 'no' && element.value === '' 
  });
  
}

const putCheckedData = (ele, type) => {  
  const valueDom = document.querySelector(`#${type}Hidden`);  
  const values = valueDom.value ? valueDom.value.split(',') : []; 
  ele.checked ? values.push(ele.dataset.no) :  values.splice(values.indexOf(ele.dataset.no), 1);
  valueDom.value = values;
}

const getCheckedData = (type) => {      
  const checkedList = domList[`${type}Hidden`].value.split(',');  
  const children = domList[`${type}Table`].children;
  const list = checkedList.sort().map(index => {   
    const dataset = children[children.length - parseInt(index)].querySelector('input').dataset;
    return { 
      no: dataset.no,
      date: dataset.date,
      version: dataset.version,
      writer: dataset.writer,
      pages: dataset.pages,
      text: dataset.text,
      classification: dataset.classification
    }
  })  
  return list  
}

const addInput = (type, data) => {
  domList[`${type}Form`].insertAdjacentHTML(
    'afterbegin', 
    '<div class="dataField">'+
      `<input type="hidden" name="no" value="${data ? data.no : ''}">`+
      `<input type="text" placeholder="날짜" name="date" value="${data ? data.date : ''}">`+
      `<input type="text" placeholder="버전" name="version" value="${data ? data.version : ''}">`+
      `<input type="text" placeholder="작성자" name="writer" value="${data ? data.writer : ''}">`+
      `<input type="text" placeholder="페이지" name="pages" value="${data ? data.pages : ''}">`+
      `<input type="text" placeholder="내용" name="text" value="${data ? data.text : ''}">`+
      `<input type="text" placeholder="분류" name="classification" value="${data ? data.classification : ''}">`+
    '</div>'
  )
}

const moveList = (type) => {
  const list = getCheckedData(type);
  console.log(list)
  appendList(list, `${domList['domNext'][type]}`);
}

const getList = (type) => { 
  const list = getCheckedData(type);  
  resetInput(document.querySelector(`#${type}Form`));
  list.forEach(l  => {
    addInput(type, l);
  })
}

const updateList = (type) => {  
  const data = createObj(document.querySelector(`#${type}Form`)); 
  console.log(data)
  const list = [...document.querySelector(`#${type}Table`).children]
  data.forEach(d => {
    const tr = list[list.length - parseInt(d.no)] 
    tr.innerHTML=
      `<td class="list check">`+
        `<input onchange="putCheckedData(this, '${type}')" class="checkList" type="checkbox" data-no="${d.no}" data-date="${d.date}" data-version="${d.version}" data-writer="${d.writer}" data-pages="${d.pages}" data-text="${d.text}" data-classification="${d.classification}">`+
      `</td>`+
      `<td class="list no">${d.no}</td>`+
      `<td class="list date">${d.date}</td>`+
      `<td class="list version">${d.version}</td>`+
      `<td class="list writer">${d.writer}</td>`+
      `<td class="list pages">${d.pages}</td>`+
      `<td class="list text">${d.text}</td>`+
      `<td class="list classification">${d.classification}</td>`
  })
  resetInput(document.querySelector(`#${type}Form`));
  addInput(type); 
}