import React from "react";

type Property = {
  id: number;
  address: string;
  currency?: string;
  title: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  categories: string;
  type: string;
  price: number;
};

export default function PropertiesTitle({ property }: { property: Property }) {
  // Format price with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-SA').format(price);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap_12">
        <div>
          <div className="wrap-tag d-flex gap_8 mb_12">
                       <div className="tag categoreis text-button-small fw-6 text_primary-color"
             style={{
                backgroundColor: property.categories === "بيع" ? "#dc3545" : "#28a745",
                color: "#fff"
              }}
            >
              {property.categories}
            </div> 
            <div
              className={`tag categoreis text-button-small fw-6 text_primary-color`}
             
            >
              {property.type}
            </div>

          </div>
          <h4 className="text-4xl lg:text-5xl font-bold">{property.title}</h4>
        </div>
        <h4 className="price text-4xl lg:text-5xl font-bold">
          {formatPrice(property.price)}
          <span className="text_secondary-color text-body-1 ">
            {" "}{property.currency}{" "}
          </span>
        </h4>
      </div>
      <div className="wrap-info d-flex justify-content-between align-items-end">
        <div>
          <div className="text-body-default mb_12 text-2xl lg:text-3xl font-bold">مميزات:</div>
          <ul className="info d-flex">
            {property.beds !== undefined && property.beds > 0 && (
              <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                <i className="icon-Bed"></i>
                {property.beds}
                غرف
              </li>
            )}
            {property.baths !== undefined && property.baths > 0 && (
              <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                <i className="icon-Bathstub"></i>
                {property.baths} حمام
              </li>
            )}
            {property.sqft !== undefined && property.sqft > 0 && (
              <li className="d-flex align-items-center gap_8 h6 text_primary-color fw-6">
                <i className="icon-Ruler"></i>
                {property.sqft} قدم مربع
              </li>
            )}
          </ul>
        </div>
        <ul className="list-action d-flex gap_16">
          <li>
            <a href="#">
              <span className="icon icon-Heart"></span>
            </a>
          </li>
          <li>
            <a href="#" className="">
              <i className="icon-ShareNetwork"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}