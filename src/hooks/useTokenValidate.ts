import React, { useEffect, useState } from "react";
import api from "api/api_rtk";

function useTokenValidate() {
  const [isValid, setIsValid] = useState(false);

  const [tokenValidationTrigger, tokenValidationResult] =
    api.usePostTokenValidateMutation();

  const tokenValidate = async () => {
    await tokenValidationTrigger({}).unwrap();
    setIsValid(false);
  };

  useEffect(() => {
    tokenValidate();
  }, []);

  return [isValid];
}

export default useTokenValidate;
