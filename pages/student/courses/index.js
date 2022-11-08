import React, { useEffect, useState } from "react";

import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useRouter } from "next/router";

const queryData = async (query) => {
  const apiUrlEndpoint = "http://localhost:3000/api/getdata?query=" + query;

  const response = await fetch(apiUrlEndpoint);
  const responseJson = await response.json();

  return responseJson.dataArray;
};

const coursedata = (req, res) => {
  const router = useRouter();

  const { studentID } = router.query;

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classes = await queryData(
        "SELECT * from student_course a, course b where a.course = b.id"
      );

      setClasses(classes.filter((classM) => classM.student == studentID));
    };

    fetchClasses();
  }, []);

  console.log(classes);

  return (
    <div>
      <table className="table-auto ">
        <thead className="font-bold">
          <tr>
            <th className="border  border-emerald-500 px-4 py-2 text-emerald-600">
              Course Name
            </th>
            <th className="border  border-emerald-500 px-4 py-2 text-emerald-600">
              Professor
            </th>
            <th className="border  border-emerald-500 px-4 py-2 text-emerald-600">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classM) => {
            return (
              <tr key={classM.id}>
                <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                  {classM.course_name}
                </td>
                <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                  {classM.professor}
                </td>
                <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                  {classM.grade}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default coursedata;
