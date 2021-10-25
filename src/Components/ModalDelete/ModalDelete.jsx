import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import mark from '../../assets/warning.png';
import arrow from '../../assets/arrow.png';
import classes from './ModalDelete.module.scss';

import { deleteArticle } from "../../Reducer/api.actions";


const ModalDelete = ({slug, setIsDelete}) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const clickYes = () => {
    dispatch(deleteArticle(slug));
    history.push('./');
  }

  return (
    <div className={classes.modalDelete}>
      <img src={arrow} className={classes.arrow} alt="arrow"/>
      <div className={classes.header}>
        <img src={mark} alt="yo!"/>
        <span>Are you sure to delete this article?</span>
      </div>
      <div className={classes.buttons}>
        <button type="button" className="button button__red" onClick={() => setIsDelete(false)}>No</button>
        <button type="button" className="button button__green" onClick={clickYes}>Yes</button>
      </div>
    </div>
  );
};

export default ModalDelete;

ModalDelete.propTypes = {
  slug: PropTypes.string.isRequired,
  setIsDelete: PropTypes.func.isRequired
}
