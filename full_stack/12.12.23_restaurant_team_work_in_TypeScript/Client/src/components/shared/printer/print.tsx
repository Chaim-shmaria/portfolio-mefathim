import React, { useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import styled from "@emotion/styled";

const PrintPdf = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PrintComponent = ({
  onclose,
  createComponent,
}: {
  onclose: Function;
  createComponent: (ref: React.Ref<HTMLDivElement>) => React.ReactElement;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<ReactToPrint>(null);
  const printer = (
    <ReactToPrint
      ref={buttonRef}
      trigger={() => createComponent(componentRef)}
      content={() => componentRef.current}
    />
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      buttonRef.current?.handleClick();
      onclose();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return <PrintPdf>{printer}</PrintPdf>;
};

export default PrintComponent;
