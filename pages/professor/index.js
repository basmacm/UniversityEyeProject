import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import Router, { useRouter } from "next/router";

const Professor = (req, res) => {
  const router = useRouter();

  const { profId } = router.query;

  return (
    <div style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <input
        type={"submit"}
        value={"my course"}
        onClick={() =>
          Router.push({
            pathname: "/professor/courses",
            query: { profId },
          })
        }
      />
      <input
        type={"submit"}
        value={"student grades"}
        onClick={() =>
          Router.push({
            pathname: "/professor/grades",
            query: { profId },
          })
        }
      />
    </div>
  );
};

export default Professor;
