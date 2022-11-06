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

const Student = (req, res) => {
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
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Course Name</th>
          <th scope="col">Professor</th>
          <th scope="col">Grade</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {classes.map((classM) => {
          return (
            <tr key={classM.id}>
              <th scope="row">{classM.course_name}</th>
              <td>{classM.professor}</td>
              <td>{classM.grade}</td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
};

export default Student;
