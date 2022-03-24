import { login, logOut } from "../actions/authorizationAction";

export const loginThunk = (mail, password, navigate) => {
  return async (dispatch) => {
    const responce = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail, password }),
    });
    if (responce.status === 234) {
      alert('Неверный пароль');
    } else if (responce.status === 233) {
      alert('Неверный почтовый адрес');
    } else if (responce.status === 200) {
      const { role, name } = await responce.json();
      const user = {};
      user.name = name;
      user.role = role.role_name;
      dispatch(login(user));
      navigate('/');
    }
  };
};

export const signupThunk = (formData, navigate) => {
  return async (dispatch) => {
    const responce = await fetch('/user/signup', {
      method: 'POST',
      body: formData,
    });
    if (responce.status === 200) {
      const { role, name } = await responce.json();
      const user = {};
      user.name = name;
      user.role = role.role_name;
      dispatch(login(user));
      navigate('/square');
    } else if (responce.status === 234) {
      alert('Пользователь с такой электронной почтой уже существует');
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch) => {
    const responce = await fetch('/user/logout');
    if (responce.ok) {
      dispatch(logOut());
    }
  };
};

export const firstConnection = (user) => {
  return (dispatch) => {
    if (!user) {
      fetch('/user/auth').then((response) => response.json())
        .then((data) => dispatch(login(data)));
    }
  };
};
