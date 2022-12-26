import React from 'react';
import Navbar from './Navbar';

const News = () => {
    return (
        <div>
            <Navbar />
            <div className=' container p-4 container-fluid '>
                <h3 className='text-primary'>Press Release</h3>
                <hr />
                <h5>November 2022</h5>
                <ul>
                    <li>
                        <a href="#!">Understanding the Movement of Flocculated Fine Particles in Marine and Aquatic Waters</a>
                    </li>
                    <li>
                        <a href="#!">Addressing the Water Problem</a>
                    </li>
                </ul>




                <h5>October 2022</h5>
                <ul>
                    <li>
                        <a href="#!">A Friendly Approach to the Mechanics of Materials</a>
                    </li>
                    <li>
                        <a href="#!">Dynamic Decisions Pave Pathways to Tomorrow's Opportunities Today</a>
                    </li>

                    <li>
                        <a href="#!">FinTech: accelerating the transformation of the modern financial industry</a>
                    </li>

                </ul>


                <h5>September 2022</h5>
                <ul>
                    <li>
                        <a href="#!">A Reader in Singapore Modern Art</a>
                    </li>
                    <li>
                        <a href="#!">How Hedge Funds Make Investments</a>
                    </li>

                    <li>
                        <a href="#!">ADHD is Not an Illness and Ritalin is Not a Cure</a>
                    </li>

                    <li>
                        <a href="#!">Learn the Intricacies in Solving Problems Related to Momentum Transfer</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

export default News;