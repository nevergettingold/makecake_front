import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pwdCheck } from "../../../shared/SignUpRule";
import { useSelector } from "react-redux";
import { actionCreators as userAction } from "../../../redux/modules/user";
import Swal from "sweetalert2";

import {
  Container,
  BlackBackButton,
  PwText,
  PwRuleText,
  InputAndButton,
  InputPw,
  CheckText,
  InputPwCheck,
  NextButton,
} from "./style";

const SignUpPassword = () => {
  const username = useSelector((state) => state.user.username);
  console.log(username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");

  // 중복 체크
  const [passwordCurrent, setPasswordCurrent] = React.useState("");

  // 유효성 검사
  const [isPassword, setIsPassword] = React.useState("");
  const [isPasswordCheck, setIsPasswordCheck] = React.useState("");

  // 에러 메세지 상태 저장
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = React.useState("");

  // 비활성화 여부
  const [active, setActive] = React.useState(true);

  const checkActive = () => {
    password !== "" && passwordCheck !== ""
      ? setActive(false)
      : setActive(true);
  };

  const is_PassWord = (e) => {
    setPassword(e.target.value);

    const passwordCurrent = e.target.value;
    setPasswordCurrent(passwordCurrent);

    if (!pwdCheck(passwordCurrent)) {
      setPasswordMessage("올바른 비밀번호 형식이 아닙니다!");
      setIsPassword(false);
    } else {
      setPasswordMessage("올바른 비밀번호 형식입니다!");
      setIsPassword(true);
    }
  };

  const is_PasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    const SamePasswordCurrent = e.target.value;
    // if (!pwdCheck(SamePasswordCurrent)) {
    //   setPasswordCheckMessage("형식에 맞지 않는 비밀번호입니다!");
    //   setIsPasswordCheck(false);
    // }
    if (
      password !== "" &&
      passwordCheck !== "" &&
      password === SamePasswordCurrent
    ) {
      setPasswordCheckMessage("비밀번호가 같습니다!");
      setIsPasswordCheck(true);
    } else {
      setPasswordCheckMessage("비밀번호가 같지 않습니다. 다시 확인해주세요!");
      setIsPasswordCheck(false);
    }
  };

  const savePassword = () => {
    if (password !== passwordCheck) {
      Swal.fire({
        title: "비밀번호가 같지 않습니다. 다시 확인해주세요!",
        showCancelButton: false,
        confirmButtonText: "확인",
        confirmButtonColor: "#ff679e",
      });
      return;
    }
    dispatch(userAction.addPassword(password));
    dispatch(userAction.addPasswordCheck(passwordCheck));
    navigate("/signup/nickname");
  };

  return (
    <Container>
      <BlackBackButton onClick={() => navigate("/signup/email")} />
      <PwText>비밀번호를 알려주세요!</PwText>
      <PwRuleText>
        영문/숫자/특수문자 조합으로 입력해주세요. (10~20자)
      </PwRuleText>

      <InputAndButton>
        <InputPw
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={is_PassWord}
          onKeyUp={checkActive}
        />

        {password.length > 0 && (
          <>
            <CheckText className={`${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </CheckText>
          </>
        )}
        <InputPwCheck
          placeholder="비밀번호 확인"
          type="password"
          value={passwordCheck}
          onChange={is_PasswordCheck}
          onKeyUp={checkActive}
        />

        {passwordCheck.length > 0 && (
          <>
            <CheckText className={`${isPasswordCheck ? "success" : "error"}`}>
              {passwordCheckMessage}
            </CheckText>
          </>
        )}
        <NextButton
          disabled={active}
          onClick={() => {
            savePassword();
          }}
        >
          다음
        </NextButton>
      </InputAndButton>
    </Container>
  );
};

export default SignUpPassword;
