import Input from 'components/form/Input';
import Label from 'components/form/Label';
import React, { useState } from 'react';
import { ContentBody } from 'types/common';

interface Props {
  body: ContentBody[];
  setBody: React.Dispatch<React.SetStateAction<ContentBody[]>>;
}

function FormBody(props: Props) {
  const { body, setBody } = props;

  return <div className='grid w-full grid-cols-2 gap-2'>form body</div>;
}

export default FormBody;
