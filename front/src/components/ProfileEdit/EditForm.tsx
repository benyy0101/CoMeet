import React, {
  useState,
  useEffect,
  ChangeEvent,
  SelectHTMLAttributes,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MemberQuery } from "models/Member.interface";
import {
  handleMember,
  updateMember,
  doubleCheckEmail,
  doubleCheckNicname,
  deleteMember,
} from "api/Member";

import tw from "tailwind-styled-components";
import FeatureSelect from "./FeatureSelect";
import { updateUserNickname } from "store/reducers/userSlice";

function EditForm() {
  //id 리덕스에서 가져오고
  const myId = useSelector((state: any) => state.user.user.memberId);
  const [myData, setMyData] = useState<MemberQuery>();
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [pw1, setPw1] = useState<string>("");
  const [pw2, setPw2] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  //공부 성향 셀렉트 박스 - 디폴트는 지구
  const [selectedOption, setSelectedOption] = useState<string>("");

  const [isNicknameCheck, setIsNicknameCheck] = useState<boolean>(true);
  const [isEmailCheck, setIsEmailCheck] = useState<boolean>(true);
  const [isPw1Check, setIsPw1Check] = useState<boolean>(false);
  const [isPw2Check, setIsPw2Check] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //처음에 myId로 다 들고와
  const fetchData = async () => {
    const res = await handleMember(myId);
    // 데이터 상태로 설정 - 중복 확인 할 때 기존에 있던 건지 확인 후 보내야 해서 설정해야함
    setMyData(res);
    //패스워드 제외 모두 받아와서 저장
    setName(res.name);
    setNickname(res.nickname);
    setEmail(res.email);
    setLink(res.link);
    setDescription(res.description);
    if (res.feature === "") {
      setSelectedOption("EARTH");
    } else {
      setSelectedOption(res.feature);
    }
  };

  //이름, 닉네임, 비밀번호, 비밀번호2, 이메일, 링크, 설명, 성향
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNickname = async (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePw1 = async (e: ChangeEvent<HTMLInputElement>) => {
    setPw1(e.target.value);
  };

  const handlePw2 = async (e: ChangeEvent<HTMLInputElement>) => {
    setPw2(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  //닉네임 중복 검사
  const handleIsCheckNickname = async () => {
    if (nickname !== undefined) {
      let check = await doubleCheckNicname({ nickname: nickname });
      if (check === false && nickname === myData?.nickname) {
        check = true;
      }

      setIsNicknameCheck(check);
    }
  };

  //이메일 중복 검사
  const handleIsCheckEmail = async () => {
    if (email !== undefined) {
      try {
        let check = await doubleCheckEmail({ email: email });
        if (check === false && email === myData?.email) {
          check = true;
        }
        setIsEmailCheck(check);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //비밀번호1 유효성 검사
  const handleIsCheckPw1 = () => {
    //길이 8~16자 영문 대 소문자, 숫자, 특수문자 사용
    const reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]).{8,16}$/;

    if (pw1 !== undefined) {
      const check = reg.test(pw1);
      console.log(check);
      setIsPw1Check(check);
    }
  };

  const handleIsCheckPw2 = () => {
    if (pw2 !== undefined && pw1 === pw2) {
      setIsPw2Check(true);
    } else {
      setIsPw2Check(false);
    }
  };

  const handleUpdateCheck = async () => {
    if (isNicknameCheck === false) {
      alert("중복되지 않는 닉네임을 입력해주세요.");
    } else {
      if (isPw1Check === false && pw1.length > 0) {
        alert("조건에 맞는 비밀번호를 설정해주세요.");
      } else {
        if (isPw2Check === false && pw2.length > 0) {
          alert("비밀번호 확인란에 조건에 맞는 비밀번호를 입력해주세요.");
        } else {
          if (isEmailCheck === false) {
            alert("중복되지 않는 이메일을 입력해주세요.");
          } else {
            //모든 관문을 거치면... 드디어! 수정이 된다
            const updatedData: any = {
              name: name,
              link: link,
              description: description,
              feature: selectedOption,
            };

            // 이메일과 닉네임이 변경되었을 때만 업데이트 요청에 포함
            if (nickname !== myData?.nickname) {
              updatedData.nickname = nickname;
            }
            if (email !== myData?.email) {
              updatedData.email = email;
            }

            if (pw2) {
              updatedData.password = pw2;
            }

            console.log(updatedData);
            try {
              await updateMember(updatedData);
              dispatch(updateUserNickname({ nickname }));

              alert("정보 수정이 완료되었습니다!");
              navigate(`/userpage/${myId}`, { replace: true });
            } catch {
              alert("정보 수정에 오류가 발생했습니다. 다시 시도해주세요!");
            }
          }
        }
      }
    }
  };

  //회원 탈퇴
  const handleDelete = () => {
    deleteMember();
    //여기 로그아웃도 해야 함...
    navigate(`/mainpage`, { replace: true });
  };

  //시작할 때 데이터 다 들고와
  useEffect(() => {
    fetchData();
  }, []);

  //닉네임 바뀔 때마다 중복 검사
  useEffect(() => {
    handleIsCheckNickname();
  }, [nickname]);

  //이메일 바뀔 때마다 중복 검사
  useEffect(() => {
    handleIsCheckEmail();
  }, [email]);

  //비밀번호 바뀔 때마다 유효성 검사
  useEffect(() => {
    handleIsCheckPw1();
  }, [pw1]);

  //비밀번호 확인 유효성 검사
  useEffect(() => {
    handleIsCheckPw2();
  }, [pw1, pw2]);

  return (
    <Wrapper>
      <Form>
        <FormWrapperFirst>
          <FormContainer>
            <Input
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={handleName}
            />
            <Label>이름</Label>
          </FormContainer>
          <FormContainer>
            <Input
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={handleNickname}
            />
            <Label>닉네임</Label>
            {isNicknameCheck ? (
              <SuccessText>중복되는 닉네임이 없습니다.</SuccessText>
            ) : (
              <FailText>중복되는 닉네임이 있습니다.</FailText>
            )}
          </FormContainer>
        </FormWrapperFirst>
        <FormWrapperSecond>
          <FormContainer>
            <Input
              placeholder="영문 대소문자, 숫자, 특수 문자 포함 8~16자"
              value={pw1}
              onChange={handlePw1}
              type="password"
            />
            <Label>비밀번호</Label>
            {pw1 === "" ? null : (
              <>
                {isPw1Check ? (
                  <SuccessText>규칙에 알맞은 비밀번호입니다.</SuccessText>
                ) : (
                  <FailText>
                    비밀번호는 8자 이상 16자 이하여야 하며,
                    숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.
                  </FailText>
                )}
              </>
            )}
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input
              placeholder="영문 대소문자, 숫자, 특수 문자 포함 8~16자"
              value={pw2}
              onChange={handlePw2}
              type="password"
            />
            <Label>비밀번호 확인</Label>
            {pw2 === "" ? null : (
              <>
                {isPw2Check ? (
                  <SuccessText>비밀번호가 같습니다.</SuccessText>
                ) : (
                  <FailText>비밀번호가 다릅니다.</FailText>
                )}
              </>
            )}
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmail}
            />
            <Label>이메일</Label>
            {email === "" ? null : (
              <>
                {isEmailCheck ? (
                  <SuccessText>중복되는 이메일이 없습니다.</SuccessText>
                ) : (
                  <FailText>중복되는 이메일이 있습니다.</FailText>
                )}
              </>
            )}
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input
              placeholder="나를 보여 줄 수 있는 링크를 넣어 보세요."
              value={link}
              onChange={handleLink}
            />
            <Label>링크</Label>
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            <Input
              placeholder="나를 보여 줄 수 있는 한 마디"
              value={description}
              onChange={handleDescription}
            />
            <Label>한 줄 메세지</Label>
          </FormContainer>
        </FormWrapperSecond>
        <FormWrapperSecond>
          <FormContainer>
            {/* 성향 셀렉트 박스 */}
            <FeatureSelect
              handleChange={handleChange}
              selectedOption={selectedOption}
            />
          </FormContainer>
        </FormWrapperSecond>
        <ButtonContainer>
          <DelteButton onClick={handleDelete}>탈퇴</DelteButton>
          <UpdateButton onClick={handleUpdateCheck}>수정</UpdateButton>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
}

const Wrapper = tw.div`
border
border-white
rounded-md
w-[650px]
h-[90%]
flex
bg-white
justify-center
`;

const Form = tw.div`
    flex
    flex-col
    w-full
    px-5
    py-5
`;

const FormWrapperFirst = tw.div`
grid gap-6 mb-5 md:grid-cols-2 flex-grow
`;

const FormWrapperSecond = tw.div`
mb-6 flex-grow
`;

const FormContainer = tw.div`
relative h-10 w-full min-w-[200px]
`;

const Label = tw.label`
before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500
`;

const Input = tw.input`
peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100`;

const SuccessText = tw.p`
mt-1 ml-3 text-xs text-green-600 dark:text-green-500
`;

const FailText = tw.p`
mt-1 ml-3 text-xs text-red-600 dark:text-green-500
`;

const ButtonContainer = tw.div`
flex justify-between
`;

const DelteButton = tw.button`
my-2 p-2 text-xs bg-gray-300 rounded-md text-white
`;

const UpdateButton = tw.button`
p-2
text-sm
my-2
whitespace-pre-line
text-white
rounded-md
bg-gradient-to-r
from-purple-500
to-pink-500
hover:bg-gradient-to-l
focus:ring-4
focus:outline-none
focus:ring-purple-200
dark:focus:ring-purple-800

`;

export default EditForm;
