import { useCallback, useEffect, useState } from "react";
import { errorToast } from "../Components/Toaster";

function useFetch<t>(fetchData: () => Promise<t>) {
  let [data, setdata] = useState<t>();
  let [loading, setloading] = useState<boolean>(false);
  let [error, seterror] = useState<string>("");

  let fetch = useCallback(async () => {
    try {
      setloading(true);
      let resData = await fetchData();
      setdata(resData);
    } catch (err) {
      if (err instanceof Error) {
        errorToast(err.message);
        seterror(err.message);
      }
    } finally {
      setloading(false);
    }
  }, [fetchData]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { data, loading, error, refetch:fetch  };
}

export default useFetch;
