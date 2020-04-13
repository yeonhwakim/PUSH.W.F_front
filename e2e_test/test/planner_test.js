Feature('Planner Scenario');

Scenario('planner add list', (I) => {
  I.amOnPage('http://localhost');
  I.fillField('#planForm .date', '2020-04-09');
  I.fillField('#planForm .file', 'ibk세모장부');
  I.fillField('#planForm .version', 'v1.1');
  I.fillField('#planForm .writer', '토니');
  I.fillField('#planForm .pages', '250p');
  I.fillField('#planForm .text', '페이지 추가');
  I.selectOption('#planForm .classification', '디자인');
  I.click('#planBtn');
  I.see('1', '#planList tr:nth-child(1) td:nth-child(2)') ; 
  I.see('2020-04-09', '#planList tr:nth-child(1) td:nth-child(3)') ; 
  I.see('ibk세모장부', '#planList tr:nth-child(1) td:nth-child(4)') ; 
  I.see('v1.1', '#planList tr:nth-child(1) td:nth-child(5)') ; 
  I.see('토니', '#planList tr:nth-child(1) td:nth-child(6)') ; 
  I.see('250p', '#planList tr:nth-child(1) td:nth-child(7)') ; 
  I.see('페이지 추가', '#planList tr:nth-child(1) td:nth-child(8)') ; 
  I.see('', '#planList tr:nth-child(1) td:nth-child(9)') ; 
  I.see('', '#planList tr:nth-child(1) td:nth-child(10)') ; 
  I.see('', '#planList tr:nth-child(1) td:nth-child(11)') ; 
  I.see('1', '#planList tr:nth-child(1) td:nth-child(2)') ; 
  I.see('2020-04-09', '#designList tr:nth-child(1) td:nth-child(3)') ; 
  I.see('ibk세모장부', '#designList tr:nth-child(1) td:nth-child(4)') ; 
  I.see('v1.1', '#designList tr:nth-child(1) td:nth-child(5)') ; 
  I.see('토니', '#designList tr:nth-child(1) td:nth-child(6)') ; 
  I.see('250p', '#designList tr:nth-child(1) td:nth-child(7)') ; 
  I.see('페이지 추가', '#designList tr:nth-child(1) td:nth-child(8)') ; 
  I.see('', '#designList tr:nth-child(1) td:nth-child(9)') ; 
  I.see('', '#designList tr:nth-child(1) td:nth-child(10)') ; 
  I.see('', '#designList tr:nth-child(1) td:nth-child(11)') ;  
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