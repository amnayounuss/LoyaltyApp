import React from "react";
import man from "../../../assets/images/dashboard/man.png";

const UserPanel = () => {
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img
            className="img-60 rounded-circle lazyloaded blur-up"
            src={man}
            alt="#"
          />
        </div>
        <h6 className="mt-3 f-14">Camel Step</h6>
        <p>Admin</p>
      </div>
    </div>
  );
};

export default UserPanel;
