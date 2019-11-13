import { useMutation } from '@apollo/react-hooks';
import { FETCH_CURRENT_USER } from '../graphql/mutations';

export default props => {
  const [fetchCurrentUser, { data }] = useMutation(FETCH_CURRENT_USER);
  
}