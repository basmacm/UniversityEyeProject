import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useRouter } from "next/router";
import Professor from "..";

const queryData = async (query) => {
  const apiUrlEndpoint = "http://localhost:3000/api/getdata?query=" + query;

  const response = await fetch(apiUrlEndpoint);
  const responseJson = await response.json();

  return responseJson.dataArray;
};

const Professor_courses = (req, res) => {
  const router = useRouter();

  const { profId } = router.query;

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classes = await queryData("SELECT * from course ");

      setClasses(classes.filter((classM) => classM.prof_id == profId));
    };

    fetchClasses();
  }, []);

  console.log(classes);

  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Course Name</th>
          <th scope="col">Section</th>
          <th scope="col">Major</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {classes.map((classM) => {
          return (
            <tr key={classM.id}>
              <th scope="row">{classM.course_name}</th>
              <td>{classM.section}</td>
              <td>{classM.major}</td>
            </tr>
          );
        })}
      </MDBTableBody>
    </MDBTable>
  );
};

export default Professor_courses;
