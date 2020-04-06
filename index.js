const domList = {
  planWrap: document.querySelector('#planWrap'),
  designWrap: document.querySelector('#designWrap'),
  publishingWrap: document.querySelector('#publishingWrap'),
  planeForm: document.querySelector('#planeForm'), 
  planeTable: document.querySelector('#planeTable'), 
  planeIndex: document.querySelector('#planeTable').children.length, 
}
 
const toggleList = (element) => {    
  domList[element].classList.toggle('on');
}

planeForm.onsubmit = (e)  =>{
  e.preventDefault();
  addList(e.target, 'planeTable');
}

const addList = (ele, type) => { 
  if(!checktInput(ele)) {
    const data = createObj(ele);
    const list = createList(data, domList[type]);
    domList[type].prepend(list);
    resetInput(ele);
  }
}

const removeList = () => {
  
}

const updateList = () =>{
  
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
  const th = ['check', 'no', 'date', 'version', 'writer', 'pages', 'text', 'classification'];
  const tr = document.createElement('tr'); 
  const check = document.createElement('input'); 

  check.className = 'checkList';
  check.type = 'checkbox'; 
  data['check'] = check; 

  data['no'] = ele.children.length + 1; 
   
  th.forEach(d => {
    const td = document.createElement('td');

    td.className = `list ${d}`;

    if(typeof data[d] === 'object') {
      td.append(data[d]);
    } 

    if(typeof data[d] === 'string' || typeof data[d] === 'number') {
      td.textContent = data[d];
    } 

    tr.append(td);
  })

  return tr                 
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