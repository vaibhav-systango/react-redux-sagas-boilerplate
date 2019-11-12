import api from '../../service/api';
import { GET_LIST } from './actionTypes'

export const getList = () => ({
  type: GET_LIST,
  payload: api.get('/asia'),
});

