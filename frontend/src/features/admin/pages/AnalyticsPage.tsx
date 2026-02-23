import { useQuery } from '@tanstack/react-query';
import { unProtectedInstance } from '../../../shared/lib/axiosInstance';
const AnalyticsPage = () => {
  const {data, isFetching, refetch, error} = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      unProtectedInstance
        .get('https://jsonplaceholder.typicode.com/users/1/todos/')
        .then((res) => res.data),
  });

  if (error) {
    alert('something went wrong')
  }
  return (
    <div>
      {isFetching ? 'Loading ...' : JSON.stringify(data)};
      <div>
        <button onClick={() => refetch()}>Refetch</button>
      </div>
    </div>
  )
};

export default AnalyticsPage;
