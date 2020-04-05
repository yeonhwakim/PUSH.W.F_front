const domList = {
  planWrap: document.querySelector('#planWrap'),
  designWrap: document.querySelector('#designWrap'),
  publishingWrap: document.querySelector('#publishingWrap'),
  planeForm: document.querySelector('#planeForm'), 
  planeTable: document.querySelector('#planeTable'), 
}

const toggleList = (element) => {    
  domList[element].classList.toggle('on');
}

planeForm.onsubmit = (e)  =>{
  e.preventDefault();
  addList(e.target, 'planeTable')
}

const addList = (ele, tbody) => { 
  const data = createObj(ele);
  const list = createList(data);
  domList[tbody].append(list);
  return resetInput(ele);
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
  return dataObj
}

const createList = (data) => {
  const tr = document.createElement('tr');
  Object.keys(data).forEach(d => {
    const td = document.createElement('td');
    td.className = `list ${d}`;
    td.textContent = data[d];
    tr.append(td)
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
