'use client'
import React from 'react';
import { Footer, Header } from '../../layout';
import CourseBreadcrumb from '../breadcrumb/breadcrumb-5';
import InternshipDetailsArea from './internship-details-area';
import useParallax from '@/hooks/use-parallax';

const InternshipDetailsMain = ({internship}) => {
    useParallax();
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <CourseBreadcrumb course={internship} subtitle="Course Details"  />
                <InternshipDetailsArea course={internship} />
                <Footer style_2={'footer-dark bg-image footer-style-2'} />
            </div>
        </div>
    )
}

export default InternshipDetailsMain;