import React, { useRef, useState } from 'react';
import useEmail from '../../Hooks/useSendEmail';
import * as Styled from './email.styles';

interface FileData {
  name: string;
  size: number;
  type: string;
  data: string;
}

const EmailComponent = (props:{close:React.Dispatch<React.SetStateAction<boolean>>, to:string, subject:string, body:string, handleStatusChange:any}) => {
  const { sendEmail } = useEmail();
  const [to, setTo] = useState(props.to?props.to:'');
  const [subject, setSubject] = useState(props.subject?props.subject:'');
  const [body, setBody] = useState(props.body?props.body:'');
  const [message, setMessage] = useState<string | null>(null);


  const inputFileRef = useRef<HTMLInputElement>(null);

  const addFile = () => {
    inputFileRef.current?.click();
  };

  const handleSendEmail = async () => {
    try {
      await sendEmail(to, subject, body);
      onClose()
      setMessage('המייל נשלח בהצלחה!');
      props.handleStatusChange("נשלח להזמנה");

    } catch (error) {
      setMessage('שליחת המייל נכשלה, אנא נסה שוב.');
      console.error('Error sending email:', error);
    }
  };

  const onClose = () => {
    setBody('')
    setSubject('')
    setTo('')
    setMessage('')
    localStorage.clear();
    props.close(false);
  }

  return (
    <Styled.Container>
      <Styled.Row>
        <Styled.Icon onClick={onClose} />
        <Styled.H1>שליחת מייל</Styled.H1>
      </Styled.Row>
      <Styled.Rows>
      <Styled.Row>
        {message && <Styled.Message color={message==='המייל נשלח בהצלחה!'?"blue":"red"}>{message}</Styled.Message>}
      </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>אל:</Styled.LabelRow>
        </Styled.Row>
        <Styled.Row>
          <Styled.Input  type="text" value={to} onChange={(e) => setTo(e.target.value)} />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>כותרת:</Styled.LabelRow>
        </Styled.Row>
        <Styled.Row>
          <Styled.Input1 height={"30px"} value={subject} onChange={(e) => setSubject(e.target.value)} />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>תוכן:</Styled.LabelRow>
        </Styled.Row>
        <Styled.Row>
          <Styled.Input1 height={"100px"} value={body} onChange={(e) => setBody(e.target.value)} />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>__ הוסף קובץ</Styled.LabelRow>
          <Styled.FileInput type="file" ref={inputFileRef} multiple />
          <Styled.AddIcon onClick={addFile} />
        </Styled.Row>
      </Styled.Rows>
      <Styled.Button onClick={handleSendEmail}>שליחה</Styled.Button>
    </Styled.Container>
  );
};

export default EmailComponent;
