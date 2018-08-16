import React from "react";
import classnames from "classnames";

const CarItemSkeleton = ({ editable }) => {
  return (
    <div
      className={classnames("col-lg-12", {
        "col-xl-6": editable,
        "col-xl-4": !editable
      })}
    >
      <div className="card">
        <div className="user-block-2">
          <img
            className="img-fluid"
            src="/assets/images/avatar.png"
            alt="user-header"
          />
          <h5>
            <i className="fas fa-spinner fa-spin " />
          </h5>
          <h5>
            <i className="fas fa-spinner fa-spin " />
          </h5>
          <div>
            <div className="inline-block">
              <h6>
                <i className="fas fa-spinner fa-spin" />
              </h6>
            </div>
            <div className="inline-block p-l-5 p-r-5">
              <i className="fas fa-arrow-right" />
            </div>
            <div className="inline-block">
              <h6>
                <i className="fas fa-spinner fa-spin" />
              </h6>
            </div>
          </div>
          <div className="padding-20">
            <p className="text-white">
              <i className="fas fa-spinner fa-spin " />
            </p>
          </div>
        </div>

        <div className="card-block" />
      </div>
    </div>
  );
};

export default CarItemSkeleton;
