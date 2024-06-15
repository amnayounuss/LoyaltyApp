const tableHeaderStyle = {
  padding: "10px",
  textAlign: "left",
  background: "#f2f2f2",
  borderBottom: "1px solid #dee2e6",
};

const tableCellStyle = {
  padding: "10px",
  textAlign: "left",
};

const UserTable = ({ userData }) => {
  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ borderBottom: "2px solid #dee2e6" }}>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Profile Image</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>First Name</th>
              <th style={tableHeaderStyle}>Last Name</th>
              <th style={tableHeaderStyle}>Phone #</th>
              <th style={tableHeaderStyle}>User Type</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user) => (
              <tr key={user?.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={tableCellStyle}>{user?.id}</td>
                <td style={tableCellStyle}>
                  <img
                    src={user?.profileImage}
                    alt="profileImage"
                    style={{ height: "30px", width: "30px" }}
                  />
                </td>
                <td style={tableCellStyle}>{user?.email}</td>
                <td style={tableCellStyle}>{user?.firstName}</td>
                <td style={tableCellStyle}>{user?.lastName}</td>
                <td style={tableCellStyle}>{user?.phoneNo}</td>
                <td style={tableCellStyle}>{user?.userType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
