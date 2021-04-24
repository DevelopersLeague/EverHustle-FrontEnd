import React from "react";
import { useQueryClient } from "react-query";
import {
  useGetAllGoalsQuery,
  // useCreateOneGoalMutation,
  useUpdateOneGoalMutation,
  // useDeleteOneGoalMutation,
} from "../Hooks/react-query/goals-hooks";

export function Test() {
  const { data, isLoading } = useGetAllGoalsQuery();
  const { mutate } = useUpdateOneGoalMutation();
  const queryClient = useQueryClient();

  return (
    <div style={{ position: "fixed", top: "50px", left: "50px" }}>
      <a
        href={"/"}
        onClick={(e) => {
          e.preventDefault();
          mutate(
            {
              id: data.goals[0].id,
              title: "new new new",
              isCompleted: true,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("goals");
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
        data.goals.map((note) => (
          <>
            <p>{note.title}</p>
            <p>{note.isCompleted ? "complete" : "incomplete"}</p>
          </>
        ))
      )}
    </div>
  );
}
