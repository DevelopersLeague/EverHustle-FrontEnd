import React from "react";
import { useQueryClient } from "react-query";
import {
  useCreateOneFocustimeMutation,
  useGetTotalFocustimeByDateQuery,
} from "../Hooks/react-query/focustime-hooks";

export function Test() {
  const { data, isLoading } = useGetTotalFocustimeByDateQuery(
    new Date().toISOString().split("T")[0]
  );
  const { mutate } = useCreateOneFocustimeMutation();
  const queryClient = useQueryClient();

  return (
    <div style={{ position: "fixed", top: "50px", left: "50px" }}>
      <a
        href={"/"}
        onClick={(e) => {
          e.preventDefault();
          mutate(
            {
              time: "03:59:59",
              date: new Date().toISOString().split("T")[0],
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("focustime");
              },
            }
          );
        }}
      >
        click
      </a>
      {isLoading ? (
        <p>loading</p>
      ) : (
        // data.reminders.map((item) => (
        //   <>
        //     <p>{item.title}</p>
        //     <p>{item.timestamp}</p>
        //   </>
        // ))
        <div>
          <p>{data.time}</p>
          <p>{data.date}</p>
        </div>
      )}
    </div>
  );
}
