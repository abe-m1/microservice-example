import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  //only want this to fire once
  useEffect(() => {
    doRequest();
  }, []);
  return <div>Signing you out...</div>;
};
