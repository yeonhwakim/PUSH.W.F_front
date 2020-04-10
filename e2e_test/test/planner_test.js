Feature('Planner Scenario');

Scenario('test something', (I) => {
  I.amOnPage('http://localhost');
  I.fillField('#plneForm .date', '2020-04-09');
  I.fillField('#plneForm .file', 'ibk세모장부');
  I.fillField('#plneForm .version', 'v1.1');
  I.fillField('#plneForm .writer', '토니');
  I.fillField('#plneForm .pages', '250p');
  I.fillField('#plneForm .text', '페이지 추가');
  I.selectOption('#plneForm .classification', '디자인');
  I.click('#planBtn');
  I.seeElement('#planList tr'); 
  // locate('#table td').at(1).withText('1');
  // locate('#table td').at(2).withText('2020-04-09');
  // locate('#table td').at(3).withText('ibk세모장부');
  // locate('#table td').at(4).withText('v1.1');
  // locate('#table td').at(5).withText('토니');
  // locate('#table td').at(6).withText('250p');
  // locate('#table td').at(7).withText('페이지 추가');
  // locate('#table td').at(8).withText('');
  // locate('#table td').at(9).withText('');
  // locate('#table td').at(10).withText('');

});

// 1] 기획자
// 1) - 1 수정사항 입력 ( 분류 디자인 )
// 1) - 2 기획리스트에 추가 ( 디자인, 퍼블, 개발 항목 모두 흰색 )
// 1) - 3 디자인 리스트에 추가 ( 수정중 항목추가 )  - 파란색

// 2) - 1 "1) - 2" 체크
// 2) - 2 수정 누르기
// 2) - 3 디자인 리스트 수정중 체크 비활성화
// 2) - 4 인풋창에 수정사항 입력하고 완료 누르기
// 2) - 5 기획리스트 수정
// 2) - 6 디자인 리스트 수정

// 3) - 1 "1) - 2" 체크
// 3) - 2 삭제 누르기
// 3) - 5 기획리스트 삭제
// 3) - 6 디자인 리스트 삭제

// 4) - 1 리스트에 수정중이라고 체크되있음
// 4) - 2 리스트 체크박스 비활성화