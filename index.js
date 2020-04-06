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
  planHidden: document.querySelector('#palneHidden'), 
  designHidden: document.querySelector('#designHidden'), 
  publishingHidden: document.querySelector('#publishingHidden'), 
  domList: ['plan', 'design', 'publishing'], 
  domNext: {
    plan: 'design', 
    design: 'publishing', 
    publishing: 'plan'
  }
}
 
const toggleList = (element) => {    
  domList[element].classList.toggle('on');
}

planForm.onsubmit = (e)  =>{
  e.preventDefault();
  addList(e.target, 'planTable');
}

designForm.onsubmit = (e)  =>{
  e.preventDefault();
  addList(e.target, 'designTable');
}

const addList = (ele, type) => { 
  if(!checktInput(ele)) {
    const data = createObj(ele);
    appendList(data, type) 
    resetInput(ele);
  }
}

const createObj = (ele) =>{
  const dataObj = {}
  const children = [...ele.querySelector('.dataField').children];
  children.forEach(element => {
    dataObj[element.name] = element.value;
  });
  return dataObj;
}

const createList = (data, ele) => {
  const td = ['check', 'no', 'date', 'version', 'writer', 'pages', 'text', 'classification'];
  const tr = document.createElement('tr'); 
  const check = document.createElement('input');   
  const index = ele.children.length + 1; 
  const type = domList['domList'].filter(l => {
    return !ele.id.indexOf(l) 
  })  
  check.className = 'checkList';
  check.type = 'checkbox';   
  check.onchange = (e) => {
    putCheckedData(e, type[0])
  }

  data['check'] = check;  
  data['no'] = index; 
   
  td.forEach(d => { 
    const td = document.createElement('td');

    td.className = `list ${d}`;
    
    if(typeof data[d] === 'object') {
      td.append(data[d]);
    } 
    
    if(typeof data[d] === 'string' || typeof data[d] === 'number') {
      check.dataset[d] = data[d];
      td.textContent = data[d];
    } 

    tr.append(td);
  })

  return tr                 
}

const appendList = (data, type) => {   
  const list = createList(data, domList[type]);
  domList[type].prepend(list); 
}

const resetInput = (ele) =>{
  const children = [...ele.querySelector('.dataField').children];
  children.forEach(element => {
    element.value = '';
  });
  return
}

const checktInput = (ele) =>{
  const children = [...ele.querySelector('.dataField').children];
  const trans = {date: '날짜', version: '버전', writer: '작성자', pages: '페이지', text: '내용', classification: '분류'}
  return children.some(element => {
    if(element.value === '') { 
      alert(`${trans[element.name]}를 입력해주세요.`);
    }
    return element.value === '' 
  });
  
}

const putCheckedData = (e, type) => {  
  const valueDom = domList[`${type}Hidden`]; 
  const values = valueDom.value ? valueDom.value.split(',') : []; 
  e.target.checked ? values.push(e.target.dataset.no) :  values.splice(values.indexOf(e.target.dataset.no), 1);
  valueDom.value = values;
}

const getCheckedData = (type) => {   
  console.log(type)
  const checkedList = domList[`${type}Hidden`].value.split(',');  
  const children = domList[`${type}Table`].children 
  checkedList.map(index => {
    const dataset =  children[parseInt(index) -1].querySelector('input').dataset;
    return { 
      no: dataset.no,
      date: dataset.date,
      version: dataset.version,
      writer: dataset.writer,
      pages: dataset.pages,
      text: dataset.text,
      classification: dataset.classification
    }
  }).forEach(data => { 
    appendList(data, `${domList['domNext'][type]}Table`)
  }) 
}