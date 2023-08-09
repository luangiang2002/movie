
import { signInWithEmailAndPassword,  } from 'firebase/auth';
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionType';
import { auth } from '../../firebase/fibefire';

export const LoginEMailPass = (email,pass) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const res = await  signInWithEmailAndPassword(auth, email, pass);
    console.log(res);
    const accessToken = res.user.accessToken
    const profile = {
      name: res.user.displayName,
      photoURL: res.user.photoURL,
      accessToken: accessToken,
    };
    console.log(profile);
    sessionStorage.setItem('watch-user', JSON.stringify(profile));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });
    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};
