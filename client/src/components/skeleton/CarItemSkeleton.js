import React from "react";
import classnames from "classnames";

const CarItemSkeleton = ({ editable }) => {
  return (
    <div
      className={classnames("col-lg-12 bv_grayscale bv_caritemskeleton", {
        "col-xl-4": !editable,
        "col-xl-6": editable
      })}
    >
      <div className="card">
        <div className="user-block-2">
          <div>
            <img
              className="img-fluid"
              src="/assets/images/widget/user-1.png"
              alt="user-header"
            />
          </div>
          <div>
            <div className="inline-block bv_fontmagenta">
              <h5 className="bv_fontmagenta">
                &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
                &#9646;&#9646;&#9646;&#9646;&#9646;
              </h5>
            </div>
          </div>
          <div>
            <div className="inline-block bv_fontmagenta">
              <h5 className="bv_fontmagenta">
                &#9646;&#9646;/&#9646;&#9646;/&#9646;&#9646;&#9646;&#9646;
              </h5>
            </div>
          </div>
          <div>
            <div className="inline-block bv_fontmagenta">
              <h6 className="bv_fontmagenta">
                &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
                &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646; &#9646;&#9646;
                &#9646;&#9646;&#9646;&#9646;
              </h6>
            </div>
          </div>
          <div className="padding-20">
            <div className="inline-block bv_fontmagenta">
              <p className="bv_fontmagenta">
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
        </div>

        <div className="card-block">
          <div className="user-block-2-activities">
            <div className="user-block-2-active ">
              <div className="inline-block bv_fontmagenta ">
                &#9646;&#9646;&#9646;&#9646;
                &#9646;&#9646;&#9646;&#9646;&#9646;&#9646;&#9646;
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block bv_fontmagenta width-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItemSkeleton;
