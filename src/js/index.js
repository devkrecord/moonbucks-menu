// step.1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
// - [x] 추가되는 메뉴의 마크업은 '<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>' 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// $ 표시는 자바스크립트에서 dom의 element를 가져올 때 관용적으로 많이 쓰인다.
const $ = (selector) => document.querySelector(selector);

function App() {
  // TODO 메뉴 수정
  // - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다.
  // - [x] 모달창에서 신규메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

  // 이벤트 위임(Event Delegation)이란 동적으로 노드를 생성하고 삭제할 때 각 노드에 대해 이벤트를 추가 하지 않고, 상위 노드에서 하위 노드의 이벤트를 제어 하는 방식이다.
  $('#espresso-menu-list').addEventListener('click', (e) => {
    // classList 메서드를 이용하여 classList를 배열처럼 가져올 수 있음
    // 가능하면 innerText로 값을 비교하기 보다 element가 가지고있는 속성을 이용하는 것이 좋다.
    if (e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest('li').querySelector('.menu-name'); // 클릭한 버튼을 기준 (수정버튼)을 기준으로 찾아가는게 좋다.

      // 변수명이 길어도 의미가 명확하면 ok
      const updatedMenuName = prompt(
        '메뉴명을 수정하세요',
        $menuName.innerText
      ); // 2번째 인자는 default 값

      if (updatedMenuName === '') {
        alert('수정값을 입력해주세요');
        return;
      }
      $menuName.innerText = updatedMenuName;
    }
  });

  //form 태그가 자동으로 전송되는 것을 막아준다.
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
                  <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                  <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                  >
                    삭제
                  </button>
                </li>`;
    };
    // innerHTML은 덮어씌어진다.  아메리카노, 카파라떼 입력 시 -> 아메리카노, 카페라떼 (x) -> 카페라떼 (o)
    //   $('#espresso-menu-list').innerHTML = menuItemTemplate(espressoMenuName);

    // <!-- beforeBegin -->
    // <ul>
    // <!-- afterBegin -->
    // foo
    // <!-- beforeEnd -->
    // </ul>
    // <!-- afterEnd -->
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeEnd',
      menuItemTemplate(espressoMenuName)
    );

    // querySelector은 ul안에 첫번째 li 요소만 리턴함.
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
    $('#espresso-menu-name').value = '';
  };

  // 확인 버튼을 클릭하면 메뉴 추가
  $('#espresso-menu-submit-button').addEventListener('click', () => {
    addMenuName();
  });

  // 엔터키를 누르면 메뉴 추가
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();
