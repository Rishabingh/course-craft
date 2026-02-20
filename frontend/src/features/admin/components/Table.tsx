import { Link } from "react-router";

const Table = () => {

const data = [
  {username: 'rish', email: 'r@s.com', status: 'Active', role: 'Admin', joined: '15/6/2006', id: '0'},
  {username: 'alex', email: 'alex23@gmail.com', status: 'Active', role: 'Admin', joined: '12/5/2018', id: '1'},
  {username: 'maya', email: 'maya_k@outlook.com', status: 'Inactive', role: 'User', joined: '3/9/2020', id: '2'},
  {username: 'sam', email: 'sam99@yahoo.com', status: 'Active', role: 'Moderator', joined: '25/11/2017', id: '3'},
  {username: 'nina', email: 'nina@company.com', status: 'Pending', role: 'User', joined: '14/2/2021', id: '4'},
  {username: 'leo', email: 'leo_dev@protonmail.com', status: 'Active', role: 'Admin', joined: '7/7/2019', id: '5'},
  {username: 'chris', email: 'chris88@gmail.com', status: 'Inactive', role: 'User', joined: '19/1/2016', id: '6'},
  {username: 'tina', email: 'tina@domain.com', status: 'Active', role: 'Moderator', joined: '30/10/2022', id: '7'},
  {username: 'raj', email: 'raj@workmail.com', status: 'Active', role: 'User', joined: '5/6/2015', id: '8'},
  {username: 'zoe', email: 'zoe@icloud.com', status: 'Pending', role: 'Admin', joined: '22/8/2023', id: '9'},
  {username: 'omar', email: 'omar@fastmail.com', status: 'Active', role: 'User', joined: '9/12/2014', id: '10'},
  {username: 'lily', email: 'lily@company.org', status: 'Inactive', role: 'Moderator', joined: '11/4/2018', id: '11'},
  {username: 'max', email: 'max@domain.net', status: 'Active', role: 'Admin', joined: '17/3/2019', id: '12'},
  {username: 'sara', email: 'sara@outlook.com', status: 'Pending', role: 'User', joined: '28/2/2020', id: '13'},
  {username: 'dan', email: 'dan@company.com', status: 'Active', role: 'Moderator', joined: '6/1/2017', id: '14'},
  {username: 'ivy', email: 'ivy@domain.com', status: 'Inactive', role: 'User', joined: '15/9/2016', id: '15' },
  {username: 'noah', email: 'noah@protonmail.com', status: 'Active', role: 'Admin', joined: '21/12/2021', id: '16'},
  {username: 'ella', email: 'ella@icloud.com', status: 'Pending', role: 'User', joined: '10/8/2022', id: '17'},
  {username: 'kai', email: 'kai@workmail.com', status: 'Active', role: 'Moderator', joined: '4/5/2015', id: '18'},
];

const dataHead = ['Username', 'Email', 'Status', 'Role', 'Joined', 'Action']
  return (
    <table className="w-full border-collapse bg-white text-sm overflow-x-auto">
      <thead>
        <tr className='bg-gray-100 text-gray-700'>
          {dataHead.map((val) => <th className='p-3 text-left font-semibold' key={val}>{val}</th>)}
        </tr>
      </thead>

      <tbody>
        {data.map((val) => (
          <tr className="border-b hover:bg-gray-50" key={val.id}>
            <td className="p-3">{val.username}</td>
            <td className="p-3">{val.email}</td>
            <td className="p-3">
              <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">{val.status}</span>
            </td>
            <td className="p-3">{val.role}</td>
            <td className="p-3">{val.joined}</td>
            <td className="p-3 text-blue-600 cursor-pointer"><Link to={`/admin/users/${val.id}`}>View</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
