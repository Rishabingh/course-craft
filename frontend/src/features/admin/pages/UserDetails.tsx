import { useParams } from "react-router"

const UserDetails = () => {
  const { id } = useParams();
  return (
    <div>{id}</div>
  )
}

export default UserDetails