import { DataTable } from "../common/table";
import { AccountUsers, accountUsersColumns } from "./column";


const AllAccountAdmins: React.FC = () => {

  return ( 
	<div>
	  <DataTable<AccountUsers, any> data={[]} columns={accountUsersColumns}/>
	</div>
  );
}
export default AllAccountAdmins