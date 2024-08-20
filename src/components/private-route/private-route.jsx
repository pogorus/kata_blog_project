import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component, user }) => {
  return user.token ? <Component user={user} /> : <Navigate to="/sign-in" />;
};
export default PrivateRoute;
