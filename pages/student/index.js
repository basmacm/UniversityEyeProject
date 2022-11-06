import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import Router, { useRouter } from "next/router";

const Student = (req, res) => {
  const router = useRouter();

  const { studentID } = router.query;

  return (
    <div style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <input
        type={"submit"}
        value={"Courses"}
        onClick={() =>
          Router.push({
            pathname: "/student/courses",
            query: { studentID },
          })
        }
      />
      <input type={"submit"} value={"Documents"} />
    </div>
  );
};

export default Student;
