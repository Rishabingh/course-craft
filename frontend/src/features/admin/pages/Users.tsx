import { useGetAllUsers } from '../hooks/useGetAllUsers';
import Table from '../components/Table';
import UsersFilters from '../components/UsersFilters';
const Users = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAllUsers({});

  const users = data?.pages.flatMap(page => page.users) ?? [];
  console.log(users);
  return (
    <div>
      <UsersFilters />
      <Table data={users} />
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Users;
