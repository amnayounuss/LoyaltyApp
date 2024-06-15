import React, { Fragment, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { getUserListing } from "../../utils/apiCalls";
import UserTable from "../common/UserTable";

const List_user = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      setIsFetching(true);
      const ResData = await getUserListing();
      setUserData(ResData);
      setIsFetching(false);
    };

    fetchDataAndSetRows();
  }, []);
  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>User Details</h5>
          </CardHeader>
          <CardBody>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              {/* <Datatable
                multiSelectOption={true}
                myData={userData ?? []}
                pageSize={10}
                pagination={true}
                class="-striped -highlight"
              /> */}
              <UserTable userData={userData} />
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default List_user;
