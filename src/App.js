// /* eslint-disable */ // Lint 끄는 기능
import { useState } from 'react';
import './App.css';
import React from 'react';

function App() {

  // state 언제 써야함?
  // 변동시 자동으로 html에 반영되게 만들고 싶으면 state 써라!
  // 자주 변경될거 같은 값일때 사용!
  // stste 만드는 곳은 state 사용하는 컴포넌트들 중 최상위 컴포넌트에 만드셈

  // let [title1, setTitle1] = useState('남자 코트 추천');
  // let [title2, setTitle2] = useState('강남 우동 맛집');
  // let [title3, setTitle3] = useState('파이썬 독학');
  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [selTitleIdx, setSelTitleIdx] = useState(0);
  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [text, setText] = useState('');

  let today = new Date();
  // state변경함수 특징 : 기존state == 신규state의 경우 변경 안해줌. state는 배열 값 자체를 가지고 있는게 아니다.
  // array/object 특징 : array/object 담은 변수엔 화살표만 저장됨. ==> "reference data type 관련 글 읽어보기"
  // let copy = title => title == copy는 같은 화살표를 바라보고 있음.
  // copy[0] = '여자 코트 추천' 
  // => 내부만 변경이 된거지 copy가 바라보고 있는 화살표나 기존 state 변경 되지 않았기 때문에 버튼을 눌러도 변경이 안됨.
  // 따라서, state가 array/objec면 독립적 카피본(shallow copy) [...~]을 만들어서 수정해야함..!!!
  function onChangeTitle() {
    // [...title] => 화살표가 달라짐! 괄호를 벗기고 다시 괄호를 씌워라 라는 의미
    let copy = [...title];
    // copy = ['여자 코트 추천', '강남 우동 맛집', '파이썬 독학'];
    copy[0] = '여자 코트 추천';
    setTitle(copy);
  }

  function onSortTitle() {
    let copy = [...title];
    copy.sort();
    setTitle(copy);
  }

  function onTitleDel(i) {
    let copy = [...title];
    copy.splice(i,1);
    setTitle(copy);
  }

  // stste 변경하는 법
  // 1. 등호로 변경금지 ex) 따봉 = 따봉 + 1 (X)
  // function 함수() {
  //   setGoodCount(goodCount++);
  // }


  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <div style={{textAlign : 'left'}}>
        <button onClick={onSortTitle}>글 정렬</button>
        <button onClick={onChangeTitle}>제목 수정</button>
      </div>
      {/* <div className="list">
        <h4>{ title[0] }<span onClick={()=>{따봉변경(따봉+1)}}>👍</span> {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={() => {setModal(!modal)}}>{ title[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      {/*
        map() 함수
        1. 왼쪽 array 자료만큼 내부코드 실행해줌
        2. return 오른쪽에 있는걸 array로 담아줌
        3. 유용한 파라미터 2개 사용가능
      */}
      {
        title.map(function(a, i){
          return (
            <div className="list" key={i}>
              <div className="list-first">
                <h4 onClick={() => {setModal(!modal); setSelTitleIdx(i)}}>
                  { title[i] } 
                  <span onClick={(e)=>{
                    e.stopPropagation(); // 상위 html로 퍼지는 이벤트버블링을 막고싶을때 사용
                    let copy = [...따봉]; 
                    copy[i] = 따봉[i] + 1; 
                    따봉변경(copy); 
                  }}>👍</span>
                  {따봉[i]}
                </h4>
                <button onClick={() => {onTitleDel(i)}}>삭제</button>
              </div>
              <p>{today.getMonth()+1}월 {today.getDate()}일 발행</p>
            </div>
          )
        })
      }

      <input onChange={(e) => {
        setText(e.target.value);
        }} 
      />
      <button onClick={() => {
        if(text === '') {
          alert('text를 입력해주세요!');
        } else {
          let addtitle = [...title];
          addtitle.push(text);
          setTitle(addtitle);
          let addGood = [...따봉];
          addGood.push(0);
          따봉변경(addGood);
        }
        }}>글발행</button>


      {/* 
        [ 동적인 UI 만드는 step ]
        1. html css로 미리 디자인완성
        2. UI의 현재 상태를 state로 저장
        3. state에 따라 UI가 어떻게 보일지 작성
      */}
      {
        /* props를 보내줄때 데이터 변수, 함수, 스타일에 관련된 text 까지 모두 가능하다. */
        modal === true ? <Modal color="yellow" title={title} selTitleIdx={selTitleIdx} onChangeTitle={onChangeTitle}/> : null
      }

      <Modal2></Modal2>
    </div>
  );
}

// 어떨때 컴포넌트로 만들면 좋을까?
// 1. 반복적인 html 축약할때
// 2. 큰 페이지들
// 3. 자주 변경되는 것들
// 컴포넌트의 단점 : state 가져다쓸때 문제생김

// 부모 -> 자식 state 전송하려면 props 문법 쓰기 => 부모 -> 자식만 가능
// 1. <자식컴포넌트 작명={state이름}>
// 2. props 파라미터 등록 후 props.작명 사용 () => {props.onChangeTitle()}
function Modal(props) {
  return (
    <div className="modal" style={{background : props.color}}>
      <h4>{props.title[props.selTitleIdx]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
      {/* <button onClick={() => {props.onChangeTitle()}}>글수정</button> */}
    </div>
  )
}

// class문법은 constructor, super, render 기본적으로 만들어놓고 시작.
class Modal2 extends React.Component {
  constructor() {
    super();
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render() {
    return (
      <div>안녕 {this.state.age}
        <button onClick={() => {this.setState({age : 21})}}>버튼</button>
      </div>
    )
  }
}

export default App;
