import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { dataContext, editorContext} from '../../App';
import AuthorNav from '../Author/AuthorNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCoffee, faDownload, faInfo } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

import { Table, Card, Row, Col, Container, Nav } from 'react-bootstrap';
import Test from '../Test/Test';
import ChartComponent from './ChartComponent';


const Dashbord = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/submittedData')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
   
  }, []);

  
    const [fileName,fileType,fileData] = useContext(dataContext);
    const [editor] = useContext(editorContext);

    const [activeMenu, setActiveMenu] = useState('dashboard');

    const handleMenuClick = (menu) => {
      setActiveMenu(menu);
    };
  
    const renderContent = () => {

  
      switch (activeMenu) {
        case 'dashboard':
          return (

          
          

            <Table striped bordered hover>
              <thead>
                <tr>
                <th>File</th>   
                  <th>Username</th>    
                  <th>Article Type</th>
                  <th>Title of Article</th>
                  <th>Review Preference</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
        {data.map(item => (
         
          <tr key={item._id}>
               <td><a href={item.url}>Docx <FontAwesomeIcon icon={faDownload}/></a></td>
            <td>{item.email}</td>
            <td>{item.articleType}</td>
            <td>{item.title}</td>
            <td>{item.reviewer}</td>   
            <td>  <Link to={`/fulldetails/${item._id}`}>
              See Details <FontAwesomeIcon icon={faCircleInfo}/> </Link> </td>
          </tr>
        ))}
      </tbody>
            </Table>


          );
        case 'orders':
          return (
            <Card>
              <Card.Body>
                <Card.Title>Orders</Card.Title>
                <Card.Text>
                  This is the orders page.
                </Card.Text>
              </Card.Body>
            </Card>
          );
        case 'customers':
          return (
            <Card>
              <Card.Body>
                <Card.Title>Customers</Card.Title>
                <Card.Text>
                  This is the customers page.
                </Card.Text>
              </Card.Body>
            </Card>
          );
          case 'chart':
            return (
              <Card>

                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text>
                <ChartComponent></ChartComponent>
                    </Card.Text>

                </Card.Body>
                
              </Card>
            );
        default:
          return null;
      }
    };

  
   

    return (
        <div>
            <AuthorNav/>

     



            <Container fluid className='mt-5 p-4'>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Electronic Journal</Card.Title>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    active={activeMenu === 'dashboard'}
                    onClick={() => handleMenuClick('dashboard')}
                  >
                    Total Sumission
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    active={activeMenu === 'orders'}
                    onClick={() => handleMenuClick('orders')}
                  >
                    Total Published
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    href="#"
                    active={activeMenu === 'customers'}
                    onClick={() => handleMenuClick('customers')}
                  >
                    Under Review
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    href="#"
                    active={activeMenu === 'chart'}
                    onClick={() => handleMenuClick('chart')}
                  >
                    Data sheet
                  </Nav.Link>
                </Nav.Item>

              </Nav>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Card.Title>{activeMenu.toUpperCase()}</Card.Title>
              {renderContent()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>





        </div>
    );
};

export default Dashbord;