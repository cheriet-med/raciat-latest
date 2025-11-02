import React from "react";
import { handleSubmit } from "@/actions/commentAction";

export default function FormComments() {
    return (
        <div className="leave-comment">
            <div className="heading-title mb_20">
                <h5 className="mb_8">أضف مراجعة</h5>
                <p>لن يتم نشر عنوان بريدك الإلكتروني</p>
            </div>
            <form
                id="leaveComment"
                className="form-leave-comment"
                action={handleSubmit}
            >
                <div className="wrap mb_20">
                    <div className="tf-grid-layout md-col-2 mb_20">
                        <fieldset>
                            <label
                                htmlFor="name"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                الاسم
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="اسمك*"
                                name="name"
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <label
                                htmlFor="email"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                البريد الإلكتروني
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="بريدك الإلكتروني*"
                                name="email"
                                required
                            />
                        </fieldset>
                    </div>
                    <fieldset>
                        <label
                            htmlFor="comment"
                            className="text-button text_primary-color fw-7 mb_8"
                        >
                            المراجعة
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            placeholder="اكتب تعليقك"
                            name="comment"
                            required
                        ></textarea>
                    </fieldset>
                </div>
                <div className="box-fieldset-item d-flex mb_20">
                    <fieldset>
                        <input type="checkbox" className="tf-check" id="note" />
                    </fieldset>
                    <p className="text-body-default">
                        حفظ الاسم والبريد الإلكتروني للمراجعة القادمة
                    </p>
                </div>
                <button className="tf-btn btn-bg-1 btn-px-28" type="submit">
                    <span>إرسال المراجعة</span>
                    <span className="bg-effect"></span>
                </button>
            </form>
        </div>
    );
}
