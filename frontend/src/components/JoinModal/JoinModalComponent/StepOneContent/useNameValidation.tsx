import { useState, useEffect } from 'react';

const duplicateStatus = {
  NOT_CHECK: 0,
  AVAILABLE: 1,
  UNAVAILABLE: 2,
};

const useNameValidation = (nickname: string) => {
  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [isDuplicated, setIsDuplicated] = useState<number>(duplicateStatus.NOT_CHECK);
  const [warning, setWarning] = useState({ status: false, message: '' });

  const checkValidation = (data: boolean | undefined, isSuccess: boolean, isError: boolean) => {
    if (isError) {
      setIsDuplicated(duplicateStatus.NOT_CHECK);
      setIsValidName(false);
    } else if (isSuccess) {
      setIsValidName(true);
      if (data) {
        setIsDuplicated(duplicateStatus.AVAILABLE);
      } else {
        setIsDuplicated(duplicateStatus.UNAVAILABLE);
      }
    }
  };
  const vaildNameReg = /^[가-힣a-zA-Z0-9]{2,8}$/;

  useEffect(() => {
    if (!nickname || !vaildNameReg.test(nickname)) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
    setIsDuplicated(duplicateStatus.NOT_CHECK);
  }, [nickname]);

  useEffect(() => {
    if (!nickname || !isValidName) {
      setWarning({
        status: false,
        message: '2~8자리의 한글(모음, 자음x), 영어, 숫자로만 이루어진 문자열을 입력하세요.',
      });
    }
    if (isValidName && isDuplicated === duplicateStatus.NOT_CHECK) {
      setWarning({
        status: false,
        message: '중복확인버튼을 눌러주세요!',
      });
    }
    if (isValidName && isDuplicated === duplicateStatus.AVAILABLE) {
      setWarning({ status: true, message: '사용가능한 닉네임입니다!' });
    }
    if (isDuplicated === duplicateStatus.UNAVAILABLE) {
      setWarning({ status: false, message: '사용중인 닉네임입니다!' });
    }
  }, [isValidName, isDuplicated]);

  return [isValidName, isDuplicated, checkValidation, warning] as const;
};

export default useNameValidation;
