import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { errorToast } from "../Components/Toaster";
import useFetch from "../Hooks/useFetch";
import { deletedata, getTransactions } from "../Services/Api";
import type { AddTransaction } from "../Types/Addtransactiontype";

const Transactions = () => {
  let { data, loading, error } = useFetch<AddTransaction[]>(getTransactions);

  let navigate = useNavigate();

  const handleEdit = (id:string) => {
    navigate(`/dashboard/trans-details/${id}`);
  };

  const handledelete = async (id: string) => {
    await deletedata(id);
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
  errorToast(error);
  return null;

  }
  return (
    <>
      <table className="w-full  border border-gray-400 border-solid p-6 rounded-lg">
        <thead>
          <tr className="border-b border-b-gray-400 border-solid px-3">
            <th>Sno</th>
            <th>Amount</th>
            <th>Category</th>
            <th>TransType</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((datalist, index) => (
            <tr key={datalist.id} className="border-b border-b-gray-400 border-solid">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{datalist.amount}</td>
              <td className="p-3">{datalist.category}</td>
              <td className="p-3">{datalist.transType}</td>
              <td className="p-3">{datalist.date}</td>
              <td className="p-3">
                {datalist.description.length
                  ? `${datalist.description.slice(0, 10)}...`
                  : datalist.description}
              </td>
              <td>
                <button onClick={() => handleEdit(datalist.id!)}>Edit</button>
                <button onClick={() => handledelete(datalist.id!)}>
                  Delete
                </button>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Transactions;
