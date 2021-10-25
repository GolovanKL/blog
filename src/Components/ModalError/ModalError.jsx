import React from 'react';
import { Modal } from 'antd';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';

import Button from "../Button/Button";

const ModalError = ({error, setError}) =>
    <Modal visible={error} onCancel={() => setError(false)} footer={[
      <Button key={uniqid()} onClick={() => setError(false)}>Ok</Button>]}>
      {Object.keys(error).map(key => <p key={key} style={{color: 'red'}}>{`${key} ${error[key][0]}`}</p>)}
    </Modal>

export default ModalError;

ModalError.propTypes = {
  error: PropTypes.arrayOf(PropTypes.string).isRequired,
  setError: PropTypes.func.isRequired
}