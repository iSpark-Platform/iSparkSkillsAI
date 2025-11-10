import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { internship_data } from '../../data';
import SortingArea from '../course-filter/sorting-area';
import InternshipType from '../course/internship-type';
import CourseSidebar from '../common/sidebar/course-sidebar';

const internship_items = internship_data.filter((arr, index, self) =>
    index === self.findIndex((i) => i.img === arr.img && i.title === arr.title)
);

const InternshipFourArea = () => {
    const [internships, setInternships] = useState(internship_items);
    const [showing, setShowing] = useState(0);
    const { categories, instructors, levels, languages, price } = useSelector((state) => state.filter);

    let items = internships
        ?.filter((item1) =>
            categories?.length !== 0
                ? categories?.some((item2) => item1.category == item2)
                : item1
        )
        .filter((item1) =>
            levels?.length !== 0
                ? levels?.some((item2) => item1.level == item2)
                : item1
        )
        .filter((item) => Number(item.course_price) >= price[0] && Number(item.course_price) <= price[1]);

    return (
        <div className="edu-course-area course-area-1 section-gap-equal">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-3">
                        {/* Sidebar (optional) */}
                        <CourseSidebar course_items={internship_items} />
                    </div>

                    <div className="col-lg-9 col-pl--35">
                        {/* Sorting area */}
                        <SortingArea
                            course_items={internship_items}
                            course_list={true}
                            num={showing}
                            setCourses={setInternships}
                            courses={internships}
                            items={items}
                        />

                        {/* List View */}
                        <div className="row g-5">
                            {items?.slice(0, 6)?.map((internship, i) => (
                                <div key={internship.id} className="col-12">
                                    <InternshipType data={internship} classes="course-style-8" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipFourArea;
