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
    <div className="flex w-screen h-screen p-10 justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div>
        <div className="basis-1/2  font-bold  w-24 border-2 border-indigo-600 bg-orange-500 text-center">
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
        <div className="m-1"></div>
        <div className="basis-1/2 font-bold w-24 border-2 border-indigo-600 bg-orange-500 text-center">
          <input type={"submit"} value={"Documents"} />
        </div>
      </div>
    </div>
  );
};

export default Student;
