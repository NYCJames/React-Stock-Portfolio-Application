// import { useEffect, useState } from "react";
// import Polygon from "../apis/Polygon";

function CompanyProfile({ profileData }) {
  return (
    <div>
      {profileData && (
        <div className="row border bg-white rounded shadow-sm p-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">Name: </span>
              {profileData.name}
            </div>
            <div>
              <span className="fw-bold">Ticker: </span>${profileData.ticker}
            </div>
            <div>
              <span className="fw-bold">CIK: </span>
              {profileData.cik}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Description: </span>
              {profileData.description}
            </div>
            <div>
              <span className="fw-bold">Website: </span>
              <a href={profileData.homepage_url}>{profileData.homepage_url}</a>
            </div>
            <div>
              <span className="fw-bold">IPO Date: </span>
              {profileData.list_date}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">SIC Code: </span>
              {profileData.sic_code}
            </div>
            <div>
              <span className="fw-bold">SIC Category: </span>
              {profileData.sic_description}
            </div>
            <div>
              <span className="fw-bold">Exchange: </span>
              {profileData.primary_exchange}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyProfile;
