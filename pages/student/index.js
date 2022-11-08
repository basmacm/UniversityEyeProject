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
    <div className="flex flex-col p-10  justify-center">
      <div className="basis-1/2  font-bold">
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
      </div>
      <div className="basis-1/2 font-bold">
        <input type={"submit"} value={"Documents"} />
      </div>
    </div>
  );
};

export default Student;
