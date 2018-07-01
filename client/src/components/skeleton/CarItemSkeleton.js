import React from "react";
import classnames from "classnames";

const CarItemSkeleton = editable => {
  return (
    <div
      className={classnames("col-lg-12 bv_grayscale bv_caritemskeleton", {
        "col-xl-4": editable,
        "col-xl-6": !editable
      })}
    >
      <div className="card">
        <div className="user-block-2">
          <img
            className="img-fluid"
            src="assets/images/widget/user-1.png"
            alt="user-header"
          />
          <h5 className="bv_fontmagenta">
            &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
            &#9646;&#9646;&#9646;&#9646;&#9646;
          </h5>
          <h5 className="bv_fontmagenta">
            &#9646;&#9646;/&#9646;&#9646;/&#9646;&#9646;&#9646;&#9646;
          </h5>
          <div>
            <div className="inline-block">
              <h6 className="bv_fontmagenta">
                &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
              </h6>
            </div>
            <div className="inline-block">
              <i className="fas fa-arrow-right m-l-5 m-r-5 bv_fontmagenta" />
            </div>
            <div className="inline-block">
              <h6 className="bv_fontmagenta">
                &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646; &#9646;&#9646;
                &#9646;&#9646;&#9646;&#9646;
              </h6>
            </div>
          </div>
          <div className="padding-20">
            <p className="text-blue">
              &#9646; &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
              &#9646; &#9646;&#9646;&#9646;&#9646; &#9646;&#9646;
              &#9646;&#9646;&#9646; &#9646;&#9646;
              &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
              &#9646;&#9646;&#9646; &#9646;&#9646;&#9646;&#9646;&#9646;
              &#9646;&#9646;&#9646; &#9646; &#9646;&#9646;
              &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
            </p>
          </div>
        </div>

        <div className="card-block">
          <div className="user-block-2-activities">
            <div className="user-block-2-active">
              <i className="fas fa-user" /> &#9646;&#9646;&#9646;&#9646;
              &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
            </div>
          </div>

          <div className="text-center">
            <button
              disabled
              type="button"
              className="btn btn-primary waves-effect waves-light text-uppercase"
            >
              &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItemSkeleton;
