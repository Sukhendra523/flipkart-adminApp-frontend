import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../../actions/page.action";
import { createLinearCategoriesList } from "../../../helper/categoryHelper";
import Layout from "../../Layout";
import AddCategoryPageModal from "./AddCategoryPageModal";

const CategoryPage = () => {
  const dispatch = useDispatch()
  const [showCategoryPageModal, setShowCategoryPageModal] = useState(false);
  const category = useSelector((state) => state.category);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const page = useSelector(state => state.page);


  useEffect(() => {
    console.log(page);
    if(!page.loading){
      setShowCategoryPageModal(false);
      setPageTitle('');
        setCategoryId('');
        setDesc('');
        setProducts([]);
        setBanners([]);
    }
}, [page]);

  const HandleAddPage = () => {
    setCategories(createLinearCategoriesList(category.categories));
    setShowCategoryPageModal(true);
  };

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    
    console.log("e.target.files[0]",e.target.files[0]);
    console.log("banners :" ,banners)
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    //e.target.preventDefault();

    if (pageTitle === "") {
      alert("Title is required");
      setShowCategoryPageModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", pageTitle);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);

    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });

    products.forEach((product, index) => {
      form.append("products", product);
    });

    dispatch(createPage(form));
    // setShowCategoryPageModal(false)
  };

  return (
    <Layout sidebar>
      <button onClick={HandleAddPage}>Add New Page</button>

      <AddCategoryPageModal
        show={showCategoryPageModal}
        onHide={() => setShowCategoryPageModal(false)}
        modalTitle="Create Category Page"
        buttons={[
          {
            label: "Close",
            onClick: () => setShowCategoryPageModal(false),
            classNames: "primary",
          },
          {
            label: "Create",
            onClick: submitPageForm,
            classNames: "success",
          },
        ]}
        categoryId={categoryId}
        onCategoryChange={onCategoryChange}
        pageTitle={pageTitle}
        setPageTitle={(e) => setPageTitle(e.target.value)}
        desc={desc}
        setDesc={(e) => setDesc(e.target.value)}
        categories={categories}
        banners={banners}
        products={products}
        handleBannerImages={handleBannerImages}
        handleProductImages={handleProductImages}
      />
    </Layout>
  );
};

export default CategoryPage;
