// 두번째 미션 - 문벅스 카페의 메뉴판 여러개 만들기 ------------------------
// TODO localStorage Read & Write
// - [] localStorage에 데이터를 저장한ㄷ.
// - [] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// - [] 에스프레소 메뉴판 관리
// - [] 프라푸치노 메뉴판 관리
// - [] 블렌디드 메뉴판 관리
// - [] 티바나 메뉴판 관리
// - [] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [] 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를 읽어온다.
// - [] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [] 품절 버튼을 추가한다.
// - [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [] 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out을 추가한다.

const $ = (selector) => document.querySelector(selector); // $ 표시는 자바스크립트에서 dom의 element를 가져올 때 관용적으로 많이 쓰인다.

const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem('menu');
  },
};

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  this.menu = [];

  // *********** 재사용 함수
  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    const template = this.menu
      .map((item) => {
        return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join('');

    // innerHTML은 덮어씌어진다.  아메리카노, 카파라떼 입력 시 -> 아메리카노, 카페라떼 (x) -> 카페라떼 (o)
    //   $('#espresso-menu-list').innerHTML = menuItemTemplate(espressoMenuName);

    // <!-- beforeBegin -->
    // <ul>
    // <!-- afterBegin -->
    // foo
    // <!-- beforeEnd -->
    // </ul>
    // <!-- afterEnd -->
    $('#espresso-menu-list').innerHTML = template;

    // querySelector은 ul안에 첫번째 li 요소만 리턴함.
    updatedMenuCount();
    $('#espresso-menu-name').value = '';
  };

  const updateMenuName = (e) => {
    // classList 메서드를 이용하여 classList를 배열처럼 가져올 수 있음
    // 가능하면 innerText로 값을 비교하기 보다 element가 가지고있는 속성을 이용하는 것이 좋다.
    // 변수명이 길어도 의미가 명확하면 ok
    const $menuName = e.target.closest('li').querySelector('.menu-name'); // 클릭한 버튼을 기준 (수정버튼)을 기준으로 찾아가는게 좋다.
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText); // 2번째 인자는 default 값
    if (updatedMenuName === '') {
      alert('수정값을 입력해주세요');
      return;
    }
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      e.target.closest('li').remove();
      updatedMenuCount();
    }
  };

  // *********** 이벤트 바인딩 로직
  const updatedMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };

  // 이벤트 위임(Event Delegation)이란 동적으로 노드를 생성하고 삭제할 때 각 노드에 대해 이벤트를 추가 하지 않고, 상위 노드에서 하위 노드의 이벤트를 제어 하는 방식이다.
  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  //form 태그가 자동으로 전송되는 것을 막아준다.
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // 확인 버튼을 클릭하면 메뉴 추가
  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  // 엔터키를 누르면 메뉴 추가
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();
