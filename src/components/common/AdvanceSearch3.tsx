import { amenitiesList } from "@/data/optionfilter";
import React from "react";

export default function AdvanceSearch3() {
    return (
        <div className="wd-search-form style-1">
            <div className="modal-header">
                <h4>البحث المتقدم</h4>
            </div>
            <div className="modal-body">
                <div className="group-checkbox">
                    <div className="text-title text_primary-color mb_12 fw-6">
                      وسائل الراحة:
                    </div>
                    <div className="group-amenities">
                        {amenitiesList.map((amenity) => (
                            <fieldset
                                key={amenity}
                                className="checkbox-item style-1"
                            >
                                <label>
                                    <input type="checkbox" />
                                    <span className="btn-checkbox"></span>
                                    <span className="text-body-default">
                                        {amenity}
                                    </span>
                                </label>
                            </fieldset>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
