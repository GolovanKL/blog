import React from 'react';
import Button from "../Button/Button";
import { Modal } from 'antd';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';


const ModalError = ({error, setError}) => {
  ModalError.propTypes = {
    error: PropTypes.array.isRequired,
    setError: PropTypes.func.isRequired
  }

  return (
    <Modal visible={error} onCancel={() => setError(false)} footer={[
      <Button key={uniqid()} onClick={() => setError(false)}>Ok</Button>]}>
      {Object.keys(error).map(key => <p key={key} style={{color: 'red'}}>{`${key} ${error[key][0]}`}</p>)}
    </Modal>
  );
};

export default ModalError;
