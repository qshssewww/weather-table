import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../store/cities/cities.slice';

const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const actionsArray = Object.entries(actions);

    const actionsObject = Object.fromEntries(actionsArray);

    return bindActionCreators(actionsObject, dispatch);
  }, [dispatch]);
};

export default useActions;
