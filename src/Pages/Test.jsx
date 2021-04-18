import React from "react";
import { useQueryClient } from "react-query";
import {
  useGetAllNotesQuery,
  useCreateOneNoteMuatation,
  useUpdateOneNoteMuatation,
  useDeleteOneNoteMuatation,
} from "../Hooks/react-query/notes-hooks";

export function Test() {
  const { data, isLoading } = useGetAllNotesQuery();
  const { mutate } = useUpdateOneNoteMuatation();
  const queryClient = useQueryClient();

  return (
    <div style={{ position: "fixed", top: "50px", left: "50px" }}>
      <a
        href={"/"}
        onClick={(e) => {
          e.preventDefault();
          mutate(
            {
              id: data.notes[0].id,
              title: "update title",
              content: "update content",
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("notes");
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
        data.notes.map((note) => <p>{note.title}</p>)
      )}
    </div>
  );
}
