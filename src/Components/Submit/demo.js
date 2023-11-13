import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../Layout/DashboardLayout";
import { Button, Form, Modal, Table } from "react-bootstrap";

import Breadcrumb from "../../Components/PageHeadBreadcrumb/Breadcrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useHistory } from "react-router-dom";
import { addNews } from "../../service/service";

toast.configure();

export default function AddNews() {
  const editor = useRef(null);
  const history = useHistory();

  const config = {
    readonly: false,
    enableDragAndDropFileToEditor: false,
  };

  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [tabTitle, setTabTitle] = useState(null);
  const [subTitle, setSubTitle] = useState(null);
  const [cover, setCover] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [metaName, setMetaName] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaProperty, setMetaProperty] = useState("");
  const [metaPropertyDescription, setMetaPropertyDescription] = useState("");
  const [metaData, setMetaData] = useState([]);
  const [modalMetaData, setmodalMetaData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    resetData();
  }, []);

  
  const resetData = () => {
    setTabTitle(null);
    setTitle(null);
    setSubTitle(null);
    setCover(null);
    setThumbnail(null);
    setContent(null);
    setDate(null);
  };


  const openModal = (type, data) => {
    if (type === "add") {
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  const clearMetaField = () => {
    setMetaName("");
    setMetaDescription("");
    setMetaProperty("");
    setMetaPropertyDescription("");
  };

  const handleAddMeta = (e) => {
    e.preventDefault();
    const data = {
      name: metaName,
      description: metaDescription,
      metaProperty: metaProperty,
      metaPropertyDescription: metaPropertyDescription,
    };

    // remove duplication of data
    if (
      data.name.length === 0 ||
      data.name === "" ||
      data.description.length === 0 ||
      data.description === ""
    ) {
      delete data.name;
      delete data.description;
    }

    if (
      data.metaProperty.length === 0 ||
      data.metaProperty === "" ||
      data.metaPropertyDescription.length === 0 ||
      data.metaPropertyDescription === ""
    ) {
      delete data.metaProperty;
      delete data.metaPropertyDescription;
    }
    setMetaData([...metaData, data]);
    clearMetaField();
  };

  const handleMetaDelete = (index) => {
    var meta = [];
    metaData.map((data, ind) => {
      if (ind != index) {
        meta.push(data);
      }
    });
    setMetaData(meta);
  };

  const saveNewsData = async () => {
    const cdnLink = `  <p><link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"><br></p>`;
    const newContent = content + cdnLink;
    // console.log("new content:", newContent);
    setContent(newContent);
    // console.log(content);

    let formData = {
      tabTitle,
      title,
      subTitle,
      cover,
      thumbnail,
      date,
      content: newContent,
      active: true,
      metaData: metaData,
    };
    if (!title || !subTitle || !date || !cover || !thumbnail || !content) {
      toast.warn(
        "Title, Subtitle, Cover, Thumbnail, Content can't be empty !",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    }
    const response = await addNews(formData);
    const { status } = response;
    if (status) {
      toast.success("Successful news add!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      goToUrl("/admin/news");
    } else {
      toast.error("Error", { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const goToUrl = (url) => {
    history.push(url);
  };
  return (
    <DashboardLayout>
      <Breadcrumb urlTitle="Home" url="/admin/dashboard" title="Add News">
        <Button variant="primary" onClick={() => goToUrl("/admin/news")}>
          List
        </Button>
      </Breadcrumb>
      <div className="p-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(text) => setTitle(text.target.value)}
              type="text"
              name="title"
              id="title"
              placeholder="Slider Title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sub Title</Form.Label>
            <Form.Control
              value={subTitle}
              onChange={(text) => setSubTitle(text.target.value)}
              type="text"
              name="title"
              id="title"
              placeholder="Slider Title"
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <Form.Group className="mb-3">
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  value={cover}
                  onChange={(text) => setCover(text.target.value)}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Cover Image Id"
                />
              </Form.Group>
            </div>
            <div className="col-md-6 col-sm-12">
              <Form.Group className="mb-3">
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control
                  type="text"
                  value={thumbnail}
                  onChange={(text) => setThumbnail(text.target.value)}
                  name="title"
                  id="title"
                  placeholder="Thumbnail Image Id"
                />
              </Form.Group>
            </div>
{/* //Date Insert */}
            <div className="col-md-6 col-sm-12">
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(text) => setDate(text.target.value)}
                  name="title"
                  id="title"
                  placeholder="News Published Date"
                />
              </Form.Group>
            </div>


            
          </div>

          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />

          <h5 className="mt-5 text-center">SEO Optimization</h5>

          <Form.Group className="mb-3">
            <Form.Label>Tab Title</Form.Label>
            <Form.Control
              value={tabTitle}
              onChange={(text) => setTabTitle(text.target.value)}
              type="text"
              name="tabTitle"
              id="tabTitle"
              placeholder="Tab Title"
            />
          </Form.Group>

          {metaData && (
            <>
              <div className="row">
                <div className="col-sm-12">
                  <Button
                    className="float-right  mt-4"
                    size="md"
                    variant="success"
                    onClick={() => openModal("add", null)}
                  >
                    View Meta Tags
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="row">
            <div className="col-md-5 col-sm-12">
              <Form.Group className="mb-3">
                <Form.Label>Meta Name</Form.Label>
                <Form.Control
                  value={metaName}
                  onChange={(text) => setMetaName(text.target.value)}
                  type="text"
                  name="metaName"
                  id="metaName"
                  placeholder="Meta tag name"
                />
              </Form.Group>
            </div>
            <div className="col-md-5 col-sm-12 mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  type="text"
                  value={metaDescription}
                  onChange={(text) => setMetaDescription(text.target.value)}
                  name="metaDescription"
                  id="metaDescription"
                  placeholder="Meta Tag Description"
                />
              </Form.Group>
            </div>
            {/* <div className="col-md-3 col-sm-12 mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              type="text"
              value={metaProperty}
              onChange={(text) => setMetaProperty(text.target.value)}
              name="metaProperty"
              id="metaProperty"
              placeholder="Meta Tag Property"
            />
          </Form.Group>
        </div> */}
            <div className="col-md-2 col-sm-12 mt-2">
              <Button
                className="mt-4 px-4"
                variant="secondary"
                onClick={handleAddMeta}
              >
                Add
              </Button>
            </div>
          </div>
          {/* 
      {metaData &&
        metaData.map((data, index) => (
          <>
            <div>
              <h6>Meta Property</h6>
            </div>
            <div className="row container">
              <div className="col-md-3">{data.metaProperty}</div>
              <div className="col-md-3">{data.metaPropertyDescription}</div>
              <div
                className="col-md-1 cursor-pointer"
                onClick={() => handleMetaDelete(index)}
              >
                <div className="mb-2">X</div>
              </div>
              <hr />
            </div>
          </>
        ))} */}

          <div className="row">
            {/* <div className="col-md-3 col-sm-12">
          <Form.Group className="mb-3">
            <Form.Label>Meta Name</Form.Label>
            <Form.Control
              value={metaName}
              onChange={(text) => setMetaName(text.target.value)}
              type="text"
              name="metaName"
              id="metaName"
              placeholder="Meta tag name"
            />
          </Form.Group>
        </div>
        <div className="col-md-3 col-sm-12 mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              type="text"
              value={metaDescription}
              onChange={(text) => setMetaDescription(text.target.value)}
              name="metaDescription"
              id="metaDescription"
              placeholder="Meta Tag Description"
            />
          </Form.Group>
        </div> */}
            <div className="col-md-5 col-sm-12">
              <Form.Group className="mb-3">
                <Form.Label>Meta Property</Form.Label>
                <Form.Control
                  type="text"
                  value={metaProperty}
                  onChange={(text) => setMetaProperty(text.target.value)}
                  name="metaProperty"
                  id="metaProperty"
                  placeholder="Meta Property"
                />
              </Form.Group>
            </div>
            <div className="col-md-5 col-sm-12 mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Property Description</Form.Label>
                <Form.Control
                  type="text"
                  value={metaPropertyDescription}
                  onChange={(text) =>
                    setMetaPropertyDescription(text.target.value)
                  }
                  name="metaPropertyDescription"
                  id="metaPropertyDescription"
                  placeholder="Property Description"
                />
              </Form.Group>
            </div>
            <div className="col-md-2 col-sm-12 mt-2">
              <Button
                className="mt-4 px-4"
                variant="secondary"
                onClick={handleAddMeta}
              >
                Add
              </Button>
            </div>
          </div>

          <Button
            className="float-right w-20 mt-4"
            size="md"
            variant="primary"
            onClick={() => saveNewsData()}
          >
            Submit
          </Button>
        </Form>
      </div>

      <Modal
        size="lg"
        show={showModal}
        fullscreen={false}
        aria-labelledby="example-modal-sizes-title-lg"
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Meta details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {metaData.length > 0 ? (
            <>
              <div className="p-3">
                {metaData &&
                  metaData.map((data, index) => (
                    <Table striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Type</th>
                          <th>Meta Name/ Property </th>
                          <th>Meta/ Property Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{index + 1}</td>
                          {data.name ? (
                            <td>Meta Name</td>
                          ) : (
                            <td>Meta Property</td>
                          )}
                          <td>{data?.name ? data.name : data.metaProperty}</td>
                          <td>
                            {" "}
                            {data?.name
                              ? data.description
                              : data.metaPropertyDescription}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleMetaDelete(index)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="row">
                <div className="p-3">
                  <p className="text-center">No Meta Data Found!</p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </DashboardLayout>
  );
}
