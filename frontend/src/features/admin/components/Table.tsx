import { Link } from 'react-router';
import type { ApiUsers } from '../types/AllUserApiResponse';
interface TableParams {
  data: ApiUsers[];
}

const Table = ({ data }: TableParams) => {
  const dataHead = ['Username', 'Email', 'Role', 'Verified', 'Status', 'Joined', 'Action'];

  return (
    <table className="w-full border-collapse bg-white text-sm overflow-x-auto">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          {dataHead.map((val) => (
            <th className="p-3 text-left font-semibold" key={val}>
              {val}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((val) => (
          <tr className="border-b hover:bg-gray-50" key={val._id}>
            <td className="p-3">{val.username}</td>
            <td className="p-3">{val.email}</td>
            <td className="p-3">{val.role}</td>
            <td className="p-3">{val.emailVerified ? 'yes' : 'no'}</td>
            <td className="p-3">
              <span className={`px-2 py-1 text-xs rounded ${val.deletedAt ? 'bg-red-200' : val.isBlocked ? 'bg-red-100' : 'bg-green-100'}`}>
                {val.deletedAt ? 'Deleted' : val.isBlocked ? 'Blocked' : 'Active'}
              </span>
            </td>
            <td className="p-3">{new Date(val.createdAt).toLocaleDateString()}</td>
            <td className="p-3 text-blue-600 cursor-pointer">
              <Link to={`/admin/users/${val._id}`}>View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
