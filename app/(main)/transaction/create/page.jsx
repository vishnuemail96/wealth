"use client"
import { useState, useEffect } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import AddTransactionForm from "../_components/addtransaction-form";
import { getTransaction } from "@/actions/transaction";

const AddTransactionPage = ({ searchParams }) => {
  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAccounts = await getUserAccounts();
        setAccounts(userAccounts);

        const resolvedSearchParams = await searchParams;
        const editId = resolvedSearchParams?.edit;

        if (editId) {
          const transaction = await getTransaction(editId);
          setInitialData(transaction);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>; // Or any loading state you prefer
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!initialData}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
