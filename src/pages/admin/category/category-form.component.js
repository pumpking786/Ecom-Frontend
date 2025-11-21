import { Form, Col, Button, Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { category_svc } from "./category.service";
import { brand_svc } from "../brand/brand.service";

const CategoryForm = ({ submitForm, defaultValue, buttontext }) => {
  let [brands, setBrands] = useState();
  let [category, setCategory] = useState();
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3),
    status: Yup.string().required(),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      parent_id: "",
      brands: "",
      status: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let sel_brands = [];
      if (values.brands) {
        sel_brands = values.brands.map((item) => item.value);
      }
      values.brands = sel_brands.join(",");
      // console.log(values);
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
              placeholder="Enter the category name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <span className="text-danger">{formik.errors?.name}</span>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Sub-Category of:</Form.Label>
          <Col sm={9}>
            <Form.Select
              name="parent_id"
              size="sm"
              value={formik.values.parent_id}
              onChange={formik.handleChange}
            >
              <option>--Select Any One--</option>
              {category &&
                category.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
            <span className="text-danger">{formik.errors?.parent_id}</span>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3">Brands:</Form.Label>
          <Col sm={9}>
            <Select
              options={brands}
              isMulti
              name="brands"
              value={formik.values.brands}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  brands: e,
                });
              }}
            />

            <span className="text-danger">{formik.errors?.brands}</span>
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
              name="image"
              required={!formik.values.image ? true : false}
              accept="image/*"
              size="sm"
              onChange={(e) => {
                let file = e.target.files[0];
                let parts_arr = file.name.split(".");
                let ext = parts_arr.pop();

                if (
                  ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
                    ext.toLowerCase()
                  )
                ) {
                  if (file.size <= 5000000) {
                    formik.setValues({
                      ...formik.values,
                      image: file,
                    });
                  } else {
                    formik.setErrors({
                      ...formik.errors,
                      image: "File size should be < 5mb",
                    });
                  }
                } else {
                  formik.setErrors({
                    ...formik.errors,
                    image: "Invalid File Format",
                  });
                }
              }}
            />
            <span className="text-danger">{formik.errors?.image}</span>
          </Col>
          <Col sm={2}>
            {formik.values.image ? (
              typeof formik.values.image === "object" ? (
                <Image fluid src={URL.createObjectURL(formik.values?.image)} />
              ) : (
                <Image
                  fluid
                  src={
                    process.env.REACT_APP_API_URL +
                    "/assets/" +
                    formik.values?.image
                  }
                />
              )
            ) : (
              <></>
            )}
          </Col>
        </Form.Group>
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
export default CategoryForm;
