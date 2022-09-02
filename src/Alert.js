import React, { useEffect } from 'react';

const Alert = ({ type, msg, showAlert, list }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      showAlert();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
