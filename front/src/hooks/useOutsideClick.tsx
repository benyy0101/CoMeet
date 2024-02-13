//useOutsideClick: 현재 참조하고 있는 애가 아닌 다른 곳을 클릭했을 때 닫히게 하는 커스텀훅

import { RefObject, useEffect } from "react";

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // ref의 current 속성이 존재하고, 현재 클릭된 요소(event.target)가 ref로 참조된 요소 내부에 없을 때 callback 함수 실행
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // document에 mousedown 이벤트 리스너 추가
    // mousedown 이벤트는 마우스 버튼이 눌릴 때 발생
    document.addEventListener("mousedown", handleClickOutside);

    // useEffect의 clean-up 함수
    // 컴포넌트가 언마운트되거나 useEffect의 의존성이 변경될 때 호출됨
    // mousedown 이벤트 리스너를 제거하여 메모리 누수를 방지
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); // ref와 callback이 변경될 때 useEffect가 다시 실행됨
};

export default useOutsideClick;
