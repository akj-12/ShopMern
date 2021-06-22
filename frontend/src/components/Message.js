import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, show }) => {
  return (
    <Alert variant={variant} show={show} transition>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
  show: true,
};

export default Message;
