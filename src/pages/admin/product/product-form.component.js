import { Form, Col, Button, Image, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { product_svc } from "./product.service";
import { brand_svc } from "../brand/brand.service";
import { category_svc } from "../category/category.service";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
const ProductForm = ({ submitForm, defaultValue, buttontext }) => {
  let [brands, setBrands] = useState();
  let [category, setCategory] = useState();
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3),
    status: Yup.string().required(),
    price: Yup.number().required().min(1),
    discount: Yup.number().nullable().default(0).min(0).max(100),
    description: Yup.string().nullable(),
    is_featured: Yup.boolean().default(false),
    seller: Yup.string().nullable(),
    category_id: Yup.array().required().nullable(),
    brand: Yup.object().nullable(),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      category_id: "",
      brand: "",
      status: "",
      images: "",
      price: "",
      discount: "",
      description: "",
      is_featured: "",
      seller: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.brand = values.brand.value;
      let sel_category_id = [];
      if (values.category_id) {
        sel_category_id = values.category_id.map((item) => item.value);
      }
      values.category_id = sel_category_id.join(",");
      console.log(values);
      submitForm(values);
    },
  });

  const getCategoryList = useCallback(async () => {
    try {
      let response = await category_svc.listAllCategories();
      if (response.status) {
        setCategory(response.result);
      }
    } catch (excep) {
      console.log(excep);
    }
  }, []);
  const getBrandList = useCallback(async () => {
    try {
      let response = await brand_svc.listAllBrands();
      if (response.status) {
        let opt = response.result.map((item) => {
          return {
            value: item._id,
            label: item.title,
          };
        });
        setBrands(opt);
      }
    } catch (excep) {
      console.log(excep);
    }
  });
  const handleFile = (e) => {
    let files = Object.values(e.target.files);
    let allow_exts = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    let populate_images = [];
    if (files.length) {
      files.map((image) => {
        let parts_arr = image.name.split(".");
        let ext = parts_arr.pop();
        if (allow_exts.includes(ext.toLowerCase())) {
          if (image.size <= 5000000) {
            populate_images.push(image);
          } else {
            formik.setErrors({
              ...formik.errors,
              images: image.name + " is greater than 5mb",
            });
          }
        } else {
          formik.setErrors({
            ...formik.errors,
            images: image.name + "File is not supported",
          });
        }
      });

      if (populate_images.length > 0) {
        const currentImages = formik.values.images || [];
        const combinedImages = [...currentImages, ...populate_images];
        formik.setValues({
          ...formik.values,
          images: combinedImages,
        });
      }
    }
  };
  useEffect(() => {
    getCategoryList();
    getBrandList();
  }, []);
  useEffect(() => {
    if (defaultValue) {
      formik.setValues({
        ...defaultValue,
      });
    }
  }, [defaultValue]);
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Name:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="text"
              name="name"
              placeholder="Enter the product name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.name}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Description:</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              as={"textarea"}
              name="description"
              placeholder="Enter the description of the product"
              required
              value={formik.values.description}
              onChange={formik.handleChange}
              rows={5}
              style={{ resize: "none" }}
            />
            <span className="text-danger">{formik.errors?.description}</span>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Category:</Form.Label>
          <Col sm={9}>
            <Select
              options={
                category &&
                category.map((item) => {
                  return { label: item.name, value: item._id };
                })
              }
              isMulti
              name="category_id"
              value={formik.values.category_id}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  category_id: e,
                });
              }}
            />

            <span className="text-danger">{formik.errors?.category_id}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Price(Npr):</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="number"
              name="price"
              placeholder="Enter the Product price"
              required
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.price}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Discount(%):</Form.Label>
          <Col sm={9}>
            <Form.Control
              size="sm"
              type="number"
              name="discount"
              placeholder="Enter the discount in percentage"
              min={0}
              max={100}
              value={formik.values.discount}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.discount}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Brand:</Form.Label>
          <Col sm={9}>
            <Select
              options={brands}
              name="brand"
              value={formik.values.brand}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  brand: e,
                });
              }}
            />

            <span className="text-danger">{formik.errors?.brand}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Featured:</Form.Label>
          <Col sm={9}>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Yes"
              value={1}
              checked={!!formik.values.is_featured}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  is_featured: e.target.checked ? 1 : 0,
                });
              }}
            />

            <span className="text-danger">{formik.errors?.is_featured}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Seller:</Form.Label>
          <Col sm={9}>
            <Form.Select
              size="sm"
              name="seller"
              value={formik.values.seller}
              onChange={formik.handleChange}
            >
              <option>--Select the seller--</option>
            </Form.Select>

            <span className="text-danger">{formik.errors?.seller}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Status:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="status"
              required
              size="sm"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option>--Select Any One--</option>
              <option value="active">Publish</option>
              <option value="inactive">Un-Publish</option>
            </Form.Select>
            <span className="text-danger">{formik.errors?.status}</span>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Image:</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="file"
              name="images"
              multiple
              required={!formik.values.images ? true : false}
              accept="image/*"
              size="sm"
              onChange={handleFile}
            />
            <span className="text-danger">{formik.errors?.images}</span>
          </Col>
        </Form.Group>
        <Row className="my-3">
          {formik.values.images &&
            formik.values.images.map((item, index) => (
              <Col sm={6} md={2} key={index}>
                <Image
                  fluid
                  src={
                    typeof item === "object"
                      ? URL.createObjectURL(item)
                      : process.env.REACT_APP_API_URL + "/assets/" + item
                  }
                />
                <Button
                  variant="danger"
                  type="button"
                  size="sm"
                  className="btn-rounded"
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </Col>
            ))}
        </Row>
        <Form.Group className="mb-3 row">
          <Col sm={{ offset: 3, span: 9 }}>
            <Button size="sm" variant="danger" type="reset" className="me-3">
              <i className="fa-solid fa-ban"></i> Cancel
            </Button>
            <Button size="sm" variant="success" type="submit">
              <i className="fa fa-paper-plane"></i> {buttontext}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};
export default ProductForm;
